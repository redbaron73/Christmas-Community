export class Group {
    static async new(groupName) {
        const groupId = `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const instance = new this({ groupId })
        instance.doc = {
            _id: groupId,
            name: groupName,
            members: [],
            created: new Date().toISOString()
        }
        await instance.save()
        return instance
    }

    constructor(opts) {
        this.groupId = opts.groupId
    }

    async fetch() {
        try {
            this.doc = await _CC.groupsDb.get(this.groupId)
        } catch {
            throw new Error(_CC.lang('GROUP_FETCH_FAIL'))
        }
        this.members = this.doc.members || []
        this.name = this.doc.name
    }

    async save() {
        try {
            const { rev } = await _CC.groupsDb.put(this.doc)
            this.doc._rev = rev
        } catch {
            await this.fetch()
            throw new Error(_CC.lang('GROUP_CONFLICT'))
        }
    }

    async addMember(userId) {
        if (!this.members.includes(userId)) {
            this.members.push(userId)
            await this.save()
        }
    }

    async removeMember(userId) {
        const index = this.members.indexOf(userId)
        if (index > -1) {
            this.members.splice(index, 1)
            await this.save()
        }
    }
}