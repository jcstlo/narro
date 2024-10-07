This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Starting Postgres Docker Container

* Navigate to root repo
* Run `docker compose up --build -d`

## Environment variables

* `DATABASE_URL` contains the PostgreSQL URL for Prisma to connect to
* `NEXT_PUBLIC_DEMO` is a feature flag that restricts users from adding bookmarks, groups, or spaces
