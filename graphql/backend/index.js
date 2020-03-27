const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const JWT_SECRET = 'ONE_KEY_TO_RULE_THEM_ALL'

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }
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
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }
      const author = (await Author.find({ name: args.name })).pop()
      if (!author) {
        throw new UserInputError(`Author ${args.name} does not exist`)
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
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
