<template>
    <div class='loader-cnt'>
        <div class='loader'></div>
        <div class='loader-slot'>
            <slot></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.loader-cnt {
    @include flex($dir: column);
    @include loader();
    flex-grow: 1;

    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid rgb(var(--fg));
        border-bottom-color: rgb(var(--primary));
        border-radius: 50%;
    }

    .loader-slot {
        margin-top: 12px;
        color: rgba(var(--fg), 0.8);
    }
}
</style>