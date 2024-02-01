<template>
    <SettingsLayout>
        <div class='settings' v-if='fields'>
            <SettingsUpload :user='user' />
            <form class='form' @submit.prevent='update'>
                <FormField v-for='field in fields' class='field' :error='field.error'>
                    <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
                </FormField>
                <FormButton class='btn primary' :isSubmitting='isSubmitting'>Save</FormButton>
            </form>
            <form class='password-form' @submit.prevent='onPwdSubmit'>
                <FormField v-for='field in pwdField' :error='field.error'>
                    <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
                </FormField>
                <FormButton class='btn primary' :isSubmitting='isPwdSubmitting'>Save</FormButton>
            </form>
            <SettingsDelete :userId='user.id' />
        </div>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Users | Admin Panel' });

const usersStore = useUsersStore();
const userStore = useUserStore();
const { params } = useRoute();

const user = ref(null);
const fields = ref(null);
const pwdField = ref(null);
const isSubmitting = ref(false);
const isPwdSubmitting = ref(false);

async function update() {
    isSubmitting.value = true;

    const { data } = await useSubmit({
        url: `/api/users/${user.value.id}`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        await userStore.fetchUser();
        await usersStore.fetchUsers();
    }
}

const onPwdSubmit = async () => {
    isPwdSubmitting.value = true;

    await useSubmit({
        url: `/api/users/${user.value.id}/reset-password`,
        fieldsArray: pwdField.value,
        method: 'patch',
    });

    isPwdSubmitting.value = false;
};

user.value = usersStore.users.find((user) => {
    return user.id == params.id;
});

if (user.value) {
    fields.value = [
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
    ];

    pwdField.value = [{
        id: 'password',
        label: 'New password',
        value: '',
        error: '',
    }];
} else {
    showError({ statusCode: 404 });
}
</script>

<style lang='scss' scoped>
.settings {
    max-height: calc(100vh - 120px - 16px - 60px - 15px);
    padding: 4px 8px;
    overflow-y: auto;

    button {
        gap: 8px;
        margin: 4px 0 50px 0;
        padding: 8px 28px;
    }
}
</style>