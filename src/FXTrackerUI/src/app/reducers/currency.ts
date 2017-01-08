import {Action} from '@ngrx/store';
import {Currency,FxRate} from '../model/index';
import {CurrencyActions} from './actions';

export const currencies = (state: Array<Currency> = null, action: Action) => {
    switch (action.type) {
        case CurrencyActions.SET_CURRENCIES:
            return action.payload;
        default:
            return state;
    }
};

export const selectedCurrencies = (state: Array<Currency> = [], action: Action) => {
    switch (action.type) {
        case CurrencyActions.SET_SELECTED_CURRENCIES:
            return action.payload;
        case CurrencyActions.ADD_SELECTED_CURRENCY:
            return [...state,action.payload];            
        case CurrencyActions.REMOVE_SELECTED_CURRENCY:
            return state.filter(c=>c.id!==action.payload.id);                        
        default:
            return state;
    }
};

export const fxRates = (state: Array<FxRate> = null, action: Action) => {
    switch (action.type) {
        case CurrencyActions.SET_FXRATES:
            return action.payload;
        default:
            return state;
    }
};

