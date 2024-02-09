import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);
    const body = await readBody(event);
    const fields = ['current-password', 'new-password', 'password-confirmation'];

    await validateFields(body, fields);

    if (body['new-password'] !== body['password-confirmation']) {
        return createError({
            statusCode: 400,
            data: {
                field: 'password-confirmation',
                msg: 'New password must match password confirmation',
            },
        });
    }

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            'SELECT password FROM User WHERE id=?', [userId],
        );

        if (!user || !(await compare(body['current-password'], user.password))) {
            return createError({
                statusCode: 401,
                data: {
                    field: 'current-password',
                    msg: 'Incorrect password',
                },
            });
        }

        const { salt, key } = await hash(body['new-password']);

        await conn.query(
            'UPDATE User SET password=? WHERE id=?',
            [`${salt}:${key}`, userId],
        );

        await conn.commit();
        return { msg: 'You have successfully updated your password' };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during update',
            },
        });
    } finally {
        await conn.end();
    }
});