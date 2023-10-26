import React, { useState } from "react";
import UploadPicture from "../components/UploadPicture";

function UploadProfile() {
  // Define user data using state
  const [user, setUser] = useState('');

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update the user's profile with the new data
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-settings">
          <div className="profile-picture">
            <h3>Profile Picture</h3>
            <UploadPicture />
            {/* Add additional profile picture-related content here */}
          </div>

          <div className="username">
            <h3>Username</h3>
            <p>
              <span>{user.username}</span> <span>(Change)</span>
            </p>
          </div>

          <div className="email">
            <h3>Email Address</h3>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="firstName">
            <h3>First Name</h3>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Add more profile settings fields as needed */}
        </div>

        <div className="update-settings">
          <h2>Update Settings</h2>

          <div className="change-password">
            <h3>Change Password</h3>
            <div>
              <input type="password" placeholder="Current" />
              <input type="password" placeholder="New" />
              <input type="password" placeholder="Repeat" />
            </div>
          </div>

          <div className="log-out">
            <h3>Log-out of all devices and third-party apps?</h3>
            <p>(?)</p>
          </div>

          {/* Add more update settings fields as needed */}
          <button type="submit">Update Settings</button>
        </div>
      </form>
    </div>
  );
}

export default UploadProfile;