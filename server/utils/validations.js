export async function validateFields(body, fields) {
    return new Promise((resolve, reject) => {
        try {
            for (const field of fields) {
                if (!body[field]) {
                    reject(
                        createError({
                            statusCode: 400,
                            data: {
                                field,
                                msg: `${field[0].toUpperCase() + field.slice(1)} is required`,
                            },
                        }),
                    );
                }
            }
            resolve();
        } catch (err) {
            reject(
                createError({
                    statusCode: 400,
                    data: {
                        msg: `${fields} are required`,
                    },
                }),
            );
        }
    });
}

export async function validateEmail(email) {
    return new Promise((resolve, reject) => {
        const isValid = /\S+@\S+\.\S+/.test(email);

        if (isValid) {
            resolve();
        } else {
            reject(
                createError({
                    statusCode: 400,
                    data: {
                        field: 'email',
                        msg: `Invalid email format`,
                    },
                }),
            );
        }
    });
}