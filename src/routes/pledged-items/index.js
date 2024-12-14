import verifyAuth from '../../middlewares/verifyAuth.js'
import express from 'express'

export default function ({ db }) {
    const router = express.Router()

    router.get('/', verifyAuth(), async (req, res) => {
        const pledgedItems = []
        const { rows } = await db.allDocs({ include_docs: true })

        for (const row of rows) {
            const items = row.doc.wishlist.filter(item => {
                return item.pledgedBy === req.user._id ||
                    (item.originalPledger === req.user._id && item.anonymousPledge)
            }).map(item => ({
                ...item,
                wishlistOwner: row.doc._id,
                pledgedBy: req.user._id
            }))
            pledgedItems.push(...items)
        }

        res.render('pledged-items', {
            title: _CC.lang('PLEDGED_ITEMS_TITLE'),
            items: pledgedItems
        })
    })

    router.post('/markPurchased/:owner/:itemId', verifyAuth(), async (req, res) => {
        try {
            const wishlist = await _CC.wishlistManager.get(req.params.owner)
            const item = await wishlist.get(req.params.itemId)

            if (item.pledgedBy !== req.user._id) {
                throw new Error(_CC.lang('PLEDGED_ITEMS_NOT_PLEDGED'))
            }

            await wishlist.markPurchased(req.params.itemId)
            req.flash('success', _CC.lang('PLEDGED_ITEMS_MARKED_PURCHASED'))
        } catch (error) {
            req.flash('error', error.message)
        }

        res.redirect('/pledged-items')
    })

    return router
}