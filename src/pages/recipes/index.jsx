import Head from 'next/head'

import { Card } from '../../components/Card'
import { SimpleLayout } from '../../components/SimpleLayout'
import { formatDate } from '../../lib/formatDate'
import { getAllRecipes } from '../../lib/getAllRecipes'

function Recipe({ recipe }) {
  return (
    <recipe className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/recipes/${recipe.slug}`}>
          {recipe.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={recipe.date}
          className="md:hidden"
          decorate
        >
            {formatDate(recipe.date)}
        </Card.Eyebrow>
        <Card.Description>{recipe.description}</Card.Description>
        <Card.Cta>Read recipe</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={recipe.date}
        className="mt-1 hidden md:block"
      >
          {recipe.author} <br />
          {formatDate(recipe.date)}
      </Card.Eyebrow>
    </recipe>
  )
}

export default function RecipesIndex({ recipes }) {
  return (
    <>
      <Head>
        <title>Recipes - Leonie McPherson</title>
        <meta
          name="description"
          content="Recipes"
        />
      </Head>
      <SimpleLayout
        title="Making vegan recipes easy and fun!"
        intro="All of my vegan recipes that I either thought of myself or adjusted from other sources."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex flex-col space-y-16">
            {recipes.map((recipe) => (
              <Recipe key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      recipes: (await getAllRecipes()).map(({ component, ...meta }) => meta),
    },
  }
}
