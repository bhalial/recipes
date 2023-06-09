import ReactDOMServer from 'react-dom/server'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { withRouter } from 'next/router'

import { getAllRecipes } from './getAllRecipes'

export async function generateRssFeed() {
  let recipes = await getAllRecipes()
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  let author = {
    name: 'Leonie McPherson',
    email: '',
  }

  let feed = new Feed({
    title: author.name,
    description: 'Your blog description',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  })

  for (let recipe of recipes) {
    let url = `${siteUrl}/recipes/${recipe.slug}`
    let html = ReactDOMServer.renderToStaticMarkup(
      withRouter(<recipe.component isRssFeed />)
    )

    feed.addItem({
      title: recipe.title,
      id: url,
      link: url,
      description: recipe.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(recipe.date),
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
  ])
}
