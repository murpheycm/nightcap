import React, { useState } from "react";
import UploadPicture from "../components/UploadImage";
import Auth from "../utils/auth";

function UploadProfile() {
  // Define user data using state
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    birthday: "",
    location: "",
    country: "",
  });

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
          <div className="profileImage">
            <h3>Profile Picture</h3>
            <UploadPicture />
          </div>

          <div className="username">
            <h3>Username</h3>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
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

          <div className="lastName">
            <h3>Last Name</h3>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="bio">
            <h3>About Me</h3>
            <input
              type="text"
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
            />
          </div>

          <div className="birthday">
            <h3>Birthday</h3>
            <input
              type="text"
              name="birthday"
              value={user.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="country">
            <h3>Location</h3>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="lastName">
            <h3>Country</h3>
            <input
              type="text"
              name="country"
              value={user.country}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Update Settings</button>
      <div>
          <div className="change-password">
            <h3>Change Password</h3>
            <div>
              <input type="password" placeholder="Current" />
              <input type="password" placeholder="New" />
              <input type="password" placeholder="Repeat" />
            </div>
          </div>
      </div>
          {/* Add more update settings fields as needed */}
          <button type="submit">Update Settings</button>
        </div>
      </form>
    </div>
  );
}

export default UploadProfile;