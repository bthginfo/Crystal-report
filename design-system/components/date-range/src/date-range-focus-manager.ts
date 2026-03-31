/**
 * Date Range Picker - Focus Management System
 *
 * Centralized focus management logic for date-range picker component.
 * Handles all keyboard navigation, tab order, and focus transitions
 * according to WCAG accessibility guidelines.
 *
 * @module DateRangeFocusManager
 */

export type FocusableElement =
    | 'start-input'
    | 'start-icon'
    | 'end-input'
    | 'end-icon'
    | 'shortcuts'
    | 'prev-month-button'
    | 'next-month-button'
    | 'calendar-day'
    | 'ok-button'
    | 'cancel-button'
    | 'outside';

export type CalendarOpenOrigin = 'start-input' | 'start-icon' | 'end-input' | 'end-icon';

export type CalendarNavigationKey =
    | 'ArrowLeft'
    | 'ArrowRight'
    | 'ArrowUp'
    | 'ArrowDown'
    | 'Home'
    | 'End'
    | 'PageUp'
    | 'PageDown';

export interface FocusManagerState {
    calendarOpen: boolean;
    calendarOpenOrigin: CalendarOpenOrigin | null;
    activeField: 'start' | 'end';
    hasShortcuts: boolean;
    hasFooterActions: boolean;
    selectedStartDate: Date | null;
    selectedEndDate: Date | null;
    focusedDate: Date | null;
    rangeSelectionStep: 'selecting-start' | 'selecting-end' | 'complete';
}

export interface FocusTransition {
    from: FocusableElement | null;
    to: FocusableElement;
    reason: 'tab' | 'shift-tab' | 'enter' | 'space' | 'escape' | 'arrow' | 'selection' | 'open' | 'close';
}

export class DateRangeFocusManager {
    private state: FocusManagerState;

    constructor(initialState?: Partial<FocusManagerState>) {
        this.state = {
            calendarOpen: false,
            calendarOpenOrigin: null,
            activeField: 'start',
            hasShortcuts: false,
            hasFooterActions: false,
            selectedStartDate: null,
            selectedEndDate: null,
            focusedDate: null,
            rangeSelectionStep: 'selecting-start',
            ...initialState,
        };
    }

    /**
     * Update the internal state
     */
    public updateState(updates: Partial<FocusManagerState>): void {
        this.state = { ...this.state, ...updates };
    }

    /**
     * Get current state
     */
    public getState(): FocusManagerState {
        return { ...this.state };
    }

    // ============================================================================
    // CASE 1: Tab Navigation When Calendar is Closed
    // ============================================================================

    /**
     * Determines next focus target when tabbing with calendar closed
     */
    public getNextFocusWhenClosed(currentFocus: FocusableElement): FocusableElement {
        const sequence: FocusableElement[] = ['start-input', 'start-icon', 'end-input', 'end-icon', 'outside'];

        const currentIndex = sequence.indexOf(currentFocus);
        if (currentIndex === -1 || currentIndex >= sequence.length - 1) {
            return 'outside';
        }

        return sequence[currentIndex + 1] || 'outside';
    }

    /**
     * Determines previous focus target when shift-tabbing with calendar closed
     */
    public getPreviousFocusWhenClosed(currentFocus: FocusableElement): FocusableElement {
        const sequence: FocusableElement[] = ['start-input', 'start-icon', 'end-input', 'end-icon'];

        const currentIndex = sequence.indexOf(currentFocus);
        if (currentIndex <= 0) {
            return 'outside';
        }

        return sequence[currentIndex - 1] || 'outside';
    }

    // ============================================================================
    // CASE 2 & 3: Open Calendar and Initial Focus
    // ============================================================================

    /**
     * Determines where focus should go when calendar opens
     */
    public getInitialFocusOnOpen(): FocusableElement {
        // Always start at calendar day when opening
        return 'calendar-day';
    }

    /**
     * Determines which date should be focused in the calendar grid
     */
    public getFocusedDateOnOpen(): Date {
        const { activeField, selectedStartDate, selectedEndDate } = this.state;

        // Priority 1: Selected date for the active field
        if (activeField === 'end' && selectedEndDate) {
            return selectedEndDate;
        }
        if (activeField === 'start' && selectedStartDate) {
            return selectedStartDate;
        }

        // Priority 2: Other selected date
        if (selectedEndDate) return selectedEndDate;
        if (selectedStartDate) return selectedStartDate;

        // Priority 3: Today
        return new Date();
    }

