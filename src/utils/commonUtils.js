
/**
 * Generates a random ID using the current date and a random number 0-10000.
 * @returns {String} random ID
 */
export function generateId() {
    const now = Date.now()
    const rand = Math.floor(Math.random() * 10000)
    return `${now}-${rand}`
}
