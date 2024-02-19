<template>
    <div class='form-cnt'>
        <form class='form' @submit.prevent='signin'>
            <header class='header'>
                <h1 class='title'>Sign In</h1>
                <p class='subtitle'>Welcome back!</p>
            </header>
            <FormField v-for='field in fields' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
            <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>Sign In</FormButton>
            <FormError :error='rootError' />
            <AuthProviders />
        </form>
    </div>
</template>

<script setup>
definePageMeta({ middleware: 'check-auth' });
useHead({ title: 'Sign In' });

const { $patch } = useUserStore();
const { push } = useRouter();

const isSubmitting = ref(false);
const rootError = ref(null);

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

async function signin() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        method: 'post',
        url: '/api/auth',
        fieldsArray: fields.value,
    });

    if (data) {
        $patch({ user: data.user });
        push(`/users/${data.user.id}`);
    } else if (error) {
        rootError.value = error.msg;
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
@import '~/assets/form.scss';
</style>