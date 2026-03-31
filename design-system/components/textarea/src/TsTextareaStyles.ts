import { css } from 'lit';

export default css`
    :host {
        display: block;
    }

    .textarea {
        display: grid;
        align-items: center;
        position: relative;
        width: 100%;
        font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;
        font-weight: var(--ts-semantic-typography-font-weight-medium);
        line-height: 1.8;
        letter-spacing: normal;
        vertical-align: middle;
        transition:
            var(--ts-semantic-transition-duration-fast) color,
            var(--ts-semantic-transition-duration-fast) border,
            var(--ts-semantic-transition-duration-fast) box-shadow,
            var(--ts-semantic-transition-duration-fast) background-color;
        cursor: text;
    }

    /* Standard textarea */
    .textarea--standard {
        background-color: var(--ts-semantic-color-background-base-default);
        border: solid var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-base-default);
    }

    .textarea--standard:hover:not(.textarea--disabled):not(.textarea--error) {
        background-color: var(--ts-semantic-color-background-base-hover);
        border-color: var(--ts-semantic-color-border-base-hover);
    }

    .textarea--standard:hover:not(.textarea--disabled):not(.textarea--error) .textarea__control {
        color: var(--ts-semantic-color-text-base-default);
    }

    .textarea--standard.textarea--focused:not(.textarea--disabled):not(.textarea--error) {
        background-color: var(--ts-semantic-color-background-base-default);
        border-color: var(--ts-semantic-color-border-primary-focused);
        box-shadow: 0 0 0 var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-primary-focused);
    }

    .textarea--standard.textarea--focused:not(.textarea--disabled):not(.textarea--error) .textarea__control {
        color: var(--ts-semantic-color-text-base-default);
    }

    /* Error state for standard */
    .textarea--standard.textarea--error:not(.textarea--disabled) {
        background-color: var(--ts-semantic-color-background-base-default);
        border: solid var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-danger-default);
    }

    .textarea--standard.textarea--error:not(.textarea--disabled):hover {
        background-color: var(--ts-semantic-color-background-base-hover);
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    .textarea--standard.textarea--error.textarea--focused:not(.textarea--disabled) {
        background-color: var(--ts-semantic-color-background-base-default);
        border-color: var(--ts-semantic-color-border-danger-default);
        box-shadow: 0 0 0 var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-danger-default);
    }

    .textarea--standard.textarea--disabled {
        background-color: var(--ts-semantic-color-background-base-disabled);
        border-color: var(--ts-semantic-color-border-base-disabled);
        opacity: 0.5;
        cursor: not-allowed;
    }

    .textarea__control,
    .textarea__size-adjuster {
        grid-area: 1 / 1 / 2 / 2;
    }

    .textarea__size-adjuster {
        visibility: hidden;
        pointer-events: none;
        opacity: 0;
    }

    .textarea--standard.textarea--disabled .textarea__control {
        color: var(--ts-semantic-color-text-base-disabled);
    }

    .textarea--standard.textarea--disabled .textarea__control::placeholder {
        color: var(--ts-semantic-color-text-neutral-disabled);
    }

    /* Filled textarea */
    .textarea--filled {
        border: none;
        background-color: var(--ts-semantic-color-background-base-default);
        color: var(--ts-semantic-color-text-base-default);
    }

    .textarea--filled:hover:not(.textarea--disabled):not(.textarea--error) {
        background-color: var(--ts-semantic-color-background-base-hover);
    }

    .textarea--filled.textarea--focused:not(.textarea--disabled):not(.textarea--error) {
        background-color: var(--ts-semantic-color-background-base-default);
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    /* Error state for filled */
    .textarea--filled.textarea--error:not(.textarea--disabled) {
        background-color: var(--ts-semantic-color-background-base-default);
        border: solid var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-danger-default);
    }

    .textarea--filled.textarea--error:not(.textarea--disabled):hover {
        background-color: var(--ts-semantic-color-background-base-hover);
    }

    .textarea--filled.textarea--error.textarea--focused:not(.textarea--disabled) {
        background-color: var(--ts-semantic-color-background-base-default);
        outline: solid 3px var(--ts-semantic-color-border-danger-default);
        outline-offset: 1px;
    }

    .textarea--filled.textarea--disabled {
        background-color: var(--ts-semantic-color-background-base-disabled);
        opacity: 0.5;
        cursor: not-allowed;
    }

    .textarea__control {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: 1.4;
        color: var(--ts-semantic-color-text-base-default);
        border: none;
        background: none;
        box-shadow: none;
        cursor: inherit;
        -webkit-appearance: none;
    }

    .textarea__control::-webkit-search-decoration,
    .textarea__control::-webkit-search-cancel-button,
    .textarea__control::-webkit-search-results-button,
    .textarea__control::-webkit-search-results-decoration {
        -webkit-appearance: none;
    }

    .textarea__control::placeholder {
        color: var(--ts-semantic-color-text-neutral-default);
        user-select: none;
        -webkit-user-select: none;
    }

    .textarea__control:focus {
        outline: none;
    }

    /*
   * Size modifiers
   */

    .textarea--small {
        border-radius: var(--ts-semantic-size-radius-md);
        font-size: var(--ts-semantic-typography-ui-font-size-sm);
    }

    .textarea--small .textarea__control {
        padding: 0.5em var(--ts-semantic-size-space-400);
    }

    .textarea--medium {
        border-radius: var(--ts-semantic-size-radius-md);
        font-size: var(--ts-semantic-typography-ui-font-size-md);
    }

    .textarea--medium .textarea__control {
        padding: 0.5em var(--ts-semantic-size-space-500);
    }

    .textarea--large {
        border-radius: var(--ts-semantic-size-radius-md);
        font-size: var(--ts-semantic-typography-ui-font-size-xl);
    }

    .textarea--large .textarea__control {
        padding: 0.5em var(--ts-semantic-size-space-600);
    }

    /*
   * Resize types
   */

    .textarea--resize-none .textarea__control {
        resize: none;
    }

    .textarea--resize-vertical .textarea__control {
        resize: vertical;
    }

    .textarea--resize-auto .textarea__control {
        height: auto;
        resize: none;
        overflow-y: hidden;
    }
`;
