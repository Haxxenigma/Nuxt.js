import { exec } from 'child_process';

async function ping(destination) {
    return new Promise((resolve, reject) => {
        const dest = destination.replace(/[&|;<>\-]/g, '');
        const flag = process.platform === 'win32' ? '' : '-c 4';
        exec(`ping ${flag} ${dest}`, (err, stdout, stderr) => {
            if (stderr || err) reject(stderr || err);
            resolve(stdout);
        });
    });
}

export default defineEventHandler(async (event) => {
    try {
        const { destination } = await readBody(event);
        const result = await ping(destination);
        return result;
    } catch (err) {
        return createError({
            statusCode: 400,
            data: {
                field: 'destination',
                msg: err.message || err.split(':')[2] || err,
            },
        });
    }
});