function LevelCard({ name, id, uploader, difficulty, submitFn }){
    return(
        <div className="level-card">
            <p>{name}</p>
            <p>{id}</p>
            <p>by {uploader}</p>
            <p>difficulty: {difficulty}</p>
            <button onClick={() => submitFn({
                name, id, uploader, difficulty
            })}>Add Level</button>
        </div>
    )
}

export default LevelCard