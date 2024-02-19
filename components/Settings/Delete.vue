<template>
    <div class='danger-zone'>
        <div class='content'>
            <h2 class='title'>Delete account</h2>
            <p class='subtitle'>You won't be able to restore it after that</p>
        </div>
        <FormButton class='btn' btn-class='danger' @click='() => isVisible = true'>
            <Icon name='mdi:delete-forever' size='20' />
            <span>Delete</span>
        </FormButton>
    </div>
    <FormModal :is-visible='isVisible' :is-submitting='isSubmitting' @setIsVisible='isVisible = $event' :error='rootError'
        @onClick='deleteAccount'>
        <template #msg>
            Are you sure you want to delete this account?
        </template>
    </FormModal>
</template>

<script setup>
const store = useUserStore();
const { push } = useRouter();
const { userId } = defineProps(['userId']);
const isVisible = ref(false);
const isSubmitting = ref(false);
const rootError = ref(null);

async function deleteAccount() {
    isSubmitting.value = true;
    rootError.value = null;

    const { error } = await useSubmit({
        url: `/api/users/${userId}`,
        method: 'delete',
    });

    if (error) {
        rootError.value = error.msg;
    } else if (store.user.id === userId) {
        useNotification('You have successfully deleted your profile');
        const token = useCookie('token');
        token.value = null;
        store.$reset();
        push('/');
    } else {
        await useUsersStore().fetchUsers();
        push('/admin/users');
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
.danger-zone {
    @include zone(rgb(var(--red)));
    margin-top: 15px;
}
</style>