# narro - A bookmark manager and search engine

## Overview

narro is a bookmark manager with strong search features, built to "narrow down" a collection of bookmarks at scale. This full stack application is intended to be a personal tool to store and retrieve saved links quickly and efficiently. The overall aim is to
* minimize the effort of maintaining a large bookmark collection (think less about elaborate bookmark folder structures, and "where" a bookmark should go)
* minimize the time taken to find a specific bookmark by combining multiple search features

A demo can be found at [demo.narrobookmarks.app](https://demo.narrobookmarks.app). The demo is deployed on a DigitalOcean VPS.

## Implemented Features

* Add new bookmarks (title and URL)
  * Assign bookmarks to one "space" (collection of bookmarks based on context, such as "Web Development" or "Personal")
  * Assign bookmarks to zero or multiple "groups" (further categorization of bookmarks within a space, similar to tags)
* Search/filter based on bookmark title, URL, group, space, and/or date of creation
* Sort bookmarks by date of creation, or alphabetically

### Search

Many popular bookmark managers implement features to filter and search through bookmarks, but you can usually only use one or two of these features at a time. With narro, you are given the flexibility of combining all search filters (title, URL, groups, space, date of creation) to get very specific results from a large amount of bookmarks.

In the demo, type "example" in the `Search title...` bar, and then type "prisma" in the `Search URL...` bar to filter down the results further. The list of bookmarks will update immediately as your search query changes.

## Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Starting Postgres Docker Container

* Navigate to root repo
* Run `docker compose up --build -d`

### Environment variables

* `DATABASE_URL` contains the PostgreSQL URL for Prisma to connect to
* `NEXT_PUBLIC_DEMO` is a feature flag that restricts users from adding bookmarks, groups, or spaces

## Technologies used

* TypeScript
* Next.js
* Tailwind
* PostgreSQL
* Prisma ORM
* Mantine UI