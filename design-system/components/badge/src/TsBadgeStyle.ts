import { css } from 'lit';

export default css`
    :host {
        display: inline-flex;
    }

    .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;
        font-size: max(12px, 0.75em);
        font-weight: var(--ts-semantic-typography-font-weight-medium);
        padding: var(--ts-semantic-size-space-200, 6px) var(--ts-semantic-size-space-400, 12px);
        line-height: 1.2;
        border-radius: var(--ts-semantic-size-radius-lg);
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        cursor: inherit;
    }

    /* Variant modifiers */
    .badge--primary {
        background-color: var(--ts-semantic-color-background-primary-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    .badge--success {
        background-color: var(--ts-semantic-color-background-success-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    .badge--neutral {
        background-color: var(--ts-semantic-color-background-neutral-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    .badge--warning {
        background-color: var(--ts-semantic-color-background-warning-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    .badge--danger {
        background-color: var(--ts-semantic-color-background-danger-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Pill modifier */
    .badge--pill {
        border-radius: var(--ts-semantic-size-radius-pill);
    }

    /* Pulse modifier */
    .badge--pulse {
        animation: pulse 1.5s infinite;
    }

    .badge--pulse.badge--primary {
        --pulse-color: var(--ts-semantic-color-border-primary-subtle-default);
    }

    .badge--pulse.badge--success {
        --pulse-color: var(--ts-semantic-color-border-success-subtle-default);
    }

    .badge--pulse.badge--neutral {
        --pulse-color: var(--ts-semantic-color-border-neutral-subtle-default);
    }

    .badge--pulse.badge--warning {
        --pulse-color: var(--ts-semantic-color-border-warning-subtle-default);
    }

    .badge--pulse.badge--danger {
        --pulse-color: var(--ts-semantic-color-border-danger-subtle-default);
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 var(--pulse-color);
        }
        70% {
            box-shadow: 0 0 0 0.5rem transparent;
        }
        100% {
            box-shadow: 0 0 0 0 transparent;
        }
    }
`;
