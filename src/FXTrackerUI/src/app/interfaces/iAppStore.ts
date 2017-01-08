import {Currency,FxRate} from '../model/index';

export interface IAppStore {

    currencies: Array<Currency>;

    selectedCurrencies: Array<Currency>;

    fxRates: Array<FxRate>;
}
