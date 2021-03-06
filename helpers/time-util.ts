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
            sameDay: '[danes ob] H:mm',
            nextDay: '[jutri ob] H:mm',
            nextWeek: 'dddd [ob] H:mm',
            lastDay: '[včeraj ob] H:mm',
            lastWeek: 'dddd [ob] H:mm',
            sameElse: 'DD. MM. YYYY ob H:mm'
        });
    }
}
