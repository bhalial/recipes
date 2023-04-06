import Head from 'next/head'
import Image from 'next/image'

import { Card } from '../components/Card'
import { Container } from '../components/Container'
import image1 from '../images/photos/soup.jpg'
import image2 from '../images/photos/cereal.jpg'
import image3 from '../images/photos/tacos.jpg'
import image4 from '../images/photos/soup-2.jpg'
import image5 from '../images/photos/breakfast.jpg'
import { formatDate } from '../lib/formatDate'
import { getAllRecipes } from '../lib/getAllRecipes'
import { Splide, SplideSlide } from '@splidejs/react-splide';

function Recipe({ recipe }) {
  return (
    <Card as="recipe">
      <div className="flex items-center">
        <div className="py-2 px-4">
          <Image className="rounded-xl aspect-square object-cover" width={150} height={150} src={recipe.image} alt={recipe.title}></Image>
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
  return (
    <div className="mt-16 flex justify-center">
      <div className="justify-center max-w-7xl gap-2 overflow-hidden sm:gap-4 w-full mx-4">
          <Splide options={{
                  type        : 'slide',
                  perPage     : 5,
                  mediaQuery  : 'min',
                  breakpoints : {
                    320: {
                        perPage: 2,
                    },
                    640: {
                        perPage: 3,
                    },
                    1024: {
                        perPage: 4,
                    },
                    1280: {
                        perPage: 5,
                    }
                  },
                  rewind      : true,
                  gap         : '2rem',
                  width       : '100%',
                  pagination  : false,
                  cover       : true,
                  focus       : 'center',
                  arrows    : false,
                  overflow    : 'visible',
              }}>
              <SplideSlide className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 sm:w-72">
                  <Image className="absolute inset-0 h-full w-full object-cover" src={image1} alt="lentil soup"/>
              </SplideSlide>
              <SplideSlide className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 sm:w-72">
                  <Image className="absolute inset-0 h-full w-full object-cover" src={image2} alt="breakfast"/>
              </SplideSlide>
              <SplideSlide className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 sm:w-72">
                  <Image className="absolute inset-0 h-full w-full object-cover" src={image3} alt="tacos"/>
              </SplideSlide>
              <SplideSlide className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 sm:w-72">
                  <Image className="absolute inset-0 h-full w-full object-cover" src={image4} alt="potato soup"/>
              </SplideSlide>
              <SplideSlide className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 sm:w-72">
                  <Image className="absolute inset-0 h-full w-full object-cover" src={image5} alt="hummus toast"/>
              </SplideSlide>
          </Splide>
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
          content="Soupchute.com is a vegan recipe blog. Here you can find the best vegan recipes."
        />
      </Head>
      <Container className="mt-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I&apos;m Leonie McPherson,<br /> vegan food enthusiast and recipe developer.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Welcome to 🌱 Soupchute where I share my vegan recipes.
          </p>
        </div>
      </Container>
      <Photos />
      <Container className="mt-12 md:mt-16">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none">
          <div className="flex flex-col gap-8">
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
