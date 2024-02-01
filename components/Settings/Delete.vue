<template>
    <div class='danger-zone'>
        <div class='content'>
            <h2 class='title'>Delete account</h2>
            <h3 class='subtitle'>You won't be able to restore it after that</h3>
        </div>
        <FormButton class='btn danger' @click='() => isVisible = true'>
            <Icon name='mdi:delete-forever' size='20' />
            <span>Delete</span>
        </FormButton>
    </div>
    <FormModal :isVisible='isVisible' :isSubmitting='isSubmitting' @setIsVisible='isVisible = $event' :error='rootError'
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

const deleteAccount = async () => {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${userId}`,
        method: 'delete',
    });

    isSubmitting.value = false;

    if (data && store.user.id === userId) {
        const token = useCookie('token');
        token.value = null;
        store.$reset();
        push('/');
    } else if (data) {
        await useUsersStore().fetchUsers();
        push('/admin/users');
    } else if (error) {
        rootError.value = error;
    }
};
</script>

<style lang='scss' scoped>
.danger-zone {
    @include zone(rgb(var(--red)));
}
</style>