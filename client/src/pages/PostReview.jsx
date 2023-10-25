import React from "react";
import ImageUpload from "../components/uploadPicture";

function UploadProfile() {
  return (
    <div>
      <h2>Profile Settings</h2>
      {/* Include the ImageUpload component for profile picture uploads */}
      <ImageUpload />
      {/* Add more content and functionality specific to uploading a profile picture */}
    </div>
  );
}

export default UploadProfile;