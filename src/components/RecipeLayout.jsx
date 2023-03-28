import Head from 'next/head'
import { useRouter } from 'next/router'

import { Container } from './Container'
import { Prose } from './Prose'
import { formatDate } from '../lib/formatDate'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RecipeLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()

  if (isRssFeed) {
    return children
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - SoupChute.com`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-12">
        <div className="xl:relative">
          <div className="mx-auto max-w-7xl">
            <recipe>
              <header className="mt-6">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {meta.title}
                </h1>
                <time
                  dateTime={meta.date}
                  className="flex items-center text-base text-zinc-400 dark:text-zinc-500 mt-4"
                >
                  <span>{meta.author} &middot; {formatDate(meta.date)}</span>
                </time>
              </header>
              <Prose className="mt-4">{children}</Prose>
            </recipe>
          </div>
        </div>
      </Container>
    </>
  )
}
