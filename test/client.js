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

const moveTask = async (token, columnId, taskId) => {
  const response = await fetch(BaseUrl + '/tasks/move', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ columnId, taskId }),
  });

  return response;
};

const createTask = async (token, title, columnId) => {
  const body = {};

  if ( title ) {
    body.title = title;
  }

  if ( columnId ) {
    body.columnId = columnId;
  }

  const response = await fetch(BaseUrl + '/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return response;
};

const deleteTask = async (token, taskId) => {
  const response = await fetch(BaseUrl + '/tasks/' + taskId, {
    method: 'DELETE',
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
  moveTask,
  createTask,
  deleteTask,
};
