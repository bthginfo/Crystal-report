import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsLink } from '@tuvsud/design-system/link';
import '@tuvsud/design-system/link';

const meta = {
    title: 'Components/Link',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Links navigate users to another resource. This component renders a native <a> element and supports size, variant, and common anchor attributes.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src
                        .replace(/\s(rel|download)=""(?=[\s>])/g, '')
                        .replace(/\s(disabled|underline|visited-color)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-link
            variant=${args.variant}
            size=${args.size}
            href=${ifDefined(args.href)}
            target=${ifDefined(args.target)}
            rel=${ifDefined(args.rel)}
            download=${ifDefined(args.download)}
            ?visited-color=${args.visitedColor}
            .visited-color=${args.visitedColor}
            ?underline=${args.underline}
            .underline=${args.underline}
            ?disabled=${args.disabled}
            .disabled=${args.disabled}
        >
            ${args.label}
        </ts-link>
    `,
    args: {
        variant: 'primary',
        size: 'medium',
        label: 'Link',
        href: 'https://www.tuvsud.com/de',
        target: undefined,
        rel: '',
        download: '',
        visitedColor: true,
        underline: true,
        disabled: false,
    },
    argTypes: {
        variant: {
            control: 'select',
            description: 'Visual style of the link.',
            options: ['secondary', 'primary', 'inverted-text'],
        },
        size: {
            control: 'select',
            description: 'Controls the link’s size (font-size and spacing).',
            options: ['small', 'medium', 'large'],
        },
        label: {
            control: 'text',
            description: 'Text displayed for the link.',
        },
        href: {
            control: 'text',
            description: 'Destination URL of the link.',
        },
        target: {
            control: 'select',
            description:
                'Where to open the linked document. When set to `_blank`, the component will ensure `rel` includes `noopener` and `noreferrer`.',
            options: [undefined, '_self', '_blank', '_parent', '_top'],
        },
        rel: {
            control: 'text',
            description:
                'Specifies the relationship between the current document and the linked document. When `target="_blank"`, the component adds `noopener noreferrer` automatically (and preserves any provided values).',
        },
        download: {
            control: 'text',
            description:
                'When set, clicking the link downloads the resource instead of navigating. If a value is provided, it will be used as the suggested filename.',
        },
        visitedColor: {
            control: 'boolean',
            description:
                'When true, the link can show a different color for the `:visited` state. When false, visited styling is disabled.',
        },
        underline: {
            control: 'boolean',
            description: 'When true, the link is underlined. When false, the underline is removed.',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the link and prevents interaction.',
        },
    },
} satisfies MetaWithLabel<TsLink>;

export default meta;
type Story = StoryObjWithLabel<TsLink>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default link variant is `primary`.',
            },
        },
    },
    args: {
        variant: 'primary',
        label: 'Primary link',
    },
};

export const Secondary: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The `secondary` variant is used for less prominent links.',
            },
        },
    },
    args: {
        variant: 'secondary',
        label: 'Secondary link',
    },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disables the link, preventing user interaction and indicating its inactive state.',
            },
        },
    },
    args: {
        disabled: true,
        label: 'Disabled link',
    },
};

export const BlankTarget: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Opens in a new tab. The component should ensure rel includes noopener/noreferrer when target="_blank".',
            },
        },
    },
    args: {
        label: 'Open in new tab',
        target: '_blank',
    },
};

export const NoUnderline: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disables the underline. Useful when the surrounding UI already communicates “clickable”.',
            },
        },
    },
    args: {
        label: 'No underline',
        underline: false,
    },
};

export const NoVisitedColor: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disables `:visited` styling so the link color stays consistent after navigation.',
            },
        },
    },
    args: {
        label: 'Visited color disabled',
        visitedColor: false,
    },
};

export const Download: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Sets the native anchor `download` attribute. The browser will download the resource instead of navigating.',
            },
        },
    },
    args: {
        label: 'Download file',
        href: '/assets/example.pdf',
        download: '',
    },
};

export const Sizes: Story = {
    parameters: {
        controls: { exclude: ['size', 'label'] },
        docs: {
            description: {
                story: 'Links are available in three sizes: small, medium, and large.',
            },
        },
    },
    render: args => html`
        <div style="display:flex; gap: 16px; align-items:center; flex-wrap:wrap;">
            <ts-link
                variant=${args.variant}
                size="small"
                href=${ifDefined(args.href)}
                target=${ifDefined(args.target)}
                rel=${ifDefined(args.rel)}
                download=${ifDefined(args.download)}
                ?visited-color=${args.visitedColor}
                ?underline=${args.underline}
                ?disabled=${args.disabled}
            >
                Small
            </ts-link>

            <ts-link
                variant=${args.variant}
                size="medium"
                href=${ifDefined(args.href)}
                target=${ifDefined(args.target)}
                rel=${ifDefined(args.rel)}
                download=${ifDefined(args.download)}
                ?visited-color=${args.visitedColor}
                ?underline=${args.underline}
                ?disabled=${args.disabled}
            >
                Medium
            </ts-link>

            <ts-link
                variant=${args.variant}
                size="large"
                href=${ifDefined(args.href)}
                target=${ifDefined(args.target)}
                rel=${ifDefined(args.rel)}
                download=${ifDefined(args.download)}
                ?visited-color=${args.visitedColor}
                ?underline=${args.underline}
                ?disabled=${args.disabled}
            >
                Large
            </ts-link>
        </div>
    `,
    args: {
        variant: 'primary',
        href: 'https://www.tuvsud.com/en',
        visitedColor: true,
        underline: true,
        disabled: false,
    },
};

export const InvertedText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the inverted-text variant when placing links on dark backgrounds.',
            },
        },
        backgrounds: { default: 'dark' },
    },
    args: {
        variant: 'inverted-text',
        label: 'Inverted text link',
    },
    render: args => html`
        <div
            style="display:flex; gap: 16px; align-items:center; flex-wrap:wrap; background-color: var(--ts-semantic-color-surface-inverted-default); padding: 20px"
        >
            <ts-link
                variant=${args.variant}
                size="medium"
                href=${ifDefined(args.href)}
                target=${ifDefined(args.target)}
                rel=${ifDefined(args.rel)}
                download=${ifDefined(args.download)}
                ?visited-color=${args.visitedColor}
                ?underline=${args.underline}
                ?disabled=${args.disabled}
            >
                Link
            </ts-link>

            <ts-link
                variant=${args.variant}
                target="_blank"
                size="medium"
                href=${ifDefined(args.href)}
                rel=${ifDefined(args.rel)}
                download=${ifDefined(args.download)}
                ?visited-color=${args.visitedColor}
                ?underline=${args.underline}
                ?disabled=${args.disabled}
            >
                Blank Link
            </ts-link>
        </div>
    `,
};

export const SlotTag: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The link component renders a native anchor element. You can use the default slot to provide custom content, such as icons or additional text.',
            },
        },
    },
    render: args => html`
        <div style="display:flex; gap: 16px; align-items:center; flex-wrap:wrap;">
            <ts-link
                variant=${args.variant}
                size=${ifDefined(args.size)}
                href=${ifDefined(args.href)}
                target=${ifDefined(args.target)}
                rel=${ifDefined(args.rel)}
                download=${ifDefined(args.download)}
                ?visited-color=${args.visitedColor}
                ?underline=${args.underline}
                ?disabled=${args.disabled}
            >
                <a href=${ifDefined(args.href)} target=${ifDefined(args.target)}> Custom Tag for SEO </a>
            </ts-link>
        </div>
    `,
    args: {
        variant: 'primary',
        href: 'https://www.tuvsud.com/en',
        visitedColor: true,
        underline: true,
        disabled: false,
    },
};
