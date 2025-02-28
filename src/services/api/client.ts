import axios from "axios";
const client = axios.create({
    baseURL: 'https://api.mangadex.org/',
    timeout: 10000,
});
export default client;