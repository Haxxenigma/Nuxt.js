<template>
    <SettingsLayout>
        <template #form>
            <div class='wrapper'>
                <div class='danger-zone'>
                    <div class='content'>
                        <h2 class='title'>Delete account</h2>
                        <h3 class='subtitle'>You won't be able to restore it after that</h3>
                    </div>
                    <FormButton class='btn danger' @click='() => deleteModal = true'>
                        <Icon name='mdi:delete-forever' size='20' />
                        <span>Delete</span>
                    </FormButton>
                </div>
                <div class='normal-zone'>
                    <div class='content'>
                        <h2 class='title'>Sign Out</h2>
                        <h3 class='subtitle'>This action is usually more common</h3>
                    </div>
                    <FormButton class='btn primary' @click='() => signoutModal = true'>
                        <Icon name='lets-icons:sign-out-squre-fill' size='20' />
                        <span>Sign Out</span>
                    </FormButton>
                </div>
            </div>
        </template>
        <template #btns>
            <div class='btns'>
                <FormLink class='btn inverse' :to='`/users/${user.id}`'>
                    <Icon name='material-symbols-light:arrow-back' size='20' />
                    Exit
                </FormLink>
            </div>
        </template>
    </SettingsLayout>
    <FormModal :isVisible='deleteModal' :isSubmitting='isSubmitting' @setIsVisible='deleteModal = $event' :error='rootError'
        @onClick='deleteAccount'>
        <template #msg>
            Are you sure you want to delete this account?
        </template>
    </FormModal>
    <FormModal :isVisible='signoutModal' :isSubmitting='isSubmitting' @setIsVisible='signoutModal = $event'
        :error='rootError' @onClick='signout'>
        <template #msg>
            Are you sure you want to sign out of this account?
        </template>
    </FormModal>
</template>

<script setup>
const router = useRouter();
const store = useUserStore();
const user = ref(store.user);
const deleteModal = ref(false);
const signoutModal = ref(false);
const isSubmitting = ref(false);
const rootError = ref(null);

useHead({
    title: `Settings | Advanced`,
});

const deleteAccount = async () => {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.value.id}`,
        method: 'delete',
    });

    isSubmitting.value = false;

    if (data) {
        const token = useCookie('token');
        token.value = null;
        store.$reset();
        router.push('/');
    } else if (error) {
        rootError.value = error;
    }
};

const signout = () => {
    const token = useCookie('token');
    const notification = useCookie('notification');
    notification.value = 'You have successfully signed out of your account';
    token.value = null;
    store.$reset();
    router.push('/');
};
</script>

<style lang='scss' scoped>
.wrapper {
    @include flex($dir: column, $gap: 25px);

    .danger-zone,
    .normal-zone {
        @include flex(flex-start);
        width: 100%;
        padding: 14px;
        border: 1px solid rgb(var(--red));
        border-radius: 8px;

        .content {
            flex: 1;

            .subtitle {
                color: rgba(var(--fg), 0.7);
                font-size: 14px;
            }
        }

        .btn {
            margin: 0 8px;
            font-size: 14px;
        }
    }

    .normal-zone {
        border: 1px solid rgb(var(--primary));
    }
}

.btns {
    width: 100%;
    margin-top: 25px;
}

@media (max-width: 700px) {
    .wrapper {

        .danger-zone,
        .normal-zone {
            .btn {
                padding: 8px;

                span {
                    display: none;
                }
            }
        }
    }
}
</style>