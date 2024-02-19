<template>
    <div class='article-index' v-if='article'>
        <nav class='nav'>
            <FormLink v-for='link in isAuthor ? links : links.slice(0, 1)' class='link' :link-class='link.class'
                :to='link.path'>
                <Icon :name='link.icon' size='24' />
                <span>{{ link.label }}</span>
            </FormLink>
            <ArticlesDelete v-if='isAuthor' style='font-size: 14px;' :article='article' />
        </nav>
        <div class='article'>
            <h1 class='title'>{{ article.title }}</h1>
            <ArticlesAuthorInfo :article='article' />
            <div class='thumbnail-cnt'>
                <img class='thumbnail' :src='article.thumbnail' />
            </div>
            <div class='content'>
                <TiptapEditorContent :editor='editor' />
            </div>
        </div>
    </div>
    <Loader v-else />
</template>

<script setup>
const { articles } = useArticlesStore();
const { user } = useUserStore();
const { params } = useRoute();

const article = ref(null);
const isAuthor = ref(false);

watch(() => params.id, (articleId) => {
    const data = articles.find((article) => {
        return article.id == articleId;
    });

    if (data) {
        article.value = data;
    } else {
        showError({ statusCode: 404 });
    }

    isAuthor.value = user?.id === article.value?.authorId;
}, { immediate: true });

const editor = useEditor({
    extensions: useTiptapExtensions(),
    content: article.value.content,
    editable: false,
});

const links = ref([
    {
        path: '/articles',
        label: 'Back',
        icon: 'material-symbols:arrow-back-rounded',
    },
    {
        path: `/articles/${article.value?.id}/edit`,
        label: 'Edit',
        icon: 'material-symbols:ink-pen-outline-rounded',
        class: 'primary',
    },
]);

useHead({ title: `Article | ${article.value?.title}` });
</script>

<style lang='scss'>
.article-index {
    padding: 25px;

    .nav {
        @include flex(flex-start, $gap: 25px);

        .link {
            width: max-content;
            font-size: 14px;
        }
    }

    .article {
        padding: 16px 8px;

        .title {
            font-size: 28px;
            padding: 0 8px;
        }

        .thumbnail-cnt {
            @include flex();
            padding: 16px;

            .thumbnail {
                width: 80%;
            }
        }

        .content {
            overflow: auto;
            background-color: rgba(var(--fg), 0.05);
            border-radius: 8px;

            .tiptap {
                @include html;
            }
        }
    }
}

@media (max-width: 700px) {
    .article-index {
        padding: 16px;

        .nav {
            gap: 10px;

            .link {
                padding: 0.5em;

                span {
                    display: none;
                }
            }
        }

        .article {
            padding: 8px 4px;

            .title {
                font-size: 24px;
            }

            .thumbnail-cnt {
                .thumbnail {
                    width: 100%;
                }
            }

            .content {
                padding: 4px;
            }
        }
    }
}
</style>