import type { ReactiveController, ReactiveControllerHost } from 'lit';

type ButtonClasses = Record<string, boolean>;

type ButtonLinkHost = ReactiveControllerHost & {
    href: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    rel: string;
    download?: string;
    title: string;
    disabled: boolean;
    loading: boolean;
    preventAnchorTag: boolean;

    requestUpdate(): void;
};

type ButtonLinkControllerOptions = {
    getDefaultSlot: () => HTMLSlotElement | undefined;
    getButtonClasses: () => ButtonClasses;
    onClick: (event: MouseEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
    isLink: () => boolean;
};

export class TsButtonSlottedLinkController implements ReactiveController {
    private host: ButtonLinkHost;
    private options: ButtonLinkControllerOptions;
    private currentAnchor?: HTMLAnchorElement;

    hasSlottedAnchor = false;

    constructor(host: ButtonLinkHost, options: ButtonLinkControllerOptions) {
        this.host = host;
        this.options = options;
        host.addController(this);
    }

    hostUpdated() {
        if (!this.options.isLink()) {
            this.cleanup();
            if (this.hasSlottedAnchor) {
                this.hasSlottedAnchor = false;
                this.host.requestUpdate();
            }
            return;
        }

        const anchor = this.getSlottedAnchor();

        if (!anchor) {
            if (this.currentAnchor) {
                this.cleanup();
            }
            if (this.hasSlottedAnchor) {
                this.hasSlottedAnchor = false;
                this.host.requestUpdate();
            }
            return;
        }

        if (this.currentAnchor !== anchor) {
            this.cleanup();
            this.currentAnchor = anchor;
            this.bindAnchor(anchor);
        }

        this.decorate(anchor);

        if (!this.hasSlottedAnchor) {
            this.hasSlottedAnchor = true;
            this.host.requestUpdate();
        }
    }

    hostDisconnected() {
        this.cleanup();
    }

    handleSlotChange = () => {
        const nextAnchor = this.options.isLink() ? this.getSlottedAnchor() : undefined;

        if (this.currentAnchor && this.currentAnchor !== nextAnchor) {
            this.cleanup();
        }

        this.currentAnchor = nextAnchor;

        if (nextAnchor) {
            this.bindAnchor(nextAnchor);
            this.decorate(nextAnchor);
        }

        const nextHasSlottedAnchor = !!nextAnchor;
        if (this.hasSlottedAnchor !== nextHasSlottedAnchor) {
            this.hasSlottedAnchor = nextHasSlottedAnchor;
            this.host.requestUpdate();
        }
    };

    getAnchor() {
        return this.currentAnchor ?? this.getSlottedAnchor();
    }

    private getSlottedAnchor(): HTMLAnchorElement | undefined {
        const slot = this.options.getDefaultSlot();
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        return assigned.find(el => el.tagName.toLowerCase() === 'a') as HTMLAnchorElement | undefined;
    }

    private bindAnchor(anchor: HTMLAnchorElement) {
        anchor.removeEventListener('click', this.options.onClick);
        anchor.removeEventListener('focus', this.options.onFocus);
        anchor.removeEventListener('blur', this.options.onBlur);

        anchor.addEventListener('click', this.options.onClick);
        anchor.addEventListener('focus', this.options.onFocus);
        anchor.addEventListener('blur', this.options.onBlur);
    }

    private cleanup() {
        if (!this.currentAnchor) return;

        this.currentAnchor.removeEventListener('click', this.options.onClick);
        this.currentAnchor.removeEventListener('focus', this.options.onFocus);
        this.currentAnchor.removeEventListener('blur', this.options.onBlur);
        this.currentAnchor = undefined;
    }

    private decorate(anchor: HTMLAnchorElement) {
        const classes = this.options.getButtonClasses();

        for (const [className, enabled] of Object.entries(classes)) {
            anchor.classList.toggle(className, enabled);
        }

        anchor.setAttribute('part', 'base');
        anchor.title = this.host.title;

        if (!anchor.getAttribute('href') && this.host.href) {
            anchor.setAttribute('href', this.host.href);
        }

        if (this.host.target) anchor.setAttribute('target', this.host.target);
        else anchor.removeAttribute('target');

        if (this.host.download) anchor.setAttribute('download', this.host.download);
        else anchor.removeAttribute('download');

        if (this.host.rel) anchor.setAttribute('rel', this.host.rel);
        else anchor.removeAttribute('rel');

        anchor.removeAttribute('type');
        anchor.removeAttribute('name');
        anchor.removeAttribute('value');
        anchor.removeAttribute('disabled');
        anchor.removeAttribute('role');

        if (this.host.disabled) {
            anchor.removeAttribute('href');
            anchor.setAttribute('aria-disabled', 'true');
            anchor.setAttribute('tabindex', '-1');
        } else {
            if (!anchor.getAttribute('href') && this.host.href) {
                anchor.setAttribute('href', this.host.href);
            }
            anchor.setAttribute('aria-disabled', 'false');
            anchor.setAttribute('tabindex', '0');
        }
    }
}
