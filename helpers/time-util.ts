import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/sl';

dayjs.locale('sl');
dayjs.extend(relativeTime)
dayjs.extend(calendar)

export namespace TimeUtil {
    export function toHumanTime(time: string) {
        return dayjs(time).calendar(null, {
            sameDay: '[Danes ob] HH:mm',
            nextDay: '[Jutri ob] HH:mm',
            nextWeek: 'dddd [ob] HH:mm',
            lastDay: '[Včeraj ob] HH:mm',
            lastWeek: '[] dddd [ob] HH:mm',
            sameElse: 'DD. MM. YYYY ob HH:mm'
        });
    }
}
