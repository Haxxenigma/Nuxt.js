import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const articleId = await checkAuth(event);
    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[article]] = await conn.query(
            'SELECT thumbnail FROM Article WHERE id = ?', [articleId],
        );

        if (article.thumbnail) {
            await remove(article.thumbnail);
        }

        await conn.query(
            'DELETE FROM Article WHERE id = ?', [articleId],
        );

        await conn.commit();
        return;
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while deleting the article',
            },
        });
    } finally {
        await conn.end();
    }
});