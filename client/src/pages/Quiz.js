import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import fetchDataWithToken from "../services/setAuthorization";
import Loading from "../components/Loading";

export default function Quiz() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [command, setCommand] = useState("");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    if (!isLoggedIn) {
        window.location.href = '/login'
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Memanggil fungsi fetchDataWithToken untuk mendapatkan data dengan token
                const response = await fetchDataWithToken('http://localhost:3000/api/user/get-user');

                // Menyimpan data ke state komponen
                setData(response);
                if (response) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <Loading/>
            </>
        )
    }
    const payload = {
        code: '',
        name: '',
        description: '',
        teacher: data._id,
        question: [],
        students: []
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan sesuatu dengan nilai command
        console.log("Command yang dimasukkan:", command);
        // Reset nilai command setelah submit
        setCommand("");
    };

    const handleChange = (e) => {
        setCommand(e.target.value);
    };

    return (
        <div>
            <h2 className="text-xl font-bold">Masukkan Command</h2>
            <form onSubmit={handleSubmit}>
            <textarea
                className="border border-primary bg-base-200 rounded p-2 mt-2 w-full"
                value={command}
                onChange={handleChange}
                style={{resize: 'none'}}
                placeholder="Contoh: 5 soal matematika dan 7 soal ipa"
                rows={4}
            />
                <div className='flex flex-col-reverse'>
                    <small className='font-bold'>
                        *noted: Harap Masukan jumlah soal dan materi soal saja, akan automatic membuat dan memiliki
                        jawaban
                    </small>
                    <small className='italic'>
                        *noted: Please enter only the number of questions and the question material. The system
                        will automatically generate and provide the answers.
                    </small>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}