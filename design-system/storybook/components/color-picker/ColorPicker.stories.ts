import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsColorPicker } from '@tuvsud/design-system/color-picker';
import '@tuvsud/design-system/color-picker';

const meta = {
    title: 'Components/Color Picker',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A Color Picker allows users to select and customize colors for UI elements such as badges, backgrounds, or text. It provides multiple input methods like visual selection, sliders, and direct value entry.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(disabled|opacity|uppercase|required|inline|no-format-toggle|hoist)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => html`
        <ts-color-picker
            .value=${args.value}
            value=${ifDefined(args.value)}
            .defaultValue=${args.defaultValue}
            default-value=${ifDefined(args.defaultValue)}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .format=${args.format}
            format=${ifDefined(args.format)}
            .inline=${args.inline}
            ?inline=${args.inline}
            .size=${args.size}
            size=${ifDefined(args.size)}
            .noFormatToggle=${args.noFormatToggle}
            ?no-format-toggle=${args.noFormatToggle}
            .name=${args.name}
            name=${ifDefined(args.name)}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .hoist=${args.hoist}
            ?hoist=${args.hoist}
            .opacity=${args.opacity}
            ?opacity=${args.opacity}
            .uppercase=${args.uppercase}
            ?uppercase=${args.uppercase}
            .swatches=${args.swatches}
            swatches=${ifDefined(typeof args.swatches === 'string' ? args.swatches : undefined)}
            .form=${args.form}
            form=${ifDefined(args.form)}
            .required=${args.required}
            ?required=${args.required}
            style="height: 350px"
        ></ts-color-picker>
    `,
    args: {
        value: '#0046ad',
        defaultValue: '',
        label: '',
        format: 'hex',
        inline: false,
        size: 'medium',
        noFormatToggle: false,
        name: '',
        disabled: false,
        hoist: false,
        opacity: false,
        uppercase: false,
        swatches: '',
        form: '',
        required: false,
    },
    argTypes: {
        value: {
            control: 'text',
            description: 'The current value. Format varies by `format`. Submitted with form data.',
        },
        defaultValue: { control: 'text', description: 'Default value of the control; useful for form resets.' },
        label: {
            control: 'text',
            description: 'Accessible label announced by assistive tech. Use `label` slot for HTML.',
        },
        format: { control: 'select', options: ['hex', 'rgb', 'hsl', 'hsv'], description: 'Desired color format.' },
        inline: { control: 'boolean', description: 'Render inline instead of a dropdown.' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Trigger size (no effect when inline).',
        },
        noFormatToggle: { control: 'boolean', description: 'Removes the format toggle button.' },
        name: { control: 'text', description: 'Form field name for submission as name/value pair.' },
        disabled: { control: 'boolean', description: 'Disables the color picker.' },
        hoist: {
            control: 'boolean',
            description: 'Prevents panel clipping inside scrollable containers by using fixed positioning.',
        },
        opacity: {
            control: 'boolean',
            description: 'Shows the opacity slider; affects formatted output (HEXA/RGBA/HSLA).',
        },
        uppercase: { control: 'boolean', description: 'Outputs uppercase values instead of lowercase.' },
        swatches: { control: 'text', description: 'Preset colors separated by semicolons, or set via JS array.' },
        form: { control: 'text', description: 'Associates the control to a form by ID when outside a form element.' },
        required: { control: 'boolean', description: 'Marks the control as required.' },
        validity: {
            control: false,
            table: { disable: false },
            description: 'Gets the validity state object (read-only).',
        },
        validationMessage: {
            control: false,
            table: { disable: false },
            description: 'Gets the validation message (read-only).',
        },
    },
} satisfies MetaWithLabel<TsColorPicker>;

export default meta;
type Story = StoryObjWithLabel<TsColorPicker>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default color picker with a preset value.',
            },
        },
    },
};
