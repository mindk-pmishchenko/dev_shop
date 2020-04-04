const preparePathForBreadcrumbs = path => path.split('/').filter(part => part !== 'category')

export default preparePathForBreadcrumbs
