import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);
    const body = await readBody(event);
    const fields = ['password'];

    await validateFields(body, fields);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const { salt, key } = await hash(body.password);

        await conn.query(
            'UPDATE User SET password=? WHERE id=?',
            [`${salt}:${key}`, userId],
        );

        await conn.commit();
        return {
            msg: `You have successfully reset password`,
        };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during password reset',
            },
        });
    } finally {
        await conn.end();
    }
});