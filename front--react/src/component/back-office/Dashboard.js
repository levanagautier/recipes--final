import React, { useState, useEffect } from 'react';
import '../../scss/back-office/dashboard.scss';

export function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <section className="dashboard">
      {users.map((user) => (
        <h1 className="dashboard__title" key={user.id}>
          Bienvenue {user.firstName}
        </h1>
      ))}
      <img
        className="dashboard__img"
        alt="Dashboard data"
        src="/data-2--color.png"
      />
    </section>
  );
}
