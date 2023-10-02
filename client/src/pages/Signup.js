import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";


const INVITE_CODE = "iykyk";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "", inviteCode: "" });
  const [error, setError] = useState(null);
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const inviteCode = formState.inviteCode;

    if (inviteCode !== INVITE_CODE) {
      setError("🤐 Invalid Invite Code. Please try again.");
      return;
    }

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">⏮️ SIGN IN</Link>

      <h2>JOIN NOW</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">👤 First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">👤 Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">📧 Email:</label>
          <input
            placeholder="email@jordan.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">🔒 Password:</label>
          <input
            placeholder="password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="inviteCode">🔑 Invite Code:</label>
          <input
            placeholder="Invite Code"
            name="inviteCode"
            type="inviteCode" 
            id="inviteCode"
            value={formState.inviteCode} 
            onChange={handleChange}
          />
        </div>
        {error && <p className="error">{error}</p>} 
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
