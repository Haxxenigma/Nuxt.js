<template>
    <div class='notification' :class='{ active: notification }'>
        <Icon class='info-icon' name='material-symbols:info-outline-rounded' size='24' />
        {{ notification }}
        <button class='xmark' type='button' @click='notification = null'>
            <Icon name='iconoir:xmark' size='20' />
        </button>
        <div class='progress' :style='`width: ${width}%`' />
    </div>
</template>

<script setup>
const notification = useCookie('notification');
const width = ref(100);

watch(() => notification.value, () => {
    if (notification.value) {
        width.value = 100;
        const timer = setInterval(() => {
            width.value -= 2;
            if (width.value < 0) {
                notification.value = null;
                clearInterval(timer);
            }
        }, 100);
    }
}, { immediate: true });
</script>

<style lang='scss' scoped>
.notification {
    @include flex($gap: 5px);
    position: absolute;
    top: 70px;
    left: 50%;
    padding: 12px;
    color: rgba(var(--fg), 0.9);
    background-color: rgba(var(--bg), 0.8);
    box-shadow: inset 0 0 200px rgba(var(--fg), 0.15);
    border-radius: 8px;
    font-size: 14px;
    overflow: hidden;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 1;

    &.active {
        top: 80px;
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transition: 0.2s;
    }

    .info-icon {
        min-width: 24px;
    }

    .xmark {
        @include flex();
        min-width: 20px;
        color: rgba(var(--fg), 0.6);
        transition: 0.3s;

        &:hover {
            color: rgb(var(--fg));
        }
    }

    .progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: rgb(var(--primary));
        transition: 0.3s;
    }
}

@media (max-width: 600px) {
    .notification {
        top: auto;
        bottom: 70px;
        left: auto;
        right: 0;
        margin: 0 20px;
        transform: none;

        &.active {
            top: auto;
            bottom: 80px;
        }
    }
}
</style>