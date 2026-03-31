import { html } from 'lit';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsStepper } from '@tuvsud/design-system/stepper';
import '@tuvsud/design-system/stepper';
import '@tuvsud/design-system/step';

const meta = {
    title: 'Components/Stepper',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Steppers guide users through multi-step processes or workflows. They display progress and help users navigate between steps.',
            },
        },
    },
    render: args => html`
        <ts-stepper
            orientation=${args.orientation}
            current-step=${args.currentStep}
            ?navigation=${args.navigation}
            variant=${args.variant}
            next-label=${args.nextLabel}
            prev-label=${args.prevLabel}
        >
            <ts-step label="Personal Info" description="Enter your personal details"></ts-step>
            <ts-step label="Address" description="Provide your address"></ts-step>
            <ts-step label="Payment" description="Payment information"></ts-step>
            <ts-step label="Review" description="Review and confirm"></ts-step>
        </ts-stepper>
    `,
    args: {
        orientation: 'horizontal',
        currentStep: 0,
        navigation: false,
        variant: 'primary',
        nextLabel: 'Next',
        prevLabel: 'Previous',
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'The orientation of the stepper.',
        },
        currentStep: {
            control: { type: 'number', min: 0, max: 3 },
            description: 'The current active step index (0-based).',
        },
        navigation: {
            control: 'boolean',
            description: 'Whether navigation between steps is allowed via clicking.',
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'The visual variant of the stepper.',
        },
        nextLabel: {
            control: 'text',
            description: 'Custom label for the "Next" button (secondary variant).',
        },
        prevLabel: {
            control: 'text',
            description: 'Custom label for the "Previous" button (secondary variant).',
        },
    },
} satisfies MetaWithLabel<TsStepper>;

export default meta;

type Story = StoryObjWithLabel<TsStepper>;

export const Default: Story = {
    args: {
        orientation: 'horizontal',
        currentStep: 0,
        navigation: false,
        variant: 'primary',
    },
};

export const WithNavigation: Story = {
    render: () => html`
        <ts-stepper orientation="horizontal" current-step="1" navigation variant="primary">
            <ts-step label="Personal Info" description="Enter your details" state="done"></ts-step>
            <ts-step label="Address" description="Your location"></ts-step>
            <ts-step label="Payment" description="Payment method"></ts-step>
            <ts-step label="Review" description="Confirm details"></ts-step>
        </ts-stepper>
    `,
    parameters: {
        docs: {
            description: {
                story: 'When navigation is enabled, users can click on any step to navigate to it.',
            },
        },
    },
};

export const Vertical: Story = {
    render: () => html`
        <ts-stepper orientation="vertical" current-step="1" navigation variant="primary">
            <ts-step label="Personal Info" description="Enter your details" state="done"></ts-step>
            <ts-step label="Address" description="Your location"></ts-step>
            <ts-step label="Payment" description="Payment method"></ts-step>
            <ts-step label="Review" description="Confirm details"></ts-step>
        </ts-stepper>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Vertical orientation displays steps in a column with labels to the right.',
            },
        },
    },
};

export const Secondary: Story = {
    args: {
        orientation: 'horizontal',
        currentStep: 2,
        navigation: false,
        variant: 'secondary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Secondary variant shows navigation buttons with pagination dots.',
            },
        },
    },
};

export const WithStates: Story = {
    render: () => html`
        <ts-stepper orientation="horizontal" current-step="2" navigation variant="primary">
            <ts-step label="Personal Info" description="Enter your details" state="done"></ts-step>
            <ts-step label="Address" description="Your location" state="done"></ts-step>
            <ts-step label="Payment" description="Payment method"></ts-step>
            <ts-step label="Review" description="Confirm details"></ts-step>
        </ts-stepper>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Steps can have different states: done (with checkmark), error, warning, or default.',
            },
        },
    },
};

export const WithErrors: Story = {
    render: () => html`
        <ts-stepper orientation="horizontal" current-step="2" navigation variant="primary">
            <ts-step label="Personal Info" description="Enter your details" state="done"></ts-step>
            <ts-step label="Address" description="Your location" state="error"></ts-step>
            <ts-step label="Payment" description="Payment method"></ts-step>
            <ts-step label="Review" description="Confirm details"></ts-step>
        </ts-stepper>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Steps with errors are highlighted in red with an error icon.',
            },
        },
    },
};

export const WithWarnings: Story = {
    render: () => html`
        <ts-stepper orientation="horizontal" current-step="2" navigation variant="primary">
            <ts-step label="Personal Info" description="Enter your details" state="done"></ts-step>
            <ts-step label="Address" description="Your location" state="warning"></ts-step>
            <ts-step label="Payment" description="Payment method"></ts-step>
            <ts-step label="Review" description="Confirm details"></ts-step>
        </ts-stepper>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Steps with warnings are highlighted in yellow with a warning icon.',
            },
        },
    },
};

export const CustomIcons: Story = {
    render: args => html`
        <ts-stepper
            orientation=${args.orientation}
            current-step=${args.currentStep}
            ?navigation=${args.navigation}
            variant=${args.variant}
        >
            <ts-step label="User" description="User details" state="done">
                <ts-icon slot="icon" name="person"></ts-icon>
            </ts-step>
            <ts-step label="Location" description="Address info">
                <ts-icon slot="icon" name="location_on"></ts-icon>
            </ts-step>
            <ts-step label="Payment" description="Payment details">
                <ts-icon slot="icon" name="credit_card"></ts-icon>
            </ts-step>
            <ts-step label="Complete" description="All done">
                <ts-icon slot="icon" name="check"></ts-icon>
            </ts-step>
        </ts-stepper>
    `,
    args: {
        orientation: 'horizontal',
        currentStep: 1,
        navigation: true,
        variant: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'You can provide custom icons for each step using the icon slot.',
            },
        },
    },
};

