<template>
    <div class='form-modal' :class='{ "active": isVisible }' @click='$emit("setIsVisible", false)'>
        <div class='content' @click.stop>
            <div class='msg'>
                <slot name='msg'></slot>
            </div>
            <slot></slot>
            <div class='btns'>
                <slot name='btns'>
                    <FormButton type='button' class='btn inverse' @click='$emit("setIsVisible", false)'>
                        <Icon v-if='isSubmitting !== undefined' name='material-symbols:close-rounded' size='20' />
                        No
                    </FormButton>
                    <FormButton class='btn primary' :isSubmitting='isSubmitting' @click='$emit("onClick")'>
                        Yes
                    </FormButton>
                </slot>
            </div>
            <div v-if='error' class='error'>
                <FormError :error='error' />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['isVisible', 'isSubmitting', 'error']);
defineEmits(['setIsVisible', 'onClick']);
</script>

<style lang='scss' scoped>
.form-modal {
    @include flex();
    position: absolute;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    pointer-events: none;
    background-color: #000000af;
    transition: opacity 0.3s;
    z-index: 100;

    .content {
        @include flex($dir: column);
        margin: 0 10px;
        padding: 20px 40px;
        background-color: rgba(var(--bg), 0.8);
        box-shadow: inset 0 0 300px rgba(var(--fg), 0.1);
        border-radius: 16px;
        transform: scale(0.9);
        transition: 0.2s;

        .msg {
            margin: 14px 0;
            color: rgba(var(--fg), 0.8);
        }

        .btns {
            @include flex(space-between, $gap: 48px);
            width: 100%;
            margin-top: 16px;

            .btn {
                padding: 8px 24px;
            }
        }

        .error {
            margin-top: 8px;
        }
    }

    &.active {
        opacity: 1;
        pointer-events: all;

        .content {
            transform: scale(1);
        }
    }
}
</style>