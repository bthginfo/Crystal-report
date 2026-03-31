import { safeDefine } from '../../utils/helper/safe-define.js';
import { TsDatePicker } from './src/TsDatePicker.js';
import TsDateCalendar from './date-calendar/date-calendar.component.js';
import TsDateInput from './date-input/date-input.component.js';
import TsDateDropdownComponent from './date-dropdown/date-dropdown.component.js';
import TsDateDialogComponent from './date-dialog/date-dialog.component.js';

safeDefine('ts-date-picker', TsDatePicker);
safeDefine('ts-date-calendar', TsDateCalendar);
safeDefine('ts-date-input', TsDateInput);
safeDefine('ts-date-dropdown', TsDateDropdownComponent);
safeDefine('ts-date-dialog', TsDateDialogComponent);

export { TsDatePicker, TsDateCalendar, TsDateInput };
