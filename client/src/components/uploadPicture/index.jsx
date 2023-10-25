import { useState } from "react";
import { storage } from "../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
function App() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [percent, setPercent] = useState(0);
 
    function handleChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleCameraCapture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image or take a picture first!");
            return;
        }
 
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
 
    return (
        <div>
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          {previewURL && (
            <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
          )}
          <button onClick={handleCameraCapture}>Take a Picture</button>
          <button onClick={handleUpload}>Upload Picture</button>
          <p>{percent} % done</p>
        </div>
    );
}
 
export default App;