import jwt from 'jsonwebtoken'

export function jwtValidation(req, res, next) {
  // const authHeader = req.get('Authorization')
  // const token = authHeader.split(' ')[1]
  
  const token = req.cookies.token
  console.log("------------------------------- token")
  console.log(token)
  const verifiedUser = jwt.verify(token, 'secretJWT')
  if (verifiedUser) {
    req.user = verifiedUser.user
    next()
  } else {
    console.log("error en autenticación de JWT")
    res.json({ message: 'Authentication error' })
  }
}
