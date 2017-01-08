import { Observable } from "rxjs/Rx";
import {FxRate,Currency} from '../../../model/index';

export class ChartConfig {
    public fxRates$: Observable<Array<FxRate>>;
    public selectedCurrencies$: Observable<Array<Currency>>;

    /**
     * Chart Config
     */
    constructor(fxRates$: Observable<Array<FxRate>>,selectedCurrencies$: Observable<Array<Currency>>) {                    
        this.fxRates$ = fxRates$;
        this.selectedCurrencies$ = selectedCurrencies$;
    }
}