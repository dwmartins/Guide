import imageCompression from 'browser-image-compression';

export async function compressImage(file) {
    const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1024,
        useWebWorker: true
    }
    
    return await imageCompression(file, options);
}