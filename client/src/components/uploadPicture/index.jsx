import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import storage from "../../utils/firebase";
import { v4 } from "uuid";

function UploadPicture({ onImageSelected, onImageUploaded }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        // Call the callback function to notify the parent component
        onImageUploaded(url);
      });
    });
  };

  const handleRemove = (index) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);
    setSelectedImages(updatedSelectedImages);
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    }, []); // Add an empty dependency array to ensure this effect only runs once when the component mounts.

    return () => {
      // Reset the component's state when it unmounts
      setImageUpload(null);
      setSelectedImages([]);
      setImageUrls([]);
    };
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          setSelectedImages([event.target.files[0]]);
          // Call the callback function to notify the parent component of the selected image
          onImageSelected(event.target.files[0]);
        }}
      />
      {selectedImages.map((selectedImage, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          <button onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={uploadFile}>Upload Image</button>
      {imageUrls.map((url, index) => {
        return <img key={index} src={url} alt="Uploaded" />;
      })}
    </div>
  );
}

export default UploadPicture;