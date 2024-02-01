<template>
    <div class='search-cnt'>
        <FormButton class='btn inverse wo-outline' @click='showModal = true'>
            <Icon name='material-symbols:search-rounded' size='24' />
        </FormButton>
        <FormModal style='padding: 0;' :isVisible='showModal' @setIsVisible='showModal = $event'>
            <template #msg>
                <form class='form'>
                    <Icon class='icon' name='material-symbols:search-rounded' size='24' />
                    <input class='input' type='text' id='search' name='search' placeholder='Search...' v-model='search'
                        ref='searchInput' />
                    <FormButton class='close-btn inverse wo-outline' type='button' @click='showModal = false'>
                        <Icon name='material-symbols:close-rounded' size='24' />
                    </FormButton>
                </form>
            </template>
            <template #btns>
                <div class='results-cnt'>
                    <div v-if='results?.[0]' class='results'>
                        <h2 class='results-title'>Articles</h2>
                        <FormLink v-for='result in results' class='item inverse' to=''>
                            <Icon name='material-symbols:article-rounded' size='24' />
                            <div class='title'>
                                {{ result.title }}
                            </div>
                        </FormLink>
                    </div>
                    <div v-else class='not-found'>
                        Not Found
                    </div>
                </div>
            </template>
        </FormModal>
    </div>
</template>

<script setup>
const store = useArticlesStore();
const search = defineModel();
const showModal = ref(false);
const results = ref(null);
const searchInput = ref(null);
const timer = ref(null);

watch(() => search.value, async () => {
    clearTimeout(timer.value);
    timer.value = setTimeout(async () => {
        await store.fetchArticles(search.value);
        results.value = store.articles;
    }, 500);
}, { immediate: true });

watch(() => showModal.value, () => {
    if (showModal.value) {
        setTimeout(() => {
            searchInput.value.focus();
        }, 100);
    } else {
        search.value = null;
    }
});
</script>

<style lang='scss' scoped>
.search-cnt {
    .btn {
        padding: 4px;
    }
}

.form-modal {
    .form {
        @include flex($gap: 5px);
        padding: 0 15px;
        border-bottom: 1px solid rgba(var(--fg), 0.1);

        .input {
            flex-grow: 1;
            padding: 16px 15px;
        }

        .close-btn {
            padding: 4px;
        }
    }

    .results-cnt {
        @include flex();
        flex-basis: 100%;
        min-height: 150px;

        .results {
            @include flex(flex-start, $dir: column, $gap: 2px);
            flex-basis: 100%;
            max-height: 500px;
            padding: 8px;
            overflow-y: auto;

            .results-title {
                width: 100%;
                padding: 4px 8px 8px;
                font-size: 14px;
                font-weight: 600;
            }

            .item {
                justify-content: flex-start;
                width: 100%;

                .title {
                    max-width: 600px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .not-found {
            color: rgba(var(--fg), 0.6);
        }
    }
}

@media (max-width: 700px) {
    .form-modal {
        .results-cnt {
            .results {
                .item {
                    .title {
                        max-width: 400px;
                    }
                }
            }
        }
    }
}

@media (max-width: 500px) {
    .form-modal {
        .results-cnt {
            .results {
                .item {
                    .title {
                        max-width: 250px;
                    }
                }
            }
        }
    }
}
</style>