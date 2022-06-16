import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function UtensilItem() {
  const { id } = useParams();

  const [utensil, setUtensil] = useState({});

  const fetchData = async () => {
    const response = await fetch(`http://localhost:8080/utensils/${id}`);
    const newUtensil = await response.json();
    setUtensil(newUtensil);
  };
  fetchData();
  return <div>{utensil.name}</div>;
}
