import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { TsDropzone } from '@tuvsud/design-system/dropzone';
import '@tuvsud/design-system/dropzone';
import '@tuvsud/design-system/button';
import '@tuvsud/design-system/icon';
import '@tuvsud/design-system/spinner';

const meta: Meta<TsDropzone> = {
    title: 'Components/Dropzone',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The Dropzone component allows users to upload files by dragging and dropping or clicking to browse. It supports file validation, multiple file selection, and displays selected files with options to remove them.',
            },
            source: {
                type: 'dynamic',
                transform: (src: string) =>
                    src.replace(
                        /\s(disabled|required|multiple|error|show-file-list|label-visually-hidden|loading)=""(?=[\s>])/g,
                        ' $1',
                    ),
            },
        },
    },

    render: args => html`
        <ts-dropzone
            .locale=${args.locale}
            locale=${ifDefined(args.locale)}
            .loading=${args.loading}
            ?loading=${args.loading}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText)}
            .size=${args.size}
            size=${args.size}
            .name=${args.name}
            name=${ifDefined(args.name)}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .required=${args.required}
            ?required=${args.required}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            error-message=${ifDefined(args.errorMessage)}
            .multiple=${args.multiple}
            ?multiple=${args.multiple}
            .accept=${args.accept}
            accept=${ifDefined(args.accept)}
            .maxSize=${args.maxSize}
            max-size=${ifDefined(args.maxSize)}
            .minSize=${args.minSize}
            min-size=${ifDefined(args.minSize)}
            .maxFiles=${args.maxFiles}
            max-files=${ifDefined(args.maxFiles)}
            .showFileList=${args.showFileList}
            ?show-file-list=${args.showFileList}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
            .description=${args.description}
            description=${ifDefined(args.description)}
            .dropzoneTitle=${args.dropzoneTitle}
            dropzone-title=${ifDefined(args.dropzoneTitle)}
            .dragTitle=${args.dragTitle}
            drag-title=${ifDefined(args.dragTitle)}
            .fileLoadedTitle=${args.fileLoadedTitle}
            file-loaded-title=${ifDefined(args.fileLoadedTitle)}
            .maxFilesReachedTitle=${args.maxFilesReachedTitle}
            max-files-reached-title=${ifDefined(args.maxFilesReachedTitle)}
            @ts-change=${(e: CustomEvent) => console.log('ts-change', e)}
            @ts-file-reject=${(e: CustomEvent) => console.log('ts-file-reject', e.detail)}
        >
            <ts-icon slot="icon" name="upload" size="36"></ts-icon>
        </ts-dropzone>
    `,

    args: {
        locale: 'en-US',
        loading: false,
        label: 'Upload Files',
        dropzoneTitle: '',
        dragTitle: '',
        fileLoadedTitle: '',
        description: '',
        maxFilesReachedTitle: '',
        helpText: '',
        size: 'medium',
        name: 'files',
        disabled: false,
        required: false,
        error: false,
        errorMessage: '',
        multiple: false,
        accept: '',
        maxSize: undefined,
        minSize: undefined,
        maxFiles: undefined,
        showFileList: true,
        labelVisuallyHidden: false,
    },

    argTypes: {
        locale: {
            control: 'text',
            description: 'Locale used for all internal dropzone messages.',
        },

        loading: {
            control: 'boolean',
            description: 'Shows a spinner in the icon area and disables interaction.',
        },

        label: {
            control: 'text',
            description: "The dropzone's label. Use the `label` slot for HTML content.",
        },

        helpText: {
            control: 'text',
            description: 'Help text displayed below the dropzone. Use the `help-text` slot for HTML content.',
        },

        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: "The dropzone's size variant.",
        },

        name: {
            control: 'text',
            description: 'The name of the dropzone, submitted as a name/value pair with form data.',
        },

        disabled: {
            control: 'boolean',
            description: 'Disables the dropzone.',
        },

        required: {
            control: 'boolean',
            description: 'Makes the dropzone a required field.',
        },

        error: {
            control: 'boolean',
            description: 'Indicates whether the dropzone is in an error state.',
        },

        errorMessage: {
            control: 'text',
            description: 'The error message to display when the dropzone is in an error state.',
        },

        multiple: {
            control: 'boolean',
            description: 'Allow multiple file selection.',
        },

        accept: {
            control: 'text',
            description: 'Accepted file types.',
        },

        maxSize: {
            control: 'number',
            description: 'Maximum file size in bytes.',
        },

        minSize: {
            control: 'number',
            description: 'Minimum file size in bytes.',
        },

        maxFiles: {
            control: 'number',
            description: 'Maximum number of files allowed.',
        },

        showFileList: {
            control: 'boolean',
            description: 'Whether to show the list of selected files.',
        },

        labelVisuallyHidden: {
            control: 'boolean',
            description: 'Hides the label visually but keeps it accessible to screen readers.',
        },

        description: {
            control: 'text',
            description: 'Additional description text shown inside the dropzone area.',
        },

        dropzoneTitle: {
            control: 'text',
            description: 'The main title shown when not dragging.',
        },

        dragTitle: {
            control: 'text',
            description: 'The title shown while dragging files over the dropzone.',
        },

        fileLoadedTitle: {
            control: 'text',
            description: 'The title shown when a file is already loaded.',
        },

        maxFilesReachedTitle: {
            control: 'text',
            description: 'The title shown when maxFiles has been reached.',
        },
    },
};

