<template>
    <div class='auth-links'>
        <FormLink v-for='link in links' :to='link.path' :class='`link ${link.class}`'>
            <Icon :name='link.icon' size='20' />
            <span>{{ link.label }}</span>
        </FormLink>
    </div>
</template>

<script setup>
const links = ref([
    {
        label: 'Sign In',
        path: '/signin',
        icon: 'lets-icons:sign-in-squre-fill',
        class: 'inverse',
    },
    {
        label: 'Sign Up',
        path: '/signup',
        icon: 'lets-icons:user-add',
        class: 'primary',
    },
]);
</script>

<style lang='scss' scoped>
.auth-links {
    @include flex(space-between, $gap: 25px);

    .link {
        font-size: 14px;

        &.router-link-exact-active {
            display: none;
        }
    }
}

@media (max-width: 600px) {
    .auth-links {
        gap: 8px;

        .link {
            padding: 8px;

            span {
                display: none;
            }
        }
    }
}
</style>