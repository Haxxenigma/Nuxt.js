<template>
    <div class='wrapper'>
        <form class='form' @submit.prevent='signup'>
            <header class='header'>
                <h1 class='title'>Sign Up</h1>
                <h2 class='subtitle'>Create your account</h2>
            </header>
            <FormField v-for='field in fields.slice(0, 3)' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
            <div class='submit'>
                <FormButton class='btn primary' :isSubmitting='isSubmitting'>Sign Up</FormButton>
            </div>
            <FormError :error='rootError' />
        </form>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'check-auth',
});

useHead({
    title: `Sign Up`,
});

const fields = ref([
    {
        id: 'name',
        label: 'Name',
        value: '',
        error: '',
    },
    {
        id: 'email',
        label: 'Email',
        value: '',
        error: '',
    },
    {
        type: 'password',
        id: 'password',
        label: 'Password',
        value: '',
        error: '',
    },
]);

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const isSubmitting = ref(false);
const rootError = ref(null);

async function signup() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        method: 'post',
        url: '/api/users',
        fieldsArray: fields.value,
    });

    if (data) {
        await store.fetchUser();
        router.push(`/users/${data.userId}`);
    } else if (error) {
        rootError.value = error;
    }

    isSubmitting.value = false;
}

watch(() => route.query.user, (userData) => {
    if (userData) {
        const qs = decodeURIComponent(atob(userData));

        const keyValuePairs = qs.split('&');

        const user = {};
        keyValuePairs.forEach((keyValuePair) => {
            const [key, value] = keyValuePair.split('=');
            user[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        });

        fields.value = [
            {
                id: 'name',
                label: 'Name',
                value: user.name || user.login,
                error: '',
                disabled: true,
            },
            {
                id: 'email',
                label: 'Email',
                value: user.email,
                error: '',
                disabled: true,
            },
            {
                id: 'password',
                label: 'Password',
                value: '',
                error: '',
            },
            {
                id: 'image',
                value: user.picture || user.avatar_url,
            },
            {
                id: 'verified',
                value: (user.verified_email || user.verified) === 'true' ? 1 : 0,
            },
        ];
    }
}, { immediate: true });
</script>

<style lang='scss' scoped>
@import '~/assets/form.scss';
</style>