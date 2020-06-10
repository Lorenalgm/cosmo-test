import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function User() {
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        
        async function SearchRepositories(){
            const response = await axios.get(`https://api.github.com/users/${username}/repos`)
            setRepositories(response.data);
        }

        async function SearchUser(){
            const response = await axios.get(`https://api.github.com/users/${username}`)

            if(response){
                setUser(response.data);
                setLoading(false);
                SearchRepositories();
            }
        }
        
        SearchUser();
        
    }, [username]);

    repositories.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
    });

    return (
        <div className="container-user">
            <div className="header">
                <h1>Busca<span>Dev</span></h1>
                <Link to="/">
                    <button>Início</button>
                </Link>
            </div>
            {
                !loading && (
                    user ?
                    <div className="dev">
                        <div className="left-container">
                            <img src={user.avatar_url} alt="Avatar" />
                            <h2>{user.login}</h2>
                            <p className="bio">{user.bio}</p>
                            <p className="email">{user.email}</p>
                        </div>
                        <div className="principal-container">
                            <div className="info">
                                <div>
                                    <h4>{user.following}</h4>
                                    <p>Seguindo</p>
                                </div>
                                <div>
                                    <h4>{user.followers}</h4>
                                    <p>Seguidores</p>
                                </div>
                            </div>
                            <div className="repositories">
                                {
                                   repositories.map(repository =>(
                                       <div>
                                            <div>{repository.name}</div>
                                        <div>{repository.description}</div>
                                        <div>{repository.html_url}</div>
                                        <div>{repository.stargazers_count}</div>
                                       </div>
                                    ))
                               }
                            </div>
                        </div>
                    </div>

                    :

                    <div className="user-not-found">
                        <h2>Usuário não encontrado :(</h2>
                        <Link to="/">
                            <button>Tente novamente</button>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}