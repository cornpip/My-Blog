import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const clientForm = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export { client, clientForm };
// export default client