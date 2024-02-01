<template>
    <AppHeader />
    <main class='main'>
        <NuxtPage />
    </main>
    <AppFooter />
</template>

<script setup>
const { fetchUser } = useUserStore();
const { fetchUsers } = useUsersStore();
const { fetchArticles } = useArticlesStore();

await callOnce(() => {
    fetchUser();
    fetchUsers();
    fetchArticles();
});
</script>