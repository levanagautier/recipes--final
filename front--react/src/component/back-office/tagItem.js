import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function TagItem() {
  const { id } = useParams();

  const [tag, setTag] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/tags/${id}`);
      const newTag = await response.json();
      setTag(newTag);
    };

    fetchData();
  }, []);
  return <div>{tag.name}</div>;
}
