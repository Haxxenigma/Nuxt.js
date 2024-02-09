import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);
    // const conn = await createConnection({
    //     uri: config.databaseURL,
    //     multipleStatements: true,
    // });
    // const { query } = getQuery(event);

    try {
        const [articles] = await conn.query(
            'SELECT a.*, u.name as authorName, u.image as authorImage ' +
            'FROM Article a JOIN User u ON a.authorId = u.id',
        );

        // const [articles] = await conn.query(
        //     'SELECT a.*, u.name as authorName, u.image as authorImage ' +
        //     'FROM Article a JOIN User u ON a.authorId = u.id ' + (query ? (
        //         `WHERE title LIKE '%${query}%' OR ` +
        //         `content LIKE '%${query}%' OR ` +
        //         `tags LIKE '%${query}%'` +
        //         'ORDER BY updatedAt DESC'
        //     ) : ''),
        // );

        return articles;
    } catch (err) {
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while trying to retrieve articles',
            },
        });
    } finally {
        await conn.end();
    }
});