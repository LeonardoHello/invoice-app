import { Link } from "react-router-dom";

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
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "EUR",
	}).format(number);

const Invoice = ({
	id,
	clientName,
	dateCreated,
	paymentTerm,
	itemList,
	status,
}) => {
	// dateCreated converted with .toDate()
	const dueDate = new Date(dateCreated);
	dueDate.setSeconds(secondsInDay * paymentTerm);

	const grandTotal = itemList.reduce(
		(pV, cV) => pV.price * pV.quantity + cV.price * cV.quantity
	);
	return (
		<Link to={`/invoice/${id}`} className="card">
			<div className="card__head">
				<div className="id">
					<span className="id__hash">#</span>
					{id.slice(0, 6).toUpperCase()}
				</div>
				<div className="card__clientName">{clientName}</div>
			</div>
			<div className="card__body">
				<div className="card__info">
					<div className="card__dueDate">
						Due {dueDate.getDate()}{" "}
						{dueDate
							.toLocaleDateString("en-US", { month: "long" })
							.slice(0, 3)}{" "}
						{dueDate.getFullYear()}
					</div>
					<div className="card__price">{price(grandTotal)}</div>
				</div>
				<div
					className="status"
					style={{
						backgroundColor: statusBgColor[status],
						color: statusColor[status],
					}}
				>
					<div
						className="status__dot"
						style={{
							backgroundColor: statusColor[status],
						}}
					/>
					{status}
				</div>
			</div>
		</Link>
	);
};

export default Invoice;
