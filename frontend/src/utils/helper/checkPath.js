import { returnFound } from 'find-and'

const checkPath = (path, categories) => {
  const pathParts = path.split('/')

  const categorySlugList = pathParts.filter(path => path !== 'category' && path !== '')

  for (const slug of categorySlugList) {
    const check = returnFound(categories, { slug })
    if (check === undefined) {
      return false
    }
  }
  return true
}

export default checkPath
