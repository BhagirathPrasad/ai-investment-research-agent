async function testApi() {
  const uniqueUser = `testuser_${Date.now()}`;
  const uniqueEmail = `${uniqueUser}@example.com`;

  console.log('1. Registering user...');
  const regRes = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Test API',
      username: uniqueUser,
      email: uniqueEmail,
      password: 'password123',
      confirmPassword: 'password123'
    })
  });
  console.log('Register status:', regRes.status);
  const regData = await regRes.json();
  if (regRes.status !== 201) {
    console.log('Register error:', regData);
    return;
  }

  console.log('2. Logging in...');
  const loginRes = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: uniqueEmail,
      password: 'password123'
    })
  });
  console.log('Login status:', loginRes.status);
  const loginData = await loginRes.json();
  if (loginRes.status !== 200) {
    console.log('Login error:', loginData);
  } else {
    console.log('Login successful!', loginData.token ? 'Token received' : 'No token');
  }
}

testApi().catch(console.error);
