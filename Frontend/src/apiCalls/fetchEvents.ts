import axios from 'axios';

async function fetchEvents() {
    const url = 'http://167.99.192.238:7658/filter'

    let response;
    try {
        response = await axios.get(url);
        // Handle the response data (e.g., update state or UI)
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message)
    }
    return response?.data;
}

export default fetchEvents;