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

const getTasks = async (token, sprintId) => {
  const params = {
    spid: sprintId,
  };

  if ( sprintId === null ) {
    delete params.spid;
  }


  const query = new URLSearchParams(params).toString();

  const response = await fetch(BaseUrl + '/tasks?' + query , {
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

const createTask = async (token, request = {}) => {
  const body = {
  };

  if ( request.title ) {
    body.title = request.title;
  }

  if ( request.columnId ) {
    body.columnId = request.columnId;
  }

  if ( request.sprintId ) {
    body.sprintId = request.sprintId;
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

const createSprint = async (token, body) => {
  const response = await fetch(BaseUrl + '/sprints', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return response;
};

const getSprints = async (token) => {
  const response = await fetch(BaseUrl + '/sprints', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response;
};

const postSettings = async (token, request) => {
  const response = await fetch(BaseUrl + '/users/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  return response;
};

module.exports = {
  login,
  getTasks,
  moveTask,
  createTask,
  deleteTask,
  createSprint,
  getSprints,
  postSettings,
};
