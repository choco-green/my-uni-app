import axios from 'axios';

async function fetchEvents() {
    const url = 'https://anselong.pythonanywhere.com/filter?'

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