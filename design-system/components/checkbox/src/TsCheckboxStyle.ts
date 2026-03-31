import { css } from 'lit';

export default css`
    :host {
        display: inline-block;
    }

    .checkbox {
        position: relative;
        display: inline-flex;
        align-items: flex-start;
        font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;
        font-weight: var(--ts-semantic-typography-font-weight-regular);
        color: var(--ts-semantic-color-text-base-default);
        vertical-align: middle;
        cursor: pointer;
    }

    .checkbox--small {
        --toggle-size: var(--ts-semantic-typography-ui-font-size-sm);
        font-size: var(--ts-semantic-typography-ui-font-size-sm);
    }

    .checkbox--medium {
        --toggle-size: var(--ts-semantic-typography-ui-font-size-md);
        font-size: var(--ts-semantic-typography-ui-font-size-md);
    }

    .checkbox--large {
        --toggle-size: var(--ts-semantic-typography-ui-font-size-lg);
        font-size: var(--ts-semantic-typography-ui-font-size-lg);
    }

    .checkbox__control {
        flex: 0 0 auto;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--toggle-size);
        height: var(--toggle-size);
        border: solid var(--ts-semantic-size-width-sm) var(--ts-semantic-color-border-base-default);
        border-radius: 2px;
        background-color: var(--ts-semantic-color-background-base-default);
        color: var(--ts-semantic-color-text-inverted-default);
        transition:
            var(--ts-semantic-transition-duration-fast) border-color,
            var(--ts-semantic-transition-duration-fast) background-color,
            var(--ts-semantic-transition-duration-fast) color,
            var(--ts-semantic-transition-duration-fast) box-shadow;
    }

    .checkbox__input {
        position: absolute;
        opacity: 0;
        padding: 0;
        margin: 0;
        pointer-events: none;
    }

    .checkbox__checked-icon,
    .checkbox__indeterminate-icon {
        display: inline-flex;
        color: var(--ts-semantic-color-text-inverted-default);
        width: var(--toggle-size);
        height: var(--toggle-size);
    }

    /* Hover */
    .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
        border-color: var(--ts-semantic-color-border-base-hover);
        background-color: var(--ts-semantic-color-background-base-hover);
    }

    /* Focus */
    .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    /* Checked/indeterminate */
    .checkbox--checked .checkbox__control,
    .checkbox--indeterminate .checkbox__control {
        border-color: var(--ts-semantic-color-border-primary-default);
        background-color: var(--ts-semantic-color-background-primary-default);
        color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Checked/indeterminate + hover */
    .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
    .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
        border-color: var(--ts-semantic-color-border-primary-hover);
        background-color: var(--ts-semantic-color-background-primary-hover);
    }

    /* Checked/indeterminate + focus */
    .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
    .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    /* Disabled */
    .checkbox--disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .checkbox__label {
        display: inline-block;
        color: var(--ts-semantic-color-text-base-default);
        line-height: var(--toggle-size);
        margin-inline-start: 0.5em;
        user-select: none;
        -webkit-user-select: none;
    }

    :host([required]) .checkbox__label::after {
        content: '*';
        color: var(--ts-semantic-color-text-danger-default);
        margin-inline-start: -2px;
    }

    /* Error state */
    .checkbox--error .checkbox__control {
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    .checkbox--error.checkbox--checked .checkbox__control,
    .checkbox--error.checkbox--indeterminate .checkbox__control {
        background-color: var(--ts-semantic-color-background-danger-default);
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    .checkbox--error .checkbox__checked-icon,
    .checkbox--error .checkbox__indeterminate-icon {
        color: var(--ts-semantic-color-text-inverted-default);
    }

    /* Error + hover (unchecked) */
    .checkbox--error:not(.checkbox--checked):not(.checkbox--indeterminate):not(.checkbox--disabled)
        .checkbox__control:hover {
        border-color: var(--ts-semantic-color-border-danger-default);
        background-color: var(--ts-semantic-color-background-base-hover);
    }

    /* Error + hover (checked/indeterminate) */
    .checkbox--error.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
    .checkbox--error.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
        border-color: var(--ts-semantic-color-border-danger-default);
        background-color: var(--ts-semantic-color-background-danger-hover);
    }

    /* Error + focus (unchecked) */
    .checkbox--error:not(.checkbox--checked):not(.checkbox--indeterminate):not(.checkbox--disabled)
        .checkbox__input:focus-visible
        ~ .checkbox__control {
        outline: solid 3px var(--ts-semantic-color-border-danger-default);
        outline-offset: 1px;
    }

    /* Error + focus (checked/indeterminate) */
    .checkbox--error.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
    .checkbox--error.checkbox--indeterminate:not(.checkbox--disabled)
        .checkbox__input:focus-visible
        ~ .checkbox__control {
        outline: solid 3px var(--ts-semantic-color-border-danger-default);
        outline-offset: 1px;
    }
`;
