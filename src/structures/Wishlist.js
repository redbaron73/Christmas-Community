import getProductData from 'get-product-name'
import u64 from 'u64'

export class Wishlist {
  static async new(username) {
    const instance = new this({ username })
    await instance.fetch()
    return instance
  }

  constructor(opts) {
    this.username = opts.username
  }

  async fetch() {
    try {
      this.doc = await _CC.usersDb.get(this.username)
    } catch {
      throw new Error(_CC.lang('WISHLIST_FETCH_FAIL'))
    }
    this.items = this.doc.wishlist
  }

  async save() {
    try {
      const { rev } = await _CC.usersDb.put(this.doc)
      this.doc._rev = rev
    } catch {
      await this.fetch()
      throw new Error(_CC.lang('WISHLIST_CONFLICT'))
    }
  }

  async get(id) {
    const item = this.items.find(item => item.id === id)
    if (!item) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))
    return item
  }

  async itemsVisibleToUser(username) {
    const addedBySelfAtTop = async (items) => {
      return [
        ...items.filter(item => item.addedBy === username),
        ...items.filter(item => item.addedBy !== username)
      ]
    }

    if (this.username === username) {
      const ownItems = this.items.filter(item => item.addedBy === username)

      ownItems.forEach(item => {
        item.pledgedBy = undefined
        item.anonymousPledge = undefined
        item.purchased = undefined
      })

      return ownItems
    }

    const userGroups = await this.getUserGroups(username)
    const ownerGroups = await this.getUserGroups(this.username)
    const sharedGroup = userGroups.some(g => ownerGroups.includes(g))

    if (!sharedGroup) {
      return []
    }

    const ownerCouple = await _CC.coupleManager.getUserCouple(this.username)
    const viewerCouple = await _CC.coupleManager.getUserCouple(username)

    const visibleItems = [...this.items]

    if (ownerCouple) {
      visibleItems.forEach(item => {
        if (item.forCouple && ownerCouple.members.includes(username)) {
          item.hidden = true
        }

        if (item.forCouple && !ownerCouple.members.includes(username)) {
          item.forCouple = true
          item.coupleNames = ownerCouple.members.join(' & ')
        }
      })
    }

    visibleItems.forEach(item => {
      if (item.anonymousPledge) {
        if (item.originalPledger === username) {
          item.pledgedBy = username
        } else if (this.username === username || item.addedBy === username) {
          item.pledgedBy = 'anonymous'
        } else {
          item.pledgedBy = 'anonymous'
        }
      }
    })

    const filteredItems = visibleItems.filter(item => !item.hidden)
    return await addedBySelfAtTop(filteredItems)
  }

  async getUserGroups(username) {
    const { rows } = await _CC.groupsDb.allDocs({ include_docs: true })
    return rows
      .filter(row => row.doc.members.includes(username))
      .map(row => row.doc._id)
  }

  async add({ itemUrlOrName, suggest, note, addedBy, forCouple = false }) {
    if (!itemUrlOrName) {
      throw new Error(_CC.lang('WISHLIST_URL_REQUIRED'))
    }

    const item = {}

    const nonFatalErrors = []

    const potentialUrl = itemUrlOrName.split(' ').pop()
    const url = parseURL(potentialUrl)
    let productData
    try {
      if (url) productData = await getProductData(url, _CC.config.proxyServer)
    } catch (err) {
      nonFatalErrors.push(err.toString())
    }

    item.id = u64.encode(new Date().getTime().toString())
    item.name = (productData ? productData.name : '')
    item.price = productData?.price
    item.image = productData?.image
    item.addedBy = addedBy
    item.pledgedBy = (addedBy === this.username || suggest ? undefined : addedBy)
    item.note = note
    item.forCouple = forCouple

    if (url) item.url = url
    if (!url) item.name = itemUrlOrName

    item.forCouple = forCouple
    item.anonymousPledge = false
    item.purchased = false

    this.items.push(item)
    await this.save()

    return { nonFatalErrors }
  }

  async remove(id) {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))
    this.items.splice(index, 1)
    await this.save()
  }

  async pledge(id, user, anonymous = false) {
    const item = await this.get(id)
    item.pledgedBy = user
    item.anonymousPledge = anonymous
    if (anonymous) {
      item.originalPledger = user
    }
    item.purchased = false
    await this.save()
  }

  async markPurchased(id) {
    const item = await this.get(id)
    item.purchased = true
    await this.save()
  }

  async unpledge(id) {
    const item = await this.get(id)
    item.pledgedBy = undefined
    item.anonymousPledge = false
    item.originalPledger = undefined
    await this.save()
  }

  async move(id, places) {
    if (places === 0) throw new Error('places should never be 0')

    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))

    while (this.items[index + places] && this.items[index + places].addedBy !== this.username) {
      if (places < 0) {
        places--
      } else {
        places++
      }
    }
    if (index < 0 || index >= this.items.length || index + places < 0 || index + places >= this.items.length) {
      throw new Error(_CC.lang('WISHLIST_MOVE_INVALID'))
    }

    const item = this.items.splice(index, 1)[0]
    this.items.splice(index + places, 0, item)
    await this.save()
  }

  async moveTop(id) {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))

    const item = this.items.splice(index, 1)[0]
    this.items.unshift(item)
    await this.save()
  }

  async moveBottom(id) {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))

    const item = this.items.splice(index, 1)[0]
    this.items.push(item)
    await this.save()
  }

  async setItemData(id, data) {
    const item = await this.get(id)

    for (const key of [
      'name', 'note', 'url', 'price', 'image'
    ]) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        throw new Error(_CC.lang('NOTE_MISSING_PROP', key))
      }
      item[key] = data[key]
    }

    await this.save()
  }

  async refreshItemData(id) {
    const item = await this.get(id)

    if (!item.url) {
      throw new Error(_CC.lang('WISHLIST_REFRESH_NO_URL'))
    }

    const productData = await getProductData(item.url)
    if (!productData) return // short-circuit when there's no data

    for (const key of ['name', 'price', 'image']) {
      if (productData[key]) item[key] = productData[key]
    }

    await this.save()
  }
}

function parseURL(string) {
  try {
    const url = new URL(string)
    if (_CC.config.wishlist.smile) {
      if (url.hostname === 'www.amazon.com') url.hostname = 'smile.amazon.com'
    }
    if (url) return url
  } catch { }
}
