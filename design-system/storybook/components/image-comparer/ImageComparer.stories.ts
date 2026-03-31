import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { TsImageComparer } from '@tuvsud/design-system/image-comparer';
import '@tuvsud/design-system/image-comparer';

const meta: Meta<TsImageComparer> = {
    title: 'Components/Image Comparer',
    tags: ['autodocs'],
    parameters: {
        description: {
            component:
                'Easily spot visual differences between similar photos with an intuitive, interactive sliding panel.',
        },
        docs: { source: { type: 'dynamic' } },
    },
    render: args => html`
        <ts-image-comparer .position=${Number(args.position)}>
            <img style="width: 100%; height: 400px" slot="before" src="assets/image-comparer/image1.jpg" alt="Before" />
            <img style="width: 100%;" slot="after" src="assets/image-comparer/image2.jpg" alt="After" />
        </ts-image-comparer>
    `,
    args: { position: 50 },
    argTypes: {
        position: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'Divider position as a percentage.',
        },
    },
};

export default meta;
type Story = StoryObj<TsImageComparer>;
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the image comparer is set to a position of 50%, showing equal parts of both images.',
            },
        },
    },
};
