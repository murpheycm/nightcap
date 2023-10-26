import React, { useState } from "react";
import UploadPicture from "../components/UploadPicture";
import TextField from "@mui/material/TextField";
import List from "../components/CocktailSearch";
// import Select from "react-select";

function UploadCocktail() {
  const [cocktailData, setCocktailData] = useState({
    name: "",
    description: "",
    image: null,
    tags: [],
  });

  const availableTags = [
    { label: "Tag1", value: "Tag1" },
    { label: "Tag2", value: "Tag2" },
    { label: "Tag3", value: "Tag3" },
    // Add more available tags as needed
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCocktailData({
      ...cocktailData,
      [name]: value,
    });
  };

  const handleImageChange = (imageFile) => {
    setCocktailData({
      ...cocktailData,
      image: imageFile,
    });
  };

  const handleTagsChange = (selectedTags) => {
    setCocktailData({
      ...cocktailData,
      tags: selectedTags,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the cocktailData to your server or perform other actions with it.
    console.log(cocktailData);
  };

  return (
    <div>
      <h2>Upload Your Cocktail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cocktail Name:</label>
          <input
            type="text"
            name="name"
            value={cocktailData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={cocktailData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <UploadPicture onImageChange={handleImageChange} />
        </div>
        <div>
          <label>Select Tags for your cocktail:</label>
          <TextField
            isMulti
            options={availableTags}
            value={cocktailData.tags}
            onChange={handleTagsChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadCocktail;