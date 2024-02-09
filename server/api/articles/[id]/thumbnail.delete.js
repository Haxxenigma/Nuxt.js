import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const articleId = await checkAuth(event);
    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[article]] = await conn.query(
            'SELECT thumbnail FROM Article WHERE id = ?', [articleId],
        );

        if (article.thumbnail) await remove(article.thumbnail);

        await conn.query(
            'UPDATE Article SET thumbnail = ? WHERE id = ?', [null, articleId],
        );

        await conn.commit();
        return { msg: 'You have successfully deleted this article`s thumbnail' };
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while deleting the article`s thumbnail',
            },
        });
    } finally {
        await conn.end();
    }
});