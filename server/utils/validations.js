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

export async function validateImage(image, maxSize) {
    return new Promise((resolve, reject) => {
        if (!image.type.startsWith('image/')) {
            reject(
                createError({
                    statusCode: 400,
                    data: {
                        msg: 'Please, uplaod an image',
                    },
                }),
            );
        } else if (image.data.length > (maxSize || 5242880)) {
            reject(
                createError({
                    statusCode: 400,
                    data: {
                        msg: `Please, uplaod an image no larger than ${(maxSize || 5242880) / 1048576} MB`,
                    },
                }),
            );
        } else {
            resolve();
        }
    });
}