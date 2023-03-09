
export interface Props {
    onChange : ()=>void,
}
export const RecordPerPage:  React.FC<Props>= props=>{
    const {onChange} = props
    return (
        <>
               <select onChange={onChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select> 
        </>
    )
}