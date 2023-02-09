export class LeagueEntity {
    private data: Record<string, any>;

    constructor(data: Record<string, any>) {
        this.data = data;
    }

    public setLeagueData() {
        console.log('save on db', this.data);
    }

    public setLeagueTeamsData() {
        console.log('save on db', this.data);
    }
}