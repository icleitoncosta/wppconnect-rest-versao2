export class SessionService {
    declare session?;
    constructor(session?: string) {
        this.session = session;
    }

    public create(req: Express.Request) {
        
    }
}