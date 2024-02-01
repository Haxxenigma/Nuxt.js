import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const fields = ['email', 'password'];

    await validateFields(body, fields);
    await validateEmail(body.email);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            `SELECT * FROM User WHERE email='${body.email}'`,
        );

        if (user && await compare(body.password, user.password)) {
            await authenticate(event, user.id);

            const { password, ...userData } = user;

            return {
                user: { ...userData },
                msg: `You have successfully signed in as ${user.name}`,
            };
        }

        return createError({
            statusCode: 401,
            data: {
                field: 'password',
                msg: 'Incorrect login or password entered',
            },
        });
    } catch (err) {
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during sign in',
            },
        });
    } finally {
        await conn.end();
    }
});