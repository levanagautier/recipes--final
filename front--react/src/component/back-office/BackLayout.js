import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, deleteToken } from '../../store/appSlice';
import {
  Header,
  Navigation,
  Dashboard,
  IngredientsList,
  RecipesList,
  TagsList,
  UsersList,
  UtensilsList,
  RecipeItem,
  IngredientItem,
  UtensilItem,
  TagItem,
  ProtectedRoute,
  RecipeForm,
  NotFound,
} from '../../component/back-index';

import '../../App.scss';
import '../../scss/back-office/style.scss';

// import poweroff from '/icons/poweroff.svg'

export function BackLayout() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('from back layout', token);
  }, [token]);

  const deleteToken = () => {
    localStorage.removeItem('token');
    dispatch(setToken(null));
    navigate('/', { replace: true });
  };
  return (
    <div className="Back-office">
      <Header />
      <button type="button" className="logout" onClick={deleteToken}>
        <img
          alt="Se déconnecter"
          src={process.env.PUBLIC_URL + '/icons/icon__power-off.svg'}
        />
      </button>
      <Navigation />
      <Routes className="main-content">
        <Route exact path="/" element={<Dashboard />} />
        <Route
          exact
          path="/ingredients"
          element={
            <ProtectedRoute>
              <IngredientsList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/recipes"
          element={
            <ProtectedRoute>
              <RecipesList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/tags"
          element={
            <ProtectedRoute>
              <TagsList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/utensils"
          element={
            <ProtectedRoute>
              <UtensilsList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <RecipeItem />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/ingredients/:id"
          element={
            <ProtectedRoute>
              <IngredientItem />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/utensils/:id"
          element={
            <ProtectedRoute>
              <UtensilItem />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/tags/:id"
          element={
            <ProtectedRoute>
              <TagItem />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="create/recipes"
          element={
            <ProtectedRoute>
              <RecipeForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
