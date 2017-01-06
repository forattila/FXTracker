export class FxRate {
    public id:string;
    public date: Date;
    public rate: number;

    /**
     * FX Rate
     */
    constructor(id:string, date:Date, rate:number) {        
        this.id=id;
        this.date=date;
        this.rate=rate;
    }
}