import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function User() {
    const username = localStorage.getItem('username');
    const [user, setUser] = useState('');

    useEffect(() => {
        axios.get(`https://api.github.com/users/${username}`).then(response => {
            setUser(response.data);
        });
    }, [username]);

    return (
        <div className="container-user">
            <div className="header">
                <h1>Busca<span>Dev</span></h1>
                <Link to="/">
                    <button>Início</button>
                </Link>
            </div>
            {
                user?
                <div className="user">
                    <p>{user.login}</p>
                    <p>{user.bio}</p>
                    <p>{user.avatar_url}</p>
                </div>

                : 
                
                <div className="user-not-found">
                    <h2>Usuário não encontrado :(</h2>
                    <Link to="/">
                        <button>Tente novamente</button>
                    </Link>
                </div>
            }
            
        </div>
    )
}