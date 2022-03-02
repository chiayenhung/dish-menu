const main = document.querySelector('#main');


function createTable () {
	const schedule = generateMenu();
	const table = document.createElement('table');
	schedule.forEach((day) => {
		day.forEach((meal) => {
			const row = document.createElement('tr');
			meal.forEach((dish) => {
				const cell = document.createElement('td');
				cell.innerText = dish.name;
				row.appendChild(cell);
			});
			table.appendChild(row);
		});
	});
	return table;
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function onShuffle() {
	removeAllChildNodes(main);
	const table = createTable();
	main.appendChild(table);
}

function onload() {
	const table = createTable();
	main.appendChild(table);	
}

