import type { IconLibrary } from './library.js';

const library: IconLibrary = {
    name: 'default',
    resolver: (name, options?: { variant?: string; styleType?: string }) => {
        const icon = name.toLowerCase();

        const variant = options?.variant === 'filled' ? 'fill1' : 'default';
        const style = options?.styleType === 'rounded' ? 'rounded' : 'sharp';

        return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbols${style}/${icon}/${variant}/24px.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
};

export default library;
