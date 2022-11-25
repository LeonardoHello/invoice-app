import { useLoaderData } from "react-router-dom";
import db, { getDocs, collection } from "../../firebase";
import Invoice from "../Invoice";
import Modal from "../Modal";

const Home = () => {
	const data = useLoaderData();

	const addModal = () => {
		document.querySelector(".modal").classList.add("modal--visible");
		document
			.querySelector(".modal__container")
			.classList.add("modal__container--visible");
	};

	return (
		<div className="board">
			<Modal />
			<div className="board__head">
				<div className="board__titleContainer">
					<div className="board__title">Invoices</div>
					<div className="board__subtitle">{data.size} invoice(s)</div>
				</div>
				<div className="board__filter">
					<div className="board__filter__text">Filter</div>
					<div className="iconContainer iconContainer--arrow">
						<span className="material-icons-round board__filter__icon">
							expand_more
						</span>
					</div>
				</div>
				<div className="board__add" onClick={addModal}>
					<div className="iconContainer iconContainer--plus">
						<span className="material-icons-round board__add__icon">
							add
						</span>
					</div>
					<div className="board__add__text">New</div>
				</div>
			</div>
			<div className="board__body">
				{data.docs.map((elem) => (
					<Invoice
						key={elem.id}
						id={elem.id}
						clientName={elem.get("billTo").clientName}
						dateCreated={elem.get("dateCreated").toDate()}
						paymentTerm={elem.get("paymentTerm")}
						itemList={elem.get("itemList")}
						status={elem.get("status")}
					/>
				))}
			</div>
		</div>
	);
};

const loader = async () => {
	const query = await getDocs(collection(db, "invoices"));
	return query;
};

const action = async ({ request, params }) => {
	const formData = await request.formData();

	console.log(Object.fromEntries(formData));
};

export default Home;
export { loader, action };