export default meta;
type Story = StoryObj<TsDropzone>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default dropzone allows users to upload files by dragging and dropping or clicking to browse.',
            },
        },
    },
    args: {
        label: 'Upload Files',
        helpText: 'Drag and drop files here or click to browse',
    },
};

export const MultipleFiles: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Enable multiple file selection with the `multiple` attribute.',
            },
        },
    },
    args: {
        label: 'Upload Multiple Files',
        multiple: true,
        helpText: 'You can select multiple files at once',
        description: 'click to add 3 files',
        maxFiles: 3,
    },
};

export const WithFileTypeRestriction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Restrict accepted file types using the `accept` attribute. This example only accepts images and PDF files.',
            },
        },
    },
    args: {
        label: 'Upload Images or PDFs',
        accept: 'image/*,.pdf',
        description: 'Only images and PDF files are accepted',
        helpText: 'Accepted formats: JPG, PNG, GIF, PDF',
    },
};

export const WithSizeLimit: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set maximum and minimum file sizes using `max-size` and `min-size` attributes (in bytes).',
            },
        },
    },
    args: {
        label: 'Upload Files (Max 5MB)',
        maxSize: 5 * 1024 * 1024,
        description: 'Maximum file size: 5MB',
        helpText: 'Files larger than 5MB will be rejected',
    },
};

export const WithMaxFiles: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Limit the number of files that can be uploaded using the `max-files` attribute.',
            },
        },
    },
    args: {
        label: 'Upload Files (Max 3)',
        multiple: true,
        maxFiles: 3,
        description: 'You can upload up to 3 files',
        helpText: 'Maximum 3 files allowed',
    },
};

export const CustomTitle: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Customize the dropzone titles for different states using `dropzone-title`, `drag-title`, `file-loaded-title`, and `max-files-reached-title` attributes.',
            },
        },
    },
    args: {
        label: 'Upload Files',
        dropzoneTitle: 'Custom Title Drag and drop or click to browse ✅',
        dragTitle: 'Drop files here ✅',
        fileLoadedTitle: 'File loaded ✅',
        maxFilesReachedTitle: 'Maximum number of files reached',
        helpText: 'Custom titles example',
    },
};

export const Disabled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disable the dropzone with the `disabled` attribute.',
            },
        },
    },
    args: {
        label: 'Upload Files',
        disabled: true,
        helpText: 'This dropzone is disabled',
    },
};

export const HiddenFileList: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Hide the file list by setting `show-file-list` to false. Useful when you want to display files in a custom way.',
            },
        },
    },
    args: {
        label: 'Upload Files',
        showFileList: false,
        helpText: 'File list is hidden - handle display yourself',
    },
};

export const WithCustomIcon: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Customize the dropzone icon using the `icon` slot.',
            },
        },
    },
    render: args => html`
        <ts-dropzone
            .loading=${args.loading}
            ?loading=${args.loading}
            label=${args.label}
            help-text=${ifDefined(args.helpText)}
            description=${ifDefined(args.description)}
            dropzone-title=${ifDefined(args.dropzoneTitle)}
            drag-title=${ifDefined(args.dragTitle)}
            file-loaded-title=${ifDefined(args.fileLoadedTitle)}
            max-files-reached-title=${ifDefined(args.maxFilesReachedTitle)}
        >
            <ts-icon slot="icon" name="image" size="32"></ts-icon>
        </ts-dropzone>
    `,
    args: {
        label: 'Upload Images',
        description: 'Only image files accepted',
        helpText: 'Custom icon example',
        loading: false,
    },
};

export const InForm: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The dropzone integrates with native HTML forms and supports form validation.',
            },
        },
    },
    render: () => html`
        <form
            @submit=${(e: Event) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const dropzone = form.querySelector('ts-dropzone') as TsDropzone;
                if (dropzone.reportValidity()) {
                    alert('Form submitted! Files: ' + dropzone.value);
                }
            }}
        >
            <ts-dropzone
                label="Upload Document"
                name="document"
                required
                accept=".pdf,.doc,.docx"
                description="PDF or Word documents only"
                help-text="This field is required"
                style="margin-bottom: 1rem;"
                dropzone-title="Drag and drop or click to browse"
                drag-title="Drop files here"
                file-loaded-title="File loaded"
                max-files-reached-title="Maximum number of files reached"
            ></ts-dropzone>
            <ts-button type="submit" variant="primary">Submit</ts-button>
        </form>
    `,
};

