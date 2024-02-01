<template>
    <div class='form-error'>
        <div v-if='error' class='form-error-content'>
            <Icon name='material-symbols:info-outline-rounded' size='18' />
            <span>{{ error }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps(['error']);
</script>

<style lang='scss' scoped>
.form-error {
    width: 100%;
    height: 24px;
    padding: 2px 8px;
    color: rgb(var(--red));
    font-size: 14px;

    .form-error-content {
        @include flex(flex-start, $gap: 5px);
    }
}
</style>