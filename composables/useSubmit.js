export default async function ({ url, method = 'get', body = {}, query, headers, fieldsArray }) {
    if (fieldsArray) {
        for (const field of fieldsArray) {
            body[field.id] = field.value;
        }
    }

    const { data, error, status } = await useFetch(url, {
        body: method === 'post' || method === 'patch' ? body : null,
        method,
        query,
        headers,
    });

    if (data.value?.msg && process.browser) {
        const notification = useCookie('notification');
        notification.value = data.value.msg;
    }

    if (status.value === 'error') {
        const err = error?.value?.data?.data;
        if (err?.field) {
            if (fieldsArray) {
                for (const field of fieldsArray) {
                    if (field.id === err.field) {
                        field.error = err.msg;
                        document.querySelector(`#${field.id}`).focus();
                    }
                }
            } else {
                const field = Object.keys(body).length ? body : query.field;
                document.querySelector(`#${err.field}`).focus();
                field.error = err.msg;
            }
        } else {
            return { data: null, error: err?.msg };
        }
    }

    return { data: data.value, error: null };
}