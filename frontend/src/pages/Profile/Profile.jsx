import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Profile.css";

// User Icon
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Mail Icon
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Phone Icon
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// MapPin Icon
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// Trash Icon
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Plus Icon
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Profile = () => {
  const { url, token } = useContext(StoreContext);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${url}/api/profile/get`, {}, { headers: { token } });
        if (res.data.success) {
          setUser({
            name: res.data.user.name || "",
            email: res.data.user.email || "",
            phone: res.data.user.phone || "",
          });
          setAddresses(res.data.user.addresses || []);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
  }, [token, url]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/api/profile/update`, user, { headers: { token } });
      if (res.data.success) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const addAddress = async () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipcode || !newAddress.country) {
      alert("Please fill all address fields.");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/profile/address`, newAddress, { headers: { token } });
      if (res.data.success) {
        setAddresses(res.data.addresses);
        setNewAddress({ street: "", city: "", state: "", zipcode: "", country: "" });
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address.");
    }
  };

  const deleteAddress = async (index) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const res = await axios.delete(`${url}/api/profile/address/${index}`, { headers: { token } });
      if (res.data.success) {
        setAddresses(res.data.addresses);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address.");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>My Profile</h2>
          <p>Manage your personal information and addresses</p>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Personal Information</h3>
          <form onSubmit={updateProfile} className="profile-form">
            <div className="input-group">
              <label>
                <UserIcon />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="input-group">
              <label>
                <MailIcon />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>
                <PhoneIcon />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>

        <div className="profile-section">
          <h3 className="section-title">
            <MapPinIcon />
            <span>Saved Addresses</span>
          </h3>

          {addresses.length === 0 ? (
            <div className="no-address">
              <MapPinIcon />
              <p>No addresses added yet</p>
              <span>Add your first delivery address below</span>
            </div>
          ) : (
            <div className="address-list">
              {addresses.map((addr, i) => (
                <div key={i} className="address-card">
                  <div className="address-content">
                    <p className="address-street">{addr.street}</p>
                    <p className="address-details">{addr.city}, {addr.state} {addr.zipcode}</p>
                    <p className="address-country">{addr.country}</p>
                  </div>
                  <button onClick={() => deleteAddress(i)} className="delete-btn">
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="add-address-section">
            <h4>Add New Address</h4>
            <div className="add-address-form">
              <input
                type="text"
                placeholder="Street Address"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              />
              <div className="address-row">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
              </div>
              <div className="address-row">
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={newAddress.zipcode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                />
              </div>
              <button onClick={addAddress} className="add-address-btn">
                <PlusIcon />
                <span>Add Address</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;