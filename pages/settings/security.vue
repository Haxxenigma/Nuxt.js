<template>
    <SettingsLayout @onSubmit='onSubmit' :reset='`/users/${user.id}`' :isSubmitting='isSubmitting' :rootError='rootError'>
        <template #form>
            <FormField v-for='field in fields' :error='field.error'>
                <FormInput v-bind='field' type='password' @update:value='field.value = $event'
                    @reset:error='field.error = $event' />
            </FormField>
        </template>
    </SettingsLayout>
</template>

<script setup>
const store = useUserStore();
const user = ref(store.user);
const isSubmitting = ref(false);
const rootError = ref(null);

const onSubmit = async () => {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.value.id}/password`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        fields.value.forEach((field) => {
            field.value = '';
        });
    } else if (error) {
        rootError.value = error;
    }
};

const fields = ref([
    {
        id: 'password1',
        label: 'Current password',
        value: '',
        error: '',
    },
    {
        id: 'password2',
        label: 'New password',
        value: '',
        error: '',
    },
    {
        id: 'password3',
        label: 'Confirm password',
        value: '',
        error: '',
    },
]);
</script>