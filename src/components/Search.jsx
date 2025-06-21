import React from 'react'
// const person = {
//   name: 'John Doe',
//   age: 30,
//   occupation: 'Software Engineer'
// }

// const { name, age, occupation } = person;
// console.log(`Name: ${name}, Age: ${age}, Occupation: ${occupation}`);
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input type="text"
        placeholder='Search through thousands of movies'
        value={searchTerm} 
        onChange={(event) => setSearchTerm(event.target.value)}/>
      
      </div>
    </div>
  )
}

export default Search