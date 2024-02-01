<template>
    <div class='wrapper'>
        <form class='form' @submit.prevent='signup'>
            <header class='header'>
                <h1 class='title'>Sign Up</h1>
                <p class='subtitle'>Create your account</p>
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
definePageMeta({ middleware: 'check-auth' });
useHead({ title: 'Sign Up' });

const { fetchUsers } = useUsersStore();
const { fetchUser } = useUserStore();
const { push } = useRouter();
const { query } = useRoute();

const isSubmitting = ref(false);
const rootError = ref(null);
const user = ref({});

watch(() => query.user, (userData) => {
    if (userData) {
        const qs = decodeURIComponent(atob(userData));

        const keyValuePairs = qs.split('&');

        keyValuePairs.forEach((keyValuePair) => {
            const [key, value] = keyValuePair.split('=');
            user.value[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        });
    }
}, { immediate: true });

const fields = ref([
    {
        id: 'name',
        label: 'Name',
        value: user.value?.name || user.value?.login || '',
        error: '',
    },
    {
        id: 'email',
        label: 'Email',
        value: user.value?.email || '',
        error: '',
        disabled: user.value?.email || false,
    },
    {
        type: 'password',
        id: 'password',
        label: 'Password',
        value: '',
        error: '',
    },
    {
        id: 'image',
        value: user.value?.picture || user.value?.avatar_url || null,
    },
    {
        id: 'verified',
        value: (user.value?.verified_email || user.value?.verified) === 'true' ? 1 : 0,
    },
]);

async function signup() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        method: 'post',
        url: '/api/users',
        fieldsArray: fields.value,
    });

    if (data) {
        await fetchUser();
        await fetchUsers();
        push(`/users/${data.userId}`);
    } else if (error) {
        rootError.value = error;
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
@import '~/assets/form.scss';
</style>