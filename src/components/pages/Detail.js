import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import db, {
	doc,
	getDoc,
	updateDoc,
	Timestamp,
	deleteDoc,
} from "../../firebase";
import Modal from "../form/Modal";

const secondsInDay = 86400;
const statusColor = {
	Paid: "#33d69f",
	Pending: "#ff8f00",
	Draft: "#fff",
};
const statusBgColor = {
	Paid: "rgb(51 214 159 / 6%)",
	Pending: "rgb(255 143 0 / 6%)",
	Draft: "rgb(223 227 250 / 6%)",
};
const price = (number) =>
	new Intl.NumberFormat("en", {
		style: "currency",
		currency: "EUR",
	}).format(number);

const Detail = () => {
	const [rootWidth, setRootWidth] = useState(0);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setRootWidth(entries[0].contentRect.width);
		});
		resizeObserver.observe(document.querySelector("body"));
		return () => resizeObserver.disconnect();
	}, []);
	const data = useLoaderData();
	const navigate = useNavigate();
	const dueDate = new Date(data.get("dateCreated").toDate());
	dueDate.setSeconds(secondsInDay * data.get("paymentTerms"));

	const grandTotal = data
		.get("itemList")
		.reduce((pV, cV) => pV + cV.quantity * cV.price, 0);

	const showModal = () => {
		document.querySelector(".modal").classList.add("modal--visible");
		document
			.querySelector(".modal__container")
			.classList.add("modal__container--visible");
	};

	return (
		<>
			<div className="board">
				<Modal action={`/invoice/${data.id}`} data={data} />
				<Link to="/" className="navigation">
					<div className="iconContainer iconContainer--arrow">
						<span className="material-icons-round navigation__icon">
							chevron_left
						</span>
					</div>
					Go Back
				</Link>
				<div className="invoice">
					<div className="invoice__head">
						Status
						<div
							className="status"
							style={{
								backgroundColor: statusBgColor[data.get("status")],
								color: statusColor[data.get("status")],
							}}
						>
							<div
								className="status__dot"
								style={{
									backgroundColor: statusColor[data.get("status")],
								}}
							/>
							{data.get("status")}
						</div>
						{rootWidth >= 768 && (
							<div className="invoice__buttons">
								<div
									className="invoice__buttons__edit"
									onClick={showModal}
								>
									Edit
								</div>
								<div
									className="invoice__buttons__delete"
									onClick={async () => {
										await deleteDoc(doc(db, "invoices", data.id));
										navigate("/");
									}}
								>
									Delete
								</div>
								{data.get("status") === "Pending" && (
									<div
										className="invoice__buttons__paid"
										onClick={async () => {
											await updateDoc(doc(db, "invoices", data.id), {
												status: "Paid",
											});
											navigate("/");
										}}
									>
										Mark as Paid
									</div>
								)}
							</div>
						)}
					</div>
					<div className="invoice__body">
						<div className="invoice__clientInfo">
							<div className="invoice__id">
								<div className="id">
									<span className="id__hash">#</span>
									{data.id.slice(0, 6).toUpperCase()}
								</div>
								<div className="invoice__description">
									{data.get("description")}
								</div>
							</div>
							<div className="invoice__billFrom">
								<div>{data.get("billFrom").streetAddress}</div>
								<div>{data.get("billFrom").city}</div>
								<div>{data.get("billFrom").postCode}</div>
								<div>{data.get("billFrom").country}</div>
							</div>
							<div className="invoice__dateCreated">
								<div className="invoice__dateCreated__text">
									Invoice Date
								</div>
								{data.get("dateCreated").toDate().getDate()}{" "}
								{data
									.get("dateCreated")
									.toDate()
									.toLocaleDateString("en-US", { month: "long" })
									.slice(0, 3)}{" "}
								{data.get("dateCreated").toDate().getFullYear()}
							</div>
							<div className="invoice__dueDate">
								<div className="invoice__dueDate__text">
									Payment Due
								</div>
								{dueDate.getDate()}{" "}
								{dueDate
									.toLocaleDateString("en-US", { month: "long" })
									.slice(0, 3)}{" "}
								{dueDate.getFullYear()}
							</div>
							<div className="invoice__billTo">
								<div className="invoice__billTo__text">Bill To</div>
								<div className="invoice__billTo__clientName">
									{data.get("billTo").clientName}
								</div>
								<div>{data.get("billTo").clientStreetAddress}</div>
								<div>{data.get("billTo").clientCity}</div>
								<div>{data.get("billTo").clientPostCode}</div>
								<div>{data.get("billTo").clientCountry}</div>
							</div>
							<div className="invoice__clientEmail">
								<div className="invoice__clientEmail__text">
									Sent To
								</div>
								{data.get("billTo").clientEmail}
							</div>
						</div>
						<div className="receipt">
							<div className="receipt__itemList">
								{data.get("itemList").map((elem, index) => (
									<div className="receipt__item" key={index}>
										<div className="receipt__item__info">
											<div className="receipt__item__name">
												{elem.itemName}
											</div>
											<div className="receipt__item__quantity">
												{elem.quantity} x {price(elem.price)}
											</div>
										</div>
										<div className="receipt__item__price">
											{price(elem.price * elem.quantity)}
										</div>
									</div>
								))}
							</div>
							<div className="receipt__grandTotal">
								<div className="receipt__grandTotal__text">
									Grand Total
								</div>{" "}
								{price(grandTotal)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{rootWidth < 768 && (
				<div className="board__buttons">
					<div className="board__buttons__edit" onClick={showModal}>
						Edit
					</div>
					<div
						className="board__buttons__delete"
						onClick={async () => {
							await deleteDoc(doc(db, "invoices", data.id));
							navigate("/");
						}}
					>
						Delete
					</div>
					{data.get("status") === "Pending" && (
						<div
							className="invoice__buttons__paid"
							onClick={async () => {
								await updateDoc(doc(db, "invoices", data.id), {
									status: "Paid",
								});
								navigate("/");
							}}
						>
							Mark as Paid
						</div>
					)}
				</div>
			)}
		</>
	);
};

