<template>
    <div class='form-link-cnt' @mousedown='createRipples'>
        <NuxtLink class='form-link' :class='linkClass' :style='linkStyle' :to='to'>
            <slot></slot>
        </NuxtLink>
    </div>
</template>

<script setup>
defineProps(['to', 'linkClass', 'linkStyle']);
</script>

<style lang='scss' scoped>
@import '~/assets/form-link-btn.scss';
</style>