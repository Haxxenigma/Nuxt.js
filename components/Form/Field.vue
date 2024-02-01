<template>
    <div class='form-field'>
        <div class='form-field-content' :class='{ "is-error": error }'>
            <slot></slot>
        </div>
        <FormError class='form-field-error' :error='error' />
    </div>
</template>

<script setup>
defineProps(['error']);
</script>

<style lang='scss' scoped>
.form-field {
    width: 100%;

    .form-field-content {
        position: relative;
        border-radius: 0.25em;
        overflow: hidden;

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1.5px;
            left: 0;
            bottom: 0;
            background-color: rgb(var(--primary));
            transform-origin: center;
            transition: 0.2s;
            scale: 0;
        }

        &.is-error {
            &::after {
                background-color: rgb(var(--red));
            }
        }

        &:focus-within {
            &::after {
                scale: 1;
            }
        }
    }
}
</style>