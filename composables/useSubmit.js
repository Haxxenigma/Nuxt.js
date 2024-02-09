export default async function ({ url, method, body = {}, query, headers, fieldsArray }) {
    if (fieldsArray) {
        for (const field of fieldsArray) {
            body[field.id] = field.value;
        }
    }

    const { data, error, status } = await useFetch(url, {
        body: (method === 'post' || method === 'patch') ? body : null,
        method,
        query,
        headers,
    });

    if (data.value?.msg) {
        useNotification(data.value.msg);
    }

    if (status.value === 'error') {
        const err = error?.value?.data?.data;
        if (err?.field && fieldsArray) {
            for (const field of fieldsArray) {
                if (field.id === err.field) {
                    field.error = err.msg;
                    document.querySelector(`#${field.id}`).focus();
                }
            }
        } else {
            return { data: null, error: err };
        }
    }

    return { data: data.value, error: null };
}