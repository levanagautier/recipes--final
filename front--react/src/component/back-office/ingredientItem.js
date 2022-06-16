import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IngredientInput } from "./ingredientInput";

export function IngredientItem() {
  const { id } = useParams();

  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/ingredients/${id}`);
      const newIngredient = await response.json();
      setIngredient(newIngredient);
    };
    fetchData();
  }, []);

  const handleIngredientChange = (e, id = false) => {
    setIngredient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/ingredients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ name: ingredient.name }),
    })
      .then((response) => response.json())
      .then(console.log)
      .catch(console.log);
  };
  return (
    <form onSubmit={handleSubmit}>
      <IngredientInput
        {...ingredient}
        recipe={false}
        handleIngredientChange={handleIngredientChange}
      />
      <input type="submit" value="Valider" />
    </form>
  );
}
