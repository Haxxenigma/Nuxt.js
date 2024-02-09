<template>
    <ArticlesForm v-if='article' :article='article' />
    <Loader v-else />
</template>

<script setup>
useHead({ title: 'Editing article' });

const { articles } = useArticlesStore();
const { user } = useUserStore();
const { params } = useRoute();

const article = ref(null);

watch(() => params.id, (articleId) => {
    const data = articles.find((article) => {
        return article.id == articleId;
    });

    if (data && data.authorId === user.id) {
        article.value = data;
    } else {
        showError({ statusCode: 404 });
    }
}, { immediate: true });
</script>