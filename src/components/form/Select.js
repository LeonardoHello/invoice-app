import { useState } from "react";

const paymentTerms = ["Net 1 Day", "Net 7 Day", "Net 14 Day", "Net 30 Day"];

const Select = ({ label, name, dropdown, setDropdown, data }) => {
	const [currentTerm, setCurrentTerm] = useState(
		data ? `Net ${data} Days` : paymentTerms[0]
	);
	return (
		<label
			className={`label label--${name}`}
			style={{
				gridArea: name,
			}}
			onClick={(e) => {
				e.stopPropagation();
				setDropdown((prev) => !prev);
			}}
		>
			{label}
			<div className="label__select">
				<input
					className="label__input label__input--select"
					name={name}
					value={currentTerm}
					readOnly
				/>
				<div
					className="iconContainer iconContainer--arrow label__input__arrow"
					style={{
						transition: "rotate .5s",
						rotate: dropdown && "180deg",
					}}
				>
					<span className="material-icons-round iconContainer__icon iconContainer__icon--arrow ">
						expand_more
					</span>
				</div>
				{dropdown && (
					<div
						className="label__dropdown"
						onClick={() => setDropdown(false)}
					>
						{paymentTerms.map((elem) => (
							<p
								key={elem}
								className="label__dropdown__item"
								onClick={() => setCurrentTerm(elem)}
							>
								{elem}
							</p>
						))}
					</div>
				)}
			</div>
		</label>
	);
};

export default Select;
