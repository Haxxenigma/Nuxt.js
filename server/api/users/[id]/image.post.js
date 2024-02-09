import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);
    const [formData] = await readMultipartFormData(event);

    await validateImage(formData);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            'SELECT name, imageHash from User WHERE id=?', [userId],
        );

        if (user.imageHash) await del(event, user.imageHash);

        const { link, deletehash } = await post(event, formData.data);

        await conn.query(
            'UPDATE User SET image=?, imageHash=? WHERE id=?',
            [link, deletehash, userId],
        );

        let msg = 'You have successfully updated your profile image';
        if (event.context.isAdmin) {
            msg = `You have successfully updated ${user.name}'s profile image`;
        }

        await conn.commit();
        return { msg };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during update',
            },
        });
    } finally {
        await conn.end();
    }
});