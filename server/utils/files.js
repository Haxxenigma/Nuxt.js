import { writeFile, rm } from 'fs/promises';
import path from 'path';

export async function upload(file) {
    try {
        const ext = path.extname(file.filename);
        const name = path.basename(file.filename, ext);
        const fileName = `${name}-${Date.now()}${ext}`;
        const fullPath = path.join('public', 'uploads', fileName);
        await writeFile(fullPath, file.data);
        return '/uploads/' + fileName;
    } catch (err) {
        throw createError({
            data: {
                msg: 'An error occurred while uploading the file',
            },
        });
    }
}

export async function remove(filename) {
    try {
        await rm(path.join('public', filename));
    } catch (err) {
        throw createError({
            data: {
                msg: 'An error occurred while deleting the file',
            },
        });
    }
}