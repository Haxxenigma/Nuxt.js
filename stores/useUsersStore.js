export const useUsersStore = defineStore('users', {
    state: () => ({ users: null }),
    actions: {
        async fetchUsers() {
            const { data } = await useFetch('/api/users', {
                method: 'get',
            });
            this.users = data.value;
        },
    },
});