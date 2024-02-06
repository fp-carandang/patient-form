import { useState, useContext } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '@/components/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUserLoggedIn, setUserId, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        await toast.promise(
          Promise.resolve(),
          {
            loading: 'Logging in...',
            success: `Welcome, ${values.username}!`,
          }
        );
  
        navigate('/');
        setUserLoggedIn(true);
        setUserId(data.userId);
        setUsername(values.username);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
      <Title level={3}>Login</Title>

      <Form onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username.' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password.' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log in
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <span>
            Don't have an account yet? <Link to="/register">Register</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;