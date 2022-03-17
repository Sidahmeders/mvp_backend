import path from 'path'
import fs from 'fs'

const __dirname = path.resolve()

export default function readJsonData(filePath) {
  const jsonData = fs.readFileSync(path.join(`${__dirname}/`, filePath), 'utf8', (err, data) => {
    if (err) throw err
    return data
  })
  return JSON.parse(jsonData)
}
