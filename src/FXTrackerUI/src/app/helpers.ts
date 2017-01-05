import * as moment from 'moment';

export class DateHelpers {
    public static toLocaleDateString(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    };
}