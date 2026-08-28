import { useState } from 'react'
import InputForm from './InputForm'
import SearchResults from './SearchResults'



function SearchApp(){

    const [results, setResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');



    function submitSearch(event){
        event.preventDefault();
        performSearch();
    }

    function performSearch(){
        // WIRE TO BACKEND
    }

    return(
        <div>
            <InputForm
                buttonName={"Search!"}
                submitFn={submitSearch} 
                formContents={searchInput}
                updateFormFn={setSearchInput} 
            />
            <SearchResults
                results={results}
            />
        </div>
    )
}

export default SearchApp