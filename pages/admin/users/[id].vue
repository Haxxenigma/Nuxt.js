<template>
    <SettingsLayout>
        <div class='settings' v-if='fields'>
            <SettingsUpload :user='user' />
            <SettingsForm :user='user' :btnStyles='btnStyles' />
            <form class='password-form' @submit.prevent='update'>
                <FormField v-for='field in fields' :error='field.error'>
                    <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
                </FormField>
                <FormButton :style='btnStyles' class='btn primary' :isSubmitting='isSubmitting'>Save</FormButton>
            </form>
            <SettingsDelete :userId='user.id' />
        </div>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Users | Admin Panel' });

const { users } = useUsersStore();
const { params } = useRoute();

const btnStyles = `gap: 8px;
margin: 4px 0 30px 0;
padding: 8px 28px;`;
const user = ref(null);
const isSubmitting = ref(false);
const fields = ref([{
    id: 'password',
    label: 'New password',
    value: '',
    error: '',
}]);

async function update() {
    isSubmitting.value = true;

    await useSubmit({
        url: `/api/users/${user.value.id}/reset-password`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    fields.value[0].value = '';
    isSubmitting.value = false;
}

user.value = users.find((user) => {
    return user.id == params.id;
});

if (!user.value) showError({ statusCode: 404 });
</script>

<style lang='scss' scoped>
.settings {
    max-height: calc(100vh - 120px - 16px - 60px - 15px);
    padding: 4px 8px;
    overflow-y: auto;
}
</style>