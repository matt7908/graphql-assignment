const { people, cars } = require('../peopleCarsScheme'); // Base de datos en memoria

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => people.find(person => person.id === id),
    cars: () => cars,
    car: (_, { id }) => cars.find(car => car.id === id),
  },
  Person: {
    cars: (parent) => cars.filter(car => car.personId === parent.id),
  },
  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = { id: `${people.length + 1}`, firstName, lastName, cars: [] };
      people.push(newPerson);
      return newPerson;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = { id: `${cars.length + 1}`, year, make, model, price, personId };
      cars.push(newCar);
      return newCar;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = people.find(person => person.id === id);
      if (!person) return null;
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      return person;
    },
    updateCar: (_, { id, year, make, model, price, personId }) => {
      const car = cars.find(car => car.id === id);
      if (!car) return null;
      if (year) car.year = year;
      if (make) car.make = make;
      if (model) car.model = model;
      if (price) car.price = price;
      if (personId) car.personId = personId;
      return car;
    },
    deletePerson: (_, { id }) => {
      const personIndex = people.findIndex(person => person.id === id);
      if (personIndex === -1) return null;
      const [removedPerson] = people.splice(personIndex, 1);
      // Elimina los coches asociados a esta persona
      cars = cars.filter(car => car.personId !== id);
      return removedPerson;
    },
    deleteCar: (_, { id }) => {
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) return null;
      const [removedCar] = cars.splice(carIndex, 1);
      return removedCar;
    },
    deleteCarFromPerson: (_, { personId, carId }) => {
      const person = people.find(person => person.id === personId);
      if (!person) throw new Error('Person not found');
      
      // Elimina el coche de la lista de coches de esta persona
      person.cars = person.cars.filter(car => car.id !== carId);

      // Actualizar coches globalmente, eliminando la relación con el `personId`
      const car = cars.find(car => car.id === carId);
      if (car) car.personId = null; // El coche sigue existiendo, pero ya no está asignado a esta persona

      return person;
    }
  }
};

module.exports = resolvers;
