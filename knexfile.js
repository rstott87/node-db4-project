// DO NOT CHANGE THIS FILE
const sharedConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
        directory: './data/seeds',
      }
}

module.exports = {
    development: {
      ...sharedConfig,
      connection: { filename: './data/cook_book.db3' },
    },
    testing: {
      ...sharedConfig,
      connection: { filename: './data/cook_book.db3' },
    },
  }