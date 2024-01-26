export default defineNuxtRouteMiddleware(() => {
    const { user } = useUserStore();

    if (user) {
        return navigateTo(`/users/${user.id}`);
    }
});