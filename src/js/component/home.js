import React, { useState, createRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Home() {
	const [list, setList] = useState([]);
	const [item, setItem] = useState("");
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const loadTodos = async () => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto")
				.then(response => response.json())
				.then(data => {
					setList(data);
				});
		};
		loadTodos();
	}, []);

	//somehow I broke the below...
	const addStuff = todotoadd => {
		let newObject = {
			label: todotoadd,
			done: false
		};
		//		setList([...list, newObject]);
		//async is not needed when you have .then

		fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto", {
			method: "PUT",
			body: JSON.stringify([...list, newObject]),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto")
				.then(response => response.json())
				.then(data => {
					setList(data);
				});
		});
	};

	const getList = () => {
		return list.map((item, index) => (
			<li key={index}>
				{item.label} &emsp;
				<i className="fas fa-recycle" onClick={e => deleteV2(index)} />
			</li>
		));
	};
	//get list maps new item into todolist

	const handleDelete = index => {
		setList(list.filter(current => current !== list[index]));
	};

	const deleteV2 = index => {
		let newArray = list.filter(current => current !== list[index]);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto", {
			method: "PUT",
			body: JSON.stringify(newArray),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto")
				.then(response => response.json())
				.then(data => {
					setList(data);
				});
		});
	};

	const deleteV3 = () => {
		let sampleObject = [
			{
				label: "Fresh start",
				done: false
			}
		];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto", {
			method: "PUT",
			body: JSON.stringify(sampleObject),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto")
				.then(response => response.json())
				.then(data => {
					setList(data);
				});
		});
	};

	//option to create a conditional function that's a delete all will only delete if the "msg" label is there
	//did this do the breaking??
	const deleteAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/athursto")
				.then(response => response.json())
				.then(data => {
					setList(data);
				});
		});
	};

	//this works but I think it should change in the API as well...
	//use this as a filtered array to pass into the fetch.
	//keep in mind the issues we had with setList previously

	//,[] means it runs once
	// fetch doesn't need method because GET is the default and this is the default

	return (
		<React.Fragment>
			<div id="holder" className="container p-3">
				<div className="row" id="holding">
					<h2>What&apos;s on the agenda today?</h2>
				</div>
				<div style={{ marginTop: "5px" }} />
				{/* <form onSubmit={handleSumbit}> */}
				<div className="row d-flex justify-content-center">
					<form>
						{/* I would like this to clear after typing */}
						<input
							//ref={todoInput}
							type="text"
							onChange={e => setItem(e.target.value)}
							placeholder="no tasks, add a task"
						/>{" "}
						<input
							type="button"
							value="send"
							onClick={() => addStuff(item)}
						/>{" "}
						<input
							type="button"
							value="clear agenda"
							onClick={() => deleteV3()}
						/>
					</form>
				</div>
				<div style={{ marginTop: "5px" }} />
				<div className="row justify-content-center">
					<ul>
						{" "}
						{list.length > 0 ? (
							getList()
						) : (
							<>
								<li>Add something to the list!</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
}
