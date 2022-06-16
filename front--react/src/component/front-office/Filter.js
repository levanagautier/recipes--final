import React, { useState, useEffect } from 'react';

export function Filter() {
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
    <aside className="Filter">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="tag"
          style={{ backgroundColor: `#${tag.color}` }}
        >
          <span className="tag__name">
            {tag.name}
            <i>&times;</i>
          </span>
        </div>
      ))}
    </aside>
  );
}
