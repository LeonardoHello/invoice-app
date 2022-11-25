import React from "react";

const Input = ({ label, name, cN }) => {
	return (
		<label
			className={`label label--${name || cN}`}
			style={{
				gridArea: name || cN,
			}}
		>
			{label}
			<input className="label__input" name={name} />
		</label>
	);
};

export default Input;
