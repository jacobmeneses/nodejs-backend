const BaseUrl = 'http://0.0.0.0:3012/api/v1';

const login = async (email, password) => {
  const response = await fetch(BaseUrl + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response;

};

const getTasks = async (token) => {
  const response = await fetch(BaseUrl + '/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response;
};

module.exports = {
  login,
  getTasks,
};
