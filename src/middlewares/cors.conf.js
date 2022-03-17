export default function corsConfig(req, res, next) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://3.131.137.175',
    'https://themovieplay.com',
  ]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.header({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, authToken',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    })
  }
  next()
}
