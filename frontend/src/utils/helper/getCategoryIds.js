import { returnFound } from 'find-and'

const findChildren = (categories, id) => {
  const children = returnFound(categories, { parentId: id })

  if (!children) {
    return [id]
  }

  if (children instanceof Array) {
    return children.map(child => findChildren(categories, child.id))
  }

  return findChildren(categories, children.id)
}

const getCategoryIds = (path, categories) => {
  const pathParts = path.split('/').filter(path => path !== '')
  const slug = pathParts[pathParts.length - 1]

  const category = returnFound(categories, { slug })
  let id = category ? category.id : 0

  return findChildren(categories, id)
}

export default getCategoryIds
