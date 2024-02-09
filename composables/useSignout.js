export default async function () {
    useNotification('You have successfully signed out of your account');
    const token = useCookie('token');
    const store = useUserStore();
    const router = useRouter();

    token.value = null;
    store.$reset();
    await router.push('/');
}