<template>
    <Loader>Authenticating...</Loader>
</template>

<script setup>
definePageMeta({ middleware: 'check-auth' });
useHead({ title: 'Authenticating...' });

const { query } = useRoute();

watch(() => query.code, async (code) => {
    if (code) {
        let url = '/api/auth/github';

        if (query.state === 'googleOAuth') {
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