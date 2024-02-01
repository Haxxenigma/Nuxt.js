<template>
    <SettingsLayout>
        <table class='articles-table'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if='articles'>
                <tr v-for='article in articles'>
                    <td>
                        <NuxtLink :to='`/articles/${article.id}`'>{{ article.id }}</NuxtLink>
                    </td>
                    <td>{{ article.title }}</td>
                    <td>{{ article.content }}</td>
                    <td>{{ formatDate(article.createdAt) }}</td>
                    <td>
                        <NuxtLink :to='`/admin/articles/${article.id}`'>
                            Edit
                        </NuxtLink>
                    </td>
                </tr>
            </tbody>
            <tr v-else class='loader'>
                <td colspan='5'>
                    <Loader />
                </td>
            </tr>
        </table>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Articles | Admin Panel' });
const { articles } = useArticlesStore();
</script>

<style lang='scss' scoped>
.articles-table {
    @include table();
}
</style>