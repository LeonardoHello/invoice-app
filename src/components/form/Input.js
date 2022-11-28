const Input = ({ label, name, data, error }) => {
	return (
		<label
			className={`label label--${name}`}
			style={{
				gridArea: name,
			}}
		>
			{label}
			<input
				className={
					error ? "label__input label__input--error" : "label__input"
				}
				name={name}
				defaultValue={(data && (data[name] || data)) || ""}
			/>
			{error && <div className="label__error">Required</div>}
		</label>
	);
};

export default Input;
