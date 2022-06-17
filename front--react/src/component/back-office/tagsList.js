import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreationButton } from '../back-index';
import '../../scss/back-office/list.scss';

export function TagsList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tags')
      .then((response) => response.json())
      .then((data) => setTags(data));
  }, []);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <section className="resources__list">
      <h1>Liste des tags</h1>
      <CreationButton ressource="tags" />
      <div className="resources__table">
        <table>
          <thead>
            <tr>
              <th id="thead__tag-name">Tag</th>
              <th id="thead__last-modification">Dernière modification</th>
              <th id="thead__edit"></th>
              <th id="thead__delete"></th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td className="tbody__tag-name">{tag.name}</td>
                <td className="tbody__last-modification">{tag.updatedAt}</td>
                <td className="tbody__edit">
                  <Link
                    className="table__icon"
                    title={'Éditer le tag ' + tag.name}
                    to={`./${tag.id}`}
                  >
                    <img
                      alt={'Éditer le tag ' + tag.name}
                      src={process.env.PUBLIC_URL + '/icons/icon__edit.svg'}
                    />
                  </Link>
                </td>
                <td className="tbody__delete">
                  <Link
                    className="table__icon"
                    title={'Supprimer le tag ' + tag.name}
                    to={`./${tag.id}`}
                  >
                    <img
                      alt={'Supprimer le tag ' + tag.name}
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
