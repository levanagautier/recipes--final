import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function UsersList () {
    const [users, setUsers] = useState([])

    useEffect(() => {
      fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => setUsers(data))
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])
    

    return (
        <section className='resources__list'>
            <h1>Liste des utilisateurs</h1>
            <div className='resources__table'>
                <table>
                    <thead>
                        <tr>
                            <th id="thead__user-name">Utilisateurs</th>
                            <th id="thead__email">Email</th>
                            <th id="thead__last-modification">Dernière modification</th>
                            <th id="thead__edit"></th>
                            <th id="thead__delete"></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        users.map(user => (
                            <tr key={user.id}>
                                <td className="tbody__user-name">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="tbody__email">
                                    {user.email}
                                </td>
                                <td className="tbody__last-modification">
                                    {user.updatedAt}
                                </td>
                                <td className="tbody__edit">
                                    <Link className='table__icon' title={'Éditer l\'utilisateur' + user.firstName + user.lastName} to={`./${user.id}`}>
                                        <img alt={'Éditer l\'utilisateur' + user.firstName + user.lastName} src={process.env.PUBLIC_URL + '/icons/icon__edit.svg'} />
                                    </Link>
                                </td>
                                <td className="tbody__delete">
                                    <Link className='table__icon' title={'Supprimer l\'utilisateur' + user.firstName + user.lastName} to={`./${user.id}`}>
                                        <img alt={'Supprimer l\'utilisateur' + user.firstName + user.lastName} src={process.env.PUBLIC_URL + '/icons/icon__delete.svg'} />
                                    </Link>
                                </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            </div>
        </section>
    )
}