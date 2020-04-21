import React from 'react'
import useDidMountEffect from '../../hooks/useDidMountEffect'

export default function Sort (props) {
    const [sort, setsort] = React.useState(-1)
    const handleOnclick=()=>{
        setsort(sort*(-1))
    }
    useDidMountEffect(() => {
        props.handleSort(sort)
    }, [sort])
    return (
        <div onClick={handleOnclick} style={{cursor: 'pointer'}}>
            <span className='pr-1'>{props.titile}: </span>
            {sort>0 ? <i className="fa fa-sort-alpha-down"></i>:
            <i className="fa fa-sort-alpha-up"></i>
}
            
        </div>
    )
}

