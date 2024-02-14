import axios from 'axios';

async function fetchCalendarEvents() {
    const url = 'http://localhost:5000/events'

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

export default fetchCalendarEvents;