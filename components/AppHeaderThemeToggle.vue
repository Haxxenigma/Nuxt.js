<template>
    <button class='theme-toggle' @click='toggleTheme'>
        <Icon v-if='theme === "dark"' name='material-symbols:dark-mode-outline-rounded' size='24' />
        <Icon v-else name='material-symbols:light-mode-outline-rounded' size='24' />
    </button>
</template>

<script setup>
const theme = ref('dark');

onMounted(() => {
    const currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
        localStorage.setItem('theme', 'dark');
    } else {
        theme.value = currentTheme;
    }
});

const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    theme.value = newTheme;
};

useHead({
    htmlAttrs: {
        'data-theme': theme,
    },
});
</script>

<style lang='scss' scoped>
.theme-toggle {
    @include flex();
    padding: 4px;
    color: rgba(var(--fg), 0.6);
    background-color: rgb(var(--bg));
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
        color: rgb(var(--fg));
        background-color: rgba(var(--fg), 0.1);
    }
}
</style>