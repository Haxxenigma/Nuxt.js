<template>
    <div class='wrapper'>
        <form class='form' @submit.prevent='signin'>
            <header class='header'>
                <h1 class='title'>Sign In</h1>
                <h2 class='subtitle'>Welcome back!</h2>
            </header>
            <FormField v-for='field in fields' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
            <div class='submit'>
                <FormButton class='btn primary' :isSubmitting='isSubmitting'>Sign In</FormButton>
            </div>
            <FormError :error='rootError' />
            <AuthProviders />
        </form>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'check-auth',
});

useHead({
    title: `Sign In`,
});

const fields = ref([
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

const router = useRouter();
const store = useUserStore();
const isSubmitting = ref(false);
const rootError = ref(null);

async function signin() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        method: 'post',
        url: '/api/auth',
        fieldsArray: fields.value,
    });

    if (data) {
        store.$patch({ user: data.user });
        router.push(`/users/${data.user.id}`);
    } else if (error) {
        rootError.value = error;
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
@import '~/assets/form.scss';
</style>