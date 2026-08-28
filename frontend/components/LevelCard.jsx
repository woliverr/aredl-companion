function LevelCard({ name, id, uploader, difficulty }){
    return(
        <div className="level-card">
            <p>{name}</p>
            <p>{id}</p>
            <p>by {uploader}</p>
            <p>difficulty: {difficulty}</p>
            <button>Add Level</button>
        </div>
    )
}

export default LevelCard