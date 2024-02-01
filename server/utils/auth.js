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
            const config = useRuntimeConfig(event);
            const id = getRouterParam(event, 'id');
            const token = getCookie(event, 'token');
            const { userId } = jwt.verify(token, config.jwtKey);

            if (userId != id && userId != 1) throw new Error();
            if (userId == 1 && userId != id) event.context.isAdmin = true;

            resolve(id);
        } catch (err) {
            reject(
                createError({
                    statusCode: 403,
                }),
            );
        }
    });
}