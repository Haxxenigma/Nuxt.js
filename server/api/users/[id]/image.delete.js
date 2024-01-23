import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            `SELECT imageHash from User WHERE id='${userId}'`,
        );

        if (user.imageHash) {
            await del(event, user.imageHash);
        }

        await conn.query(
            `UPDATE User SET image=?, imageHash=? WHERE id=?`,
            ['/media/avatar.svg', null, userId],
        );

        await conn.commit();
        return {
            msg: `You have successfully deleted your profile image`,
        };
    } catch (err) {
        console.error(err);
        await conn.rollback();
        throw createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during delete',
            },
        });
    } finally {
        await conn.end();
    }
});