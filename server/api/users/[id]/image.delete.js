import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            'SELECT name, imageHash from User WHERE id=?', [userId],
        );

        if (user.imageHash) await del(event, user.imageHash);

        await conn.query(
            'UPDATE User SET image=?, imageHash=? WHERE id=?',
            ['/media/avatar.svg', null, userId],
        );

        let msg = 'You have successfully deleted your profile image';
        if (event.context.isAdmin) {
            msg = `You have successfully deleted ${user.name}'s profile image`;
        }

        await conn.commit();
        return { msg };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during delete',
            },
        });
    } finally {
        await conn.end();
    }
});