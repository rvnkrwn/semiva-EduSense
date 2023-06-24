import {Link} from "react-router-dom";
export default function Card() {
    return (
        <Link to={'/home'}>
            <div className="card w-72 bg-base-100 shadow-xl m-2">
                <figure className='h-60'><img src={'https://images.unsplash.com/photo-1687591222784-41b886039512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        XII MIPA 7
                        <div className="badge badge-secondary">class</div>
                    </h2>
                    <p>Matematika</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Mapel Wajib</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}