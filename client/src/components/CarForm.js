import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Input, Button, Select, message, Row, Col, Form } from 'antd';
import './CarForm.css'; 

const ADD_CAR = gql`
  mutation AddCar($year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

const CarForm = ({ people, refetchPeople }) => {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [personId, setPersonId] = useState('');

  const [addCar] = useMutation(ADD_CAR, {
    onCompleted: () => {
      message.success('Car added successfully');
      refetchPeople(); // Refrescar los datos de personas
    },
    onError: () => {
      message.error('Failed to add car');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar({ variables: { year, make, model, price, personId } });
    setYear('');
    setMake('');
    setModel('');
    setPrice('');
    setPersonId('');
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <Row gutter={[16, 16]} justify="center">
        <Col span={5}>
          <Form.Item label="Year">
            <Input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Make">
            <Input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Model">
            <Input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Price">
            <Input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Person">
            <Select
              value={personId}
              onChange={(value) => setPersonId(value)}
              placeholder="Select a person"
              style={{ width: '100%' }}
              required
            >
              {people &&
                people.map((person) => (
                  <Select.Option key={person.id} value={person.id}>
                    {person.firstName} {person.lastName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={5}>
          <Button
            htmlType="submit"
            type="primary"
            className="submit-button"
            style={{ width: '100%' }}
          >
            Add Car
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default CarForm;
