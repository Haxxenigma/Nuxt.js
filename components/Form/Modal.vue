<template>
    <Transition name='modal'>
        <div v-if='isVisible' class='form-modal' @click='$emit("setIsVisible", false)'>
            <div class='content' v-bind='$attrs' @click.stop>
                <div class='msg'>
                    <slot name='msg'></slot>
                </div>
                <slot></slot>
                <div class='btns'>
                    <slot name='btns'>
                        <FormButton type='button' class='btn' btn-style='padding: 8px 24px;'
                            @click='$emit("setIsVisible", false)'>
                            <Icon v-if='isSubmitting !== undefined' name='material-symbols:close-rounded' size='20' />
                            No
                        </FormButton>
                        <FormButton class='btn' btn-class='primary' btn-style='padding: 8px 24px;'
                            :is-submitting='isSubmitting' @click='$emit("onClick")'>
                            Yes
                        </FormButton>
                    </slot>
                </div>
                <div v-if='error' class='error'>
                    <FormError :error='error' />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps(['isVisible', 'isSubmitting', 'error']);
defineEmits(['setIsVisible', 'onClick']);
</script>

<style lang='scss' scoped>
.form-modal {
    @include flex();
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    background-color: #000000af;
    z-index: 100;

    .content {
        @include flex($dir: column);
        margin: 0 10px;
        padding: 20px 40px;
        background-color: rgba(var(--bg), 0.8);
        box-shadow: inset 0 0 300px rgba(var(--fg), 0.1);
        border-radius: 16px;

        .msg {
            width: 100%;
            color: rgba(var(--fg), 0.8);
        }

        .btns {
            @include flex(space-between, $gap: 48px);
            width: 100%;

            .btn {
                width: max-content;
                margin-top: 20px;
                font-size: 14px;
            }
        }

        .error {
            margin-top: 8px;
        }
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s;

    .content {
        transition: 0.2s;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;

    .content {
        opacity: 0;
        transform: scale(0.8);
    }
}
</style>