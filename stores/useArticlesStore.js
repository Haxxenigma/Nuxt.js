export const useArticlesStore = defineStore('articles', {
    state: () => ({ articles: null }),
    actions: {
        async fetchArticles(query) {
            const { data } = await useFetch('/api/articles', {
                method: 'get',
                query: { query },
            });
            this.articles = data.value;
        },
    },
});