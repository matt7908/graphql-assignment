import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Input, Button, Form, message, Row, Col } from 'antd';
import './PersonForm.css'; 

const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const PersonForm = ({ refetchPeople }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // La mutación ahora incluye `refetchQueries` como alternativa a `refetch`
  const [addPerson] = useMutation(ADD_PERSON, {
    onCompleted: () => {
      message.success('Person added successfully');
      // Llama a refetchPeople si se pasa correctamente
      if (refetchPeople) refetchPeople();
    },
    onError: (error) => {
      message.error(`Failed to add person: ${error.message}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      message.error('Both first name and last name are required');
      return;
    }

    addPerson({
      variables: { firstName, lastName },
    });

    setFirstName('');
    setLastName('');
  };

  return (
    <form onSubmit={handleSubmit} className="person-form">
      <Row gutter={[16, 16]} justify="center">
        <Col span={8}>
          <Form.Item label="First Name">
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Last Name">
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4}>
          <Button
            htmlType="submit"
            type="primary"
            className="submit-button"
            style={{ width: '100%' }}
          >
            Add Person
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default PersonForm;
