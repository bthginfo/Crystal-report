import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsQrCode } from '@tuvsud/design-system/qr-code';
import '@tuvsud/design-system/qr-code';

const meta: Meta<TsQrCode> = {
    title: 'Components/QR Code',
    tags: ['autodocs'],
    parameters: {
        description: {
            component:
                'QR codes are useful for providing small pieces of information to users who can quickly scan them with a smartphone. Most smartphones have built-in QR code scanners, so simply pointing the camera at a QR code will decode it and allow the user to visit a website, dial a phone number, read a message, etc.',
        },
        docs: { source: { type: 'dynamic' } },
    },
    render: args => {
        const { value, label, size, fill, background, radius, errorCorrection } = args;
        return html`
            <ts-qr-code
                .value=${value}
                value=${value}
                .label=${label}
                label=${label}
                .size=${size}
                size=${size}
                .fill=${fill}
                fill=${fill}
                .background=${background}
                background=${background}
                .radius=${radius}
                radius=${radius}
                .errorCorrection=${errorCorrection}
                error-correction=${errorCorrection}
            ></ts-qr-code>
        `;
    },
    args: {
        value: 'https://www.tuvsud.com/de-de',
        label: 'QR code linking to example.com',
        size: 160,
        fill: 'black',
        background: 'white',
        radius: 0,
        errorCorrection: 'H',
    },
    argTypes: {
        value: { control: 'text', description: 'The QR code’s value.' },
        label: { control: 'text', description: 'Accessible label; defaults to value.' },
        size: { control: { type: 'number', min: 64, step: 8 }, description: 'Size in pixels.' },
        fill: { control: 'text', description: 'Fill color.' },
        background: { control: 'text', description: 'Background color.' },
        radius: {
            control: { type: 'range', min: 0, max: 0.5, step: 0.01 },
            description: 'Module edge radius (0–0.5).',
        },
        errorCorrection: { control: 'select', options: ['L', 'M', 'Q', 'H'], description: 'Error correction level.' },
    },
};

export default meta;
type Story = StoryObj<TsQrCode>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the component generates a QR code linking to the specified URL with high error correction.',
            },
        },
    },
};
