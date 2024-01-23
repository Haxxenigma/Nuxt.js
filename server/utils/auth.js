import jwt from 'jsonwebtoken';

export async function authenticate(event, id) {
    return new Promise((resolve) => {
        const config = useRuntimeConfig(event);
        const token = jwt.sign({
            userId: id,
        }, config.jwtKey, {
            expiresIn: 86400,
        });

        setCookie(event, 'token', token);
        resolve(token);
    });
}

export async function checkAuth(event) {
    return new Promise((resolve, reject) => {
        try {
            const id = getRouterParam(event, 'id');
            const config = useRuntimeConfig(event);
            const token = getCookie(event, 'token');
            const { userId } = jwt.verify(token, config.jwtKey);
            if (!id || id != userId) throw new Error();
            resolve(id);
        } catch (err) {
            console.error(err);
            reject(
                createError({
                    statusCode: 403,
                }),
            );
        }
    });
}