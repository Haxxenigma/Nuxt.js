export const useUserStore = defineStore('user', {
    state: () => ({ user: null }),
    actions: {
        async fetchUser() {
            const { data } = await useFetch('/api/auth', {
                method: 'get',
            });
            this.user = data.value;
        },
    },
});