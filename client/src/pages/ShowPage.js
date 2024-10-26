import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import './ShowPage.css'; 

const GET_PERSON_WITH_CARS = gql`
  query GetPersonWithCars($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

const ShowPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="show-page-container">
      <h1 className="person-title">{`${data.person.firstName} ${data.person.lastName}`}</h1>
      <Button type="primary" className="back-button">
        <Link to="/" className="back-link">Go Back Home</Link>
      </Button>
      <div className="cars-container">
        {data.person.cars.map((car) => (
          <Card
            key={car.id}
            title={`${car.year} ${car.make} ${car.model} -> $${car.price}`}
            className="car-card"
          />
        ))}
      </div>
    </div>
  );
};

export default ShowPage;
