import { environment } from '../environments/environment';

export class ApiControllers {
    public static readonly CURRENCIES: string = 'currencies';
}

export class ApiUrls {
    public static readonly CURRENCIES: string = environment.apiUrl + ApiControllers.CURRENCIES + '/currencies';
}