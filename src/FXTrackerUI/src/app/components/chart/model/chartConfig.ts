import { Observable } from "rxjs/Rx";
import {FxRate} from '../../../model/index';

export class ChartConfig {
    public fxRates$: Observable<Array<FxRate>>;

    /**
     * Chart Config
     */
    constructor(fxRates$: Observable<Array<FxRate>>) {                    
        this.fxRates$ = fxRates$;
    }
}