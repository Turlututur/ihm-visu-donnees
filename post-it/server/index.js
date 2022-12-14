const { Neo4jGraphQL } = require("@neo4j/graphql");
const { OGM } = require("@neo4j/graphql-ogm");
const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
var nJwt = require("njwt");

// Load contents of .env as environment variables
dotenv.config();

// Load GraphQL type definitions from schema.graphql file
const typeDefs = fs
  .readFileSync(path.join(__dirname, "postIt.graphql"))
  .toString("utf-8");

// Create Neo4j driver instance
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const ogm = new OGM({ typeDefs, driver });
const User = ogm.model("User");

const resolvers = {
  Mutation: {
    signUp: async (_source, { username, password, role }) => {
      const [existing] = await User.find({
        where: {
          username,
        },
      });

      console.log("existing", existing);

      if (existing) {
        throw new Error(`L'utilisateur ${username} existe déjà !`);
      }

      const roles = ["user"];
      const user = await User.create({
        input: [
          {
            username,
            password,
            role,
            roles,
          },
        ],
      });

      return nJwt
        .create(
          { sub: user.users[0].id, roles: user.users[0].roles },
          signingKey
        )
        .setExpiration()
        .compact();
    },
    signIn: async (_source, { username, password, role }) => {
      const [user] = await User.find({
        where: {
          username,
        },
      });
      if (!user) {
        throw new Error(`L'utilisateur ${username} n'existe pas !`);
      }

      const correctPassword = password == user.password;

      if (!correctPassword) {
        throw new Error(
          `Le mot de passe du compte ${username} est incorrect !`
        );
      }

      const correctRole = role == user.role;

      if (!correctRole) {
        throw new Error(`Le role du compte ${username} est incorrect !`);
      }

      return nJwt
        .create({ sub: user.id, roles: user.roles }, signingKey)
        .setExpiration()
        .compact();
    },
  },
};

// Create executable GraphQL schema from GraphQL type definitions,
// using @neo4j/graphql to autogenerate resolvers
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  config: {
    jwt: {
      secret: "dFt8QaYykR6PauvxcyKVXKauxvQuWQTc",
    },
  },
});
var signingKey = "dFt8QaYykR6PauvxcyKVXKauxvQuWQTc";

// Create ApolloServer instance that will serve GraphQL schema created above
// Inject Neo4j driver instance into the context object, which will be passed
//  into each (autogenerated) resolver
const server = new ApolloServer({
  context: ({ req }) => ({ driver, req }),
  schema: neoSchema.schema,
  //introspection: true,
  //  playground: false
});

// Start ApolloServer
server.listen().then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
