import { css } from 'lit';

export default css`
    :host {
        display: inline-block;
        color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        /* IMPORTANT: avoid background shorthand (it resets background-color) */
        background-color: var(--ts-icon-button-bg, transparent);
        border: 2px solid transparent; /* default: no visible border */
        font-size: inherit;
        color: inherit;
        padding: var(--ts-semantic-size-space-100);
        cursor: pointer;

        transition:
            var(--ts-semantic-transition-duration-xfast) color,
            var(--ts-semantic-transition-duration-xfast) background-color,
            var(--ts-semantic-transition-duration-xfast) border-color;

        -webkit-appearance: none;
    }

    /* style-type */
    .icon-button--sharp {
        border-radius: var(--ts-semantic-size-radius-md);
    }

    .icon-button--rounded {
        border-radius: var(--ts-semantic-size-radius-md);
    }

    /* circle (boolean prop) */
    .icon-button--circle {
        border-radius: 50%;
        padding: var(--ts-semantic-size-space-300);
    }

    .icon-button:hover:not(.icon-button--disabled),
    .icon-button:focus-visible:not(.icon-button--disabled) {
        color: var(--ts-semantic-color-icon-primary-hover);
    }

    .icon-button:active:not(.icon-button--disabled) {
        color: var(--ts-semantic-color-icon-primary-active);
    }

    .icon-button:focus {
        outline: none;
    }

    .icon-button--disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .icon-button:focus-visible {
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    .icon-button__icon {
        pointer-events: none;
    }

    /* =========================================================
   * OUTLINE + INTENT
   * ========================================================= */

    /* Default */
    .icon-button--outline.icon-button--default {
        border-color: transparent;
        color: var(--ts-semantic-color-text-base-default);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button-hover:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-base-hover);
    }

    .icon-button-hover:active:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-base-active);
    }

    /* Primary */
    .icon-button--outline.icon-button--primary {
        border-color: var(--ts-semantic-color-border-primary-default);
        --icon-color: var(--ts-semantic-color-border-primary-default);
    }

    .icon-button--outline.icon-button--primary:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-primary-hover);
        border-color: var(--ts-semantic-color-background-primary-hover);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--primary:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-primary-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-primary-active);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Success */
    .icon-button--outline.icon-button--success {
        border-color: var(--ts-semantic-color-border-success-default);
        --icon-color: var(--ts-semantic-color-border-success-default);
    }

    .icon-button--outline.icon-button--success:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-success-hover);
        border-color: var(--ts-semantic-color-background-success-hover);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--success:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-success-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-success-active);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Accent01 */
    .icon-button--outline.icon-button--accent01 {
        border-color: var(--ts-semantic-color-border-accent01-default);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--accent01:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-accent01-hover);
        border-color: var(--ts-semantic-color-background-accent01-hover);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--accent01:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-accent01-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-accent01-active);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    /* Accent02 */
    .icon-button--outline.icon-button--accent02 {
        border-color: var(--ts-semantic-color-border-accent02-default);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--accent02:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-accent02-hover);
        border-color: var(--ts-semantic-color-background-accent02-hover);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--accent02:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-accent02-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-accent02-active);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    /* Neutral */
    .icon-button--outline.icon-button--neutral {
        border-color: var(--ts-semantic-color-border-neutral-default);
        color: var(--ts-semantic-color-text-neutral-default);
        --icon-color: var(--ts-semantic-color-border-neutral-default);
    }

    .icon-button--outline.icon-button--neutral:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-neutral-hover);
        border-color: var(--ts-semantic-color-background-neutral-hover);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--neutral:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-neutral-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-neutral-active);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Warning */
    .icon-button--outline.icon-button--warning {
        border-color: var(--ts-semantic-color-border-warning-default);
        color: var(--ts-semantic-color-text-warning-default);
        --icon-color: var(--ts-semantic-color-border-warning-default);
    }

    .icon-button--outline.icon-button--warning:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-warning-hover);
        border-color: var(--ts-semantic-color-background-warning-hover);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--warning:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-warning-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-warning-active);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Danger */
    .icon-button--outline.icon-button--danger {
        border-color: var(--ts-semantic-color-border-danger-default);
        color: var(--ts-semantic-color-text-danger-default);
        --icon-color: var(--ts-semantic-color-border-danger-default);
    }

    .icon-button--outline.icon-button--danger:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-danger-hover);
        border-color: var(--ts-semantic-color-background-danger-hover);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--danger:active:not(.icon-button--disabled) {
        border-color: var(--ts-semantic-color-border-danger-active);
        --ts-icon-button-bg: var(--ts-semantic-color-background-danger-active);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    /* =========================================================
   * FILLED (minimal)
   * ========================================================= */
    .icon-button--filled.icon-button--default {
        color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--filled.icon-button--default:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-base-hover);
        border-color: var(--ts-semantic-color-background-base-hover);
    }

    .icon-button--filled.icon-button--default:active:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-base-active);
        border-color: var(--ts-semantic-color-background-base-active);
    }

    .icon-button--filled.icon-button--primary {
        --ts-icon-button-bg: var(--ts-semantic-color-background-primary-default);
        border-color: var(--ts-semantic-color-background-primary-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--filled.icon-button--primary:hover:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-primary-hover);
        border-color: var(--ts-semantic-color-background-primary-hover);
    }

    .icon-button--filled.icon-button--primary:active:not(.icon-button--disabled) {
        --ts-icon-button-bg: var(--ts-semantic-color-background-primary-active);
        border-color: var(--ts-semantic-color-background-primary-active);
    }

    /* =========================================================
   * TINTED modifier (applies a base background immediately)
   * IMPORTANT: must come AFTER intent rules so it wins.
   * ========================================================= */

    .icon-button--tinted {
        /* default base */
        --ts-icon-button-bg: var(--ts-icon-button-bg, transparent);
    }

    .icon-button--outline.icon-button--default.icon-button--tinted {
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--primary.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-primary-default);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--success.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-success-default);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--accent01.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-accent01-default);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--accent02.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-accent02-default);
        --icon-color: var(--ts-semantic-color-text-base-default);
    }

    .icon-button--outline.icon-button--neutral.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-neutral-default);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--warning.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-warning-default);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }

    .icon-button--outline.icon-button--danger.icon-button--tinted {
        --ts-icon-button-bg: var(--ts-semantic-color-background-danger-default);
        --icon-color: var(--ts-semantic-color-text-inverted-default);
    }
`;
