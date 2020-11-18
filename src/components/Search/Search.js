export const Search = ({id, courses, updateSelection}) => {
   return (
        <div>
            <input type="text" onBlur={e => updateSelection(e.target.value)} list={`courseList_${id}`} />
            <datalist id={`courseList_${id}`}>
                {  
                    courses.map((course, i) => {
                        return  <option key={i} value={course}></option>
                    })
                }
            </datalist>
        </div>
   )
}