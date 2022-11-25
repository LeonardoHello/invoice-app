import { Link, useLoaderData } from "react-router-dom";
import db, { doc, getDoc } from "../../firebase";

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
	const data = useLoaderData();
	const dueDate = new Date(data.get("dateCreated").toDate());
	dueDate.setSeconds(secondsInDay * data.get("paymentTerm"));

	const grandTotal = data
		.get("itemList")
		.reduce((pV, cV) => pV.quantity * pV.price + cV.quantity * cV.price);

	return (
		<div className="board">
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
					<div className="status__text">Status</div>
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
							<div className="invoice__dueDate__text">Payment Due</div>
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
							<div>{data.get("billTo").streetAddress}</div>
							<div>{data.get("billTo").city}</div>
							<div>{data.get("billTo").postCode}</div>
							<div>{data.get("billTo").country}</div>
						</div>
						<div className="invoice__clientEmail">
							<div className="invoice__clientEmail__text">Sent To</div>
							{data.get("billTo").clientEmail}
						</div>
					</div>
					<div className="invoice__receipt">
						<div className="invoice__itemList">
							{data.get("itemList").map((elem, index) => (
								<div className="invoice__item" key={index}>
									<div className="invoice__item__info">
										<div className="invoice__item__name">
											{elem.name}
										</div>
										<div className="invoice__item__quantity">
											{elem.quantity} x {price(elem.price)}
										</div>
									</div>
									<div className="invoice__item__price">
										{price(elem.price * elem.quantity)}
									</div>
								</div>
							))}
						</div>
						<div className="invoice__grandTotal">
							<div className="invoice__grandTotal__text">
								Grand Total
							</div>{" "}
							{price(grandTotal)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const loader = async ({ params }) => {
	const docRef = await getDoc(doc(db, "invoices", params.id));
	return docRef;
};

export default Detail;
export { loader };
