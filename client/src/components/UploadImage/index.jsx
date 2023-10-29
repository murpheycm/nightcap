import "./uploadPicture.css";
import React, { useState, useEffect } from 'react';
import storage from '../../utils/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function UploadImage({ onImageUploaded }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, 'images/');

  const uploadFile = () => {
    if (selectedImages === null || selectedImages.length === 0) return;


      const imageRef = ref(storage, `images/${image.name + v4()}`);
      return uploadBytes(imageRef, image)
        .then((snapshot) => getDownloadURL(snapshot.ref));
    });

    Promise.all(uploadedPromises)
      .then((urls) => {
        setImageUrls((prev) => [...prev, ...urls]);
        onImageUploaded(urls); // Notify the parent component about the uploaded image URLs
        setSelectedImages([]); // Clear the selected images after upload
      });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response => {
        response.items.forEach((item) => getDownloadURL(item));
      })
      .then((urls) => {
        setImageUrls(urls);
      });
  }, []);

  return (
    <div className="upload">
      <input
        type="file"
        onChange={(event) => {
          setSelectedImages(Array.from(event.target.files)); // Store selected images in state
        }}
        multiple
      />
      <button onClick={uploadFile}>Upload Image</button>
      <div>
      {selectedImages.length > 0 &&
        selectedImages.map((image, index) => (
          <img
            src={URL.createObjectURL(image)}
            alt={`Selected ${index}`}
            key={index}
          />
        ))}
      {imageUrls.length > 0 &&
        imageUrls.map((url, index) => (
          <img src={url} alt={`Uploaded ${index}`} key={index} />
        ))}
        </div>
    </div>
  );
}

export default UploadImage;