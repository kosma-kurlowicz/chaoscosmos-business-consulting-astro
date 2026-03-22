/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns A slugified string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[ś]+/g, 's')
        .replace(/[ą]+/g, 'a')
        .replace(/[ę]+/g, 'e')
        .replace(/[ó]+/g, 'o')
        .replace(/[ł]+/g, 'l')
        .replace(/[ż]+/g, 'z')
        .replace(/[ź]+/g, 'z')
        .replace(/[ć]+/g, 'c')
        .replace(/[ń]+/g, 'n')
        .replace(/&/g, 'i')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}
