const preparePathForBreadcrumbs = (path) => {
  if (path === '/') {
    return []
  }
  return path.split('/').filter((part) => part !== 'category')
}

export default preparePathForBreadcrumbs
