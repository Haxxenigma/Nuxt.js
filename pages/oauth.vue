<template>
    <Loader>Authenticating...</Loader>
</template>

<script setup>
const route = useRoute();

watch(() => route.query.code, async (code) => {
    if (code) {
        let url = '/api/auth/github';

        if (route.query.state === 'googleOAuth') {
            url = '/api/auth/google';
        }

        const { data, error } = await useSubmit({
            url: url,
            method: 'get',
            query: { code },
        });

        if (data) {
            if (window?.opener) {
                const obj = await JSON.parse(JSON.stringify(data));
                window.opener.postMessage(obj);
                window.close();
            }
        } else if (error) {
            console.error(error);
        }
    }
}, { immediate: true });
</script>