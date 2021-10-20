import importTransformation from 'quasar/dist/transforms/import-transformation.js'

export const importQuasarRegex = /import\s*\{([\w,\s]+)\}\s*from\s*['"]{1}quasar['"]{1}/
export const jsTransformRegex = /\.js$/

export function jsTransform (code) {
  return code.replace(
    importQuasarRegex,
    (_, match) => match.split(',')
      .map(identifier => {
        const data = identifier.split(' as ')
        const importName = data[0].trim()
        const importAs = data[1] !== void 0
          ? data[1].trim()
          : importName

        return `import ${importAs} from '${importTransformation(importName)}'\n`
      })
      .join('')
  )
}
