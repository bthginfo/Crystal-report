import { css } from 'lit';

export default css`
    :host {
        display: contents;
        margin: 0;
    }

    :host([placement='top']) .alert {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        margin: 0;
        border: none;
        border-radius: 0;
        z-index: var(--ts-semantic-distance-zindex-toast, 1000);
    }

    .alert {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--ts-semantic-size-space-400);
        padding: var(--ts-semantic-size-space-400) var(--ts-semantic-size-space-500);
        background-color: var(--ts-semantic-color-background-primary-subtle-default);
        border: solid var(--ts-semantic-size-width-sm) var(--ts-semantic-color-border-primary-default);
        border-radius: var(--ts-semantic-size-radius-md);
        font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;
        font-size: var(--ts-semantic-typography-ui-font-size-sm);
        font-weight: var(--ts-semantic-typography-font-weight-regular);
        line-height: 1.6;
        color: var(--ts-semantic-color-text-base-default);
        margin: inherit;
        overflow: hidden;
    }

    .alert:not(.alert--has-icon) .alert__icon,
    .alert:not(.alert--closable) .alert__close-button {
        display: none;
    }

    .alert__icon {
        flex: 0 0 auto;
        display: flex;
        align-self: flex-start;
        align-items: center;
        font-size: var(--ts-semantic-typography-ui-font-size-md);
        line-height: 1.6;
        margin-top: 0.1em;
    }

    .alert--has-countdown {
        border-bottom: none;
    }

    .alert--primary {
        border-color: var(--ts-semantic-color-border-primary-default);
    }

    .alert--primary .alert__icon {
        color: var(--ts-semantic-color-icon-primary-default);
        --icon-color: var(--ts-semantic-color-icon-primary-default);
    }

    .alert--success {
        border-color: var(--ts-semantic-color-border-success-default);
        background-color: var(--ts-semantic-color-background-success-subtle-default);
    }

    .alert--success .alert__icon {
        color: var(--ts-semantic-color-icon-success-default);
        --icon-color: var(--ts-semantic-color-icon-success-default);
    }

    .alert--neutral {
        border-color: var(--ts-semantic-color-border-neutral-default);
        background-color: var(--ts-semantic-color-background-neutral-subtle-default);
    }

    .alert--neutral .alert__icon {
        color: var(--ts-semantic-color-icon-neutral-default);
        --icon-color: var(--ts-semantic-color-icon-neutral-default);
    }

    .alert--warning {
        border-color: var(--ts-semantic-color-border-warning-default);
        background-color: var(--ts-semantic-color-background-warning-subtle-default);
    }

    .alert--warning .alert__icon {
        color: var(--ts-semantic-color-icon-warning-default);
        --icon-color: var(--ts-semantic-color-icon-warning-default);
    }

    .alert--danger {
        border-color: var(--ts-semantic-color-border-danger-default);
        background-color: var(--ts-semantic-color-background-danger-subtle-default);
    }

    .alert--danger .alert__icon {
        color: var(--ts-semantic-color-icon-danger-default);
        --icon-color: var(--ts-semantic-color-icon-danger-default);
    }

    .alert__message {
        flex: 1 1 auto;
        display: block;
        overflow: hidden;
    }

    .alert__close-button {
        flex: 0 0 auto;
        display: flex;
        align-self: flex-start;
        align-items: center;
        font-size: var(--ts-semantic-typography-ui-font-size-md);
        line-height: 1.6;
        margin-top: 0.1em;
    }

    .alert__countdown {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(var(--ts-semantic-size-width-sm) * 3);
        background-color: var(--ts-semantic-color-border-neutral-default);
        display: flex;
    }

    .alert__countdown--ltr {
        justify-content: flex-end;
    }

    .alert__countdown .alert__countdown-elapsed {
        height: 100%;
        width: 0;
    }

    .alert--primary .alert__countdown-elapsed {
        background-color: var(--ts-semantic-color-border-primary-default);
    }

    .alert--success .alert__countdown-elapsed {
        background-color: var(--ts-semantic-color-border-success-default);
    }

    .alert--neutral .alert__countdown-elapsed {
        background-color: var(--ts-semantic-color-border-neutral-default);
    }

    .alert--warning .alert__countdown-elapsed {
        background-color: var(--ts-semantic-color-border-warning-default);
    }

    .alert--danger .alert__countdown-elapsed {
        background-color: var(--ts-semantic-color-border-danger-default);
    }

    .alert__timer {
        display: none;
    }
`;
