import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import fileUpload from 'express-fileupload'
import corsConfig from './middlewares/cors.conf.js'

import ApiRoutes from './routes/index.js'

const app = express()
const __dirname = path.resolve()

app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(express.static(path.join(__dirname, 'src/public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '/tempMedia'),
  })
)
// middleware for cross-origin-policy
app.use((req, res, next) => corsConfig(req, res, next))

app.get('/', (_, res) => res.render('index'))
app.get('/sidebar', (_, res) => res.render('partials/sidebar'))
app.get('/reset-password', (_, res) => res.render('reset-password'))

app.use('/api', ApiRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app server running on port ${PORT}...`))

export default app
