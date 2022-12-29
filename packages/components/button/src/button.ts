import type { ExtractPropTypes, PropType } from 'vue';
import type Button from './button.vue';

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonEmits = typeof buttonEmits;

export type ButtonType = '' | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';

export type ButtonNativeType = 'button' | 'submit' | 'reset';

export type ButtonSize = '' | 'default' | 'small' | 'large';

export const buttonProps = {
    size: String as PropType<ButtonSize>,
    type: {
        type: String as PropType<ButtonType>,
    },
    nativeType: {
        type: String as PropType<ButtonNativeType>,
        default: 'button',
    },
    disabled: Boolean,
    autofocus: Boolean,
    round: Boolean,
    plain: Boolean,
    circle: Boolean,
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonInstance = InstanceType<typeof Button>;
