import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const fields = ['title', 'content', 'authorId'];
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
        const [article] = await conn.query(
            `INSERT INTO Article(
                title, content, authorId, tags, thumbnail
            ) VALUES(?, ?, ?, ?, ?)`,
            [
                body.title,
                body.content,
                body.authorId,
                body.tags || null,
                thumbnail || null,
            ],
        );

        await conn.commit();
        return { articleId: article.insertId };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while creating the article',
            },
        });
    } finally {
        await conn.end();
    }
});