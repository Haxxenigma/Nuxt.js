<template>
    <SettingsLayout @onSubmit='onSubmit' :reset='`/users/${user.id}`' :isSubmitting='isSubmitting' :rootError='rootError'>
        <template #form-header>
            <SettingsUpload />
        </template>
        <template #form>
            <FormField v-for='field in fields' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
        </template>
    </SettingsLayout>
</template>

<script setup>
const store = useUserStore();
const user = ref(store.user);
const isSubmitting = ref(false);
const rootError = ref(null);

useHead({
    title: `Settings`,
});

const onSubmit = async () => {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.value.id}`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        await store.fetchUser();
    } else if (error) {
        rootError.value = error;
    }
};

const fields = ref([
    {
        id: 'email',
        label: 'Email',
        value: user.value.email,
        error: '',
    },
    {
        id: 'name',
        label: 'Name',
        value: user.value.name,
        error: '',
    },
    {
        id: 'bio',
        label: 'Bio',
        value: user.value.bio || '',
        error: '',
    },
    {
        type: 'date',
        id: 'birth',
        label: 'Birth',
        value: user.value.birth ? formatDate(user.value.birth) : '',
        error: '',
    },
]);
</script>