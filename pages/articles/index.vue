<template>
    <div class='articles-cnt'>
        <nav class='nav'>
            <FormLink class='link' link-class='primary' to='/articles/create'>
                <Icon name='material-symbols:edit-square-outline-rounded' size='24' />
                <span>New</span>
            </FormLink>
        </nav>
        <div class='articles'>
            <div v-for='article in articles' class='article'>
                <NuxtLink class='title' :to='`/articles/${article.id}`'>{{ article.title }}</NuxtLink>
                <ArticlesAuthorInfo :article='article' />
                <div class='content'>
                    <TiptapEditorContent :editor='editors[article.id]' />
                </div>
                <FormLink class='read-more' :to='`/articles/${article.id}`'>
                    <span>Read more</span>
                    <Icon name='material-symbols:arrow-right-alt-rounded' size='20' />
                </FormLink>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({ title: 'Articles' });
const { articles } = useArticlesStore();
const editors = ref({});

articles.forEach((article) => {
    editors.value[article.id] = useEditor({
        extensions: useTiptapExtensions(),
        content: article.content,
    });
});
</script>

<style lang='scss'>
.articles-cnt {
    padding: 25px;

    .nav {
        @include flex(flex-start);

        .link {
            font-size: 14px;
            width: max-content;
        }
    }

    .articles {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        flex-wrap: wrap;
        gap: 30px;
        padding: 16px 8px;

        .article {
            @include flex(space-between, $dir: column);
            flex-basis: calc(50% - 30px);
            padding: 16px 8px 8px;
            background-color: rgba(var(--fg), 0.05);
            border-radius: 8px;

            .title {
                width: 100%;
                padding: 0 8px;
                font-size: 24px;
                transition: 0.2s;

                &:hover {
                    text-shadow: 0 0 8px rgb(var(--fg));
                }
            }

            .content {
                width: 100%;
                max-height: 150px;
                flex-grow: 1;
                padding: 4px 8px;
                color: rgba(var(--fg), 0.8);
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: justify;
                word-break: break-all;

                .tiptap {
                    @include html();
                    padding: 0;
                }
            }

            .read-more {
                width: 100%;
                margin-top: 16px;
                font-size: 14px;

                svg {
                    position: absolute;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.2s;
                    transform: translateX(35px);
                }

                &:hover {
                    svg {
                        opacity: 1;
                        visibility: visible;
                        transform: translateX(50px);
                    }
                }
            }
        }
    }
}

@media (max-width: 800px) {
    .articles-cnt {
        padding: 16px;

        .nav {
            .link {
                padding: 0.5em;

                span {
                    display: none;
                }
            }
        }

        .articles {
            .article {
                flex-basis: 100%;
            }
        }
    }
}
</style>