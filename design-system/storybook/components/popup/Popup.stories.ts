import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsPopup } from '@tuvsud/design-system/popup';
import '@tuvsud/design-system/popup';
import '@tuvsud/design-system/button';

const meta: MetaWithLabel<TsPopup> = {
    title: 'Components/Popup',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Popup is a utility that lets you declaratively anchor “popup” containers to another element.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(active|arrow|flip|shift|hover-bridge)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    decorators: [story => html`<div style="min-height:20px; padding-top:5rem">${story()}</div>`],
    render: args => {
        const popupRef = createRef<TsPopup>();
        return html`
            <ts-popup
                ${ref(popupRef)}
                .anchor=${args.anchor}
                anchor=${ifDefined(args.anchor)}
                .placement=${args.placement}
                placement=${args.placement}
                .strategy=${args.strategy}
                strategy=${args.strategy}
                .distance=${args.distance}
                distance=${args.distance}
                .skidding=${args.skidding}
                skidding=${args.skidding}
                .active=${args.active}
                ?active=${args.active}
                .arrow=${args.arrow}
                ?arrow=${args.arrow}
                .arrowPlacement=${args.arrowPlacement}
                arrow-placement=${ifDefined(args.arrowPlacement)}
                .arrowPadding=${args.arrowPadding}
                arrow-padding=${ifDefined(args.arrowPadding)}
                .flip=${args.flip}
                ?flip=${args.flip}
                .flipFallbackPlacements=${args.flipFallbackPlacements}
                flip-fallback-placements=${ifDefined(args.flipFallbackPlacements)}
                .flipFallbackStrategy=${args.flipFallbackStrategy}
                flip-fallback-strategy=${ifDefined(args.flipFallbackStrategy)}
                .flipBoundary=${args.flipBoundary}
                .flipPadding=${args.flipPadding}
                flip-padding=${ifDefined(args.flipPadding)}
                .shift=${args.shift}
                ?shift=${args.shift}
                .shiftBoundary=${args.shiftBoundary}
                .shiftPadding=${args.shiftPadding}
                shift-padding=${ifDefined(args.shiftPadding)}
                .autoSize=${args.autoSize}
                auto-size=${ifDefined(args.autoSize)}
                .sync=${args.sync}
                sync=${ifDefined(args.sync)}
                .autoSizeBoundary=${args.autoSizeBoundary}
                .autoSizePadding=${args.autoSizePadding}
                auto-size-padding=${ifDefined(args.autoSizePadding)}
                .hoverBridge=${args.hoverBridge}
                ?hover-bridge=${args.hoverBridge}
                .contentBgColor=${args.contentBgColor}
                content-bg-color=${ifDefined(args.contentBgColor)}
            >
                <ts-button
                    slot="anchor"
                    variant="primary"
                    @click=${() => {
                        if (popupRef.value) popupRef.value.active = !popupRef.value.active;
                    }}
                    >Click to Toggle</ts-button
                >
                <div style="padding: 1rem;">
                    <strong>Popup Content</strong><br />
                    <span>This is the popup's content.</span>
                </div>
            </ts-popup>
        `;
    },
    args: {
        anchor: undefined,
        active: false,
        placement: 'top-start',
        strategy: 'absolute',
        distance: 10,
        skidding: 0,
        arrow: true,
        arrowPlacement: 'anchor',
        arrowPadding: 10,
        flip: true,
        flipFallbackPlacements: '',
        flipFallbackStrategy: 'best-fit',
        flipBoundary: undefined,
        flipPadding: 0,
        shift: true,
        shiftBoundary: undefined,
        shiftPadding: 0,
        autoSize: undefined,
        sync: undefined,
        autoSizeBoundary: undefined,
        autoSizePadding: 0,
        hoverBridge: false,
        contentBgColor: '',
    },
    argTypes: {
        popup: { control: false, table: { disable: false }, description: 'Reference to internal popup container.' },
        anchor: {
            control: 'text',
            description: 'Anchor element, id, or VirtualElement. Use slot="anchor" when inside.',
        },
        active: { control: 'boolean', description: 'Activates positioning and shows the popup.' },
        placement: {
            control: 'select',
            options: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'right',
                'right-start',
                'right-end',
                'left',
                'left-start',
                'left-end',
            ],
            description: 'Preferred placement; may change to keep the popup in view.',
        },
        strategy: { control: 'select', options: ['absolute', 'fixed'], description: 'Positioning strategy.' },
        distance: { control: 'number', description: 'Offset distance in pixels from the anchor.' },
        skidding: { control: 'number', description: 'Offset along the anchor in pixels.' },
        arrow: { control: 'boolean', description: 'Attaches an arrow to the popup.' },
        arrowPlacement: {
            control: 'select',
            options: ['start', 'end', 'center', 'anchor'],
            description: 'Arrow alignment.',
        },
        arrowPadding: { control: 'number', description: 'Padding between arrow and popup edges.' },
        flip: { control: 'boolean', description: 'Flip to opposite side to stay in view.' },
        flipFallbackPlacements: { control: 'text', description: 'Space-separated fallback placements.' },
        flipFallbackStrategy: {
            control: 'select',
            options: ['best-fit', 'initial'],
            description: 'Strategy when nothing fits.',
        },
        flipBoundary: { control: false, table: { disable: false }, description: 'Elements used as flip boundary.' },
        flipPadding: { control: 'number', description: 'Padding before flip occurs.' },
        shift: { control: 'boolean', description: 'Shift along axis to keep in view.' },
        shiftBoundary: { control: false, table: { disable: false }, description: 'Elements used as shift boundary.' },
        shiftPadding: { control: 'number', description: 'Padding before shift occurs.' },
        autoSize: {
            control: 'select',
            options: [undefined, 'horizontal', 'vertical', 'both'],
            description: 'Auto-resize to prevent overflow.',
        },
        sync: {
            control: 'select',
            options: [undefined, 'width', 'height', 'both'],
            description: 'Sync size to the anchor.',
        },
        autoSizeBoundary: {
            control: false,
            table: { disable: false },
            description: 'Elements used as auto-size boundary.',
        },
        autoSizePadding: { control: 'number', description: 'Padding before auto-size occurs.' },
        hoverBridge: {
            control: 'boolean',
            description: 'Adds invisible bridge to avoid hover gaps.',
        },
        contentBgColor: {
            control: 'text',
            description: 'Padding before auto-size occurs.',
        },
    },
};

export default meta;
type Story = StoryObjWithLabel<TsPopup>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the popup is inactive and hidden. Click the button to toggle its visibility.',
            },
        },
    },
    args: { active: true },
};

export const WithArrow: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Add an arrow to your popup with the arrow property. It’s usually a good idea to set a distance to make room for the arrow. To adjust the arrow’s color and size, use the `--arrow-color` and `--arrow-size` custom properties, respectively. You can also target the arrow part to add additional styles such as shadows and borders.',
            },
        },
    },
    args: { active: true, arrow: true },
};

export const Placement: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `placement` property to tell the popup the preferred placement of the popup. Note that the actual position will vary to ensure the panel remains in the viewport if you’re using positioning features such as flip and shift.',
            },
        },
    },
    args: { active: true, arrow: true, placement: 'right' },
};
