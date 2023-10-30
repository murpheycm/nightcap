import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALLERGENS, GET_TAGS } from "../utils/queries";
import UploadImage from "../components/UploadImage";
import AuthService  from "../utils/auth";
import Select from "react-select";
import { ADD_COCKTAIL, ADD_TAG, ADD_ALLERGEN } from "../utils/mutations";

function UploadCocktail() {
  const [newAllergen, setNewAllergen] = useState("");
  const [newTag, setNewTag] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [userId, setUserId] = useState("");
  const [availableAllergens, setAvailableAllergens] = useState([]);
  const [cocktailData, setCocktailData] = useState({
    user: "",
    name: "",
    description: "",
    images: [],
    ingredients: "",
    allergens: [],
    tags: [],
  });

  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile) {
      setUserId(profile._id);
    }
  }, []);

  const [addAllergenMutation] = useMutation(ADD_ALLERGEN);
  const [addTagMutation] = useMutation(ADD_TAG);

  const handleAddAllergen = async () => {
    if (newAllergen.trim() !== "") {
      try {
        const { data } = await addAllergenMutation({
          variables: {
            name: newAllergen,
            userId,
          },
        });
        console.log(data);
        if (data && data.addAllergen) {
          const newAllergenData = data.addAllergen;
          updateAllergens(newAllergenData);
          clearNewAllergenField();
        } else {
          console.error("Error adding allergen");
        }
      } catch (error) {
        console.error("Error adding allergen:", error);
      }
    }
  };

  const handleAddTag = async () => {
    if (newTag.trim() !== "") {
      try {
        const { data } = await addTagMutation({
          variables: {
            name: newTag,
            userId,
          },
        });
        console.log(data);
        if (data && data.addTag) {
          const newTagData = data.addTag;
          updateTags(newTagData);
          clearNewTagField();
        } else {
          console.error("Error adding tag");
        }
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  const updateAllergens = (newAllergenData) => {
    setAvailableAllergens([...availableAllergens, newAllergenData]);
    console.log(availableAllergens);
    updateCocktailData("allergens", newAllergenData._id);
  };

  const updateTags = (newTagData) => {
    setAvailableTags([...availableTags, newTagData]);
    console.log(availableTags);
    updateCocktailData("tags", newTagData._id);
  };

  const updateCocktailData = (field, value) => {
    setCocktailData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], value],
    }));
  };

  const clearNewAllergenField = () => {
    setNewAllergen("");
  };

  const clearNewTagField = () => {
    setNewTag("");
  };

  const { loading: allergensLoading, data: allergensData, error: allergensError } = useQuery(GET_ALLERGENS);
  const { loading: tagsLoading, data: tagsData, error: tagsError } = useQuery(GET_TAGS);
  
  useEffect(() => {
      console.log("Allergens Data:", allergensData);
      console.log("Tags Data:", tagsData);
      
      if (!allergensLoading && !allergensError) {
          if (allergensData && allergensData.availableAllergens.length > 0) {
              const allergenData = allergensData.availableAllergens.map((allergen) => ({
                  value: allergen._id,
                  label: allergen.name,
              }));
              setAvailableAllergens(allergenData);
          }
      }
  
      if (!tagsLoading && !tagsError) {
          if (tagsData && tagsData.availableTags.length > 0) {
              const tagData = tagsData.availableTags.map((tag) => ({
                  value: tag._id,
                  label: tag.name,
              }));
              setAvailableTags(tagData);
          }
      }
  }, [allergensData, tagsData, allergensLoading, tagsLoading, allergensError, tagsError]);

  const handleCocktailDataChange = (e) => {
    const { name, value } = e.target;
    setCocktailData({ ...cocktailData, [name]: value });
  };

  const handleImageUploaded = (imageUrls) => {
    setCocktailData((prevData) => ({
      ...prevData,
      images: imageUrls,
    }));
  };

  const handleAllergensChange = (allergens) => {
    setCocktailData({ ...cocktailData, allergens });
  };

  const handleTagsChange = (tags) => {
    setCocktailData({ ...cocktailData, tags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["user", "name", "description"];

    if (requiredFields.some((field) => !cocktailData[field])) {
      console.error("Required fields missing");
    } else {
      // Call your GraphQL mutation to add a cocktail here
      addCocktail();
    }
  };

  const addCocktailMutation = useMutation(ADD_COCKTAIL);
  const addCocktail = () => {
    addCocktailMutation({
        variables: {
            user: userId,
            name: cocktailData.name,
            description: cocktailData.description,
            images: cocktailData.images,
            ingredients: cocktailData.ingredients,
            allergens: cocktailData.allergens,
            tags: cocktailData.tags,
        },
        })
        .then((res) => {
            console.log(res);
            setCocktailData({
            user: "",
            name: "",
            description: "",
            ingredients: "",
            allergens: [],
            tags: [],
        });
     })
        .catch((err) => {
            console.error(err);
    });
  };

    return (
        <div>
        <div>
            <h2>Upload Cocktail</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>
                Name*
                <input
                    type="text"
                    name="name"
                    value={cocktailData.name}
                    onChange={handleCocktailDataChange}
                />
                </label>
            </div>
            <div>
                <label>
                Description*
                <input
                    type="text"
                    name="description"
                    value={cocktailData.description}
                    onChange={handleCocktailDataChange}
                />
                </label>
            </div>
            <div>
                <label>Image</label>
                <UploadImage onImageUploaded={handleImageUploaded} />
            </div>
            <div>
                <label>Ingredients</label>
                <input
                type="text"
                name="ingredients"
                value={cocktailData.ingredients}
                onChange={handleCocktailDataChange}
                />
            </div>
            <div>
                <label>Allergens</label>
                <Select
                isMulti
                options={availableAllergens}
                value={availableAllergens && cocktailData.allergens ? 
                    availableAllergens.filter((allergen) => 
                    cocktailData.allergens.includes(allergen.value)) : null}
                onChange={handleAllergensChange}
                />
                <input
                    type="text"
                    placeholder="Add new allergen"
                    value={newAllergen}
                    onChange={(e) => setNewAllergen(e.target.value)} 
                />
                <button onClick={handleAddAllergen}>Add Allergen</button>
            </div>
            <div>
                <label>Select Tags for your cocktail</label>
                <Select
                isMulti
                options={availableTags}
                value={availableTags && cocktailData.tags ? 
                    availableTags.filter((tag) => 
                    cocktailData.tags.includes(tag.value)) : null}
                onChange={handleTagsChange}
                />
                <input
                    type="text"
                    placeholder="Add new tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                />
                <button onClick={handleAddTag}>Add Tag</button>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default UploadCocktail;