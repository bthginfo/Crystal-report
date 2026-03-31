import { html, nothing, type TemplateResult } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsCard } from '@tuvsud/design-system/card';
import '@tuvsud/design-system/card';
import '@tuvsud/design-system/button';

type TsCardArgs = TsCard & {
    header?: string;
    content: string | TemplateResult;
    footer?: string | TemplateResult;
    showDivider?: boolean;
    href?: string;
    target?: string;
    nopopper?: boolean;
};

const meta = {
    title: 'Components/Card',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Card is a flexible container used to group related content and actions in a visually distinct block. It supports multiple slots for structured content and optional media.',
            },
        },
    },
    args: {
        content: 'This is the card content',
        header: 'This is the card header',
        footer: 'This is the card footer',
        showDivider: true,
        href: '',
        target: '',
        nopopper: false,
    },
    argTypes: {
        header: {
            control: 'text',
            description: 'Optional header content displayed in the card header slot.',
        },
        content: {
            control: 'text',
            description: 'Main content of the card.',
        },
        footer: {
            control: 'text',
            description: 'Optional footer content displayed in the card footer slot.',
        },
        showDivider: {
            control: 'boolean',
            description: 'Shows or hides dividers between card sections.',
        },
        href: {
            control: 'text',
            description: 'Makes the card clickable and navigates to the provided URL.',
        },
        target: {
            control: 'text',
            description: 'Specifies where the linked URL is opened when href is set.',
        },
        nopopper: {
            control: 'boolean',
            description: 'Disables the popper behavior when the card is clickable.',
        },
    },

    render: args => html`
        <ts-card
            .showDivider=${args.showDivider}
            show-divider=${args.showDivider ? nothing : 'false'}
            href=${args.href || nothing}
            target=${args.target || nothing}
            ?nopopper=${args.nopopper}
        >
            ${args.header ? html`<div slot="header">${args.header}</div>` : nothing} ${args.content}
            ${args.footer ? html`<div slot="footer">${args.footer}</div>` : nothing}
        </ts-card>
    `,
} satisfies MetaWithLabel<TsCardArgs>;

export default meta;
type Story = StoryObjWithLabel<TsCardArgs>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A basic card with header, content, and footer sections.',
            },
        },
    },
    args: { content: 'This is a basic card with just content.', showDivider: true },
};

export const CardWithContent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Cards can contain various types of content, including text and icons.',
            },
        },
    },
    render: args => html`
        <ts-card
            .showDivider=${args.showDivider}
            show-divider=${args.showDivider ? nothing : 'false'}
            href=${args.href || nothing}
            target=${args.target || nothing}
            ?nopopper=${args.nopopper}
        >
            <div style="display: flex; justify-content: space-between; width: 200px">
                <div>Card content!</div>
                <ts-icon name="home"></ts-icon>
            </div>
        </ts-card>
    `,
};

export const CardWithImage: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The card component supports image sections using slots. This means you can insert <img> tag into image area. To do so, simply assign the appropriate slot attribute: slot="image"',
            },
        },
    },
    args: {
        footer: html`<ts-button variant="primary">Primary</ts-button>`,
        showDivider: true,
    },
    render: args => html`
        <ts-card
            .showDivider=${args.showDivider}
            show-divider=${args.showDivider ? nothing : 'false'}
            href=${args.href || nothing}
            target=${args.target || nothing}
            ?nopopper=${args.nopopper}
        >
            <img slot="image" src="/assets/cat.avif" alt="A kitten" />
            ${args.content}
            <div slot="footer">${args.footer}</div>
        </ts-card>
    `,
};

export const ClickableCard: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The card component supports a clickable feature, allowing the entire card to act as a clickable area when an `href` property is provided. Users can click anywhere on the card to navigate to the specified link, while any buttons or anchor tags inside the card maintain their own default behavior.',
            },
        },
    },
    args: {
        header: 'Clickable Card',
        content: 'Click anywhere on this card.',
        footer: 'Opens in new tab',
        href: 'https://tuvsud.com',
        target: '_blank',
        nopopper: true,
    },
};

export const ClickableWithControls: Story = {
    parameters: {
        docs: {
            description: {
                story: 'In this example, the card is clickable, but it also contains inner controls (buttons) that have their own actions. Clicking on the card will navigate to the specified link, while clicking on the buttons will trigger their respective actions without navigating away.',
            },
        },
    },
    args: {
        header: 'Clickable Card With Inner Controls',
        href: 'https://tuvsud.com',
        target: '_blank',
        nopopper: true,
        footer: html` <ts-button variant="primary" @click=${() => console.log('Footer button clicked')}>
            Footer Button
        </ts-button>`,
        content: html`
            <p>The card is clickable, but these controls use their own actions.</p>
            <ts-button @click=${() => console.log('Inner button clicked')}>Inner Button</ts-button>
        `,
    },
};
