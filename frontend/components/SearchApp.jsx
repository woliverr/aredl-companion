    import { useState } from 'react'
    import InputForm from './InputForm'
    import SearchResults from './SearchResults'


    function SearchApp(){

        const [results, setResults] = useState([]);
        const [gsvResults, setGsvResults] = useState([]);
        const [searchInput, setSearchInput] = useState('');

        async function submitSearch(event){
            event.preventDefault();
            const response = await fetch(`http://localhost:5000/api/search?name=${searchInput}`)
            const data = await response.json();
            setResults(data);
        }

        async function searchGSV(event){
            event.preventDefault();
            const response = await fetch(`https://api.globalstatsviewer.com/v3/levels?search=${searchInput}&sort_by=likes&sort_order=desc&limit=24&offset=0`)
            const data = await response.json();
            const normalized_data = data.levels.map((level) => {
                return {
                    name:level.level_name,
                    id:level.level_id,
                    uploader:level.creator.name,
                    difficulty:level.difficulty
                }
            });
            setGsvResults(normalized_data);
        }

        return(
            <div>
                <h1>Level Search</h1>
                <InputForm
                    buttonName={"Search!"}
                    submitFn={submitSearch} 
                    formContents={searchInput}
                    updateFormFn={setSearchInput} 
                />
                <SearchResults results={results} />
                <h3>Can't find what you're looking for?</h3>
                <button onClick={searchGSV}>Search Global Stats Viewer</button>
                <SearchResults results={gsvResults} />
            </div>
        )
    }

    export default SearchApp