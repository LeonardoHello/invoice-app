import { useEffect, useState } from "react";
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
	paymentTerms,
	itemList,
	status,
}) => {
	const [rootWidth, setRootWidth] = useState(0);

	const dueDate = dateCreated.toDate();
	dueDate.setSeconds(secondsInDay * paymentTerms);
	const grandTotal = itemList.reduce(
		(pV, cV) => pV + cV.price * cV.quantity,
		0
	);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setRootWidth(entries[0].contentRect.width);
		});
		resizeObserver.observe(document.querySelector("body"));
		return () => resizeObserver.disconnect();
	}, []);
	return (
		<Link to={`/invoice/${id}`} className="card">
			<div className="id">
				<span className="id__hash">#</span>
				{id.slice(0, 6).toUpperCase()}
			</div>
			<div className="card__clientName">{clientName}</div>
			{rootWidth >= 768 ? (
				<>
					<div className="card__dueDate">
						Due {dueDate.getDate()}{" "}
						{dueDate
							.toLocaleDateString("en-US", { month: "long" })
							.slice(0, 3)}{" "}
						{dueDate.getFullYear()}
					</div>
					<div className="card__price">{price(grandTotal)}</div>
				</>
			) : (
				<div className="card__container">
					<div className="card__dueDate">
						Due {dueDate.getDate()}{" "}
						{dueDate
							.toLocaleDateString("en-US", { month: "long" })
							.slice(0, 3)}{" "}
						{dueDate.getFullYear()}
					</div>
					<div className="card__price">{price(grandTotal)}</div>
				</div>
			)}
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
		</Link>
	);
};

export default Invoice;
