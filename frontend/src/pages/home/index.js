import React from 'react';
import './styles.css';

export default function Home() {
    return (
        <body>
            <div className="container-home">
                <h1>Busca<span>Dev</span></h1>
                <form>
                    <input type="text" placeholder="Usuário do github" name="username" />
                </form>
                <input type="submit" value="Buscar" />
            </div>
        </body>
    )
}