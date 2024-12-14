export class CoupleManager {
    constructor() {
        this.couplesCache = new Map()
    }

    async get(coupleId) {
        const cached = this.couplesCache.get(coupleId)
        if (cached) return cached

        const couple = await Couple.new(coupleId)
        this.couplesCache.set(coupleId, couple)
        return couple
    }

    async clearCache() {
        this.couplesCache = new Map()
    }

    async getUserCouple(userId) {
        const { rows } = await _CC.couplesDb.allDocs({ include_docs: true })
        return rows.find(row => row.doc.members.includes(userId))?.doc
    }
}