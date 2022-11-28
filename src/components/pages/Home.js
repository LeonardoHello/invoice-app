import { redirect, useLoaderData } from "react-router-dom";
import db, { collection, getDocs, addDoc, Timestamp } from "../../firebase";
import Invoice from "../Invoice";
import Modal from "../form/Modal";

const Home = () => {
	const data = useLoaderData();

	const showModal = () => {
		document.querySelector(".modal").classList.add("modal--visible");
		document
			.querySelector(".modal__container")
			.classList.add("modal__container--visible");
	};

	return (
		<div className="board">
			<Modal action="/?index" />
			<div className="board__head">
				<div className="board__titleContainer">
					<div className="board__title">Invoices</div>
					<div className="board__subtitle">{data.size} invoice(s)</div>
				</div>
				<div className="board__filter">
					<div className="board__filter__text">Filter</div>
					<div className="iconContainer iconContainer--arrow">
						<span className="material-icons-round iconContainer__icon iconContainer__icon--arrow">
							expand_more
						</span>
					</div>
				</div>
				<div className="board__add" onClick={showModal}>
					<div className="iconContainer iconContainer--plus">
						<span className="material-icons-round iconContainer__icon iconContainer__icon--plus">
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
						dateCreated={elem.get("dateCreated")}
						paymentTerms={elem.get("paymentTerms")}
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

const action = async ({ request }) => {
	const formData = await request.formData();
	const itemList = JSON.parse(formData.get("itemList"));
	const itemListErrors = [];
	const error = {};
	console.log();

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

	const docRef = await addDoc(collection(db, "invoices"), {
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
		dateCreated: Timestamp.now(),
		paymentTerms: parseInt(
			formData.get("paymentTerms").replace(/[^\d]/g, "")
		),
		status: "Pending",
	});
	return redirect(`/invoice/${docRef.id}`);
};

export default Home;
export { loader, action };
