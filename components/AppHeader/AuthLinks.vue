<template>
    <div class='auth-links'>
        <FormLink v-if='!$route.path.startsWith(`/signin`)' class='link' to='/signin'>
            <Icon name='lets-icons:sign-in-squre-fill' size='20' />
            <span>Sign In</span>
        </FormLink>
        <FormLink v-if='!$route.path.startsWith(`/signup`)' class='link' link-class='primary' to='/signup'>
            <Icon name='lets-icons:user-add' size='20' />
            <span>Sign Up</span>
        </FormLink>
    </div>
</template>

<style lang='scss'>
.auth-links {
    @include flex(space-between, $gap: 24px);

    .link {
        font-size: 14px;
    }
}

@media (max-width: 600px) {
    .auth-links {
        gap: 8px;

        .link {
            span {
                display: none;
            }
        }
    }
}
</style>