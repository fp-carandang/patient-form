import { useState } from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const { Title } = Typography;

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/register', values);

      if (response.status === 201) {
        toast.success('Registration successful.', { position: 'top-center' });

        form.resetFields();
        navigate('/login');
      } else {
        toast.error('Registration failed. Please try again.', { position: 'top-center' });
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <Title level={3}>Register</Title>
        <Form form={form} onFinish={onFinish} disabled={loading}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter a username.' }]}
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter a valid email.' },
              { type: 'email', message: 'Invalid email address.' },
            ]}
          >
            <Input type="email" placeholder="youremail@mail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter a password.' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'center', flexDirection: 'column' }}>
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                Register
              </Button >
              <Link to="/login">Login</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
