module.exports = `
  type Field {
    title: String!
    value: String!
  }

  input FieldInput {
    title: String!
    value: String!
  }

  type Password {
    _id: String!
    title: String!
    icon: String
    fields: [Field]
  }

  type Query {
    password(_id: String!): Password
    passwords(_id: String, title: String, icon: String): [Password]
    decrypt(value: String!): String,
    decryptMany(value: [String]!): [String],
  }

  type Mutation {
    addPassword(title: String!, icon: String, fields: [FieldInput]!): Password
    editPassword(_id: String!, title: String!, icon: String, fields: [FieldInput]): Password
    deletePassword(_id: String!, title: String!, icon: String, fields: [FieldInput]): Password
  }
`;
