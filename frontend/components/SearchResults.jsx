import LevelCard from './LevelCard'

function SearchResults({ results, submitFn }){
    return(
        <div className="search-result-container">
            {results.map((item) => 
                <LevelCard 
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    uploader={item.uploader}
                    difficulty={item.difficulty}
                    submitFn={submitFn}
                />
            )}
        </div>
    )
}

export default SearchResults