export const SimpleLabels: Story = {
    render: args => html`
        <ts-stepper
            orientation=${args.orientation}
            current-step=${args.currentStep}
            ?navigation=${args.navigation}
            variant=${args.variant}
        >
            <ts-step label="Step 1"></ts-step>
            <ts-step label="Step 2"></ts-step>
            <ts-step label="Step 3"></ts-step>
            <ts-step label="Step 4"></ts-step>
            <ts-step label="Step 5"></ts-step>
        </ts-stepper>
    `,
    args: {
        orientation: 'horizontal',
        currentStep: 2,
        navigation: true,
        variant: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper with simple labels without descriptions.',
            },
        },
    },
};

export const WithDisabledSteps: Story = {
    render: args => html`
        <ts-stepper orientation=${args.orientation} current-step=${args.currentStep} navigation variant=${args.variant}>
            <ts-step label="Available" state="done"></ts-step>
            <ts-step label="Current"></ts-step>
            <ts-step label="Disabled" disabled></ts-step>
            <ts-step label="Future"></ts-step>
        </ts-stepper>
    `,
    args: {
        orientation: 'horizontal',
        currentStep: 1,
        variant: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Steps can be disabled to prevent navigation to them.',
            },
        },
    },
};

export const VerticalWithNavigation: Story = {
    render: args => html`
        <ts-stepper orientation="vertical" current-step=${args.currentStep} navigation variant="primary">
            <ts-step label="Account Setup" description="Create your account" state="done"></ts-step>
            <ts-step label="Profile Information" description="Tell us about yourself" state="done"></ts-step>
            <ts-step label="Preferences" description="Customize your experience"></ts-step>
            <ts-step label="Verification" description="Verify your email"></ts-step>
        </ts-stepper>
    `,
    args: {
        currentStep: 2,
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical stepper with clickable navigation between steps.',
            },
        },
    },
};

export const EventLogging: Story = {
    render: () => {
        const log: string[] = [];

        const addLog = (message: string) => {
            log.unshift(message);
            const logEl = document.querySelector('#stepper-event-log');
            if (logEl) {
                logEl.innerHTML = log
                    .slice(0, 10)
                    .map(
                        m =>
                            `<div style="padding: 4px 0; border-bottom: 1px solid var(--ts-semantic-color-border-default);">${m}</div>`,
                    )
                    .join('');
            }
        };

        const handleNextStep = (e: CustomEvent) => {
            const msg = `ts-next-step — index: ${e.detail.index}, previousIndex: ${e.detail.previousIndex}`;
            console.log(msg, e.detail);
            addLog(msg);
        };

        const handlePrevStep = (e: CustomEvent) => {
            const msg = `ts-prev-step — index: ${e.detail.index}, previousIndex: ${e.detail.previousIndex}`;
            console.log(msg, e.detail);
            addLog(msg);
        };

        const handleSelectStep = (e: CustomEvent) => {
            const msg = `ts-select-step — index: ${e.detail.index}, previousIndex: ${e.detail.previousIndex}`;
            console.log(msg, e.detail);
            addLog(msg);
        };

        return html`
            <ts-stepper
                orientation="horizontal"
                current-step="1"
                variant="secondary"
                next-label="Next Step"
                prev-label="Previous Step"
                @ts-select-step=${handleSelectStep}
                @ts-next-step=${handleNextStep}
                @ts-prev-step=${handlePrevStep}
            >
                <ts-step label="Step 1" state="done"></ts-step>
                <ts-step label="Step 2"></ts-step>
                <ts-step label="Step 3"></ts-step>
                <ts-step label="Step 4"></ts-step>
            </ts-stepper>
        `;
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates all three stepper events: **ts-next-step** (Next button clicked), **ts-prev-step** (Previous button clicked), and **ts-select-step** (step clicked directly). Events are logged both in the panel below and in the browser console.',
            },
        },
    },
};

export const InteractiveDemo: Story = {
    render: () => {
        const handleStepSelect = (e: CustomEvent) => {
            const stepper = e.target as TsStepper;
            console.log('Step selected:', e.detail);

            // Mark previous steps as done
            const steps = Array.from(stepper.querySelectorAll('ts-step'));
            steps.forEach((step, index: number) => {
                if (index < e.detail.index) {
                    step.setAttribute('state', 'done');
                } else {
                    step.setAttribute('state', 'default');
                }
            });
        };

        return html`
            <ts-stepper
                orientation="horizontal"
                current-step="0"
                navigation
                variant="primary"
                @ts-select-step=${handleStepSelect}
            >
                <ts-step label="Personal Info" description="Enter your details"></ts-step>
                <ts-step label="Address" description="Your location"></ts-step>
                <ts-step label="Payment" description="Payment method"></ts-step>
                <ts-step label="Review" description="Confirm details"></ts-step>
            </ts-stepper>
            <div style="margin-top: 2rem; padding: 1rem; border-radius: 4px;">
                <p style="color: var(--ts-semantic-color-text-base-default)">
                    <strong>Try it:</strong> Click on any step to navigate. Previous steps will automatically be marked
                    as done.
                </p>
            </div>
        `;
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive example showing how steps can automatically update their state based on user navigation.',
            },
        },
    },
};
