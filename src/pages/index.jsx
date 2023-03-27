import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx'

import { Card } from '../components/Card'
import { Container } from '../components/Container'
import image1 from '../images/photos/soup.jpg'
import image2 from '../images/photos/cereal.jpg'
import image3 from '../images/photos/tacos.jpg'
import image4 from '../images/photos/soup-2.jpg'
import image5 from '../images/photos/breakfast.jpg'
import { formatDate } from '../lib/formatDate'
import { getAllRecipes } from '../lib/getAllRecipes'

function Recipe({ recipe }) {
  return (
    <Card as="recipe">
      <div className="flex items-center">
        <div className="py-2 px-4">
          <Image className="rounded-xl" width={150} height={150} src={recipe.image}></Image>
        </div>
        <div>
        <Card.Title href={`/recipes/${recipe.slug}`}>
          {recipe.title}
        </Card.Title>
        <Card.Eyebrow as="time" dateTime={recipe.date} decorate>
          {recipe.author} &middot; {formatDate(recipe.date)}
        </Card.Eyebrow>
        <Card.Description>{recipe.description}</Card.Description>
        <Card.Cta>Read recipe</Card.Cta>
        </div>
      </div>
    </Card>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 sm:w-72',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ recipes }) {
  return (
    <>
      <Head>
        <title>
        🌱 Soupchute 🌱 Best place for your vegan recipes!
        </title>
        <meta
          name="description"
          content="I’m Leonie"
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I&apos;m Leonie McPherson, vegan food enthusiast and recipe developer.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Welcome to 🌱 Soupchute where I share my vegan recipes.
          </p>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none">
          <div className="flex flex-col gap-16">
            {recipes.map((recipe) => (
              <Recipe key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      recipes: (await getAllRecipes())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
