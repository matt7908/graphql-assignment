import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Card, Button, Modal, Input, Select, message, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './PeopleList.css'; 

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
        personId
      }
    }
  }
`;

const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
    }
  }
`;

const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_CAR = gql`
  mutation UpdateCar($id: ID!, $year: String, $make: String, $model: String, $price: String, $personId: String) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;

const PeopleList = ({ refetchPeople }) => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [deletePerson] = useMutation(DELETE_PERSON, {
    onCompleted: () => {
      message.success('Person deleted successfully');
      refetchPeople();
    },
    onError: (error) => {
      message.error(`Failed to delete person: ${error.message}`);
    }
  });

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    onCompleted: () => {
      message.success('Person updated successfully');
      refetchPeople();
    },
    onError: (error) => {
      message.error(`Failed to update person: ${error.message}`);
    }
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    onCompleted: () => {
      message.success('Car updated successfully');
      refetchPeople();
    },
    onError: (error) => {
      message.error(`Failed to update car: ${error.message}`);
    }
  });

  const [deleteCar] = useMutation(DELETE_CAR, {
    onCompleted: () => {
      message.success('Car deleted successfully');
      refetchPeople();
    },
    onError: (error) => {
      message.error(`Failed to delete car: ${error.message}`);
    }
  });

  const [editPerson, setEditPerson] = useState(null);
  const [editCar, setEditCar] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeletePerson = (id) => {
    deletePerson({ variables: { id } });
  };

  const handleDeleteCar = (id) => {
    deleteCar({ variables: { id } });
  };

  const handleUpdatePerson = () => {
    updatePerson({
      variables: {
        id: editPerson.id,
        firstName: editPerson.firstName,
        lastName: editPerson.lastName
      }
    });
    setEditPerson(null);
  };

  const handleUpdateCar = () => {
    updateCar({
      variables: {
        id: editCar.id,
        year: editCar.year,
        make: editCar.make,
        model: editCar.model,
        price: editCar.price,
        personId: editCar.personId
      }
    });
    setEditCar(null);
  };

  return (
    <div className="people-list">
      <Row gutter={[16, 16]}>
        {data.people.map((person) => (
          <Col span={8} key={person.id}>
            <Card
              title={`${person.firstName} ${person.lastName}`}
              className="person-card"
              actions={[
                <EditOutlined onClick={() => setEditPerson(person)} />,
                <DeleteOutlined onClick={() => handleDeletePerson(person.id)} />,
              ]}
            >
              {person.cars.map((car) => (
                <div key={car.id} className="car-details">
                  <p>{`${car.year} ${car.make} ${car.model} -> $${car.price}`}</p>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setEditCar(car)}
                    className="edit-button"
                    style={{ marginRight: 5 }}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCar(car.id)}
                    danger
                    className="delete-button"
                  />
                </div>
              ))}
              <Link to={`/people/${person.id}`} className="learn-more-link">
                Learn More
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de edición de persona */}
      {editPerson && (
        <Modal title="Edit Person" open={true} onOk={handleUpdatePerson} onCancel={() => setEditPerson(null)}>
          <Input
            placeholder="First Name"
            value={editPerson.firstName}
            onChange={(e) => setEditPerson({ ...editPerson, firstName: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={editPerson.lastName}
            onChange={(e) => setEditPerson({ ...editPerson, lastName: e.target.value })}
          />
        </Modal>
      )}

      {/* Modal de edición de coche */}
      {editCar && (
        <Modal title="Edit Car" open={true} onOk={handleUpdateCar} onCancel={() => setEditCar(null)}>
          <Input
            placeholder="Year"
            value={editCar.year}
            onChange={(e) => setEditCar({ ...editCar, year: e.target.value })}
          />
          <Input
            placeholder="Make"
            value={editCar.make}
            onChange={(e) => setEditCar({ ...editCar, make: e.target.value })}
          />
          <Input
            placeholder="Model"
            value={editCar.model}
            onChange={(e) => setEditCar({ ...editCar, model: e.target.value })}
          />
          <Input
            placeholder="Price"
            value={editCar.price}
            onChange={(e) => setEditCar({ ...editCar, price: e.target.value })}
          />
          <Select
            value={editCar.personId}
            onChange={(value) => setEditCar({ ...editCar, personId: value })}
            placeholder="Select a person"
            style={{ width: '100%' }}
          >
            {data.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
        </Modal>
      )}
    </div>
  );
};

export default PeopleList;
