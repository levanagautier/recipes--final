import React from 'react';
import '../scss/notFound.scss';

export function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__message">
        La page que vous avez demandé n'existe pas.
      </div>
    </section>
  );
}
