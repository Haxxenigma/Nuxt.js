<template>
    <div class='divider'>
        <hr />Or continue with
        <hr />
    </div>
    <div class='auth-providers'>
        <FormButton type='button' class='btn' @click='redirect(genGoogleUrl($config))'>
            <Icon name='logos:google-icon' size='24' />
            Google
        </FormButton>
        <FormButton type='button' class='btn' @click='redirect(genGithubUrl($config))'>
            <Icon name='simple-icons:github' size='24' />
            GitHub
        </FormButton>
    </div>
</template>

<script setup>
let popup = null;
const { push } = useRouter();
const { $patch } = useUserStore();
const cookie = useCookie('token');

function redirect(url) {
    window.removeEventListener('message', recieveMsg);

    if (!popup || popup.closed) {
        const features = 'popup, width=600, height=600, left=100, top=100';
        popup = window.open(url, '_blank', features);
    } else {
        popup.focus();
    }

    window.addEventListener('message', recieveMsg);
}

async function recieveMsg({ data }) {
    if (data.newOAuthUser) {
        const qs = new URLSearchParams(data.user);
        push(`/signup?user=${btoa(qs.toString())}`);
    } else if (data.token) {
        cookie.value = data.token;
        $patch({ user: data.user });
        push(`/users/${data.user.id}`);
    }
}
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
        font-size: 14px;
    }
}
</style>