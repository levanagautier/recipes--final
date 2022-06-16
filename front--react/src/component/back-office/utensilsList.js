import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreationButton } from '../back-index';

export function UtensilsList() {
  const [utensils, setUtensils] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/utensils')
      .then((response) => response.json())
      .then((data) => setUtensils(data));
  }, []);

  useEffect(() => {
    console.log(utensils);
  }, [utensils]);

  return (
    <section className="resources__list">
      <h1>Liste des ustensiles</h1>
      <CreationButton ressource="utensils" text="ustensile" />
      <div className="resources__table">
        <table>
          <thead>
            <tr>
              <th id="thead__utensil-name">Ustensiles</th>
              <th id="thead__last-modification">Dernière modification</th>
              <th id="thead__edit"></th>
              <th id="thead__delete"></th>
            </tr>
          </thead>
          <tbody>
            {utensils.map((utensil) => (
              <tr key={utensil.id}>
                <td className="tbody__utensil-name">{utensil.name}</td>
                <td className="tbody__last-modification">
                  {utensil.updatedAt}
                </td>
                <td className="tbody__edit">
                  <Link
                    className="table__icon"
                    title={"Éditer l'ustensile " + utensil.name}
                    to={`./${utensil.id}`}
                  >
                    <img
                      alt={"Éditer l'ustensile " + utensil.name}
                      src={process.env.PUBLIC_URL + '/icons/icon__edit.svg'}
                    />
                  </Link>
                </td>
                <td className="tbody__delete">
                  <Link
                    className="table__icon"
                    title={"Supprimer l'ustensile " + utensil.name}
                    to={`./${utensil.id}`}
                  >
                    <img
                      alt={"Supprimer l'ustensile " + utensil.name}
                      src={process.env.PUBLIC_URL + '/icons/icon__delete.svg'}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
