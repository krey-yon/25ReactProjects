import { useState, useEffect } from "react";
import Suggestions from "./Suggestions";

function AutoComplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchParams(value);
    if (value.length > 1) {
      const filteredUsers =
        users && users.length
          ? users.filter((user) => user.toLowerCase().indexOf(value) > -1)
          : [];
      setFilteredUsers(filteredUsers);
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }

  function handleClick(e) {
    setShowDropDown(false);
    setSearchParams(e.target.innerText);
    setFilteredUsers([]);
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      if (data && data.users && data.users.length > 0) {
        setUsers(data.users.map((user) => user.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // console.log(users)
  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      <input
        value={searchParams}
        name="search-users"
        placeholder="search users here ..."
        onChange={handleChange}
      />
      {showDropDown && (
        <Suggestions data={filteredUsers} handleClick={handleClick} />
      )}
    </div>
  );
}

export default AutoComplete;