    /**
     * Determines which date should be focused after month navigation
     */
    public getFocusedDateAfterMonthChange(newMonthDate: Date): Date {
        const { selectedStartDate, selectedEndDate, activeField, focusedDate } = this.state;

        // Priority 1: Selected date in active field
        if (activeField === 'end' && selectedEndDate) {
            const isSameMonth = this.isSameMonth(selectedEndDate, newMonthDate);
            if (isSameMonth) return selectedEndDate;
        }
        if (activeField === 'start' && selectedStartDate) {
            const isSameMonth = this.isSameMonth(selectedStartDate, newMonthDate);
            if (isSameMonth) return selectedStartDate;
        }

        // Priority 2: Current day if in visible month
        const today = new Date();
        if (this.isSameMonth(today, newMonthDate)) {
            return today;
        }

        // Priority 3: Maintain day number from previous focus
        if (focusedDate) {
            return this.clampDayInMonth(newMonthDate, focusedDate.getDate());
        }

        // Priority 4: 1st of the month
        return new Date(newMonthDate.getFullYear(), newMonthDate.getMonth(), 1);
    }

    // ============================================================================
    // CASE 4 & 5: Tab Navigation Inside Calendar
    // ============================================================================

    /**
     * Gets the tab order sequence when calendar is open
     */
    private getCalendarTabSequence(): FocusableElement[] {
        const sequence: FocusableElement[] = [];

        // Shortcuts come first if present
        if (this.state.hasShortcuts) {
            sequence.push('shortcuts');
        }

        // Navigation buttons
        sequence.push('prev-month-button', 'next-month-button');

        // Calendar grid
        sequence.push('calendar-day');

        // Footer actions at the end
        if (this.state.hasFooterActions) {
            sequence.push('ok-button', 'cancel-button');
        }

        return sequence;
    }

    /**
     * Determines next focus target when tabbing inside open calendar
     */
    public getNextFocusInCalendar(currentFocus: FocusableElement): FocusableElement {
        const sequence = this.getCalendarTabSequence();
        const currentIndex = sequence.indexOf(currentFocus);

        if (currentIndex === -1 || currentIndex >= sequence.length - 1) {
            // Exit calendar - return to end input
            return 'end-input';
        }

        return sequence[currentIndex + 1] || 'end-input';
    }

    /**
     * Determines previous focus target when shift-tabbing inside open calendar
     */
    public getPreviousFocusInCalendar(currentFocus: FocusableElement): FocusableElement {
        const sequence = this.getCalendarTabSequence();
        const currentIndex = sequence.indexOf(currentFocus);

        if (currentIndex <= 0) {
            // Exit calendar backwards - return to start input or shortcuts
            return this.state.hasShortcuts ? 'shortcuts' : 'start-input';
        }

        return sequence[currentIndex - 1] || 'start-input';
    }

    // ============================================================================
    // CASE 6: Shortcut Behavior
    // ============================================================================

    /**
     * Determines focus after shortcut selection
     */
    public getFocusAfterShortcutSelection(): FocusableElement {
        if (this.state.hasFooterActions) {
            // Move to OK button for confirmation
            return 'ok-button';
        }

        // Close calendar and return to end input
        return 'end-input';
    }

    // ============================================================================
    // CASE 7: Range Selection Flow
    // ============================================================================

    /**
     * Determines focus after selecting a date in the calendar
     */
    public getFocusAfterDateSelection(selectedDate: Date, isStartDate: boolean): FocusTransition {
        if (isStartDate) {
            // After selecting start date, stay in calendar for end date selection
            this.state.rangeSelectionStep = 'selecting-end';
            return {
                from: 'calendar-day',
                to: 'calendar-day',
                reason: 'selection',
            };
        }

        // After selecting end date
        this.state.rangeSelectionStep = 'complete';

        if (this.state.hasFooterActions) {
            // Move to OK button for confirmation
            return {
                from: 'calendar-day',
                to: 'ok-button',
                reason: 'selection',
            };
        }

        // Close calendar and return to end input
        return {
            from: 'calendar-day',
            to: 'end-input',
            reason: 'selection',
        };
    }

    // ============================================================================
    // CASE 8: Escape and Focus Recovery
    // ============================================================================

    /**
     * Determines focus target when closing calendar with Escape
     */
    public getFocusAfterEscape(): FocusableElement {
        const { calendarOpenOrigin } = this.state;

        if (calendarOpenOrigin === 'start-input' || calendarOpenOrigin === 'start-icon') {
            return 'start-input';
        }

        return 'end-input';
    }

