import Card from "../components/Card";
import {Link} from "react-router-dom";

export default function Home() {
    return(
        <>
            <div className="contain md:bg-base-200 p-4 md:rounded-2xl">
                <div className="titile-contain flex justify-between p-4 mb-4">
                    <h1 className='text-xl md:text-2xl'>Available classes</h1>
                    <Link to={"/"} className="text-sm self-center">Lihat Semua</Link>
                </div>
                <div className="cards p-2 flex flex-wrap justify-center md:justify-start">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </>
    )
}