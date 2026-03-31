import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsTooltip } from '@tuvsud/design-system/tooltip';
import '@tuvsud/design-system/tooltip';
import '@tuvsud/design-system/button';

const meta = {
    title: 'Components/Tooltip',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tooltips surface helpful, contextual information exactly when users need it—based on their interaction with an element.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) => src.replace(/\s(disabled|hoist|open)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-tooltip
            .content=${args.content}
            content=${ifDefined(args.content || undefined)}
            .placement=${args.placement}
            placement=${args.placement}
            .distance=${args.distance}
            distance=${args.distance}
            .skidding=${args.skidding}
            skidding=${args.skidding}
            .trigger=${args.trigger}
            trigger=${args.trigger}
            .open=${args.open}
            ?open=${args.open}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
        >
            <ts-button variant="primary">Hover Me</ts-button>
        </ts-tooltip>
    `,
    args: {
        content: 'This is a tooltip',
        placement: 'top',
        distance: 8,
        skidding: 0,
        trigger: 'hover focus',
        open: false,
        disabled: false,
        hoist: false,
    },
    argTypes: {
        content: { control: 'text', description: 'The tooltip’s content.' },
        placement: {
            control: 'select',
            options: [
                'top',
                'top-start',
                'top-end',
                'right',
                'right-start',
                'right-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
            ],
            description: 'Preferred placement.',
        },
        distance: { control: 'number', description: 'Offset in pixels from the target.' },
        skidding: { control: 'number', description: 'Skid in pixels along the target.' },
        trigger: {
            control: 'select',
            options: ['hover focus', 'hover', 'focus', 'click', 'manual', 'hover focus click'],
            description: 'How the tooltip is activated.',
        },
        open: { control: 'boolean', description: 'Controls visibility programmatically.' },
        disabled: { control: 'boolean', description: 'Disables the tooltip.' },
        hoist: { control: 'boolean', description: 'Prevents clipping with a fixed strategy.' },
    },
} satisfies MetaWithLabel<TsTooltip>;

export default meta;
type Story = StoryObjWithLabel<TsTooltip>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the tooltip appears on hover and focus at the top of the element.',
            },
        },
    },
    args: { content: 'This is a tooltip' },
};

export const Placement: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `placement` property to set the preferred placement of the tooltip.',
            },
        },
    },
    render: () => html`
        <div
            style="padding: 6rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; align-items: center; justify-items: center;"
        >
            <ts-tooltip content="Top start" placement="top-start"><ts-button>Top Start</ts-button></ts-tooltip>
            <ts-tooltip content="Top" placement="top"><ts-button>Top</ts-button></ts-tooltip>
            <ts-tooltip content="Top end" placement="top-end"><ts-button>Top End</ts-button></ts-tooltip>

            <ts-tooltip content="Left start" placement="left-start"><ts-button>Left Start</ts-button></ts-tooltip>
            <div></div>
            <ts-tooltip content="Right start" placement="right-start"><ts-button>Right Start</ts-button></ts-tooltip>

            <ts-tooltip content="Left" placement="left"><ts-button>Left</ts-button></ts-tooltip>
            <div></div>
            <ts-tooltip content="Right" placement="right"><ts-button>Right</ts-button></ts-tooltip>

            <ts-tooltip content="Left end" placement="left-end"><ts-button>Left End</ts-button></ts-tooltip>
            <div></div>
            <ts-tooltip content="Right end" placement="right-end"><ts-button>Right End</ts-button></ts-tooltip>

            <ts-tooltip content="Bottom start" placement="bottom-start"><ts-button>Bottom Start</ts-button></ts-tooltip>
            <ts-tooltip content="Bottom" placement="bottom"><ts-button>Bottom</ts-button></ts-tooltip>
            <ts-tooltip content="Bottom end" placement="bottom-end"><ts-button>Bottom End</ts-button></ts-tooltip>
        </div>
    `,
};

export const CustomContent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the content slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.',
            },
        },
    },
    render: () => html`
        <div style="padding: 4rem; text-align: center;">
            <ts-tooltip>
                <div slot="content" style="text-align: center;">
                    <strong>Custom Content</strong><br />
                    You can add HTML and style it however you want.
                    <div style="color: var(--ts-core-color-blue-500); font-size: 0.875rem; margin-top: 0.5rem;">
                        ✨ Fancy!
                    </div>
                </div>
                <ts-button variant="primary">Hover for Custom Tooltip</ts-button>
            </ts-tooltip>
        </div>
    `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable the tooltip.',
            },
        },
    },
    args: { content: 'This tooltip is disabled', disabled: true },
};

export const WithDistance: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `distance` property to set a custom distance between the tooltip and the target element.',
            },
        },
    },
    args: { content: 'This tooltip has custom distance', distance: 20 },
};

export const WithSkidding: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `skidding` property to set a custom skidding along the target element.',
            },
        },
    },
    args: { content: 'This tooltip has custom skidding', skidding: 20 },
};

export const WithHtml: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Tooltips can also display HTML content by using the content slot.',
            },
        },
    },
    render: () => html`
        <ts-tooltip>
            <div slot="content">
                <strong>Bold text</strong><br />
                <em>Italic text</em><br />
                <u>Underlined text</u>
            </div>
            <ts-button variant="primary">Hover for HTML Content</ts-button>
        </ts-tooltip>
    `,
};
