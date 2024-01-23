import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);
    const body = await readBody(event);
    const fields = ['name', 'email'];

    await validateFields(body, fields);
    await validateEmail(body.email);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        await conn.query(
            `UPDATE User SET email=?, name=?, bio=?, birth=?` +
            ` WHERE id=?`,
            [body.email, body.name, body.bio, body.birth || null, userId],
        );

        await conn.commit();
        return {
            msg: `You have successfully updated your profile`,
        };
    } catch (err) {
        console.error(err);
        await conn.rollback();
        if (err.code === 'ER_DUP_ENTRY') {
            throw createError({
                statusCode: 400,
                data: {
                    field: 'email',
                    msg: 'Email address is already in use',
                },
            });
        }

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