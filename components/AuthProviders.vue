<template>
    <div class='divider'>
        <hr />Or continue with
        <hr />
    </div>
    <div class='auth-providers'>
        <FormButton type='button' class='btn inverse' @click='redirect(genGoogleUrl($config))'>
            <Icon name='logos:google-icon' size='24' />
            Google
        </FormButton>
        <FormButton type='button' class='btn inverse' @click='redirect(genGithubUrl($config))'>
            <Icon name='simple-icons:github' size='24' />
            GitHub
        </FormButton>
    </div>
</template>

<script setup>
let popup = null;
const router = useRouter();
const cookie = useCookie('token');
const store = useUserStore();

const redirect = (url) => {
    window.removeEventListener('message', recieveMsg);

    if (!popup || popup.closed) {
        popup = window.open(url, '_blank', 'popup, width=600, height=600');
    } else {
        popup.focus();
    }

    window.addEventListener('message', recieveMsg);
};

const recieveMsg = async ({ data }) => {
    if (data.newOAuthUser) {
        const qs = new URLSearchParams(data.user);
        router.push(`/signup?user=${btoa(qs.toString())}`);
    } else if (data.token) {
        cookie.value = data.token;
        await store.fetchUser();
        router.push(`/users/${data.userId}`);
    }
};
</script>

<style lang='scss' scoped>
.divider {
    @include flex($gap: 5px);
    width: 100%;
    color: rgba(var(--fg), 0.6);
    font-size: 14px;
    text-wrap: nowrap;

    hr {
        width: 100%;
        height: 1px;
        background-color: rgba(var(--fg), 0.1);
    }
}

.auth-providers {
    @include flex($gap: 35px);
    width: 100%;
    margin: 10px 0;

    .btn {
        width: 100%;
        background-color: transparent;
        font-size: 14px;

        &:hover {
            background-color: rgba(var(--fg), 0.05);
        }

        &:active {
            background-color: rgba(var(--fg), 0.07);
        }
    }
}
</style>