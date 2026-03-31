import { expect, fixture, html } from '@open-wc/testing';
import type { TsRadio } from './index.js';
import type { TsRadioGroup } from '../radio-group/index.js';
import '@tuvsud/design-system/radio';
import '@tuvsud/design-system/radio-group';
import { getCssText } from '../../utils/internal/test.js';

describe('radio component <ts-radio>', () => {
    it('should not get checked when disabled', async () => {
        const radioGroup = await fixture<TsRadioGroup>(html`
            <ts-radio-group value="1">
                <ts-radio id="radio-1" value="1"></ts-radio>
                <ts-radio id="radio-2" value="2" disabled></ts-radio>
            </ts-radio-group>
        `);
        const radio1 = radioGroup.querySelector<TsRadio>('#radio-1')!;
        const radio2 = radioGroup.querySelector<TsRadio>('#radio-2')!;

        radio2.click();
        await Promise.all([radio1.updateComplete, radio2.updateComplete]);

        expect(radio1.checked).to.be.true;
        expect(radio2.checked).to.be.false;
    });

    describe('<ts-radio> css variables', () => {
        it('uses the correct CSS variables in styles', async () => {
            const el = await fixture<TsRadio>(html`<ts-radio></ts-radio>`);
            const cssText = getCssText(el);

            // radio font + color
            expect(cssText).to.include(
                'font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;',
            );
            expect(cssText).to.include('font-size: var(--ts-semantic-typography-ui-font-size-md);');
            expect(cssText).to.include('font-weight: var(--ts-semantic-typography-font-weight-medium);');
            expect(cssText).to.include('color: var(--ts-semantic-color-text-base-default);');

            // size modifiers
            expect(cssText).to.include('--toggle-size: 0.875rem;');
            expect(cssText).to.include('--toggle-size: 1.125rem;');
            expect(cssText).to.include('--toggle-size: 1.375rem;');

            // control styling
            expect(cssText).to.include(
                'border: solid var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-base-default);',
            );
            expect(cssText).to.include('border-radius: 50%;');
            expect(cssText).to.include('background-color: var(--ts-semantic-color-background-base-default);');

            // hover + checked states
            expect(cssText).to.include('border-color: var(--ts-semantic-color-border-base-hover);');
            expect(cssText).to.include('background-color: var(--ts-semantic-color-background-base-hover);');
            expect(cssText).to.include('border-color: var(--ts-semantic-color-border-primary-default);');
            expect(cssText).to.include('background-color: var(--ts-semantic-color-background-primary-default);');
            expect(cssText).to.include('border-color: var(--ts-semantic-color-border-primary-hover);');
            expect(cssText).to.include('background-color: var(--ts-semantic-color-background-primary-hover);');

            // label styling
            expect(cssText).to.include('color: var(--ts-semantic-color-text-base-default);');
            expect(cssText).to.include('line-height: var(--toggle-size);');
        });
    });
});
