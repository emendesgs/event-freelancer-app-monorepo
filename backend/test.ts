
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const testFullFlow = async () => {
  const userEmail = `testuser_${Date.now()}@example.com`;
  const userPassword = 'password123';
  let authToken = '';

  try {
    // 1. Register User
    console.log('Testing User Registration...');
    const newUser = {
      email: userEmail,
      password: userPassword,
      full_name: 'Test User',
    };
    const registerResponse = await axios.post(`${API_URL}/auth/register`, newUser);
    console.log('Registration successful.');
    authToken = registerResponse.data.data.token;

    // 2. Login User
    console.log('\nTesting User Login...');
    const credentials = {
      email: userEmail,
      password: userPassword,
    };
    const loginResponse = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log('Login successful.');
    authToken = loginResponse.data.data.token;

    // 3. Get Categories
    console.log('\nFetching categories...');
    const categoriesResponse = await axios.get(`${API_URL}/public/categories`);
    const categories = categoriesResponse.data.data;
    if (!categories || categories.length === 0) {
      throw new Error('No categories found to create a job with.');
    }
    const categoryId = categories[0].id;
    console.log(`Using category: ${categories[0].name}`);

    // 4. Create Job
    console.log('\nTesting Job Creation...');
    const newJob = {
      title: 'Need a photographer for a wedding',
      description: 'Looking for a skilled photographer to capture our special day.',
      category_id: categoryId,
      budget_min: 500,
      budget_max: 1000,
      location: 'New York, NY',
    };

    const jobResponse = await axios.post(`${API_URL}/jobs`, newJob, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    console.log('Job creation successful:');
    console.log(jobResponse.data);

  } catch (error) {
    console.error('\nTest failed:');
    if (axios.isAxiosError(error)) {
      console.error('Error details:', error.response?.data);
    } else {
      console.error(error);
    }
  }
};

testFullFlow();