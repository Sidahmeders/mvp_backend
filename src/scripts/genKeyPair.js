import crypto from 'crypto'
import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

//Initializing dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

const generateKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
  })

  // Create the public key file
  fs.writeFileSync(resolve(__dirname, '../keys/id_rsa_pub.pem'), keyPair.publicKey)

  // Create the private key file
  fs.writeFileSync(resolve(__dirname, '../keys/id_rsa_priv.pem'), keyPair.privateKey)
}

generateKeyPair()
