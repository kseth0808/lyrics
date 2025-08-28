export const cleanLyrics = (rawLyrics) => {
    return rawLyrics
        .replace(/<[^>]*>/g, '')
        .replace(/Read More.*/gi, '')
        .replace(/\bLyrics\b/gi, '')
        .replace(/[\[\(].*?[\]\)]/g, '')
        .replace(/Translations.*$/gim, '')
        .replace(/Embed\s*$/gim, '')
        .replace(/^\d+\s*(Contributors)?/gim, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/You might also like.*$/gim, '')
        .replace(/Lyrics powered by.*$/gim, '')
        .replace(/[•→★☆※§¤♦]/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/(\r?\n){2,}/g, '\n')
        .trim();
};
