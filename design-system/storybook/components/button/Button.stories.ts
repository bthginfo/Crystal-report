import { html, nothing } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsButton } from '@tuvsud/design-system/button';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/icon';

const meta = {
    title: 'Components/Button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Buttons are interactive elements that allow users to perform actions or navigate. They are an essential part of the user interface and should be consistent and easily recognizable.',
            },
            source: {
                transform: (src: string) =>
                    src.replace(/\s(pill|circle|caret|loading|disabled|outline)=""(?=[\s>])/g, ' $1'),
            },
        },
    },
    render: args => html`
        <ts-button
            .variant=${args.variant}
            variant=${args.variant}
            .size=${args.size}
            size=${args.size}
            ?caret=${args.caret}
            ?disabled=${args.disabled}
            ?loading=${args.loading}
            ?outline=${args.outline}
            ?pill=${args.pill}
            ?circle=${args.circle}
            .type=${args.type}
            type=${args.type}
            .name=${args.name}
            name=${args.name}
            .value=${args.value}
            value=${args.value}
            .href=${args.href || undefined}
            href=${args.href || nothing}
            ?prevent-anchor-tag=${args.preventAnchorTag}
            .target=${args.target || undefined}
            target=${args.target ?? nothing}
            .rel=${args.rel}
            rel=${args.rel ?? nothing}
            .download=${args.download || undefined}
            download=${args.download ?? nothing}
            .form=${args.form || undefined}
            form=${args.form ?? nothing}
            .formAction=${args.formAction || undefined}
            formaction=${args.formAction ?? nothing}
            .formEnctype=${args.formEnctype || undefined}
            formenctype=${args.formEnctype ?? nothing}
            .formMethod=${args.formMethod || undefined}
            formmethod=${args.formMethod ?? nothing}
            ?formNoValidate=${args.formNoValidate}
            formnovalidate=${args.formNoValidate}
            .formTarget=${args.formTarget || undefined}
            formtarget=${args.formTarget ?? nothing}
        >
            ${args.label}
        </ts-button>
    `,
    args: {
        label: 'Button',
        variant: 'primary',
        size: 'medium',
        caret: false,
        disabled: false,
        loading: false,
        outline: false,
        pill: false,
        circle: false,
        type: 'button',
        name: '',
        value: '',
        href: '',
        preventAnchorTag: false,
        target: '_self',
        rel: 'noreferrer noopener',
        download: undefined,
        form: '',
        formAction: '',
        formEnctype: 'application/x-www-form-urlencoded',
        formMethod: 'post',
        formNoValidate: false,
        formTarget: '_self',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'primary',
                'success',
                'neutral',
                'warning',
                'danger',
                'accent01',
                'accent02',
                'text',
                'text-inverted',
                'navbar',
            ],
            description: 'The button’s theme variant.',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'The button’s size.',
        },
        caret: { control: 'boolean', description: 'Draws the button with a caret for dropdown-like triggers.' },
        disabled: { control: 'boolean', description: 'Disables the button.' },
        loading: { control: 'boolean', description: 'Shows a loading state.' },
        outline: { control: 'boolean', description: 'Draws an outlined button.' },
        pill: { control: 'boolean', description: 'Draws a pill-style button with rounded edges.' },
        circle: {
            control: 'boolean',
            description: 'Draws a circular icon button; expects a single icon in the default slot.',
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
            description:
                'The button type. Defaults to "button" (opposite of native). When "submit", submits the surrounding form.',
        },
        name: {
            control: 'text',
            description:
                'The button name submitted with form data when this button is the submitter. Ignored when "href" is present.',
        },
        value: {
            control: 'text',
            description:
                'The button value submitted with form data when this button is the submitter. Ignored when "href" is present.',
        },
        href: {
            control: 'text',
            description: 'Renders an anchor tag with this href instead of a button.',
        },
        preventAnchorTag: {
            control: 'boolean',
            description:
                'When true, prevents rendering as an anchor tag and handles navigation programmatically. Useful for SPAs or when you need to intercept navigation.',
        },
        target: {
            control: 'select',
            options: ['_self', '_blank', '_parent', '_top'],
            description: 'Where to open the link. Used only when "href" is present.',
        },
        rel: {
            control: 'text',
            description:
                'Rel attribute for the link. Defaults to "noreferrer noopener" for security; adjust when using specific targets.',
        },
        download: {
            control: 'text',
            description: 'Suggests a filename to download the linked resource as. Used only when "href" is present.',
        },
        form: {
            control: 'text',
            description:
                'Form owner to associate the button with. If omitted, the closest containing form is used. Must be an ID.',
        },
        formAction: {
            control: 'text',
            description: 'Overrides the form owner’s "action" attribute.',
        },
        formEnctype: {
            control: 'select',
            options: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'],
            description: 'Overrides the form owner’s "enctype" attribute.',
        },
        formMethod: {
            control: 'select',
            options: ['post', 'get'],
            description: 'Overrides the form owner’s "method" attribute.',
        },
        formNoValidate: {
            control: 'boolean',
            description: 'Overrides the form owner’s "novalidate" attribute.',
        },
        formTarget: {
            control: 'select',
            options: ['_self', '_blank', '_parent', '_top'],
            description: 'Overrides the form owner’s "target" attribute.',
        },
        validity: {
            control: false,
            table: { disable: false },
            description: 'Gets the validity state object.',
        },
        validationMessage: {
            control: false,
            table: { disable: false },
            description: 'Gets the validation message.',
        },
        label: { control: 'text', description: 'Text content rendered inside the button.' },
    },
} satisfies MetaWithLabel<TsButton>;

