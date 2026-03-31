import { css } from 'lit';

export default css`
    :host {
        display: inline-block;
    }

    :host([size='small']) {
        --height: var(--ts-semantic-size-space-600);
        --thumb-size: calc(var(--ts-semantic-size-space-600) + 4px);
        --width: calc(var(--height) * 2);

        font-size: var(--ts-semantic-typography-ui-font-size-sm);
    }

    :host([size='medium']) {
        --height: var(--ts-semantic-size-space-700);
        --thumb-size: calc(var(--ts-semantic-size-space-700) + 4px);
        --width: calc(var(--height) * 2);

        font-size: var(--ts-semantic-typography-ui-font-size-md);
    }

    :host([size='large']) {
        --height: var(--ts-semantic-size-space-800);
        --thumb-size: calc(var(--ts-semantic-size-space-800) + 4px);
        --width: calc(var(--height) * 2);

        font-size: var(--ts-semantic-typography-ui-font-size-lg);
    }

    .switch {
        position: relative;
        display: inline-flex;
        align-items: center;
        font-family: var(--ts-semantic-typography-font-family-default), system-ui, sans-serif;
        font-size: inherit;
        font-weight: var(--ts-semantic-typography-font-weight-regular);
        color: var(--ts-semantic-color-text-base-default);
        vertical-align: middle;
        cursor: pointer;
    }

    .switch__control {
        flex: 0 0 auto;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--width);
        height: var(--height);
        background-color: var(--ts-semantic-color-background-neutral-default);
        border: solid var(--ts-semantic-size-width-xs) var(--ts-semantic-color-border-neutral-default);
        border-radius: var(--height);
        transition:
            var(--ts-semantic-transition-duration-fast) border-color,
            var(--ts-semantic-transition-duration-fast) background-color;
    }

    .switch__control .switch__thumb {
        width: var(--thumb-size);
        height: var(--thumb-size);
        background-color: var(--ts-semantic-color-background-base-default);
        border-radius: 50%;
        border: solid var(--ts-semantic-size-width-sm) var(--ts-semantic-color-border-neutral-default);
        translate: calc((var(--width) - var(--height)) / -2);
        transition:
            var(--ts-semantic-transition-duration-fast) translate ease,
            var(--ts-semantic-transition-duration-fast) background-color,
            var(--ts-semantic-transition-duration-fast) border-color,
            var(--ts-semantic-transition-duration-fast) box-shadow;
    }

    .switch__input {
        position: absolute;
        opacity: 0;
        padding: 0;
        margin: 0;
        pointer-events: none;
    }

    /* Hover */
    .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
        background-color: var(--ts-semantic-color-background-neutral-hover);
        border-color: var(--ts-semantic-color-border-neutral-hover);
    }

    .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
        background-color: var(--ts-semantic-color-background-base-hover);
        border-color: var(--ts-semantic-color-border-neutral-hover);
    }

    /* Focus */
    .switch:not(.switch--checked):not(.switch--disabled):not(.switch--error)
        .switch__input:focus-visible
        ~ .switch__control {
        background-color: var(--ts-semantic-color-background-neutral-hover);
        border-color: var(--ts-semantic-color-border-neutral-hover);
    }

    .switch:not(.switch--checked):not(.switch--disabled):not(.switch--checked):not(.switch--error)
        .switch__input:focus-visible
        ~ .switch__control
        .switch__thumb {
        background-color: var(--ts-semantic-color-background-base-default);
        border-color: var(--ts-semantic-color-border-neutral-default);
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    /* Checked */
    .switch--checked .switch__control {
        background-color: var(--ts-semantic-color-background-primary-default);
        border-color: var(--ts-semantic-color-border-primary-default);
    }

    .switch--checked .switch__control .switch__thumb {
        background-color: var(--ts-semantic-color-background-base-default);
        border-color: var(--ts-semantic-color-border-primary-default);
        translate: calc((var(--width) - var(--height)) / 2);
    }

    /* Checked + hover */
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
        background-color: var(--ts-semantic-color-background-primary-hover);
        border-color: var(--ts-semantic-color-border-primary-hover);
    }

    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
        background-color: var(--ts-semantic-color-background-base-hover);
        border-color: var(--ts-semantic-color-border-primary-hover);
    }

    /* Checked + focus */
    .switch.switch--checked:not(.switch--disabled):not(.switch--error) .switch__input:focus-visible ~ .switch__control {
        background-color: var(--ts-semantic-color-background-primary-default);
        border-color: var(--ts-semantic-color-border-primary-default);
    }

    .switch.switch--checked:not(.switch--disabled):not(.switch--error)
        .switch__input:focus-visible
        ~ .switch__control
        .switch__thumb {
        background-color: var(--ts-semantic-color-background-base-default);
        border-color: var(--ts-semantic-color-border-primary-default);
        outline: solid 3px var(--ts-semantic-color-border-primary-focused);
        outline-offset: 1px;
    }

    /* Disabled */
    .switch--disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .switch__label {
        display: inline-block;
        line-height: var(--height);
        margin-inline-start: 0.5em;
        user-select: none;
        -webkit-user-select: none;
    }

    /* Error base */
    .switch--error:not(.switch--disabled) .switch__control {
        background-color: var(--ts-semantic-color-border-danger-default);
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    .switch--error:not(.switch--disabled) .switch__thumb {
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    /* Error + hover (unchecked) */
    .switch--error:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
        background-color: var(--ts-semantic-color-border-danger-hover);
        border-color: var(--ts-semantic-color-border-danger-hover);
    }

    .switch--error:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
        border-color: var(--ts-semantic-color-border-danger-hover);
    }

    /* Error + checked (base) */
    .switch--error.switch--checked:not(.switch--disabled) .switch__control {
        background-color: var(--ts-semantic-color-background-danger-default);
        border-color: var(--ts-semantic-color-border-danger-default);
    }

    /* Error + checked hover */
    .switch--error.switch--checked:not(.switch--disabled) .switch__control:hover {
        background-color: var(--ts-semantic-color-background-danger-hover);
        border-color: var(--ts-semantic-color-border-danger-hover);
    }

    .switch--error.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
        border-color: var(--ts-semantic-color-border-danger-hover);
    }

    /* Error focus */
    .switch--error:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
        outline: solid 3px var(--ts-semantic-color-border-danger-default) !important;
        outline-offset: 1px;
    }

    :host([required]) .switch__label::after {
        content: '*';
        color: var(--ts-semantic-color-text-danger-default);
        margin-inline-start: -2px;
    }

    @media (forced-colors: active) {
        .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
        .switch--checked .switch__control .switch__thumb {
            background-color: ButtonText;
        }
    }
`;
