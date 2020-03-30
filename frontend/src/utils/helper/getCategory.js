import { returnFound } from 'find-and'

const getCategory = (path, categories) => {
  const pathParts = path.split('/').filter(path => path !== '')

  const slug = pathParts[pathParts.length - 1]
  return returnFound(categories, { slug })
}

export default getCategory
