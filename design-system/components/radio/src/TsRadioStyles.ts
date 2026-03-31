import { css } from 'lit';

export default css`
    :host {
        display: block;
    }

    :host(:focus-visible) {
        outline: 0;
    }

    .radio {
        display: inline-flex;
        font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;
        font-size: var(--ts-semantic-typography-ui-font-size-md);
        font-weight: var(--ts-semantic-typography-font-weight-medium);
        color: var(--ts-semantic-color-text-base-default);
        vertical-align: middle;
        cursor: pointer;
    }

    .radio--small {
        --toggle-size: 0.875rem;
        font-size: var(--ts-semantic-typography-ui-font-size-sm);
    }

    .radio--medium {
        --toggle-size: 1.125rem;
        font-size: var(--ts-semantic-typography-ui-font-size-md);
    }

    .radio--large {
        --toggle-size: 1.375rem;
        font-size: var(--ts-semantic-typography-ui-font-size-lg);
    }

    .radio__checked-icon {
        display: inline-flex;
        width: var(--toggle-size);
        height: var(--toggle-size);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    .radio__control {
        flex: 0 0 auto;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--toggle-size);
        height: var(--toggle-size);
        border: solid var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-base-default);
        border-radius: 50%;
        background-color: var(--ts-semantic-color-background-base-default);
        color: transparent;
        transition:
            var(--ts-semantic-transition-duration-fast) border-color,
            var(--ts-semantic-transition-duration-fast) background-color,
            var(--ts-semantic-transition-duration-fast) color,
            var(--ts-semantic-transition-duration-fast) box-shadow;
    }

    .radio__input {
        position: absolute;
        opacity: 0;
        padding: 0;
        margin: 0;
        pointer-events: none;
    }

    /* Hover */
    .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
        border-color: var(--ts-semantic-color-border-base-hover);
        background-color: var(--ts-semantic-color-background-base-hover);
    }

    /* Checked */
    .radio--checked .radio__control {
        color: var(--ts-semantic-color-icon-inverted-default);
        border-color: var(--ts-semantic-color-border-primary-default);
        background-color: var(--ts-semantic-color-background-primary-default);
    }

    /* Checked + hover */
    .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
        border-color: var(--ts-semantic-color-border-primary-hover);
        background-color: var(--ts-semantic-color-background-primary-hover);
    }

    /* Checked + focus */
    :host(:focus-visible:not([error])) .radio__control {
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    /* Disabled */
    .radio--disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
    .radio:not(.radio--checked) svg circle {
        opacity: 0;
    }

    .radio__label {
        display: inline-block;
        color: var(--ts-semantic-color-text-base-default);
        line-height: var(--toggle-size);
        margin-inline-start: 0.5em;
        user-select: none;
        -webkit-user-select: none;
    }

    /* --- Added spacing between radios by size --- */
    :host(:last-of-type) {
        margin-block-end: 0;
    }

    /* Error */
    .radio--error .radio__control {
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    /* Error + hover */
    .radio.radio--error:not(.radio--disabled):not(.radio--checked) .radio__control:hover {
        border-color: var(--ts-semantic-color-border-danger-default);
        background-color: var(--ts-semantic-color-background-base-hover);
    }

    /* Error + checked */
    .radio--error.radio--checked .radio__control {
        border-color: var(--ts-semantic-color-border-danger-default);
        background-color: var(--ts-semantic-color-background-danger-default);
    }

    /* Error + checked + hover */
    .radio.radio--error.radio--checked:not(.radio--disabled) .radio__control:hover {
        border-color: var(--ts-semantic-color-border-danger-default);
        background-color: var(--ts-semantic-color-background-danger-hover);
    }

    /* Error + focus */
    :host([error]:focus-visible) .radio__control {
        outline: solid 3px var(--ts-semantic-color-border-danger-default);
        outline-offset: 1px;
    }
`;
