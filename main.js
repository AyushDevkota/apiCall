const btn = document.querySelector("#btn");
const div = document.querySelector("#div");
let html = "";

// Event Listener for the button.
btn.addEventListener("click", () => {
	getTable()
		.then((data) => {
			const table = document.querySelector("#table");
			if (table === null) {
				createTable(data);
			} else {
				createEachRow(data);
			}
		})
		.catch((err) => console.error(err));
});

// Async function with await to fetch the API data.
async function getTable() {
	const response = await fetch("https://www.boredapi.com/api/activity");
	if (!response.ok) {
		const err = `Error occured: ${response.status}`;
		throw new Error(err);
	}
	const data = await response.json();
	return data;
}

// This function creates a whole table if there isn't one exisiting.
function createTable(data) {
	html = `
			    <table class="w-full" id="table">
			      <thead>
			        <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">`;
	for (const key of Object.keys(data)) {
		html += `<th class="px-4 py-3">${key}</th>`;
	}
	html += `
			      </tr>
			    </thead>
			    <tbody class="bg-white" id="tbody">
			      <tr>
			`;
	for (const value of Object.values(data)) {
		html += `<td class="px-4 py-3 border font-semibold">${value}</td>`;
	}
	html += `
			</tr>
		</tbody>
	</table>`;
	div.insertAdjacentHTML("beforeend", html);
}

// This function creates individual rows if the table has already been created.
function createEachRow(data) {
	const tbody = document.querySelector("#tbody");
	const row = document.createElement("tr");
	for (const value of Object.values(data)) {
		row.innerHTML += `<td class="px-4 py-3 border font-semibold">${value}</td>`;
	}
	tbody.appendChild(row);
}
