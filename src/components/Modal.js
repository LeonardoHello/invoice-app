import { Form } from "react-router-dom";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const billFromInputs = [
	{
		label: "Street Address",
		name: "streetAddress",
	},
	{
		label: "Country",
		name: "country",
	},
	{
		label: "Street Address",
		name: "streetAddress",
	},
	{
		label: "Street Address",
		name: "streetAddress",
	},
];

const Modal = () => {
	const removeModal = () => {
		document.querySelector(".modal").classList.remove("modal--visible");
		document
			.querySelector(".modal__container")
			.classList.remove("modal__container--visible");
	};

	const [itemList, setItemList] = useState([
		{ name: "", price: 0, quantity: 1, id: uuidv4() },
	]);

	return (
		<div
			className="modal__container"
			onClick={(e) => {
				e.currentTarget.classList.remove("modal--visible");
				removeModal();
			}}
		>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="navigation" onClick={removeModal}>
					<div className="iconContainer iconContainer--arrow">
						<span className="material-icons-round navigation__icon">
							chevron_left
						</span>
					</div>
					Go Back
				</div>
				<Form method="post" action="/?index" className="form">
					<div className="form__title">New Invoice</div>
					<div className="form__clientInfo form__clientInfo--billFrom">
						<div className="form__clientInfo__title form__clientInfo__title--billFrom">
							Bill From
						</div>
						<Input label="Street Address" name="streetAddress" />
						<Input label="Country" name="country" />
						<Input label="City" name="city" />
						<Input label="Post Code" name="postCode" />
					</div>
					<div className="form__clientInfo form__clientInfo--billTo">
						<div className="form__clientInfo__title form__clientInfo__title--billTo">
							Bill To
						</div>
						<Input label="Client's Name" name="clientName" />
						<Input label="Client's Email" name="clientEmail" />
						<Input label="Street Address" name="clientStreetAddress" />
						<Input label="Country" name="clientCountry" />
						<Input label="City" name="clientCity" />
						<Input label="Post Code" name="clientPostCode" />
						<Input label="Payment Terms" name="paymentTerms" />
						<Input
							label="Project Description"
							type="textarea"
							name="description"
						/>
					</div>
					<div className="form__clientInfo form__clientInfo--itemList">
						<div className="form__clientInfo__title form__clientInfo__title--itemList">
							Item List
						</div>
						{itemList.map((elem) => (
							<div key={elem.id} className="form__clientInfo__item">
								<Input label="Item Name" cN={"itemName"} />
								<Input label="Quantity" cN={"quantity"} />
								<Input label="Price" cN={"price"} />
								<Input label="Total" cN={"total"} />
							</div>
						))}
					</div>
					<button
						className="form__addItem"
						onClick={() =>
							setItemList((prev) => [
								...prev,
								{ name: "", price: 0, quantity: 1, id: uuidv4() },
							])
						}
					>
						+ Add New Item
					</button>
				</Form>
			</div>
		</div>
	);
};

export default Modal;
