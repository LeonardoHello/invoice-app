const FillIn = ({ children, title, className, itemList }) => {
	return (
		<div className="form__fillIn">
			<div
				className={
					itemList
						? "form__fillIn__title form__fillIn__title--gray"
						: "form__fillIn__title"
				}
			>
				{title}
			</div>
			{itemList ? (
				<div className="form__fillIn__list">{children}</div>
			) : (
				<div
					className={
						className === "itemList"
							? "form__fillIn__itemList"
							: `form__fillIn__grid form__fillIn__grid--${className}`
					}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default FillIn;