    /**
     * Determines focus target when closing calendar with OK button
     */
    public getFocusAfterOK(): FocusableElement {
        return 'end-input';
    }

    /**
     * Determines focus target when closing calendar with Cancel button
     */
    public getFocusAfterCancel(): FocusableElement {
        return this.getFocusAfterEscape();
    }

    // ============================================================================
    // CASE 9: Arrow Navigation Across Months
    // ============================================================================

    /**
     * Calculates the next date when navigating with arrow keys
     */
    public getNextDateFromArrowKey(currentDate: Date, key: CalendarNavigationKey, shift: boolean = false): Date {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();

        switch (key) {
            case 'ArrowLeft':
                return new Date(year, month, day - 1);

            case 'ArrowRight':
                return new Date(year, month, day + 1);

            case 'ArrowUp':
                return new Date(year, month, day - 7);

            case 'ArrowDown':
                return new Date(year, month, day + 7);

            case 'Home':
                // First day of current week (Monday)
                return this.getFirstDayOfWeek(currentDate);

            case 'End':
                // Last day of current week (Sunday)
                return this.getLastDayOfWeek(currentDate);

            case 'PageUp':
                if (shift) {
                    // Previous year
                    return new Date(year - 1, month, day);
                }
                // Previous month
                return this.clampDayInMonth(new Date(year, month - 1, 1), day);

            case 'PageDown':
                if (shift) {
                    // Next year
                    return new Date(year + 1, month, day);
                }
                // Next month
                return this.clampDayInMonth(new Date(year, month + 1, 1), day);

            default:
                return currentDate;
        }
    }

    /**
     * Determines if month view should change when navigating to a new date
     */
    public shouldChangeMonthView(currentViewMonth: Date, targetDate: Date): boolean {
        return !this.isSameMonth(currentViewMonth, targetDate);
    }

    /**
     * Gets the month that should be displayed for a given date
     */
    public getMonthViewForDate(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    // ============================================================================
    // Helper Methods
    // ============================================================================

    private isSameMonth(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
    }

    private clampDayInMonth(monthDate: Date, day: number): Date {
        const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
        const clampedDay = Math.min(Math.max(day, 1), daysInMonth);
        return new Date(monthDate.getFullYear(), monthDate.getMonth(), clampedDay);
    }

    private getFirstDayOfWeek(date: Date): Date {
        const dayOfWeek = date.getDay();
        // Assuming Monday (1) is first day of week
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
    }

    private getLastDayOfWeek(date: Date): Date {
        const firstDay = this.getFirstDayOfWeek(date);
        return new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 6);
    }

    // ============================================================================
    // Keyboard Action Handlers
    // ============================================================================

    /**
     * Determines if a key should open the calendar
     */
    public shouldOpenCalendar(key: string, element: FocusableElement): boolean {
        const openTriggerKeys = ['Enter', ' ', 'ArrowDown'];
        const openTriggerElements: FocusableElement[] = ['start-input', 'start-icon', 'end-input', 'end-icon'];

        return openTriggerKeys.includes(key) && openTriggerElements.includes(element);
    }

    /**
     * Determines if a key should close the calendar
     */
    public shouldCloseCalendar(key: string): boolean {
        return key === 'Escape';
    }

    /**
     * Determines if a key should select a date in the calendar
     */
    public shouldSelectDate(key: string, element: FocusableElement): boolean {
        return (key === 'Enter' || key === ' ') && element === 'calendar-day';
    }

    /**
     * Determines if a key is a calendar navigation key
     */
    public isCalendarNavigationKey(key: string): boolean {
        const navKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
        return navKeys.includes(key);
    }

    /**
     * Determines if a key is a shortcut navigation key
     */
    public isShortcutNavigationKey(key: string, element: FocusableElement): boolean {
        return element === 'shortcuts' && (key === 'ArrowUp' || key === 'ArrowDown');
    }

    // ============================================================================
    // State Reset
    // ============================================================================

    /**
     * Reset manager state when calendar closes
     */
    public resetOnClose(): void {
        this.state.calendarOpen = false;
        this.state.calendarOpenOrigin = null;
        this.state.rangeSelectionStep = 'selecting-start';
    }

    /**
     * Reset manager state when calendar opens
     */
    public resetOnOpen(origin: CalendarOpenOrigin): void {
        this.state.calendarOpen = true;
        this.state.calendarOpenOrigin = origin;
        this.state.rangeSelectionStep = this.state.selectedStartDate ? 'selecting-end' : 'selecting-start';
    }
}
