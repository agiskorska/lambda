import AdmZip from 'adm-zip'

const zip = new AdmZip()

zip.addLocalFile('./dist/index.js')
zip.addLocalFile('./dist/index.js.map')
zip.writeZip('./dist/index.zip')

console.log('created ./dist/index.zip')