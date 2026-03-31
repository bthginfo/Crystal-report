import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';

import type { TsSpinner } from '@tuvsud/design-system/spinner';
import '@tuvsud/design-system/spinner';

const meta = {
    title: 'Components/Spinner',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The spinner component visually represents the state of an indeterminate process.',
            },
            source: { type: 'dynamic' },
        },
        chromatic: { pauseAnimationAtEnd: false },
    },
    render: () => {
        return html`
            <ts-spinner></ts-spinner>
            <ts-spinner style="font-size: 2rem;"></ts-spinner>
            <ts-spinner style="font-size: 3rem;"></ts-spinner>
        `;
    },
    argTypes: {},
} satisfies MetaWithLabel<TsSpinner>;

export default meta;
type Story = StoryObjWithLabel<TsSpinner>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default spinner shows three spinners with different sizes.',
            },
        },
    },
    args: {},
};
