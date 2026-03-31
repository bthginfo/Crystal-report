import { friendlyFormatIBAN, isValidIBAN } from 'ibantools';
import { TsInput } from '../../input/index.js';
import TsIbanStyle from './TsIbanStyle.js';

/**
 * @summary A component for inputting and validating IBANs.
 * @documentation https://create.tuvsud.com/latest/components/iban/develop-6oMcWrz3
 * @status stable
 * @since 1.0
 */

export class TsIban extends TsInput {
    static override get styles() {
        return [super.styles, TsIbanStyle];
    }

    constructor() {
        super();
        this.inputmode = 'text';
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('ts-change', this.onChange.bind(this));
    }

    onChange(): void {
        this.value = friendlyFormatIBAN(this.value) as string;
    }

    /** Validates the IBAN format. Returns true if valid, false otherwise. */
    validateIban(): boolean {
        return isValidIBAN(this.value.replace(/ /g, '').toUpperCase());
    }

    /** Checks for validity including IBAN format validation. */
    override checkValidity(): boolean {
        if (!this.validateIban() && this.value.length > 0) {
            this.setCustomValidity('Invalid IBAN');
            return false;
        }
        this.setCustomValidity('');
        return super.checkValidity();
    }
}
