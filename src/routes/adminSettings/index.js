import verifyAuth from '../../middlewares/verifyAuth.js'
import express from 'express'
import { nanoid } from 'nanoid'

const SECRET_TOKEN_LENGTH = 32
const SECRET_TOKEN_LIFETIME =
  // One week, approximately. Doesn't need to be perfect.
  1000 * // milliseconds
  60 * // seconds
  60 * // minutes
  24 * // hours
  7 // days

export default function ({ db, ensurePfp }) {
  const router = express.Router()

  router.get('/', verifyAuth(), (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    db.allDocs({ include_docs: true })
      .then(docs => {
        res.render('adminSettings', { title: _CC.lang('ADMIN_SETTINGS_HEADER'), users: docs.rows })
      })
      .catch(err => { throw err })
  })

  router.post('/add', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const username = req.body.newUserUsername.trim()
    if (!username) {
      return db
        .allDocs({ include_docs: true })
        .then((docs) => {
          res.render('adminSettings', {
            add_user_error: _CC.lang(
              'ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY'
            ),
            title: _CC.lang('ADMIN_SETTINGS_HEADER'),
            users: docs.rows
          })
        })
        .catch((err) => {
          throw err
        })
    }

    await db.put({
      _id: username,
      admin: false,
      wishlist: [],

      signupToken: nanoid(SECRET_TOKEN_LENGTH),
      expiry: new Date().getTime() + SECRET_TOKEN_LIFETIME
    })

    await ensurePfp(username)
    res.redirect(`/admin-settings/edit/${req.body.newUserUsername.trim()}`)
  })

  router.get('/edit/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    delete doc.password
    res.render('admin-user-edit', { user: doc })
  })

  router.post('/edit/refresh-signup-token/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    doc.signupToken = nanoid(SECRET_TOKEN_LENGTH)
    doc.expiry = new Date().getTime() + SECRET_TOKEN_LIFETIME
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/resetpw/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    doc.pwToken = nanoid(SECRET_TOKEN_LENGTH)
    doc.pwExpiry = new Date().getTime() + SECRET_TOKEN_LIFETIME
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/cancelresetpw/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    delete doc.pwToken
    delete doc.pwExpiry
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/rename/:userToRename', verifyAuth(), async (req, res) => {
    if (!req.user.admin && req.user._id !== req.params.userToRename) return res.redirect('/')
    if (!req.body.newUsername) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED'))
      return res.redirect(`/admin-settings/edit/${req.params.userToRename}`)
    }
    if (req.body.newUsername === req.params.userToRename) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_SAME_NAME'))
      return res.redirect(`/admin-settings/edit/${req.params.userToRename}`)
    }

    const oldName = req.params.userToRename
    const newName = req.body.newUsername

    const userDoc = await db.get(oldName)
    userDoc._id = newName
    delete userDoc._rev
    try {
      await db.put(userDoc)
      try {
        const usersBulk = []
        const users = (await db.allDocs({ include_docs: true })).rows
        for (const { doc: user } of users) {
          for (const item of user.wishlist) {
            if (item.pledgedBy === oldName) item.pledgedBy = newName
            if (item.addedBy === oldName) item.addedBy = newName
          }
          usersBulk.push(user)
        }

        await db.bulkDocs(usersBulk)
        await db.remove(await db.get(oldName))

        await _CC.wishlistManager.clearCache()

        req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER'))
        return res.redirect(`/wishlist/${newName}`)
      } catch (error) {
        console.log(error, error.stack)
        await db.remove(await db.get(newName))
        throw error
      }
    } catch (error) {
      req.flash('error', error.message)
      return res.redirect(`/admin-settings/edit/${oldName}`)
    }
  })

  router.post('/edit/impersonate/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    req.login({ _id: req.params.userToEdit }, err => {
      if (err) {
        req.flash('error', err.message)
        return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
      }
      req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS', req.params.userToEdit))
      res.redirect('/')
    })
  })

  router.post('/edit/promote/:userToPromote', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const user = await db.get(req.params.userToPromote)
    if (!user) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND'))
      return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
    }
    if (user.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN'))
      return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
    }

    user.admin = true
    await db.put(user)

    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS', user._id))
    return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
  })

  router.post('/edit/demote/:userToDemote', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    if (req.user._id === req.params.userToDemote) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }

    const user = await db.get(req.params.userToDemote)

    if (!user) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }
    if (!user.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }

    user.admin = false
    await db.put(user)

    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS', user._id))
    return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
  })

  router.post('/edit/remove/:userToRemove', verifyAuth(), async (req, res) => {
    try {
      if (!req.user.admin) return res.redirect('/')

      const userToRemove = await db.get(req.params.userToRemove)
      if (userToRemove.admin) {
        req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN'))
        return res.redirect('/admin-settings')
      }
      await db.remove(userToRemove)

      const { rows } = await db.allDocs()
      for (const row of rows) {
        const wishlist = await _CC.wishlistManager.get(row.id)
        for (const item of wishlist.items) {
          if (item.addedBy === userToRemove._id) {
            await wishlist.remove(item.id)
          } else if (item.pledgedBy === userToRemove._id) {
            await wishlist.unpledge(item.id)
          }
        }
      }

      req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS', req.params.userToRemove))
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect('/admin-settings')
  })

  router.get('/clear-wishlists', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    res.render('admin-clear-wishlists')
  })

  router.post('/clear-wishlists', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const usersBulk = []
    const { rows: users } = await db.allDocs({ include_docs: true })
    for (const { doc: user } of users) {
      user.wishlist = []
      usersBulk.push(user)
    }
    await db.bulkDocs(usersBulk)

    await _CC.wishlistManager.clearCache()

    req.flash('success', _CC.lang('ADMIN_SETTINGS_CLEARDB_SUCCESS'))
    res.redirect('/admin-settings')
  })

  router.get('/groups', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const { rows } = await _CC.groupsDb.allDocs({ include_docs: true })
    const users = await _CC.usersDb.allDocs({ include_docs: true })

    res.render('admin-groups', {
      groups: rows.map(row => row.doc),
      users: users.rows.map(row => row.doc),
      title: _CC.lang('ADMIN_GROUPS_HEADER')
    })
  })

  router.post('/groups/add', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const groupName = req.body.groupName?.trim()
    if (!groupName) {
      req.flash('error', _CC.lang('ADMIN_GROUPS_ADD_ERROR_NAME_EMPTY'))
      return res.redirect('/admin-settings/groups')
    }

    try {
      const groupId = `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      await _CC.groupsDb.put({
        _id: groupId,
        name: groupName,
        members: [],
        created: new Date().toISOString()
      })

      req.flash('success', _CC.lang('ADMIN_GROUPS_ADD_SUCCESS'))
    } catch (error) {
      req.flash('error', error.message)
    }

    res.redirect('/admin-settings/groups')
  })

  router.get('/groups/edit/:groupId', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    try {
      const group = await _CC.groupsDb.get(req.params.groupId)
      const users = await _CC.usersDb.allDocs({ include_docs: true })

      res.render('admin-group-edit', {
        group,
        users: users.rows.map(row => row.doc),
        title: _CC.lang('ADMIN_GROUPS_EDIT_HEADER', group.name)
      })
    } catch (error) {
      req.flash('error', error.message)
      res.redirect('/admin-settings/groups')
    }
  })

  router.post('/groups/edit/:groupId/members', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    try {
      const group = await _CC.groupsDb.get(req.params.groupId)
      const userToAdd = req.body.userId

      if (!group.members.includes(userToAdd)) {
        group.members.push(userToAdd)
        await _CC.groupsDb.put(group)
        req.flash('success', _CC.lang('ADMIN_GROUPS_MEMBER_ADD_SUCCESS'))
      }
    } catch (error) {
      req.flash('error', error.message)
    }

    res.redirect(`/admin-settings/groups/edit/${req.params.groupId}`)
  })

  router.post('/groups/edit/:groupId/members/remove', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    try {
      const group = await _CC.groupsDb.get(req.params.groupId)
      const userToRemove = req.body.userId

      group.members = group.members.filter(id => id !== userToRemove)
      await _CC.groupsDb.put(group)
      req.flash('success', _CC.lang('ADMIN_GROUPS_MEMBER_REMOVE_SUCCESS'))
    } catch (error) {
      req.flash('error', error.message)
    }

    res.redirect(`/admin-settings/groups/edit/${req.params.groupId}`)
  })

  router.post('/groups/delete/:groupId', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    try {
      const group = await _CC.groupsDb.get(req.params.groupId)
      await _CC.groupsDb.remove(group)
      req.flash('success', _CC.lang('ADMIN_GROUPS_DELETE_SUCCESS'))
    } catch (error) {
      req.flash('error', error.message)
    }

    res.redirect('/admin-settings/groups')
  })

  router.get('/couples', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const { rows } = await _CC.couplesDb.allDocs({ include_docs: true })
    const users = await _CC.usersDb.allDocs({ include_docs: true })

    res.render('admin-couples', {
      couples: rows.map(row => row.doc),
      users: users.rows.map(row => row.doc),
      title: _CC.lang('ADMIN_COUPLES_HEADER')
    })
  })

  router.post('/couples/add', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    try {
      const coupleId = nanoid()
      await _CC.couplesDb.put({
        _id: coupleId,
        name: req.body.coupleName.trim(),
        members: [req.body.member1, req.body.member2]
      })
      req.flash('success', _CC.lang('ADMIN_COUPLES_ADD_SUCCESS'))
    } catch (error) {
      req.flash('error', error.message)
    }

    res.redirect('/admin-settings/couples')
  })

  router.post('/couples/delete/:coupleId', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    try {
      const couple = await _CC.couplesDb.get(req.params.coupleId)
      await _CC.couplesDb.remove(couple)
      req.flash('success', _CC.lang('ADMIN_COUPLES_DELETE_SUCCESS'))
    } catch (error) {
      req.flash('error', error.message)
    }

    res.redirect('/admin-settings/couples')
  })

  return router
}
