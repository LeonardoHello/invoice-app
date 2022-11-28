import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import FillIn from "./FillIn";
import Input from "./Input";
import ItemInput from "./ItemInput";
import Select from "./Select";
import { v4 as uuidv4 } from "uuid";

const price = (number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 2,
	}).format(number);

const removeModal = () => {
	document.querySelector(".modal").classList.remove("modal--visible");
	document
		.querySelector(".modal__container")
		.classList.remove("modal__container--visible");
};

const Modal = ({ action, data }) => {
	const errors = useActionData();
	const [itemList, setItemList] = useState(
		data?.get("itemList") || [
			{ itemName: "", price: 0, quantity: 1, id: uuidv4() },
		]
	);
	const [dropdown, setDropdown] = useState(false);

	return (
		<div
			className="modal__container"
			onClick={(e) => {
				e.currentTarget.classList.remove("modal--visible");
				removeModal();
				setDropdown(false);
			}}
		>
			<div
				className="modal"
				onClick={(e) => {
					e.stopPropagation();
					setDropdown(false);
				}}
			>
				<div className="navigation navigation--left" onClick={removeModal}>
					<div className="iconContainer iconContainer--arrow">
						<span className="material-icons-round navigation__icon">
							chevron_left
						</span>
					</div>
					Go Back
				</div>
				<Form method="post" action={action} className="form">
					<div className="form__title">New Invoice</div>
					<FillIn title="Bill From" className="billFrom">
						<Input
							label="Street Address"
							name="streetAddress"
							error={errors?.streetAddress}
							data={data?.get("billFrom")}
						/>
						<Input
							label="Country"
							name="country"
							error={errors?.country}
							data={data?.get("billFrom")}
						/>
						<Input
							label="City"
							name="city"
							error={errors?.city}
							data={data?.get("billFrom")}
						/>
						<Input
							label="Post Code"
							name="postCode"
							error={errors?.postCode}
							data={data?.get("billFrom")}
						/>
					</FillIn>
					<FillIn title="Bill To" className="billTo">
						<Input
							label="Client's Name"
							name="clientName"
							error={errors?.clientName}
							data={data?.get("billTo")}
						/>
						<Input
							label="Client's Email"
							name="clientEmail"
							error={errors?.clientEmail}
							data={data?.get("billTo")}
						/>
						<Input
							label="Street Address"
							name="clientStreetAddress"
							error={errors?.clientStreetAddress}
							data={data?.get("billTo")}
						/>
						<Input
							label="Country"
							name="clientCountry"
							error={errors?.clientCountry}
							data={data?.get("billTo")}
						/>
						<Input
							label="City"
							name="clientCity"
							error={errors?.clientCity}
							data={data?.get("billTo")}
						/>
						<Input
							label="Post Code"
							name="clientPostCode"
							error={errors?.clientPostCode}
							data={data?.get("billTo")}
						/>
						<Select
							label="Payment Terms"
							name="paymentTerms"
							dropdown={dropdown}
							setDropdown={setDropdown}
							data={data?.get("paymentTerms")}
						/>
						<Input
							label="Project Description"
							name="description"
							error={errors?.description}
							data={data?.get("description")}
						/>
					</FillIn>
					<FillIn title="Item List" itemList={true}>
						{itemList.map((elem, index, array) => (
							<div
								key={elem.id}
								className="form__fillIn__grid form__fillIn__grid--itemList"
							>
								<ItemInput
									label="Item Name"
									name={"itemName"}
									value={elem.itemName}
									setValue={setItemList}
									index={index}
									array={array}
									error={errors?.itemList.includes(elem.id)}
								/>
								<ItemInput
									label="Qty."
									name={"quantity"}
									value={elem.quantity}
									setValue={setItemList}
									index={index}
									array={array}
								/>
								<ItemInput
									label="Price"
									name={"price"}
									value={elem.price}
									setValue={setItemList}
									index={index}
									array={array}
								/>
								<ItemInput
									label="Total"
									name={"total"}
									value={price(elem.quantity * elem.price)}
									setValue={setItemList}
									index={index}
									array={array}
								/>
							</div>
						))}
						<button
							className="form__addItem"
							type={"button"}
							onClick={() =>
								setItemList((prev) => [
									...prev,
									{
										itemName: "",
										price: 0,
										quantity: 1,
										id: uuidv4(),
									},
								])
							}
						>
							+ Add New Item
						</button>
					</FillIn>
					<div className="form__buttons">
						<button
							className="form__buttons__discard"
							type="reset"
							onClick={() => {
								removeModal();
								if (data) {
									setItemList(data.get("itemList"));
								} else {
									setItemList([
										{
											itemName: "",
											price: 0,
											quantity: 1,
											id: uuidv4(),
										},
									]);
								}
							}}
						>
							Discard
						</button>
						<button
							className="form__buttons__submit"
							name="itemList"
							value={JSON.stringify(itemList)}
							onClick={removeModal}
						>
							Save & Send
						</button>
					</div>
					{/* <input
						type="hidden"
						name="dateCreated"
						value={JSON.stringify(data.get("dateCreated").toDate())}
					/> */}
				</Form>
			</div>
		</div>
	);
};

export default Modal;
