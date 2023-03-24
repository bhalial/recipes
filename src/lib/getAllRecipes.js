import glob from 'fast-glob'
import * as path from 'path'

async function importRecipe(recipeFilename) {
  let { meta, default: component } = await import(
    `../pages/recipes/${recipeFilename}`
  )
  return {
    slug: recipeFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllRecipes() {
  let recipeFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/recipes'),
  })

  let recipes = await Promise.all(recipeFilenames.map(importRecipe))

  return recipes.sort((a, z) => new Date(z.date) - new Date(a.date))
}