export default meta;
type Story = StoryObjWithLabel<TsButton>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the button is of `primary` variant and `medium` size.',
            },
        },
    },
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `variant` property to set the button’s variant.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ts-button variant="default">Default</ts-button>
            <ts-button variant="primary">Primary</ts-button>
            <ts-button variant="success">Success</ts-button>
            <ts-button variant="neutral">Neutral</ts-button>
            <ts-button variant="warning">Warning</ts-button>
            <ts-button variant="danger">Danger</ts-button>
            <ts-button variant="accent01">Accent01</ts-button>
            <ts-button variant="accent02">Accent02</ts-button>
        </div>
    `,
};

export const Outline: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `outline` property to draw outlined buttons with transparent backgrounds.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ts-button variant="default" outline>Default</ts-button>
            <ts-button variant="primary" outline>Primary</ts-button>
            <ts-button variant="success" outline>Success</ts-button>
            <ts-button variant="neutral" outline>Neutral</ts-button>
            <ts-button variant="warning" outline>Warning</ts-button>
            <ts-button variant="danger" outline>Danger</ts-button>
            <ts-button variant="accent01" outline>Accent01</ts-button>
            <ts-button variant="accent02" outline>Accent02</ts-button>
        </div>
    `,
};

export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `pill` property to give buttons rounded edges.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; align-items: center; gap: 20px">
            <ts-button size="small" variant="primary" pill>Small</ts-button>
            <ts-button size="medium" variant="primary" pill>Medium</ts-button>
            <ts-button size="large" variant="primary" pill>Large</ts-button>
        </div>
    `,
};

export const Circle: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `circle` property to create circular icon buttons. When this attribute is set, the button expects a single <ts-icon> in the default slot.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; align-items: center; gap: 20px">
            <ts-button variant="success" size="small" circle>
                <ts-icon name="settings" label="Settings"></ts-icon>
            </ts-button>
            <ts-button variant="success" size="medium" circle>
                <ts-icon name="settings" label="Settings"></ts-icon>
            </ts-button>
            <ts-button variant="success" size="large" circle>
                <ts-icon name="settings" label="Settings" size="24"></ts-icon>
            </ts-button>
        </div>
    `,
};

