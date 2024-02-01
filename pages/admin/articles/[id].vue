<template>
    <SettingsLayout>
        <div class='settings' v-if='fields'>
            <form class='form' @submit.prevent='update'>
                <FormField v-for='field in fields' class='field' :error='field.error'>
                    <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
                </FormField>
                <FormButton class='btn primary' :isSubmitting='isSubmitting'>Save</FormButton>
            </form>
        </div>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Articles | Admin Panel' });

const store = useArticlesStore();
const { params } = useRoute();

const article = ref(null);
const fields = ref(null);
const isSubmitting = ref(false);

async function update() {
    isSubmitting.value = true;

    const { data } = await useSubmit({
        url: `/api/articles/${article.value.id}`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        await store.fetchArticles();
    }
}

article.value = store.articles.find((article) => {
    return article.id == params.id;
});

if (article.value) {
    fields.value = [
        {
            id: 'title',
            label: 'Title',
            value: article.value.title,
            error: '',
        },
        {
            id: 'content',
            label: 'Content',
            value: article.value.content,
            error: '',
        },
        {
            id: 'tags',
            label: 'tags',
            value: article.value.tags,
            error: '',
        },
    ];
} else {
    showError({ statusCode: 404 });
}
</script>

<style lang='scss' scoped>
.settings {
    max-height: calc(100vh - 120px - 16px - 60px - 15px);
    padding: 4px 8px;
    overflow-y: auto;

    button {
        gap: 8px;
        margin: 4px 0 50px 0;
        padding: 8px 28px;
    }
}
</style>