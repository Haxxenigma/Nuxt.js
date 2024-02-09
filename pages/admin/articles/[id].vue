<template>
    <SettingsLayout>
        <div v-if='article' class='settings'>
            <ArticlesForm :article='article'>
                <div class='danger-zone'>
                    <div class='content'>
                        <h2 class='title'>Delete this article</h2>
                        <h3 class='subtitle'>You won't be able to restore it after that</h3>
                    </div>
                    <ArticlesDelete style='font-size: 14px;' :article='article' />
                </div>
            </ArticlesForm>
        </div>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Articles | Admin Panel' });
const { articles } = useArticlesStore();
const { params } = useRoute();
const article = ref(null);

article.value = articles.find((article) => {
    return article.id == params.id;
});

if (!article.value) {
    showError({ statusCode: 404 });
}
</script>

<style lang='scss' scoped>
.settings {
    max-height: calc(100vh - 120px - 16px - 60px - 15px);
    padding: 4px 8px;
    overflow-y: auto;

    .danger-zone {
        @include zone(rgb(var(--red)));
    }
}
</style>