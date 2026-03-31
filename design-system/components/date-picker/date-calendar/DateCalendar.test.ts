import { expect, fixture, html, oneEvent, aTimeout } from '@open-wc/testing';
import { LitElement } from 'lit';
import './date-calendar.component.js';
import '@tuvsud/design-system/date-picker';
import '@tuvsud/design-system/icon-button';

function queryDayButtons(root: ShadowRoot): HTMLButtonElement[] {
    return Array.from(root.querySelectorAll('button[data-date]')) as HTMLButtonElement[];
}

function enabledDayButtons(root: ShadowRoot): HTMLButtonElement[] {
    return queryDayButtons(root).filter(b => !b.disabled && b.getAttribute('aria-disabled') !== 'true');
}

describe('<ts-date-calendar>', () => {
    it('renders a grid of day buttons for the focused month', async () => {
        const focused = new Date(2025, 0, 15); // January 2025
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const days = queryDayButtons(el.shadowRoot!);
        // A full month grid has at least 28 cells (4 weeks) and at most 42 (6 weeks)
        expect(days.length).to.be.greaterThanOrEqual(28);
    });

    it('renders weekday headers', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const headers = el.shadowRoot!.querySelectorAll('.dow span');
        expect(headers.length).to.equal(7);
    });

    it('highlights the selected date', async () => {
        const focused = new Date(2025, 0, 15);
        const selected = new Date(2025, 0, 20);
        const el = await fixture(html`
            <ts-date-calendar
                .focusedDate=${focused}
                .selectedDate=${selected}
                .isDateDisabled=${() => false}
            ></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const btn = el.shadowRoot!.querySelector('button[data-date="2025-01-20"]') as HTMLButtonElement | null;
        expect(btn).to.exist;
        expect(btn!.getAttribute('aria-selected')).to.equal('true');
    });

    it('marks today with a today class or aria-current', async () => {
        const today = new Date();
        const focused = new Date(today.getFullYear(), today.getMonth(), 1);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const btn = el.shadowRoot!.querySelector(`button[data-date="${y}-${m}-${d}"]`) as HTMLButtonElement | null;
        expect(btn).to.exist;
        const isMarked =
            btn!.classList.contains('today') ||
            btn!.getAttribute('aria-current') === 'date' ||
            btn!.closest('.today') !== null;
        expect(isMarked).to.equal(true);
    });

    it('emits ts-date-select when clicking an enabled day', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const enabled = enabledDayButtons(el.shadowRoot!);
        expect(enabled.length).to.be.greaterThan(0);

        const wait = oneEvent(el, 'ts-date-select');
        enabled[0]!.click();
        const ev = await wait;

        expect(ev.detail.value).to.be.instanceOf(Date);
    });

    it('disables days according to isDateDisabled predicate', async () => {
        const focused = new Date(2025, 0, 15);
        // Disable all Sundays
        const isDisabled = (d: Date) => d.getDay() === 0;

        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${isDisabled}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const days = queryDayButtons(el.shadowRoot!);
        const disabledDays = days.filter(b => b.disabled || b.getAttribute('aria-disabled') === 'true');
        expect(disabledDays.length).to.be.greaterThan(0);
    });

    it('disables days outside min/max range', async () => {
        const focused = new Date(2025, 0, 15);
        const min = new Date(2025, 0, 10);
        const max = new Date(2025, 0, 20);

        const el = await fixture(html`
            <ts-date-calendar
                .focusedDate=${focused}
                .min=${min}
                .max=${max}
                .isDateDisabled=${() => false}
            ></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const days = queryDayButtons(el.shadowRoot!);
        const disabledDays = days.filter(b => b.disabled || b.getAttribute('aria-disabled') === 'true');
        expect(disabledDays.length).to.be.greaterThan(0);
    });

    it('emits ts-month-change when clicking the next-month button', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const nextBtn = el.shadowRoot!.querySelector('.next-month') as HTMLElement | null;
        expect(nextBtn).to.exist;

        const wait = oneEvent(el, 'ts-month-change');
        nextBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        const ev = await wait;

        expect(ev.detail.focused).to.be.instanceOf(Date);
    });

    it('emits ts-month-change when clicking the prev-month button', async () => {
        const focused = new Date(2025, 5, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const prevBtn = el.shadowRoot!.querySelector('.prev-month') as HTMLElement | null;
        expect(prevBtn).to.exist;

        const wait = oneEvent(el, 'ts-month-change');
        prevBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        const ev = await wait;

        expect(ev.detail.focused).to.be.instanceOf(Date);
    });

    it('switches to months view when clicking the month selector', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const monthBtn = el.shadowRoot!.querySelector('.selector-btn-month') as HTMLButtonElement | null;
        expect(monthBtn).to.exist;

        monthBtn!.click();
        await (el as LitElement).updateComplete;

        const monthsPanel = el.shadowRoot!.querySelector('.months-panel');
        expect(monthsPanel).to.exist;
    });

    it('switches to years view when clicking the year selector', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const yearBtn = el.shadowRoot!.querySelector('.selector-btn-year') as HTMLButtonElement | null;
        expect(yearBtn).to.exist;

        yearBtn!.click();
        await (el as LitElement).updateComplete;

        const yearsPanel = el.shadowRoot!.querySelector('.years-panel');
        expect(yearsPanel).to.exist;
    });

    it('months view disables months outside min/max bounds', async () => {
        const focused = new Date(2025, 3, 15); // April 2025
        const min = new Date(2025, 2, 1); // March
        const max = new Date(2025, 4, 31); // May

        const el = await fixture(html`
            <ts-date-calendar
                .focusedDate=${focused}
                .min=${min}
                .max=${max}
                .isDateDisabled=${() => false}
            ></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const monthBtn = el.shadowRoot!.querySelector('.selector-btn-month') as HTMLButtonElement;
        monthBtn.click();
        await (el as LitElement).updateComplete;

        const monthsPanel = el.shadowRoot!.querySelector('.months-panel')!;
        const buttons = Array.from(monthsPanel.querySelectorAll('button')) as HTMLButtonElement[];
        const disabled = buttons.filter(b => b.disabled);
        expect(disabled.length).to.be.greaterThan(0);
    });

    it('picks a month from months view and returns to days', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const monthBtn = el.shadowRoot!.querySelector('.selector-btn-month') as HTMLButtonElement;
        monthBtn.click();
        await (el as LitElement).updateComplete;

        const monthsPanel = el.shadowRoot!.querySelector('.months-panel')!;
        const buttons = Array.from(monthsPanel.querySelectorAll('button')) as HTMLButtonElement[];
        const enabled = buttons.find(b => !b.disabled);

        const wait = oneEvent(el, 'ts-month-change');
        enabled!.click();
        await wait;
        await (el as LitElement).updateComplete;

        // Should be back in days view
        const days = queryDayButtons(el.shadowRoot!);
        expect(days.length).to.be.greaterThanOrEqual(28);
    });

    it('picks a year from years view and switches to months', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
        `);
        await (el as LitElement).updateComplete;

        const yearBtn = el.shadowRoot!.querySelector('.selector-btn-year') as HTMLButtonElement;
        yearBtn.click();
        await (el as LitElement).updateComplete;

        const yearsPanel = el.shadowRoot!.querySelector('.years-panel')!;
        const yearButtons = Array.from(yearsPanel.querySelectorAll('button')) as HTMLButtonElement[];
        const enabled = yearButtons.find(b => !b.disabled);

        const wait = oneEvent(el, 'ts-year-change');
        enabled!.click();
        await wait;
        await (el as LitElement).updateComplete;

        // Should be in months view now
        const monthsPanel = el.shadowRoot!.querySelector('.months-panel');
        expect(monthsPanel).to.exist;
    });

    it('does not steal focus from outside when focusedDate changes', async () => {
        const focused = new Date(2025, 0, 15);
        const el = await fixture(html`
            <div>
                <input id="outside" />
                <ts-date-calendar .focusedDate=${focused} .isDateDisabled=${() => false}></ts-date-calendar>
            </div>
        `);

        const outsideInput = el.querySelector('#outside') as HTMLInputElement;
        outsideInput.focus();

        const calendar = el.querySelector('ts-date-calendar') as LitElement;
        (calendar as unknown as { focusedDate: Date }).focusedDate = new Date(2025, 1, 15);
        await calendar.updateComplete;
        await aTimeout(50);

        // Focus should still be on the outside input, not stolen by the calendar
        expect(document.activeElement).to.equal(outsideInput);
    });
});