export const PrefixAndSuffix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `prefix` and `suffix` slots to add icons.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="display: flex; align-items: center; gap: 20px">
                <ts-button variant="primary" size="small">
                    <ts-icon slot="prefix" name="settings" size="20"></ts-icon>
                    Settings
                </ts-button>
                <ts-button variant="primary" size="small">
                    <ts-icon slot="suffix" name="refresh"></ts-icon>
                    Refresh
                </ts-button>
                <ts-button variant="primary" size="small">
                    <ts-icon slot="prefix" name="check_box"></ts-icon>
                    <ts-icon slot="suffix" name="chevron_right"></ts-icon>
                    Open
                </ts-button>
            </div>

            <div style="display: flex; align-items: center; gap: 20px">
                <ts-button variant="primary">
                    <ts-icon slot="prefix" name="settings" size="20"></ts-icon>
                    Settings
                </ts-button>
                <ts-button variant="primary">
                    <ts-icon slot="suffix" name="refresh"></ts-icon>
                    Refresh
                </ts-button>
                <ts-button variant="primary">
                    <ts-icon slot="prefix" name="check_box"></ts-icon>
                    <ts-icon slot="suffix" name="chevron_right"></ts-icon>
                    Open
                </ts-button>
            </div>

            <div style="display: flex; align-items: center; gap: 20px">
                <ts-button variant="primary" size="large">
                    <ts-icon slot="prefix" name="settings" size="20"></ts-icon>
                    Settings
                </ts-button>
                <ts-button variant="primary" size="large">
                    <ts-icon slot="suffix" name="refresh"></ts-icon>
                    Refresh
                </ts-button>
                <ts-button variant="primary" size="large">
                    <ts-icon slot="prefix" name="check_box"></ts-icon>
                    <ts-icon slot="suffix" name="chevron_right"></ts-icon>
                    Open
                </ts-button>
            </div>
        </div>
    `,
};

export const Caret: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `caret` property to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; align-items: center; gap: 20px">
            <ts-button size="small" caret variant="primary">Small</ts-button>
            <ts-button size="medium" caret variant="primary">Medium</ts-button>
            <ts-button size="large" caret variant="primary">Large</ts-button>
        </div>
    `,
};

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `loading` property to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ts-button variant="default" loading>Default</ts-button>
            <ts-button variant="primary" loading>Primary</ts-button>
            <ts-button variant="success" loading>Success</ts-button>
            <ts-button variant="neutral" loading>Neutral</ts-button>
            <ts-button variant="warning" loading>Warning</ts-button>
            <ts-button variant="danger" loading>Danger</ts-button>
            <ts-button variant="accent01" loading>Accent01</ts-button>
            <ts-button variant="accent02" loading>Accent02</ts-button>
        </div>
    `,
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `disabled` property to disable a button.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ts-button variant="default" disabled>Default</ts-button>
            <ts-button variant="primary" disabled>Primary</ts-button>
            <ts-button variant="success" disabled>Success</ts-button>
            <ts-button variant="neutral" disabled>Neutral</ts-button>
            <ts-button variant="warning" disabled>Warning</ts-button>
            <ts-button variant="danger" disabled>Danger</ts-button>
            <ts-button variant="accent01" disabled>Accent01</ts-button>
            <ts-button variant="accent02" disabled>Accent02</ts-button>
        </div>
    `,
};

