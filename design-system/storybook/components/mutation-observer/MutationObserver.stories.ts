import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsMutationObserver } from '@tuvsud/design-system/mutation-observer';
import '@tuvsud/design-system/mutation-observer';

const meta: Meta<TsMutationObserver> = {
    title: 'Components/Mutation Observer',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The Mutation Observer component supplies a minimal, declarative abstraction over the native MutationObserver API.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(attr-old-value|char-data|char-data-old-value|child-list|disabled)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },
    render: args => {
        const { attr, attrOldValue, charData, charDataOldValue, childList, disabled } = args;
        return html`
            <div style="display:grid; gap:12px; max-width:520px;">
                <div style="display:flex; gap:8px; align-items:center;">
                    <button
                        type="button"
                        @click=${() => {
                            const el = document.getElementById('mo-target')!;
                            el.toggleAttribute('data-active');
                            el.textContent = el.hasAttribute('data-active') ? 'Active text' : 'Idle text';
                        }}
                    >
                        Toggle attribute/text
                    </button>
                    <button
                        type="button"
                        @click=${() => {
                            const el = document.getElementById('mo-target')!;
                            const span = document.createElement('span');
                            span.textContent = ' +child';
                            el.appendChild(span);
                        }}
                    >
                        Add child
                    </button>
                </div>

                <ts-mutation-observer
                    .attr=${attr}
                    attr=${attr}
                    .attrOldValue=${attrOldValue}
                    ?attr-old-value=${attrOldValue}
                    .charData=${charData}
                    ?char-data=${charData}
                    .charDataOldValue=${charDataOldValue}
                    ?char-data-old-value=${charDataOldValue}
                    .childList=${childList}
                    ?child-list=${childList}
                    .disabled=${disabled}
                    ?disabled=${disabled}
                >
                    <div id="mo-target" style="padding:8px; border:1px dashed currentColor;">Idle text</div>
                </ts-mutation-observer>
            </div>
        `;
    },
    args: {
        attr: '',
        attrOldValue: false,
        charData: false,
        charDataOldValue: false,
        childList: false,
        disabled: false,
    },
    argTypes: {
        attr: { control: 'text', description: 'Attributes to watch (space-separated) or * for all.' },
        attrOldValue: { control: 'boolean', description: 'Record the previous value of changed attributes.' },
        charData: { control: 'boolean', description: 'Watch character data changes.' },
        charDataOldValue: { control: 'boolean', description: 'Record previous character data value.' },
        childList: { control: 'boolean', description: 'Watch added/removed child nodes.' },
        disabled: { control: 'boolean', description: 'Disable the observer.' },
    },
};

export default meta;
type Story = StoryObj<TsMutationObserver>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'By default, the Mutation Observer is set up but does not observe any changes until configured via its properties.',
            },
        },
    },
};
