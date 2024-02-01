import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            `SELECT name, imageHash FROM User WHERE id='${userId}'`,
        );

        if (user.imageHash) {
            await del(event, user.imageHash);
        }

        await conn.query(
            `DELETE FROM User WHERE id='${userId}'`,
        );

        let msg = 'You have successfully deleted your profile';
        if (event.context.isAdmin) {
            msg = `You have successfully deleted ${user.name}'s profile`;
        }

        await conn.commit();
        return { msg };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during deletion',
            },
        });
    } finally {
        await conn.end();
    }
});