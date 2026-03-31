import { expect, fixture, html, oneEvent, aTimeout } from '@open-wc/testing';
import '@tuvsud/design-system/date-range';
import '@tuvsud/design-system/input';
import '@tuvsud/design-system/dropdown';
import '@tuvsud/design-system/dialog';

import { LitElement } from 'lit';
import TsDateRangeComponent from './src/date-range.component.js';

async function waitForElement(root: ParentNode, selector: string, timeout = 1500): Promise<unknown> {
    const start = Date.now();
    let found: unknown = root.querySelector(selector);
    while (!found && Date.now() - start < timeout) {
        await aTimeout(50);
        found = root.querySelector(selector);
    }
    if (!found) throw new Error(`Element not found: ${selector}`);
    return found;
}

async function getInnerParts(host: HTMLElement): Promise<{
    container: Element;
    cRoot: ShadowRoot;
    startInput: Element;
    startField: HTMLInputElement;
    iconButton: Element;
    popup: Element | null;
}> {
    const root = host.shadowRoot as ShadowRoot;

    const dialog = root.querySelector('ts-date-dialog-range');
    const dropdown = root.querySelector('ts-date-dropdown-range');

    let container: Element;

    if (dialog instanceof Element) {
        await (dialog as LitElement).updateComplete;
        container = dialog;
    } else if (dropdown instanceof Element) {
        await (dropdown as LitElement).updateComplete;
        container = dropdown;
    } else {
        throw new Error('No dialog or dropdown rendered');
    }

    const cRoot = container.shadowRoot as ShadowRoot;

    const startInput = (await waitForElement(cRoot, 'ts-date-input-start')) as Element;
    await (startInput as LitElement).updateComplete;

    const siRoot = startInput.shadowRoot as ShadowRoot;

    const tsInput = (await waitForElement(siRoot, 'ts-input')) as Element;
    await (tsInput as LitElement).updateComplete;

    const sri = tsInput.shadowRoot as ShadowRoot;

    const startField = (await waitForElement(sri, 'input')) as HTMLInputElement;

    const iconButton = (await waitForElement(cRoot, 'ts-icon-button')) as Element;

    const popup = cRoot.querySelector('ts-dropdown, ts-dialog') as Element | null;

    return { container, cRoot, startInput, startField, iconButton, popup };
}

function isExpanded(el: Element | null): boolean {
    if (!el) return false;
    const host = el.closest('ts-date-input-start') as Element | null;
    if (!host) return false;
    return host.getAttribute('aria-expanded') === 'true';
}

async function openRangePickerAndGetCalendars(picker: HTMLElement): Promise<{ calendar: Element; csr: ShadowRoot }> {
    const parts = await getInnerParts(picker);
    const iconButton = parts.iconButton as Element;
    const cRoot = parts.cRoot as ShadowRoot;

    iconButton.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await aTimeout(200);

    const calendar = (await waitForElement(cRoot, 'ts-date-calendar-range, ts-date-calendar-range-mobile')) as Element;

    await (calendar as LitElement).updateComplete;

    return { calendar, csr: calendar.shadowRoot as ShadowRoot };
}

function queryCalendarDays(csr: ShadowRoot): Element[] {
    const cells = Array.from(csr.querySelectorAll('button, [role="gridcell"] button, [part~="day"] button'));
    const grid = csr.querySelector('[role="grid"]') || csr.querySelector('.grid') || csr;
    return Array.from(new Set(cells.filter(btn => grid.contains(btn))));
}

function enabledButtons(btns: Element[]): Element[] {
    return btns.filter(btn => !btn.hasAttribute('disabled') && btn.getAttribute('aria-disabled') !== 'true');
}

describe('<ts-date-range>', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
            }),
        });
    });

    it('formats correctly with "de" locale', async () => {
        const el = await fixture<TsDateRangeComponent>(
            html`<ts-date-range locale="de" value-start="01.01.2025" value-end="10.01.2025"></ts-date-range>`,
        );
        await (el as LitElement).updateComplete;
        expect(el.valueStart).to.equal('01.01.2025');
        expect(el.valueEnd).to.equal('10.01.2025');
    });

    it.skip('emits ts-date-start-change when typing start field', async () => {
        const el = await fixture<TsDateRangeComponent>(html`<ts-date-range locale="en"></ts-date-range>`);
        await (el as LitElement).updateComplete;
        const { startField } = await getInnerParts(el);
        const wait = oneEvent(el, 'ts-date-start-change');
        startField!.value = '02/03/2025';
        startField.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        const ev = await wait;
        expect(Boolean(ev)).to.equal(true);
        expect(el.valueStart).to.equal('02/03/2025');
    });

    it.skip('opens calendar popup and updates aria-expanded', async () => {
        const el = await fixture<TsDateRangeComponent>(
            html`<ts-date-range locale="en" value-start="2025-01-01"></ts-date-range>`,
        );
        await (el as LitElement).updateComplete;
        const first = await getInnerParts(el);
        const before = isExpanded(first.startInput as Element);
        (first.iconButton as Element).dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await aTimeout(200);
        const after = isExpanded((await getInnerParts(el)).startInput as Element);
        expect(after).to.not.equal(before);
    });

    it('renders days after opening the calendar', async () => {
        const el = await fixture<TsDateRangeComponent>(
            html`<ts-date-range locale="en" value-start="2025-01-15"></ts-date-range>`,
        );
        await (el as LitElement).updateComplete;
        const { csr } = await openRangePickerAndGetCalendars(el);
        const days = queryCalendarDays(csr);
        expect(days.length >= 28).to.equal(true);
    });

    it.skip('selects start then end date and emits ts-date-range-change', async () => {
        const el = await fixture<TsDateRangeComponent>(html`<ts-date-range locale="en"></ts-date-range>`);
        await (el as LitElement).updateComplete;
        const { csr } = await openRangePickerAndGetCalendars(el);
        const all = enabledButtons(queryCalendarDays(csr));
        const first = all[0];
        const last = all[all.length - 1];
        const wait = oneEvent(el, 'ts-date-range-change');
        first!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        last!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        const ev = await wait;
        expect(Boolean(ev.detail.start)).to.equal(true);
        expect(Boolean(ev.detail.end)).to.equal(true);
    });

    it.skip('emits ts-date-preset-select when clicking shortcut', async () => {
        const el = await fixture<TsDateRangeComponent>(
            html`<ts-date-range locale="en" .shortcuts=${[0, 1, 2]}></ts-date-range>`,
        );
        await (el as LitElement).updateComplete;
        const { cRoot } = await getInnerParts(el);
        const tag = cRoot.querySelector('ts-tag') as Element | null;
        if (!tag) throw new Error('Shortcut missing');
        const wait = oneEvent(el, 'ts-date-preset-select');
        tag.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        const ev = await wait;
        expect(Boolean(ev.detail.preset)).to.equal(true);
    });

    it.skip('navigates months and emits ts-month-change', async () => {
        const el = await fixture<TsDateRangeComponent>(html`<ts-date-range locale="en"></ts-date-range>`);
        await (el as LitElement).updateComplete;
        const { csr } = await openRangePickerAndGetCalendars(el);
        const prev = csr.querySelector('ts-icon-button[name="arrow_back_ios"]');
        const next = csr.querySelector('ts-icon-button[name="arrow_forward_ios"]');
        const w1 = oneEvent(el, 'ts-month-change');
        prev?.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await w1;
        const w2 = oneEvent(el, 'ts-month-change');
        next?.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        const ev2 = await w2;
        expect(Boolean(ev2.detail.focused)).to.equal(true);
    });
});
