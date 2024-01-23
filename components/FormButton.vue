<template>
    <button class='form-button' :disabled='isSubmitting'>
        <slot name='not-loader' v-if='isSubmitting !== undefined'>
            <Icon v-if='!isSubmitting' name='tabler:check' size='20' />
        </slot>
        <slot name='loader'>
            <Icon v-if='isSubmitting' class='loader' name='tabler:loader' size='20' />
        </slot>
        <slot></slot>
    </button>
</template>

<script setup>
defineProps(['isSubmitting']);
</script>

<style lang='scss' scoped>
@import '~/assets/form-link-btn.scss';
</style>