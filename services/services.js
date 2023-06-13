import { API_URL } from "./api_url";

export const profile = async (token) => {
    try {
        console.log(token)
        const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': `${token}`,
        },
        });
        const responseJson = await response.json();
        if (responseJson.success === true) {
            return responseJson.user
        }
    } catch (error) {
        setError(error);
    }
}