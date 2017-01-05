import {Action} from '@ngrx/store';
import {Currency} from '../model/index';
import {CurrencyActions} from './actions';

export const currencies = (state: Array<Currency> = null, action: Action) => {
    switch (action.type) {
        case CurrencyActions.SET_CURRENCIES:
            return action.payload;
        default:
            return state;
    }
};