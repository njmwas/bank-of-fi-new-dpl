import React, { useState } from "react";

function Search({onSearch}) {

  const [description, setDescription] = useState('')
  function handleSearch(event){
    setDescription(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={description}
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
