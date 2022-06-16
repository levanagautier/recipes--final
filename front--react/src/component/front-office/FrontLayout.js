import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Header,
  Navigation,
  Home,
  RecipeItem,
  Auth,
  NotFound,
} from '../../component/front-index';

import { deleteToken } from '../../store/appSlice';

import '../../App.scss';
import '../../scss/front-office/style.scss';

export function FrontLayout() {
  return (
    <div className="Front-office">
      <Header />
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/recipes/:id" element={<RecipeItem />} />
        <Route exact path="auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
