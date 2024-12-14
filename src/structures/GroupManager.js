export class GroupManager {
    constructor() {
        this.groupsCache = new Map()
    }

    async get(groupId) {
        const cached = this.groupsCache.get(groupId)
        if (cached) return cached

        const group = await Group.new(groupId)
        this.groupsCache.set(groupId, group)
        return group
    }

    async clearCache() {
        this.groupsCache = new Map()
    }

    async getUserGroups(userId) {
        const { rows } = await _CC.groupsDb.allDocs({ include_docs: true })
        return rows
            .filter(row => row.doc.members.includes(userId))
            .map(row => row.id)
    }
}