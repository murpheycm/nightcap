import React, { useState, useEffect } from "react";
import UploadImage from "../components/UploadImage";
import Select from "react-select";
import { ADD_COCKTAIL } from "../utils/mutations";
import { useUserContext } from "../utils/GlobalState";

function UploadCocktail() {
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Store the uploaded image URLs
  const [selectedImages, setSelectedImages] = useState([]); // Store the selected image URLs
    const [cocktailData, setCocktailData] = useState({
    name: "",
    busines: "",
    description: "",
    tags: [],
    images: [],
  });

  const availableTags = [
    { label: "Tag1", value: "Tag1" },
    { label: "Tag2", value: "Tag2" },
    { label: "Tag3", value: "Tag3" },
    // Add more available tags as needed
  ];

  const [state, dispatch] = useUserContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCocktailData({
      ...cocktailData,
      [name]: value,
    });
  };

  // Function to handle image URLs received from child component
  const handleImageUploaded = (urls) => {
    setCocktailData({
        ...cocktailData,
        images: urls,
    });// Store the uploaded image URLs
  };

  const handleUpload = () => {
    console.log("Selected Images: ", selectedImages);
    console.log("Uploaded Images: ", uploadedImageUrls);
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
      payload: {
        ...cocktailData,
        // Add the uploaded image URLs to the payload
        images: uploadedImageUrls,
      },
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
          <UploadImage onImageUploaded={handleImageUploaded} />
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
        <button type="submit" onClick={handleUpload}>
          Upload Cocktail
        </button>
      </form>
    </div>
  );
}

export default UploadCocktail;