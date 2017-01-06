export class ChartData {
    public data: Array<number>;
    public id: string;
    public label: string;

    /**
     * Chart data
     */
    constructor(data: Array<number>, id: string, label: string) {
        this.data = data;
        this.id = id;
        this.label = label;
    }
}