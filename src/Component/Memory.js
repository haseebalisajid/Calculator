import React from 'react'

export const Memory = (props) => {
    return (
        <div className="memory">
            <div className="Mdisplay">
                <div className="Mheader">History</div>
            </div>
            <div className="Lists">
                {props.showData?
                <ul>
                    {props.memory.map((mem)=>(
                        <li key={mem.id}>{mem.Memory}</li>
                    ))}
                </ul>:<h3 style={{textAlign:'center'}}>Empty</h3>}
            </div>
        </div>
    )
}
