import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const fields = ['name', 'email', 'password'];

    await validateFields(body, fields);
    await validateEmail(body.email);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const { salt, key } = await hash(body.password);
        const [user] = await conn.query(
            'INSERT INTO User(name, email, password, image, verified) VALUES(?, ?, ?, ?, ?)',
            [body.name, body.email, `${salt}:${key}`, body.image || '/media/avatar.svg', body.verified || 0],
        );

        await authenticate(event, user.insertId);

        await conn.commit();
        return { userId: user.insertId };
    } catch (err) {
        await conn.rollback();
        if (err.code === 'ER_DUP_ENTRY') {
            return createError({
                statusCode: 400,
                data: {
                    field: 'email',
                    msg: 'Email address is already in use',
                },
            });
        }

        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during sign up',
            },
        });
    } finally {
        await conn.end();
    }
});