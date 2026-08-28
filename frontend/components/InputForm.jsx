function InputForm({ buttonName, submitFn, formContents, updateFormFn }){
    return (
        <div className="new-level-container">
            <form id="new-level" onSubmit={submitFn}>
                <input type="text" id="level-input" value={formContents} onChange={(e) => updateFormFn(e.target.value)}/>
                <button type="submit">{buttonName}</button>
            </form>
        </div>
    )
}

export default InputForm