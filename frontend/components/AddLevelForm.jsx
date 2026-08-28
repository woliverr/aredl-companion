function AddLevelForm({ submitFn, formContents, updateFormFn }){
    return (
        <div className="new-level-container">
            <form id="new-level" onSubmit={submitFn}>
                <input type="text" id="level-input" value={formContents} onChange={(e) => updateFormFn(e.target.value)}/>
                <button type="submit">Add Level</button>
            </form>
        </div>
    )
}

export default AddLevelForm