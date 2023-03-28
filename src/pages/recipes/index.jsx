import Head from 'next/head'
import Image from 'next/image'

import { Card } from '../../components/Card'
import { SimpleLayout } from '../../components/SimpleLayout'
import { formatDate } from '../../lib/formatDate'
import { getAllRecipes } from '../../lib/getAllRecipes'

function Recipe({ recipe }) {
  return (
    <Card>
      <recipe className="w-full mb-2">
        <div>
          <Image className="rounded-xl w-full aspect-video object-cover" width={150} height={150} src={recipe.image}></Image>
        </div>
        <div className="mt-2">
          <Card.Title href={`/recipes/${recipe.slug}`}>
            {recipe.title}
          </Card.Title>
          <Card.Description>{recipe.description}</Card.Description>
          <Card.Eyebrow
          as="time"
          dateTime={recipe.date}
          className="mt-1"
          >
            {recipe.author} <br />
            {formatDate(recipe.date)}
          </Card.Eyebrow>
          <Card.Cta>Read recipe</Card.Cta>
        </div>
      </recipe>
    </Card>
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
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
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
