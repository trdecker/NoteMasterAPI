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
export async function requireAuth (req, res, next) {
    try {
      console.log('in require auth!')
      const token = req.headers.authorization

      // 401 if no authtoken
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      console.log('\ntoken: ', token)
      // const kid = 'oyyc-IPjaEY8xPFnUgZjV' // Where do I get the kid??? This is for sure the signing token I need to be accessing.

      // const test = await config.client.getSigningKeys()

      // console.log('\n\ntest:', Object.keys(test[1]) ?? 'none')
      // console.log('\n\npublicKey:', test[1]?.getPublicKey() ?? 'none')      
      // console.log('\n\nrsaPublicKey:', test[0]?.rsaPublicKey ?? 'none')      
      // console.log('\n\nkid:', test[1]?.kid ?? 'none')      
      // console.log('\n\nalg:', test[1]?.alg ?? 'none')

      // const signingKey = await config.client.getSigningKey(test[1].kid)

      // console.log('\n\nsigning key:', signingKey)
      // if (!signingKey) {
      //   return res.status('401').json({ error: 'No signing key' })
      // }

      const decoded = jwt.verify(
        token, 
        config.key // Running into issues here
      )
      
      console.log('\n\ndecoded:', decoded)

      console.log('verified jwt')
      req.user = decoded.sub

      next()
    } catch (error) {
      console.error(error)
      // Invalid token, respond with an error
      res.status(401).json({ error: 'Unauthorized' })
    }
  }