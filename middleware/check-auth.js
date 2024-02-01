export default defineNuxtRouteMiddleware(() => {
    const { user } = useUserStore();

    if (user) {
        return reloadNuxtApp({ path: `/users/${user.id}` });
    }
});