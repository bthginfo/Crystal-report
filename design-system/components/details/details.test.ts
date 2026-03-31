import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type { TsHideEvent } from '../../utils/events/ts-hide.js';
import type { TsShowEvent } from '../../utils/events/ts-show.js';
import type { TsDetails } from './index.js';
import '@tuvsud/design-system/details';
import { getCssText } from '../../utils/internal/test.js';

describe('<ts-details>', () => {
    describe('accessibility', () => {
        it('should be accessible when closed', async () => {
            const details = await fixture<TsDetails>(html`<ts-details summary="Test"> Test text </ts-details>`);

            await expect(details).to.be.accessible();
        });

        it('should be accessible when open', async () => {
            const details = await fixture<TsDetails>(html`<ts-details open summary="Test">Test text</ts-details>`);

            await expect(details).to.be.accessible();
        });
    });

    it('should be visible with the open attribute', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details open>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.details__body')!;

        expect(parseInt(getComputedStyle(body).height)).to.be.greaterThan(0);
    });

    it.skip('should not be visible without the open attribute', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details summary="click me">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.details__body')!;
        expect(parseInt(getComputedStyle(body).height)).to.equal(0);
    });

    it.skip('should emit ts-show and ts-after-show when calling show()', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();

        el.addEventListener('ts-show', showHandler);
        el.addEventListener('ts-after-show', afterShowHandler);
        el.show();

        await waitUntil(() => showHandler.calledOnce);
        await waitUntil(() => afterShowHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;
    });

    it.skip('should emit ts-hide and ts-after-hide when calling hide()', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details open>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        el.addEventListener('ts-hide', hideHandler);
        el.addEventListener('ts-after-hide', afterHideHandler);
        el.hide();

        await waitUntil(() => hideHandler.calledOnce);
        await waitUntil(() => afterHideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
    });

    it.skip('should emit ts-show and ts-after-show when setting open = true', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.details__body')!;
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();

        el.addEventListener('ts-show', showHandler);
        el.addEventListener('ts-after-show', afterShowHandler);
        el.open = true;

        await waitUntil(() => showHandler.calledOnce);
        await waitUntil(() => afterShowHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.false;
    });

    it.skip('should emit ts-hide and ts-after-hide when setting open = false', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details open>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        el.addEventListener('ts-hide', hideHandler);
        el.addEventListener('ts-after-hide', afterHideHandler);
        el.open = false;

        await waitUntil(() => hideHandler.calledOnce);
        await waitUntil(() => afterHideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
    });

    it.skip('should not open when preventing ts-show', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const showHandler = sinon.spy((event: TsShowEvent) => event.preventDefault());

        el.addEventListener('ts-show', showHandler);
        el.open = true;

        await waitUntil(() => showHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(el.open).to.be.false;
    });

    it.skip('should not close when preventing ts-hide', async () => {
        const el = await fixture<TsDetails>(html`
            <ts-details open>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </ts-details>
        `);
        const hideHandler = sinon.spy((event: TsHideEvent) => event.preventDefault());

        el.addEventListener('ts-hide', hideHandler);
        el.open = false;

        await waitUntil(() => hideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(el.open).to.be.true;
    });

    it('should be the correct size after opening more than one instance', async () => {
        const el = await fixture<TsDetails>(html`
            <div>
                <ts-details>
                    <div style="height: 200px;"></div>
                </ts-details>
                <ts-details>
                    <div style="height: 400px;"></div>
                </ts-details>
            </div>
        `);
        const first = el.querySelectorAll('ts-details')[0] as TsDetails;
        const second = el.querySelectorAll('ts-details')[1] as TsDetails;
        const firstBody = first!.shadowRoot!.querySelector('.details__body')!;
        const secondBody = second!.shadowRoot!.querySelector('.details__body')!;

        await first!.show();
        await second!.show();

        expect(firstBody.clientHeight).to.equal(232); // 200 + 16px + 16px (vertical padding)
        expect(secondBody.clientHeight).to.equal(432); // 400 + 16px + 16px (vertical padding)
    });

    describe('<ts-details> css variables', () => {
        it('uses the correct CSS variables in styles', async () => {
            const el = await fixture<TsDetails>(html`<ts-details></ts-details>`);
            const cssText = getCssText(el);

            // container
            expect(cssText).to.include('border: solid 1px var(--ts-semantic-color-border-base-default);');
            expect(cssText).to.include('border-radius: var(--ts-semantic-size-radius-md);');
            expect(cssText).to.include('background-color: var(--ts-semantic-color-background-base-default);');
            expect(cssText).to.include('color: var(--ts-semantic-color-text-base-default);');
            expect(cssText).to.include('line-height: var(--ts-line-height-600);');

            // header
            expect(cssText).to.include('padding: var(--ts-semantic-size-space-500);');
            expect(cssText).to.include('outline: solid 3px var(--ts-semantic-color-border-primary-focused);');

            // summary icon
            expect(cssText).to.include('transition: var(--ts-semantic-transition-duration-medium) rotate ease;');

            // content
            expect(cssText).to.include('padding: var(--ts-semantic-size-space-500);');
        });
    });
});
