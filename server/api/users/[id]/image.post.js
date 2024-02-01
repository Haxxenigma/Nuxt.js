import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);
    const [formData] = await readMultipartFormData(event);

    if (!formData.type.startsWith('image/')) {
        return createError({
            statusCode: 400,
            data: {
                msg: 'Please, uplaod an image',
            },
        });
    } else if (formData.data.length > 5242880) {
        return createError({
            statusCode: 400,
            data: {
                msg: 'Please, uplaod an image no larger than 5 MB',
            },
        });
    }

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            `SELECT name, imageHash from User WHERE id='${userId}'`,
        );

        if (user.imageHash) {
            await del(event, user.imageHash);
        }

        const { link, deletehash } = await post(event, formData.data);

        await conn.query(
            `UPDATE User SET image='${link}', imageHash='${deletehash}' WHERE id='${userId}'`,
        );

        let msg = 'You have successfully updated your profile image';
        if (event.context.isAdmin) {
            msg = `You have successfully updated ${user.name}'s profile image`;
        }

        await conn.commit();
        return { link, deletehash, msg };
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