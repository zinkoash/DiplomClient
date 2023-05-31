import React from 'react'
import parse from 'html-react-parser';
import SendPractice from './Upload';


function Variant(props) {
    return (
        <div className='practice__content-container-wrapper'>
        <div>
            {!props.variant.number?<div></div>:
            <>
               { parse(props.variant.variantBody)}
                <SendPractice practice={props.practice}/>
            </>
            }
            
        </div>
        </div>
    )
}


export default Variant
