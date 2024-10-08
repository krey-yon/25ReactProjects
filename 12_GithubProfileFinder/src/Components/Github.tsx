import { useEffect, useState } from "react";
import User from "./User";
import "./style.css";

export default function GithubProfileFinder() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGithubUserData(username) {
    setLoading(true);
    setError(null); // Reset errors before new request
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    if (userName) {
      fetchGithubUserData(userName);
    }
  }

  // Do not call fetchGithubUserData on first render by default.
  // The user should initiate the search.

  return (
    <div className="github-profile-container">
      <div className="input-wrapper">
        <input
          name="search-by-username"
          type="text"
          placeholder="Search Github Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {loading && <h1>Loading data! Please wait...</h1>}
      {error && <h1>{error}</h1>}
      {userData && <User user={userData} />}
    </div>
  );
}
    
