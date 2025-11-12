
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const randomString = () => Math.random().toString(36).substring(7);

const testFullFlow = async () => {
  try {
    // 1. Register a new user
    const email = `testuser_${randomString()}@example.com`;
    const password = 'password123';
    console.log(`Registering user: ${email}`);
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      full_name: 'Test User',
      role: 'client',
    });
    console.log('User registered successfully:');
    console.log(registerResponse.data);


    // 2. Login with the new user
    console.log('Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    console.log('Login successful:');
    console.log(loginResponse.data);
    const token = loginResponse.data.data.token;

    // 3. Get categories
    console.log('Fetching categories...');
    const categoriesResponse = await axios.get(`${API_URL}/public/categories`);
    console.log('Categories fetched successfully:');
    console.log(categoriesResponse.data);
    const categoryId = categoriesResponse.data.data[0].id;

    // 4. Create a new job
    console.log('Creating a new job...');
    const jobResponse = await axios.post(
      `${API_URL}/jobs`,
      {
        title: 'Test Job',
        description: 'This is a test job.',
        budget: 100,
        deadline: '2024-12-31',
        category_id: categoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Job created successfully:');
    console.log(jobResponse.data);
  } catch (error: any) {
    console.error('An error occurred during the test:');
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  }
};

testFullFlow();