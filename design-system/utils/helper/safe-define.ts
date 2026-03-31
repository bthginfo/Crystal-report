// Description: Safely define a custom element if not already defined
// Usage: safeDefine('my-element', MyElementClass);
export const safeDefine = (t: string, c: CustomElementConstructor) => {
    if (!customElements.get(t)) customElements.define(t, c);
};