export const AllSizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Comparison of all available size variants.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
            <ts-dropzone label="Small Dropzone" size="small"></ts-dropzone>
            <ts-dropzone label="Medium Dropzone" size="medium"></ts-dropzone>
            <ts-dropzone label="Large Dropzone" size="large"></ts-dropzone>
        </div>
    `,
};

export const ImageUpload: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A practical example for uploading images with size and type restrictions.',
            },
        },
    },
    args: {
        label: 'Upload Images',
        multiple: true,
        maxFiles: 5,
        accept: 'image/jpeg,image/png,image/gif,image/webp',
        maxSize: 10 * 1024 * 1024,
        description: 'JPG, PNG, GIF, or WebP (max 10MB each)',
        helpText: 'You can upload up to 5 images',
    },
};

export const DocumentUpload: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A practical example for uploading documents with specific file type restrictions.',
            },
        },
    },
    args: {
        label: 'Upload Documents',
        multiple: true,
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
        maxSize: 25 * 1024 * 1024,
        description: 'PDF, Word, Excel, PowerPoint, or Text files',
        helpText: 'Maximum file size: 25MB',
    },
};

export const MaxFilesReached: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Shows the locked state when the maximum number of files is reached. Add 3 files to see the dropzone become non-interactive.',
            },
        },
    },
    args: {
        label: 'Upload Files (Max 3)',
        multiple: true,
        maxFiles: 3,
        description: 'You can upload up to 3 files',
        helpText: 'After 3 files are selected, the dropzone is locked',
        maxFilesReachedTitle: 'Maximum number of files reached',
    },
};

export const SingleFileLoadedLocked: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Shows the locked state when multiple is false and a file has been selected. Add 1 file to see the dropzone become non-interactive.',
            },
        },
    },
    args: {
        label: 'Upload File',
        multiple: false,
        description: 'Single file only',
        helpText: 'After a file is selected, the dropzone is locked',
        fileLoadedTitle: 'File loaded',
    },
};

export const ErrorState: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Real validation example: files larger than 10KB are rejected; files <= 10KB are accepted.',
            },
        },
    },
    render: args => html`
        <ts-dropzone
            .locale=${args.locale}
            locale=${ifDefined(args.locale)}
            .loading=${args.loading}
            ?loading=${args.loading}
            .label=${args.label}
            label=${ifDefined(args.label)}
            .helpText=${args.helpText}
            help-text=${ifDefined(args.helpText)}
            .size=${args.size}
            size=${args.size}
            .name=${args.name}
            name=${ifDefined(args.name)}
            .disabled=${args.disabled}
            ?disabled=${args.disabled}
            .required=${args.required}
            ?required=${args.required}
            .error=${args.error}
            ?error=${args.error}
            .errorMessage=${args.errorMessage}
            error-message=${ifDefined(args.errorMessage)}
            .multiple=${args.multiple}
            ?multiple=${args.multiple}
            .accept=${args.accept}
            accept=${ifDefined(args.accept)}
            .maxSize=${args.maxSize}
            max-size=${ifDefined(args.maxSize)}
            .minSize=${args.minSize}
            min-size=${ifDefined(args.minSize)}
            .maxFiles=${args.maxFiles}
            max-files=${ifDefined(args.maxFiles)}
            .showFileList=${args.showFileList}
            ?show-file-list=${args.showFileList}
            .labelVisuallyHidden=${args.labelVisuallyHidden}
            ?label-visually-hidden=${args.labelVisuallyHidden}
            .description=${args.description}
            description=${ifDefined(args.description)}
            .dropzoneTitle=${args.dropzoneTitle}
            dropzone-title=${ifDefined(args.dropzoneTitle)}
            .dragTitle=${args.dragTitle}
            drag-title=${ifDefined(args.dragTitle)}
            .fileLoadedTitle=${args.fileLoadedTitle}
            file-loaded-title=${ifDefined(args.fileLoadedTitle)}
            .maxFilesReachedTitle=${args.maxFilesReachedTitle}
            max-files-reached-title=${ifDefined(args.maxFilesReachedTitle)}
            @ts-file-reject=${(e: CustomEvent) => {
                const dropzone = e.currentTarget as TsDropzone;
                const first = (e.detail?.errors?.[0] as string | undefined) || 'Validation failed';
                dropzone.error = true;
                dropzone.errorMessage = first;
            }}
            @ts-change=${(e: CustomEvent) => {
                const dropzone = e.currentTarget as TsDropzone;
                if (dropzone.files?.length) {
                    dropzone.error = false;
                    dropzone.errorMessage = '';
                }
            }}
        >
            <ts-icon slot="icon" name="upload" size="36"></ts-icon>
        </ts-dropzone>
    `,
    args: {
        label: 'Upload Images (Max 10KB)',
        helpText: 'Choose an image ≤ 10KB to pass. Images > 10KB will be rejected.',
        accept: 'image/*',
        maxSize: 10 * 1024,
        error: false,
        errorMessage: '',
        loading: false,
    },
};

export const LocaleGerman: Story = {
    args: {
        locale: 'de-DE',
        label: 'Dateien hochladen',
        helpText: 'Ziehen Sie Dateien hierher oder klicken Sie zum Auswählen',
        multiple: true,
        maxFiles: 3,
    },
};

export const LocaleFrench: Story = {
    args: {
        locale: 'fr-FR',
        label: 'Téléverser des fichiers',
        helpText: 'Glissez-déposez ou cliquez pour parcourir',
        multiple: true,
        maxFiles: 3,
    },
};
