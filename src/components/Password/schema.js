module.exports = `
  scalar RawType

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
    username: String!
    icon: String
    fields: [Field]
    notes: RawType
  }

  type Query {
    password(_id: String!): Password
    passwords(_id: String, title: String, icon: String, username: String, notes: RawType): [Password]
    decrypt(value: String!): String,
    decryptMany(value: [String]!): [String],
  }

  type Mutation {
    addPassword(title: String!, icon: String, username: String, fields: [FieldInput]!, notes: RawType): Password
    editPassword(_id: String!, title: String, username: String, icon: String, fields: [FieldInput], notes: RawType): Password
    deletePassword(_id: String!, title: String, username: String, icon: String): Password
  }
`;
