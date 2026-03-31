import { safeDefine } from '../../utils/helper/safe-define.js';
import { TsDateRange } from './src/TsDateRange.js';
import TsDateCalendarRange from './date-calendar-range/date-calendar-range.component.js';
import TsDateDropdownRangeComponent from './date-dropdown-range/date-dropdown-range.component.js';
import TsDateDialogRangeComponent from './date-dialog-range/date-dialog-range.component.js';
import TsDateInputStart from './date-input-range/date-input-start.component.js';
import TsDateInputEnd from './date-input-range/date-input-end.component.js';
import TsDateCalendarRangeMobile from './date-calendar-range-mobile/date-calendar-range-mobile.component.js';
import TsDateShortcutComponent from './date-shortcuts/date-shortcuts.component.js';

safeDefine('ts-date-range', TsDateRange);
safeDefine('ts-date-calendar-range', TsDateCalendarRange);
safeDefine('ts-date-calendar-range-mobile', TsDateCalendarRangeMobile);
safeDefine('ts-date-input-start', TsDateInputStart);
safeDefine('ts-date-input-end', TsDateInputEnd);
safeDefine('ts-date-dropdown-range', TsDateDropdownRangeComponent);
safeDefine('ts-date-dialog-range', TsDateDialogRangeComponent);
safeDefine('ts-date-shortcuts', TsDateShortcutComponent);

export {
    TsDateRange,
    TsDateCalendarRange,
    TsDateInputStart,
    TsDateInputEnd,
    TsDateDropdownRangeComponent,
    TsDateDialogRangeComponent,
    TsDateShortcutComponent,
};
