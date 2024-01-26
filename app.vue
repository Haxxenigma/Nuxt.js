<template>
    <AppHeader />
    <main class='main'>
        <NuxtPage />
    </main>
    <AppFooter />
</template>

<script setup>
const { fetchUser } = useUserStore();
await callOnce(() => {
    fetchUser();
});
</script>