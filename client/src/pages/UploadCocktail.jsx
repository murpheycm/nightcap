import React, { useState, useContext } from "react";
import UploadPicture from "../components/UploadPicture";
import Select from "react-select";
import { ADD_COCKTAIL } from "../utils/mutations";
import { useUserContext } from "../utils/GlobalState";

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

  const [state, dispatch] = useUserContext(); // Get the state and dispatch function from the context

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
    const selectedTagValues = selectedTags.map((tag) => tag.value);
    setCocktailData({
      ...cocktailData,
      tags: selectedTagValues,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an action object with type and payload
    const action = {
      type: ADD_COCKTAIL,
      payload: cocktailData,
    };

    // Dispatch the action to update the global state
    dispatch(action);
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
          <Select
            isMulti
            options={availableTags}
            value={availableTags.filter((tag) =>
              cocktailData.tags.includes(tag.value)
            )}
            onChange={handleTagsChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadCocktail;