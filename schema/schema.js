const graphql = require('graphql');
const { v4: uuidv4 } = require('uuid');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLBoolean, GraphQLList, GraphQLInt} = graphql;

let todos = [
  { id: uuidv4(), title: 'Learn JavaScript', userId: 1, completed: false},
  { id: uuidv4(), title: 'Go shopping', userId: 2, completed: false},
  { id: uuidv4(), title: 'Learn Apollo', userId: 1, completed: false},
  { id: uuidv4(), title: 'Learn English', userId: 2, completed: false},
  { id: uuidv4(), title: 'Learn Apollo', userId: 1, completed: false},
]

const users = [
  { id: 1, name: 'Konstantin', age: 40},
  { id: 2, name: 'Olga', age: 33},
]

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
    user: {
      type: UserType,
      resolve(parent, args) {
        return users.find(user => user.id === parent.userId)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLString },
        userId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const id = uuidv4()

        todos.push({
          id,
          title: args.title,
          userId: args.userId,
          completed: false
        })

        return todos.find(todo => todo.id === id)
      }
    },

    updateTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        completed: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        todos = todos.map(todo => {
          if (todo.id !== args.id) return todo
          return {...todo, completed: args.completed}
        })
        return {...todos.find(todo => todo.id == args.id), completed: args.completed}
      }
    },

    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        todos = todos.filter(todo => todo.id != args.id)
        return {id: args.id}
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return todos
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
