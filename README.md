# A book trading web app clone.

A website created to provide a platform to buy and sell used and new books. This is especially useful to people , eg. students, who are looking for affordable textbooks.

## Run Locally

Clone the project

```bash
  git clone https://github.com/CEMcode404/book-trading-app.git
```

Go to the project directory

```bash
  cd book-trading-app
```

Install dependencies

```bash
  npm install
```

Create production build

```bash
  npm run build
```

Start demo server

```bash
  npm run demo
```

The demo server doesn't use any databases and instead store data in a makeshift storage ,in the memory, to reduce dependencies. Log out website on server restart to prevent odd behaviors since data don't persist on server restart.

## Environment Variables

To run this project with all its features using the demo server, you will need to add the following environment variables to your .env file

`G_BOOKS_API_KEY` - without this the search feature is disabled.

`JWT_PRIVATE_KEY` - this is optional since the demo server already has a default key.

`PORT` - the default port is 3000.

You can get Google Books API key at https://developers.google.com/books/docs/v1/getting_started

## 🚀 About Me

I'm a full stack developer...

## Tech Stack

**Client:** React

**Server:** Node Express
