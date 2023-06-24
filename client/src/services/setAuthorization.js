import axios from 'axios';

// Fungsi untuk mengatur token dalam header permintaan
const setAuthToken = (token) => {
    if (token) {
        // Jika token ada, atur header dengan token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Jika token tidak ada, hapus header Authorization
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Fungsi untuk melakukan fetching API yang memerlukan token
const fetchDataWithToken = async (url) => {
    try {
        // Mendapatkan token dari localStorage (jika tersedia)
        const token = localStorage.getItem('token');

        if (token) {
            // Mengatur token dalam header permintaan
            setAuthToken(token);
        }

        // Melakukan permintaan ke API
        const response = await axios.get(url);

        // Mengembalikan data dari respons API
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
    }
};

export default fetchDataWithToken;
