export async function post(event, buffer) {
    const config = useRuntimeConfig(event);
    const { data: { link, deletehash } } = await $fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        body: buffer,
        headers: {
            'Authorization': `Client-ID ${config.public.imgurOAuthClientID}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return { link, deletehash };
}

export async function del(event, hash) {
    const config = useRuntimeConfig(event);
    await $fetch(`https://api.imgur.com/3/image/${hash}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Client-ID ${config.public.imgurOAuthClientID}`,
        },
    });
}