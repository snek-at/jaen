// babel-plugin-remove-pageconfig.js
module.exports = function () {
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        if (path.node.declaration?.declarations) {
          const declarations = path.node.declaration
            ? path.node.declaration.declarations
            : []

          const identifiersToRemove = declarations
            .filter(declaration => declaration.id.name === 'pageConfig')
            .map(declaration => declaration.id)

          if (identifiersToRemove.length > 0) {
            path.remove()
          }
        }
      }
    }
  }
}
