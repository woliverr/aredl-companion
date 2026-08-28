function LevelList({ levels, removeFn, moveFn }){ 
    return (
        <div>
            <h1>My List</h1>
            {levels.map((level, index) => (
                <div className="level" key={level.id}>
                    <h2>{index + 1}. {level.name}</h2>
                    <div>
                        <button type="button" onClick={() => removeFn(level.id)}>X</button>
                        <button type="button" onClick={() => moveFn(level.id, -1)}>↑</button>
                        <button type="button" onClick={() => moveFn(level.id, 1)}>↓</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LevelList