const loader = async ({ params }) => {
	const docRef = await getDoc(doc(db, "invoices", params.id));
	return docRef;
};

const action = async ({ request, params }) => {
	const formData = await request.formData();
	const itemList = JSON.parse(formData.get("itemList"));
	// const date = new Date(JSON.parse(formData.get("dateCreated")));
	const itemListErrors = [];
	const error = {};

	itemList.map((elem) => {
		if (!elem.itemName.length) {
			itemListErrors.push(elem.id);
		}
	});

	if (itemListErrors.length) {
		error["itemList"] = itemListErrors;
	}
	for (const pair of formData.entries()) {
		if (!pair[1].length) {
			error[pair[0]] = true;
		}
	}

	if (Object.keys(error).length) return error;

	await updateDoc(doc(db, "invoices", params.id), {
		billFrom: {
			country: formData.get("country"),
			streetAddress: formData.get("streetAddress"),
			postCode: formData.get("postCode"),
			city: formData.get("city"),
		},
		billTo: {
			clientCity: formData.get("clientCity"),
			clientEmail: formData.get("clientEmail"),
			clientName: formData.get("clientName"),
			clientStreetAddress: formData.get("clientStreetAddress"),
			clientPostCode: formData.get("clientPostCode"),
			clientCountry: formData.get("clientCountry"),
		},
		itemList: itemList,
		description: formData.get("description"),
		// dateCreated: Timestamp.fromDate(date),
		paymentTerms: parseInt(
			formData.get("paymentTerms").replace(/[^\d]/g, "")
		),
		status: "Pending",
	});
};

export default Detail;
export { loader, action };
