const urls = {
  user: {
    create: 'users/signup',
    revalidate: '/revalidate',
    login: 'auth/login',
  },
};

const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASEURL,
  },
  urls,
};

export default config;
