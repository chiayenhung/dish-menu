const main = document.querySelector('#main');

const MAIN_DISHES_MEAT = 'mainDishesMeat';
const MAIN_DISHES_SEAFOOD = 'mainDishesSeafood';
const FRUITS = 'fruits';
const VEGS = 'vegs';


const mainDishesMeat = [{name: '豬肉'}, {name: '雞肉'}, {name: '牛肉'}];
const mainDishesSeafood = [{name: '鮭魚'}, {name: '吳郭魚'}];

const fruits = [{name: '芭樂'}, {name: '黑莓'}, {name: '蔓越莓'},{name: '木瓜'}, {name: '草莓'}, {name: '楊桃'}, {name: '蘋果'}, {name: '芒果'}];

const vegs = [
	{
		name: '茄子'
	},
	{
		name: '高麗菜'
	},
	{
		name:'白蘿蔔'
	},
	{
		name: '豆腐'
	},
	{
		name: '蘆筍'
	},
	{
		name: '花椰菜'
	},
	{
		name: '玉米',
	},
	{
		name: '青江菜'
	},
	{
		name: '洋蔥'
	},
	{
		name: '奶油南瓜'
	},
	{
		name: '紫花椰菜'
	},
	{
		name: '橘花椰菜'
	},
	{
		name: '紅蘿蔔',
	},
	{
		name: '菠菜'
	},
	{
		name: '青椒',
	},
	{
		name: '花菜',
	},
	{
		name: '四季豆'
	},
	{
		name: '南瓜'
	},
	{
		name: '甘藍'
	},
	{
		name: '馬鈴薯'
	},
	{
		name: '地瓜'
	},
	{
		name: '紫薯'
	}
]
const presetData = {
	[MAIN_DISHES_MEAT]: mainDishesMeat, 
	[MAIN_DISHES_SEAFOOD]: mainDishesSeafood, 
	[FRUITS]: fruits, 
	[VEGS]: vegs
};


const TOTAL_MEALS = 14;

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateMainDishes = (dishes, meals = TOTAL_MEALS) => {
	let result = [];
	let total = meals;
	while (meals > 0) {
		const candidates = [...dishes];
		shuffle(candidates);
		result = [...result, ...candidates].slice(0, total);
		meals -= dishes.length;
	}
	return result;
};

const generateSchedule = (schedule, dishes, bucketSize, restrict) => {
	schedule.forEach((day) => {
		day.forEach((meal, index) => {
			if (restrict === 'even' && index % 2 === 1) {
				return;
			}
			if (restrict === 'odd' && index % 2 === 0) {
				return;
			}
			for (let i = 0; i < bucketSize; i++) {
					meal.push(dishes.shift());
				}	
		})
		
	});
};

const generateMenu = () => {
	const schedule = [[[], []], [[], []], [[], []], [[], []], [[], []], [[], []], [[], []]];

	const meatDishes = generateMainDishes(mainDishesMeat, 7);
	const seafoodDishes = generateMainDishes(mainDishesSeafood, 7);
	const fruitDishes = generateMainDishes(fruits);
	const vegDishes = generateMainDishes(vegs, 42);

	generateSchedule(schedule, meatDishes, 1, 'even');
	generateSchedule(schedule, seafoodDishes, 1, 'odd');
	generateSchedule(schedule, vegDishes, 3);
	generateSchedule(schedule, fruitDishes, 1);

	return schedule;
};

const DATES = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

function createTable (schedule) {
	const table = document.createElement('table');
	schedule.forEach((day, dateIndex) => {
		day.forEach((meal, index) => {
			const row = document.createElement('tr');
			if (index % 2 === 0) {
				const date = document.createElement('td');
				date.innerText = DATES[dateIndex];
				date.setAttribute('rowspan', '2');
				row.appendChild(date);
			}
			const cell = document.createElement('td');
			cell.innerText = index % 2 === 0 ? '中午' : '下午';
			row.appendChild(cell);
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

function onload() {
	const schedule = generateMenu();
	const table = createTable(schedule);
	main.appendChild(table);	
}

function onShuffle() {
	removeAllChildNodes(main);
	onload();
}

function getData(name) {
	if (locationStorage.getItem(name)) {
		return JSON.parse(locationStorage.getItem(name));
	}
	return presetData[name]
}

function createForms() {
	const form = document.createElement('div');

}

