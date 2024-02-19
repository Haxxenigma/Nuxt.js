<template>
    <div class='form-button-cnt'>
        <button class='form-button' :class='btnClass' :type='type' :style='btnStyle' :disabled='isSubmitting'
            @mousedown='createRipples'>
            <slot name='not-loader' v-if='isSubmitting !== undefined'>
                <Icon v-if='!isSubmitting' name='tabler:check' size='20' />
            </slot>
            <slot name='loader'>
                <Icon v-if='isSubmitting' class='loader' name='tabler:loader' size='20' />
            </slot>
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
defineProps(['type', 'isSubmitting', 'btnClass', 'btnStyle']);
</script>

<style lang='scss'>
@import '~/assets/form-link-btn.scss';
</style>