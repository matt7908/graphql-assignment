import React from 'react';
import { useQuery, gql } from '@apollo/client';
import PersonForm from '../components/PersonForm';
import CarForm from '../components/CarForm';
import PeopleList from '../components/PeopleList';
import './HomePage.css'; // Importamos el archivo de estilos

const GET_PEOPLE = gql`
  query GetPeople {
    people {
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

const HomePage = () => {
  const { loading, error, data, refetch } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">People and Their Cars</h1>
      <div className="forms-container">
        <PersonForm refetchPeople={refetch} />
        <CarForm people={data.people} refetchPeople={refetch} />
      </div>
      <PeopleList people={data.people} refetchPeople={refetch} />
    </div>
  );
};

export default HomePage;
