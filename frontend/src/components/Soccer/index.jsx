import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer/index.jsx';

export default function Soccer() {
    const [soccer, setSoccer] = useState([]);

    const fetchSoccer = () => {
        axios.get('http://localhost:8080/soccer/get')
            .then(response => {
                console.log(response.data);
                setSoccer(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchSoccer();
    }, []);

    return (
        <>
        <br />
        <h1 className="text-2xl font-bold mb-4">The best football player of all time</h1>
        <Link to="/list">
            <button className="btn btn-primary bg-soccer-primary hover:bg-soccer-hover text-white font-bold py-2 px-4 rounded-full ml-5">Soccer List</button>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {soccer.map((soccer) => (
                    <div key={soccer.id} className="card">
                        <div className="card-content">
                            <h2>{soccer.name}</h2>
                            <div className="image-container">
                                <img src={soccer.image} alt="img" style={{ maxWidth: 200, maxHeight: 200 }} />  
                            </div>
                            <br />
                            <p>Club: {soccer.team}</p>
                            <p>Age: {soccer.number}</p>
                        </div>
                    </div>
                ))}
        </div>
            <Footer />
        </>    
    );
}