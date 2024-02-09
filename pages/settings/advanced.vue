<template>
    <SettingsLayout>
        <div class='wrapper'>
            <SettingsDelete :userId='user?.id' />
            <div class='normal-zone'>
                <div class='content'>
                    <h2 class='title'>Sign Out</h2>
                    <h3 class='subtitle'>This action is usually more common</h3>
                </div>
                <FormButton class='btn primary' @click='() => isVisible = true'>
                    <Icon name='lets-icons:sign-out-squre-fill' size='20' />
                    <span>Sign Out</span>
                </FormButton>
            </div>
        </div>
        <div class='btns'>
            <FormLink class='btn inverse' :to='`/users/${user?.id}`'>
                <Icon name='material-symbols-light:arrow-back' size='20' />
                Exit
            </FormLink>
        </div>
    </SettingsLayout>
    <FormModal :isVisible='isVisible' :isSubmitting='false' @setIsVisible='isVisible = $event' @onClick='useSignout'>
        <template #msg>
            Are you sure you want to sign out of this account?
        </template>
    </FormModal>
</template>

<script setup>
useHead({ title: 'Settings | Advanced' });
const { user } = useUserStore();
const isVisible = ref(false);
</script>

<style lang='scss' scoped>
@import '~/assets/settings.scss';

.wrapper {
    @include flex($dir: column, $gap: 25px);

    .normal-zone {
        @include zone(rgb(var(--primary)));
    }
}
</style>