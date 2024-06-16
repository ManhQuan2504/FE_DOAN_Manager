import axios from 'axios';

export const getFunc = async () => {
  const data = {
    modelName: 'functions'
  };
  
  const queryString = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
  
  try {
    const res = await axios.get(`http://localhost/v1/functions/?${queryString}`);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
}
