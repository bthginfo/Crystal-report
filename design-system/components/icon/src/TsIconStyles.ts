import { css } from 'lit';

export default css`
    :host {
        display: inline-block;
        box-sizing: content-box !important;
        color: var(--icon-color, var(--ts-semantic-color-text-base-default));
        width: 100%;
        height: 100%;
    }

    svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
`;
