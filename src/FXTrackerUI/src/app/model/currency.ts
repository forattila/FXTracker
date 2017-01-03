export class Currency {
    public id: string;
    public displayName: string;

    /**
     * Currency type
     */
    constructor(id: string, displayName: string) {
        this.id = id;
        this.displayName = displayName;
    }
}
