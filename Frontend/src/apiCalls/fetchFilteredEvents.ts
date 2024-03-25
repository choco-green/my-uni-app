import axios from 'axios';
import { DateRange } from 'react-day-picker';

async function fetchFilteredEvents(dateRange: DateRange | undefined, capacity: number | undefined) {
    // Initialize query parameters string
    let queryParams = '';

    // Check if capacity is defined and append to query params
    if (capacity !== undefined) {
        queryParams += `capacity=${capacity}`;
    }

    // Check if dateRange is defined and append to query params
    if (dateRange !== undefined) {
        queryParams += (queryParams.length > 0 ? '&' : '') + `startDate=${dateRange.from}&endDate=${dateRange.to}`;
    }

    // Construct the URL with query parameters
    const url = `http://167.99.192.238:7658/filter?${queryParams}`;

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

export default fetchFilteredEvents;