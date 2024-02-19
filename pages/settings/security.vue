<template>
    <SettingsLayout>
        <form class='form' @submit.prevent='update'>
            <FormField v-for='field in fields' class='field' :error='field.error'>
                <FormInput v-bind='field' type='password' @update:value='field.value = $event'
                    @reset:error='field.error = $event' />
            </FormField>
            <div class='btns'>
                <FormLink class='btn' :to='`/users/${user.id}`'>
                    <Icon name='f7:xmark' size='18' />Cancel
                </FormLink>
                <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>Save</FormButton>
            </div>
            <FormError :error='rootError' />
        </form>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Settings | Security' });

const { user } = useUserStore();

const isSubmitting = ref(false);
const rootError = ref(null);

async function update() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.id}/password`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        fields.value.forEach((field) => {
            field.value = '';
            field.error = '';
        });
    } else if (error) {
        rootError.value = error.msg;
    }
}

const fields = ref([
    {
        id: 'current-password',
        label: 'Current password',
        value: '',
        error: '',
    },
    {
        id: 'new-password',
        label: 'New password',
        value: '',
        error: '',
    },
    {
        id: 'password-confirmation',
        label: 'Confirm password',
        value: '',
        error: '',
    },
]);
</script>

<style lang='scss' scoped>
@import '~/assets/settings.scss';
</style>