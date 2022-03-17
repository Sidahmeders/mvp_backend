import firebaseAdmin from 'firebase-admin'
import { firebaseConfig } from '../config/firebase.js'
import getUniqueId from '../utils/lib/uuid.js'

const BUCKET_FULL_PATH = 'themovieplay-cliques.appspot.com'

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  storageBucket: BUCKET_FULL_PATH,
})

const bucket = firebaseAdmin.storage().bucket(BUCKET_FULL_PATH)

// There's no getDownloadUrl() in the Node SDK, createDownloadUrl() construct a download URL manually
// NOTE: this is not a documented feature.
const createDownloadUrl = (filePath, storageDownloadToken) => {
  return Promise.resolve(
    'https://firebasestorage.googleapis.com/v0/b/' +
      bucket.name +
      '/o/' +
      encodeURIComponent(filePath) +
      '?alt=media&token=' +
      storageDownloadToken
  )
}

/**
 * @param {{String}} folderPath - the folder name in which the file will be uploaded
 * @param {(String)} filePath - file path in memory OR fileSystem
 * @param {(String)} fileExtention
 * @returns {Promise} - once resloved will evaluate to unique uri that you can use access the file
 */

export default async function fbFileUpload({ folderPath = '/', filePath, fileExtention }) {
  const storageDownloadToken = getUniqueId()
  const downloadUrl = await createDownloadUrl(
    folderPath + filePath + fileExtention,
    storageDownloadToken
  )

  await bucket.upload(filePath, {
    destination: folderPath + filePath + fileExtention,
    metadata: {
      cacheControl: 'max-age=30506000',
      metadata: {
        firebaseStorageDownloadTokens: storageDownloadToken,
      },
    },
  })

  return String(downloadUrl)
}
