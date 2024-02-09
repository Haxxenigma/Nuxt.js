import { createConnection } from 'mysql2/promise';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const token = getCookie(event, 'token');
        const { userId } = jwt.verify(token, config.jwtKey);

        const [[user]] = await conn.query(
            'SELECT * FROM User WHERE id=?', [userId],
        );

        const { password, ...userData } = user;
        return { ...userData };
    } catch (err) {
        return createError({
            statusCode: 403,
            data: 'Forbidden',
        });
    } finally {
        await conn.end();
    }
});