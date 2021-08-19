import React from 'react';

const Search = (props) => {

    const makeList = (search, persons) => {
        if(search==='') {
            return persons;
        } else {
            return persons.filter(el => el.name.toUpperCase().indexOf(search.toUpperCase())===0);
        }
    }

    const listPersons = makeList(props.search, props.persons);

    return (
        listPersons.map(value => {
            return (
                <div key={value.name}>
                  {value.name+' '+value.number}
                  <button id={value.id} onClick={props.handleDelete}>delete</button>
                </div>
            );
          })
    );
}

export default Search;