module.exports = `
  type User {
    _id: String!
    name: String!
    email: String!
    password: String!
    active: Boolean!
  }

  type Query {
    user(_id: String!): User
    users(_id: String, name: String, email: String, active: Boolean): [User]
    validateUserPassword(password: String!, _id: String, name: String, email: String, active: Boolean): Boolean
  }

  type Mutation {
    addUser(name: String!, email: String!,  password: String!, active: Boolean!): User
    editUser(_id: String!, name: String, email: String, password: String, active: Boolean): User
    deleteUser(_id: String!, name: String, email: String, password: String, active: Boolean): User
  }
`;
