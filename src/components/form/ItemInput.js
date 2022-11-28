const ItemInput = ({ index, array, label, name, value, setValue, error }) => {
	return (
		<label
			className={`label label--${name}`}
			style={{
				gridArea: name,
			}}
			onClick={(e) => name === "total" && e.preventDefault()}
		>
			{label}
			{name !== "total" ? (
				<>
					<input
						className={
							error ? "label__input label__input--error" : "label__input"
						}
						value={value}
						onInput={(e) => {
							const newArr = [...array];
							if (name === "price") {
								newArr[index][name] = parseFloat(
									parseFloat(e.currentTarget.value || 0).toFixed(2)
								);
							} else if (name === "quantity") {
								newArr[index][name] =
									parseInt(e.currentTarget.value) || 0;
							} else {
								newArr[index][name] = e.currentTarget.value;
							}
							setValue(newArr);
						}}
					/>
					{error && <div className="label__error">Required</div>}
				</>
			) : (
				<>
					<input className="label__input" value={value} readOnly />
					{array.length > 1 && (
						<div
							className="iconContainer iconContainer--trash"
							onClick={() => {
								const newArr = [...array];
								delete newArr[index];
								setValue(newArr.flat());
							}}
						>
							<span className="material-icons-round iconContainer__icon iconContainer__icon--trash">
								delete
							</span>
						</div>
					)}
				</>
			)}
		</label>
	);
};

export default ItemInput;
