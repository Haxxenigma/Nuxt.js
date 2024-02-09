import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, 'id');
    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            'SELECT * FROM User WHERE id=?', [userId],
        );

        if (!user) {
            return createError({
                statusCode: 404,
            });
        }

        const { password, ...userData } = user;
        return { ...userData };
    } catch (err) {
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during user data fetch',
            },
        });
    } finally {
        await conn.end();
    }
});