import mime from 'mime'
import fbFileUpload from '../firebase/firebase.js'

function singleFileUpload({ folderPath, fileName }) {
  return async (req, res, next) => {
    const files = req.files
    if (!files) {
      next()
      return
    }

    try {
      const file = files[fileName]
      const { filePath, fileExtention } = getFileInfo(file)
      const downloadUrl = await fbFileUpload({ folderPath, filePath, fileExtention })

      res.locals.fileURL = downloadUrl
      next()
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}

function multipleFilesUplaod({ folderPath, namesList }) {
  return async (req, res, next) => {
    const files = req.files
    if (!files) {
      next()
      return
    }

    try {
      limitFilesUpload(namesList)
      const filesURLs = []

      for (let fileName of namesList) {
        const file = files[fileName]
        const { filePath, fileExtention } = getFileInfo(file)
        const downloadUrl = await fbFileUpload({ folderPath, filePath, fileExtention })
        filesURLs.push({ fileName, url: downloadUrl })
      }

      res.locals.filesURLs = filesURLs
      next()
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}

function getFileInfo(file) {
  const filePath = file.tempFilePath
  const fileExtention = getFileExtension(file)
  return {
    filePath,
    fileExtention,
  }
}

function getFileExtension(file) {
  if (!file) {
    throw Error('file is null or undefined')
  }
  const extension = '.' + mime.extension(file.mimetype)
  return String(extension)
}

function limitFilesUpload(namesList) {
  if (namesList.length < 2) {
    throw Error(`expacted 2 or more file names. but got ${namesList.length}`)
  }
  if (namesList.length > 4) {
    throw Error(`you are trying to upload more than ${namesList.length} which is not recommended.`)
  }
}

// TODO: LIMIT FILES SIZE
// const fileSizeLimits = {
//   small: 10000, // 10-KB
//   medium: 1000000, // 1-MB
//   large: 1000000 * 10, // 10-MB
// }

const uploadFiles = Object.freeze({
  single(folderPath, fileName) {
    return singleFileUpload({ folderPath, fileName })
  },
  multiple(folderPath, fileNames) {
    return multipleFilesUplaod({ folderPath, namesList: fileNames })
  },
})

export default uploadFiles
