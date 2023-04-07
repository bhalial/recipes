import React, { useState } from 'react';
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
          <Image className="rounded-xl w-full aspect-video object-cover" width={150} height={150} src={recipe.image} alt={recipe.title}></Image>
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
  const [filteredRecipes, setFilteredRecipes] = useState(recipes); // State to store filtered recipes
  const [filter, setFilter] = useState(''); // State to store filter value

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);

    // Filter recipes based on filter value
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(filterValue) ||
      recipe.description.toLowerCase().includes(filterValue) // Include description in filter logic
    );

    setFilteredRecipes(filtered);
  };
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
        <input className='w-full px-4 py-2 mb-4 rounded-lg shadow-md dark:bg-stone-700 dark:text-stone-100 placeholder:text-stone-300'
            type="text"
            placeholder="Filter recipes ..."
            value={filter}
            onChange={handleFilterChange}
          />
          {filteredRecipes.length === 0 ? (
            <p className='dark:text-stone-100'>No results found.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 text-left">
              {filteredRecipes.map((recipe) => (
                <Recipe key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          )}
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
