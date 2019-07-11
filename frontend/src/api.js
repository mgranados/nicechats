let apiUrl = ``;

if (process.env.NODE_ENV === 'production') {
  apiUrl = `${process.env.REACT_APP_API_URL}`;
}

export const getRecentTalks = async (route, userToken = '') => {
  const response = await fetch(`${apiUrl}/v1/chats/recent`, {
    method: 'get',
  });
  return response;
};

export const login = async (email, password) => {
  const response = await fetch(`${apiUrl}/v1/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });
  return response;
};

export const updatePassword = async (userToken, password) => {
  const response = await fetch(`${apiUrl}/v1/users/update-password`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify({password}),
  });
  return response;
};

export const getMyTalks = async (userToken) => {
  const response = await fetch(`${apiUrl}/v1/chats/me`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

export const createTalk = async (data, userToken) => {
  const {subject, publiclyVisible} = data;
  const response = await fetch(`${apiUrl}/v1/chats`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify({subject, publiclyVisible}),
  });
  return response;
};

export const signup = async (email, password, userName) => {
  const response = await fetch(`${apiUrl}/v1/users`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password, userName}),
  });
  return response;
};

export const getTalkDetails = async (talkId, userToken) => {
  const response = await fetch(`${apiUrl}/v1/chats/${talkId}/messages`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

export const postNewMessage = async (message, talkId, userToken) => {
  const response = await fetch(`${apiUrl}/v1/chats/${talkId}/messages`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify({message}),
  });
  return response;
};

export const postJoinTalk = async (talkId, userToken) => {
  const response = await fetch(`${apiUrl}/v1/chats/${talkId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

export const getTalks = async (route, userToken = '') => {
  let response;
  if (route === 'others') {
    response = await fetch(`${apiUrl}/v1/chats/others`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
  } else {
    response = await fetch(`${apiUrl}/v1/chats/available`, {
      method: 'get',
    });
  }
  return response;
};
