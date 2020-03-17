import React from 'react';

function Button(props){
	let {className, handleClick, ...others} = props;
	return (
		<button className={className} onClick={handleClick} {...others} >
            {props.children}
        </button>
	)
}

export default Button;