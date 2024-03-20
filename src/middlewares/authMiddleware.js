/**
 * @description Authentication middleware. Check's for a user's token.
 * Uses auth0
 * 
 * @author Tad Decker
 */

import config from '../config/config.js'
import jwt from 'jsonwebtoken'

/**
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
export function requireAuth (req, res, next) {
  const token = req.headers.authorization

  // 401 if no authtoken
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config.key)  
    req.user = {
      userId: decoded.userId,
      username: decoded.username
    }

    next()
  } catch (error) {
    // Invalid token, respond with an error
    res.status(401).json({ error: 'Unauthorized' })
  }
}