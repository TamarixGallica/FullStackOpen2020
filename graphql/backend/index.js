const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type BookInput {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String
    id: ID
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre }}).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const book = new Book({ ...args })
        if (book.genres.length === 0) {
          throw new Error('Each book must have at least one genre')
        }
        const author = await Author.find({ name: args.author })
        if (author.length === 0) {
          try {
            const savedAuthor = new Author({
              name: args.author
            })
            await savedAuthor.save();
            book.author = savedAuthor
          } catch (e) {
            throw new Error(`Author's name '${args.author}' is too short, at least four characters are required`)
          }
        } else {
          book.author = author[0]
        }
        await book.save()
        return book
      } catch (e) {
        if (e.name === 'MongoError' && e.code === 11000) {
          throw new UserInputError(`Book with title '${book.title}' already exists, titles must be unique`)
        }
        throw new UserInputError(e.message)
      }
    },
    editAuthor: async (root, args) => {
      const author = (await Author.find({ name: args.name })).pop()
      if (!author) {
        throw new UserInputError(`Author ${args.name} does not exist`)
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root) => {
      const author = (await Author.find({ name: root.name })).pop()
      if (!author) {
        return null
      }
      const count = await Book.countDocuments({ author })
      return count
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('Required environment variable MONGODB_URI is not specified');
  process.exit(1)
}

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
