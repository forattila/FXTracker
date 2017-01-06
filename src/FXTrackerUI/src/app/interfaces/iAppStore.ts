import {Currency,FxRate} from '../model/index';

export interface IAppStore {

    currencies: Array<Currency>;

    fxRates: Array<FxRate>;
}
