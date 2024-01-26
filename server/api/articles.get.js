import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const conn = await createConnection({
        uri: config.databaseURL,
        multipleStatements: true,
    });
    const { query } = getQuery(event);

    try {
        const [articles] = await conn.query(
            `SELECT * FROM Articles ` + (query ? (
                `WHERE title LIKE '%${query}%' OR ` +
                `content LIKE '%${query}%' OR ` +
                `tags LIKE '%${query}%'`
            ) : ''),
        );

        return articles;
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while trying to retrieve articles',
            },
        });
    } finally {
        await conn.end();
    }
});