<template>
    <FormButton class='theme-toggle' btn-class='wo-outline' btn-style='padding: 8px;' @click='toggleTheme'>
        <Icon v-if='theme === "dark"' name='material-symbols:dark-mode-outline-rounded' size='24' />
        <Icon v-else name='material-symbols:light-mode-outline-rounded' size='24' />
    </FormButton>
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

function toggleTheme() {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    theme.value = newTheme;
}

useHead({
    htmlAttrs: {
        'data-theme': theme,
    },
});
</script>