import readFiles from '../scripts/readFiles.js'

const nodeEnv = process.env.NODE_ENV === 'development'

const fb_conf_filePath = nodeEnv
  ? 'themovieplay-cliques-firebaseadminsdk.secret.json'
  : '../../themovieplay-cliques-firebaseadminsdk.json'

const firebaseConfig = readFiles(fb_conf_filePath)

export { firebaseConfig }
