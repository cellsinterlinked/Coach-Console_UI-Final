import React, { useState, useEffect } from 'react';
import './AddClientMobile.css';
import InputFront from './InputFront';
import Button from '../Buttons/Button';
import { GoSearch } from 'react-icons/go';
import ClientButton from '../Buttons/ClientButton';

const AddClientMobile = ({ users }) => {
  const [query, setQuery] = useState();
  const [displayedUsers, setDisplayedUsers] = useState();

  useEffect(() => {
    if (users && query) {
      setDisplayedUsers(
        users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase())),
      );
    }
  }, [query, users]);

  return (
    <div className="add-client-wrapper">
      <div className="new-client-search">
        <InputFront
          placeholder="Search Users"
          name="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button contents={<GoSearch className="magnify" />} name="search-button" />
      </div>

      {displayedUsers &&
        displayedUsers.map((user, index) => (
          <ClientButton key={index} image={user.image} name={user.name} />
        ))}
    </div>
  );
};

export default AddClientMobile;
