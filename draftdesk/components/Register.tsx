import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import { setToken } from '@/utils/auth';

const { Title } = Typography;

interface RegisterProps {
    onLogin: () => void;
    onLoginClicked: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLoginClicked, onLogin }) => {

  const handleSubmit = async (values: any) => {
    const url = 'http://localhost:5000/register'; 
    try {
      const response = await axios.post(url, values);
      if (response.status === 201 || response.status === 200) {
        message.success('Account created successfully!');
        console.log(response.data);
        setToken(response.data.token); // Save the token to local storage
        onLogin(); // Call the onLogin callback function
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      if (error.response) {
        const { data } = error.response;
        if (data.errors) {
          data.errors.forEach((err: any) => {
            message.error(err.msg); // Display each validation error message
          });
        } else {
          message.error(data.message); // Display general error message
        }
      } else {
        message.error('Network Error'); // Handle network errors
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Title level={2}>{'Create Account'}</Title>
      <Form
        name="authForm"
        onFinish={handleSubmit}
        className="w-full max-w-xs mt-4"
      >
        <Form.Item
            name="penName"
            rules={[{ required: true, message: 'Please input your Pen Name!' }]}
        >
            <Input placeholder="Pen Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {'Create Account'}
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={onLoginClicked}>
        {'Log In'}
      </Button>
    </div>
  );
};

export default Register;