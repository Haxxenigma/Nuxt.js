import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const { code } = getQuery(event);

    if (!code) {
        return createError({
            statusCode: 400,
            data: {
                msg: 'Code not provided',
            },
        });
    }

    const config = useRuntimeConfig(event);

    const { email, verified_email, name, picture } = await getGoogleUser(config, code);

    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            `SELECT * FROM User WHERE email='${email}'`,
        );

        if (!user) {
            return {
                user: { email, verified_email, name, picture },
                newOAuthUser: true,
            };
        }

        const token = await authenticate(event, user.id);

        return {
            token: token,
            userId: user.id,
            msg: `You have successfully signed in as ${user.name}`,
        };
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during Google OAuth',
            },
        });
    } finally {
        await conn.end();
    }
});