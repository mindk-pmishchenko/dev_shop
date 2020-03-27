import { returnFound } from 'find-and'

const checkPath = (path, categories) => {
  const pathParts = path.split('/')

  const categorySlugList = pathParts.filter(path => path !== 'category' && path !== '')

  for (let i = 0; i < categorySlugList.length; i++) {
    const nextSlug = categorySlugList[i]
    const nextCategory = returnFound(categories, { slug: nextSlug })

    const prevSlug = categorySlugList[i - 1]
    const prevCategory = returnFound(categories, { slug: prevSlug })

    if (!nextCategory) {
      return false
    }

    if (prevCategory) {
      if (nextCategory.parentId !== prevCategory.id) {
        return false
      }
    }
  }

  return true
}

export default checkPath
