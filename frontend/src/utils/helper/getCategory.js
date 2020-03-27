import { returnFound } from 'find-and'

const getCategory = (path, categories) => {
  const pathParts = path.split('/')
  const slug = pathParts[pathParts.length - 1]
  return returnFound(categories, { slug })
}

export default getCategory
