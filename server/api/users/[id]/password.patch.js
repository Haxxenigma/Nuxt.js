import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);
    const body = await readBody(event);
    const fields = ['password1', 'password2', 'password3'];

    await validateFields(body, fields);

    if (body.password2 !== body.password3) {
        return createError({
            statusCode: 400,
            data: {
                field: 'password3',
                msg: 'New password must match password confirmation',
            },
        });
    }

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            `SELECT password FROM User WHERE id='${userId}'`,
        );

        if (!user || !(await compare(body.password1, user.password))) {
            return createError({
                statusCode: 401,
                data: {
                    field: 'password1',
                    msg: 'Incorrect password',
                },
            });
        }

        const { salt, key } = await hash(body.password2);

        await conn.query(
            `UPDATE User SET password='${salt}:${key}' WHERE id='${userId}'`,
        );

        await conn.commit();
        return {
            msg: `You have successfully updated your password`,
        };
    } catch (err) {
        console.error(err);
        await conn.rollback();
        throw createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during update',
            },
        });
    } finally {
        await conn.end();
    }
});