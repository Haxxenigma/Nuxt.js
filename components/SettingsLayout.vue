<template>
    <div class='settings-cnt'>
        <div class='title-cnt'>
            <h1 class='title'>
                <div class='title-link-cnt'>
                    <NuxtLink class='title-link' to='/settings'>Settings</NuxtLink>
                    <span class='title-link-path'>{{ path ? path : '' }}</span>
                </div>
                <FormButton class='nav-btn inverse' @click='isNavExpanded = !isNavExpanded'>
                    <Transition name='nav-icon' mode='out-in'>
                        <Icon v-if='!isNavExpanded' name='ic:round-menu' size='30' />
                        <Icon v-else name='iconoir:xmark' size='30' />
                    </Transition>
                </FormButton>
            </h1>
        </div>
        <div class='settings'>
            <div class='nav' :class='{ active: isNavExpanded }' @click='isNavExpanded = false'>
                <FormLink v-for='link in links' class='link inverse-primary' :to='link.path'>
                    <Icon :name='link.icon' size='24' />
                    {{ link.label }}
                </FormLink>
            </div>
            <div class='content'>
                <slot name='form-header'></slot>
                <form class='form' @submit.prevent='$emit("onSubmit")'>
                    <slot name='form'></slot>
                    <slot name='btns'>
                        <div class='btns'>
                            <FormLink class='btn inverse' :to='reset'>
                                <Icon name='f7:xmark' size='20' />
                                Cancel
                            </FormLink>
                            <FormButton class='btn primary' :isSubmitting='isSubmitting'>Save</FormButton>
                        </div>
                    </slot>
                    <FormError :error='rootError' />
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['reset', 'isSubmitting', 'rootError']);
defineEmits(['onSubmit']);

const route = useRoute();
const isNavExpanded = ref(false);
const endPath = ref(route.fullPath.slice(9));
const path = endPath.value ? (
    endPath.value[0] +
    endPath.value[1].toUpperCase() +
    endPath.value.slice(2)
) : null;

const links = ref([
    {
        label: 'General',
        icon: 'fa6-solid:user-gear',
        path: '/settings',
    },
    {
        label: 'Security',
        icon: 'material-symbols:shield-locked-sharp',
        path: '/settings/security',
    },
    {
        label: 'Advanced',
        icon: 'fluent:beaker-settings-16-filled',
        path: '/settings/advanced',
    },
]);
</script>

<style lang='scss' scoped>
@import '~/assets/settings.scss';
</style>