import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const articleId = await checkAuth(event);
    const formData = await readMultipartFormData(event);
    const fields = ['title', 'content'];
    const body = {};
    let image = null;
    let thumbnail = null;

    for (const data of formData) {
        if (data.name === 'thumbnail') {
            image = data;
        } else {
            body[data.name] = data.data.toString();
        }
    }

    await validateFields(body, fields);
    if (image.data.toString()) {
        await validateImage(image, 10485760);
        thumbnail = await upload(image);
    }

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        if (thumbnail) {
            const [[article]] = await conn.query(
                'SELECT thumbnail FROM Article WHERE id = ?', [articleId],
            );

            if (article.thumbnail) await remove(article.thumbnail);
        }

        await conn.query(
            'UPDATE Article SET title = ?, content = ?, tags = ?' +
            (thumbnail ? ', thumbnail = ?' : '') + ' WHERE id = ?',
            [
                body.title,
                body.content,
                body.tags || null,
                thumbnail ? thumbnail : articleId,
                articleId,
            ],
        );

        await conn.commit();
        return { succes: true };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while updating the article',
            },
        });
    } finally {
        await conn.end();
    }
});