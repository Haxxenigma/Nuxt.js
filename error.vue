<template>
    <div class='error'>
        <h1 class='title'>
            {{ error.statusCode }}
        </h1>
        <h2 class='subtitle'>
            {{ error.statusMessage || error.message || error.description }}
        </h2>
        <button class='btn' @click='redirect'>
            Go Home
        </button>
    </div>
</template>

<script setup>
defineProps(['error']);

const redirect = () => {
    clearError({ redirect: '/' });
};
</script>

<style lang='scss' scoped>
.error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    color: #fff;

    .title {
        font-size: 48px;
    }

    .subtitle {
        color: #aaaaaa;
        font-size: 20px;
    }

    .btn {
        margin: 20px 0;
        padding: 8px 20px;
        border: 1px solid #fff;
        border-radius: 8px;
        transition: 0.3s;

        &:hover {
            background-color: #202020;
        }
    }
}
</style>