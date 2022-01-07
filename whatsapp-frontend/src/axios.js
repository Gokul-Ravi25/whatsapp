import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://whatsapp-backendg.herokuapp.com',
    
});

export default instance;
