const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  }

  type Query {
    people: [Person]
    person(id: ID!): Person
    cars: [Car]
    car(id: ID!): Car
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    addCar(year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    updateCar(id: ID!, year: String, make: String, model: String, price: String, personId: String): Car
    deletePerson(id: ID!): Person
    deleteCar(id: ID!): Car
    deleteCarFromPerson(personId: ID!, carId: ID!): Person
  }
`;

module.exports = typeDefs;
