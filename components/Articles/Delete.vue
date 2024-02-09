<template>
    <FormLink class='link danger' v-bind='$attrs' @click='isVisible = true'>
        <Icon name='material-symbols:delete-forever-outline-rounded' size='24' />
        <span>Delete</span>
    </FormLink>
    <FormModal :isVisible='isVisible' :isSubmitting='isSubmitting' @setIsVisible='isVisible = $event' @onClick='delArticle'>
        Are you sure you want to delete this article?
    </FormModal>
</template>

<script setup>
const { path } = useRoute();
const { push } = useRouter();
const { user } = useUserStore();
const { fetchArticles } = useArticlesStore();
const { article } = defineProps(['article']);

const isSubmitting = ref(false);
const isVisible = ref(false);

async function delArticle() {
    isSubmitting.value = true;

    const { error } = await useSubmit({
        url: `/api/articles/${article.id}`,
        method: 'delete',
    });

    if (!error) {
        await fetchArticles();
        const url = path.startsWith('/admin') ? '/admin/articles' : '/articles';
        useNotification('You have successfully deleted this article');
        push(url);
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
@media (max-width: 700px) {
    .link {
        padding: 0.5em;

        span {
            display: none;
        }
    }
}
</style>