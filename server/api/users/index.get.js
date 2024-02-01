import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [users] = await conn.query(
            'SELECT id, name, email, image, bio, birth, createdAt FROM User',
        );

        return users;
    } catch (err) {
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while trying to retrieve users',
            },
        });
    } finally {
        await conn.end();
    }
});