export const LinkTag: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `href` property to render the button as an anchor tag.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <ts-button variant="default" href="https://www.tuvsud.com/en">Default</ts-button>
            <ts-button variant="primary" href="https://www.tuvsud.com/en">Primary</ts-button>
            <ts-button variant="success" href="https://www.tuvsud.com/en">Success</ts-button>
            <ts-button variant="neutral" href="https://www.tuvsud.com/en">Neutral</ts-button>
            <ts-button variant="warning" href="https://www.tuvsud.com/en">Warning</ts-button>
            <ts-button variant="danger" href="https://www.tuvsud.com/en">Danger</ts-button>
            <ts-button variant="text" href="https://www.tuvsud.com/en">Link</ts-button>
        </div>
    `,
};

export const NativeLink: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When using the `href` property, you can still use native anchor tags inside the button for more complex link content. This can be used basically for SEO purposes to render native HTML elements instead of custom tag on the SSR.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column;  gap: 20px; flex-wrap: wrap">
            <div style="display: flex;  gap: 10px; flex-wrap: wrap;">
                <ts-button variant="default" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
                <ts-button variant="primary" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
                <ts-button variant="success" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
                <ts-button variant="warning" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
                <ts-button variant="danger" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
                <ts-button variant="accent01" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
                <ts-button variant="accent02" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">Native Link</a>
                </ts-button>
            </div>

            <div style="display: flex;  gap: 10px; flex-wrap: wrap;">
                <ts-button variant="default" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
                <ts-button variant="primary" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
                <ts-button variant="success" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
                <ts-button variant="warning" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
                <ts-button variant="danger" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
                <ts-button variant="accent01" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
                <ts-button variant="accent02" href="https://www.tuvsud.com/en" target="_blank">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center">
                <ts-button variant="primary" target="_blank" outline size="small" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>

                <ts-button variant="primary" target="_blank" outline size="medium" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="14"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>

                <ts-button variant="primary" target="_blank" outline size="large" href="https://www.tuvsud.com/en">
                    <a href="https://www.tuvsud.com/en">
                        Native Link
                        <ts-icon
                            name="open_in_new"
                            size="16"
                            style-type="rounded"
                            style="color: currentColor; padding-left: 5px"
                        >
                        </ts-icon>
                    </a>
                </ts-button>
            </div>
        </div>
    `,
};

export const PreventAnchorTag: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `prevent-anchor-tag` property with `href` to handle navigation programmatically instead of rendering as an anchor tag. This is useful for single-page applications where you need to intercept navigation, or when you want button semantics but need to navigate. The button will still navigate to the URL, but using JavaScript instead of a native anchor element.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; gap: 10px; flex-direction: column; align-items: flex-start;">
            <div>
                <p style="margin-bottom: 8px;"><strong>Standard button with href (renders as anchor tag):</strong></p>
                <ts-button variant="primary" href="https://www.tuvsud.com/en">Link Button (Anchor Tag)</ts-button>
                <p style="margin-top: 4px; font-size: 12px; color: #666;">Inspect: Renders as &lt;a&gt; tag</p>
            </div>

            <div>
                <p style="margin-bottom: 8px;">
                    <strong>Button with href and prevent-anchor-tag. With target="_self:</strong>
                </p>
                <ts-button variant="primary" href="/?path=/docs/components-button--docs" prevent-anchor-tag=${true}>
                    Navigate Programmatically (Button Tag)
                </ts-button>
                <p style="margin-top: 4px; font-size: 12px; color: #666;">
                    Inspect: Renders as &lt;button&gt; tag, navigates via JavaScript
                </p>
            </div>

            <div>
                <p style="margin-bottom: 8px;">
                    <strong>Button with href and prevent-anchor-tag. With target="_blank":</strong>
                </p>
                <ts-button
                    variant="success"
                    href="https://www.tuvsud.com/en"
                    target="_blank"
                    prevent-anchor-tag=${true}
                >
                    Open in New Tab
                </ts-button>
                <p style="margin-top: 4px; font-size: 12px; color: #666;">Opens link in a new tab programmatically</p>
            </div>
        </div>
    `,
};

export const Navbar: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `navbar` variant to create buttons suitable for navigation bars.',
            },
        },
    },
    render: () => html`
        <div
            style="display: flex; gap: 10px; flex-wrap: wrap; background-color: var(--ts-semantic-color-background-primary-dark-default);"
        >
            <ts-button variant="navbar">Item1</ts-button>
            <ts-button variant="navbar">Item2</ts-button>
            <ts-button variant="navbar">
                <ts-icon slot="prefix" name="settings"></ts-icon>
                Settings
            </ts-button>
            <ts-button variant="navbar">
                <ts-icon slot="suffix" name="chevron_right"></ts-icon>
                Open
            </ts-button>
            <ts-button variant="navbar" caret>List</ts-button>
        </div>
    `,
};

export const InvertedText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `text-inverted` variant when placing buttons on dark backgrounds.',
            },
        },
    },
    render: () => html`
        <div style="background-color: var(--ts-semantic-color-background-primary-dark-default);">
            <ts-button variant="text-inverted">Inverted text</ts-button>
        </div>
    `,
};
