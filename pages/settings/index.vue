<template>
    <SettingsLayout>
        <SettingsUpload :user='user' />
        <form class='form' @submit.prevent='update'>
            <FormField v-for='field in fields' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
            <div class='btns'>
                <FormLink class='btn inverse' :to='`/users/${user.id}`'>
                    <Icon name='f7:xmark' size='20' />Cancel
                </FormLink>
                <FormButton class='btn primary' :isSubmitting='isSubmitting'>Save</FormButton>
            </div>
            <FormError :error='rootError' />
        </form>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Settings' });

const { fetchUsers } = useUsersStore();
const { fetchUser, user } = useUserStore();

const isSubmitting = ref(false);
const rootError = ref(null);

async function update() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.id}`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        await fetchUser();
        await fetchUsers();
    } else if (error) {
        rootError.value = error;
    }
}

const fields = ref([
    {
        id: 'email',
        label: 'Email',
        value: user.email,
        error: '',
    },
    {
        id: 'name',
        label: 'Name',
        value: user.name,
        error: '',
    },
    {
        id: 'bio',
        label: 'Bio',
        value: user.bio || '',
        error: '',
    },
    {
        type: 'date',
        id: 'birth',
        label: 'Birth',
        value: user.birth ? formatDate(user.birth) : '',
        error: '',
    },
]);
</script>

<style lang='scss' scoped>
@import '~/assets/settings.scss';
</style>