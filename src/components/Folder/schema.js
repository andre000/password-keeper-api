module.exports = `
  type Folder {
    _id: String!
    title: String!
    color: String!,
    passwords: [Password]
  }

  type Query {
    folder(_id: String!): Folder
    folders(_id: String, title: String, color: String): [Folder]
  }

  type Mutation {
    addFolder(title: String!, color: String, passwords: [String]): Folder
    editFolder(_id: String!, title: String, color: String, passwords: [String]): Folder
    deleteFolder(_id: String!, title: String!, color: String, passwords: [String]): Folder
  }
`;
