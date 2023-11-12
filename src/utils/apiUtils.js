
/**
 * Send the 400 error, along with an error message.
 * @param {Object} res 
 * @param {String} errorMessage 
 */
export function apiBadRequestError(res, errorMessage) {
    res.status(400).send(errorMessage)
}

/**
 * Send a 404 error, along with an error message.
 * @param {Object} res 
 * @param {String} e 
 * @param {String} errorMessage 
 */
export function apiNotFoundError(res, errorMessage) {
    res.status(404).send(errorMessage)
}

/**
 * Send a 500 error, along with an error message. Console.error the caught error.
 * @param {Object} res
 * @param {String} errorMessage 
 * @param {String} e 
 */
export function apiInternalError(res, errorMessage, e) {
    console.error(e)
    res.status(500).send(errorMessage)
}
