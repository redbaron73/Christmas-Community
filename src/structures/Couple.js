export class Couple {
    static async new(coupleId) {
        const instance = new this({ coupleId })
        await instance.fetch()
        return instance
    }

    constructor(opts) {
        this.coupleId = opts.coupleId
    }

    async fetch() {
        try {
            this.doc = await _CC.couplesDb.get(this.coupleId)
        } catch {
            throw new Error(_CC.lang('COUPLE_FETCH_FAIL'))
        }
        this.members = this.doc.members || []
        this.name = this.doc.name
    }

    async save() {
        try {
            const { rev } = await _CC.couplesDb.put(this.doc)
            this.doc._rev = rev
        } catch {
            await this.fetch()
            throw new Error(_CC.lang('COUPLE_CONFLICT'))
        }
    }
}