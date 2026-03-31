import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { MetaWithLabel, StoryObjWithLabel } from '../../with-label.js';
import type { TsAvatar } from '@tuvsud/design-system/avatar';
import '@tuvsud/design-system/avatar';
import '@tuvsud/design-system/avatar-group';
import '@tuvsud/design-system/icon';
import '@tuvsud/design-system/dropdown';
import '@tuvsud/design-system/menu';
import '@tuvsud/design-system/menu-item';
import '@tuvsud/design-system/divider';
import '@tuvsud/design-system/tooltip';

const meta = {
    title: 'Components/Avatar',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Avatar is used for showing a thumbnail representation of a single user or entity. Default avatar illustration is displayed when no src is specified.',
            },
            source: { type: 'dynamic' },
        },
    },
    args: {
        shape: 'circle',
        image: '/assets/avatar/user1.avif',
        label: 'User Avatar',
        initials: 'UA',
        loading: undefined,
    },

    render: args => html`
        <ts-avatar
            .image=${args.image}
            image=${ifDefined(args.image || undefined)}
            .shape=${args.shape}
            shape=${args.shape}
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .initials=${args.initials}
            initials=${ifDefined(args.initials || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
        ></ts-avatar>
    `,
    argTypes: {
        image: {
            control: 'text',
            description: 'Image URL used as the avatar picture.',
        },
        shape: {
            control: { type: 'select' },
            options: ['circle', 'square', 'rounded'],
            description: 'Shape of the avatar.',
        },
        label: {
            control: 'text',
            description: 'Accessible label describing the avatar.',
        },
        initials: {
            control: 'text',
            description: 'Fallback initials shown when no image is provided.',
        },
        loading: {
            control: { type: 'select' },
            options: ['eager', 'lazy', undefined],
            description: 'Controls image loading behavior when an image is set.',
        },
    },
} satisfies MetaWithLabel<TsAvatar>;

export default meta;
type Story = StoryObjWithLabel<TsAvatar>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default avatar showing initials when no image is provided.',
            },
        },
    },
};

export const initials: Story = {
    parameters: {
        docs: {
            description: {
                story: 'To use an image for the avatar, set the image and label attributes. This will take priority and be shown over initials and icons. Avatar images can be lazily loaded by setting the loading attribute to lazy.',
            },
        },
    },
    args: { image: '', initials: 'AB' },
};

export const Shape: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The shape of the avatar can be customized using the shape attribute. Supported shapes are circle, square, and rounded.',
            },
        },
    },
    render: args => html`
        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="circle"
            image="/assets/avatar/user1.avif"
        >
        </ts-avatar>

        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="rounded"
            image="/assets/avatar/user2.avif"
        >
        </ts-avatar>

        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="square"
            image="/assets/avatar/user3.avif"
        >
        </ts-avatar>
    `,
};

export const Size: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The shape of the avatar can be customized using the shape attribute. Supported shapes are circle, square, and rounded.',
            },
        },
    },
    render: args => html`
        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="circle"
            image="/assets/avatar/user1.avif"
            style="--size: 20px;"
        >
        </ts-avatar>

        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="circle"
            image="/assets/avatar/user1.avif"
            style="--size: 32px;"
        >
        </ts-avatar>

        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="circle"
            image="/assets/avatar/user1.avif"
            style="--size: 48px;"
        >
        </ts-avatar>

        <ts-avatar
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
            shape="circle"
            image="/assets/avatar/user1.avif"
            style="--size: 60px;"
        >
        </ts-avatar>
    `,
};

export const AvatarGroups: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can group avatars with a few lines of CSS.',
            },
        },
    },
    render: () => html`
        <ts-avatar-group shape="circle" max="4">
            <ts-avatar image="/assets/avatar/user1.avif" label="A"></ts-avatar>
            <ts-avatar image="/assets/avatar/user2.avif" label="B"></ts-avatar>
            <ts-avatar image="/assets/avatar/user3.avif" label="B"></ts-avatar>
            <ts-avatar image="/assets/avatar/user4.avif" label="B"></ts-avatar>
            <ts-avatar image="/assets/avatar/user2.avif" label="B"></ts-avatar>
            <ts-avatar image="/assets/avatar/user1.avif" label="B"></ts-avatar>
        </ts-avatar-group>
    `,
};

export const Icons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'When no image or initials are set, an icon will be shown. The default avatar shows a generic “user” icon, but you can customize this with the icon slot.',
            },
        },
    },
    render: args => html`
        <ts-avatar
            image=""
            .shape=${args.shape}
            shape=${args.shape}
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
        >
            <ts-icon slot="icon" name="image" size="20"></ts-icon>
        </ts-avatar>

        <ts-avatar
            image=""
            .shape=${args.shape}
            shape=${args.shape}
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
        >
            <ts-icon slot="icon" name="archive" size="20"></ts-icon>
        </ts-avatar>

        <ts-avatar
            image=""
            .shape=${args.shape}
            shape=${args.shape}
            .label=${args.label}
            label=${ifDefined(args.label || undefined)}
            .loading=${args.image ? args.loading : undefined}
            loading=${ifDefined(args.image ? args.loading : undefined)}
        >
            <ts-icon slot="icon" name="home" size="20"></ts-icon>
        </ts-avatar>
    `,
};

export const Trigger: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can use the avatar as a custom trigger for other components, such as dropdowns.',
            },
        },
    },
    render: () => html`
        <ts-dropdown style="height: 150px">
            <div slot="trigger" style="cursor: pointer; user-select: none;">
                <ts-avatar image="/assets/avatar/user1.avif" label="Custom trigger"></ts-avatar>
            </div>
            <ts-menu>
                <ts-menu-item>View Profile</ts-menu-item>
                <ts-menu-item>Settings</ts-menu-item>
                <ts-divider></ts-divider>
                <ts-menu-item>Sign Out</ts-menu-item>
            </ts-menu>
        </ts-dropdown>
    `,
};

export const Tooltip: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can use the avatar as a custom trigger for tooltips.',
            },
        },
    },
    render: () => html`
        <ts-tooltip content="User Name" placement="bottom">
            <ts-avatar image="/assets/avatar/user1.avif" label="Custom trigger"></ts-avatar>
        </ts-tooltip>
    `,
};
