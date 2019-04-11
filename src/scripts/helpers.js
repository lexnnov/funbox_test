export const generateId = (routes) =>  {
	let index = 0;
	routes.forEach(()=>{
		if(routes.find(x => x.id === index) === undefined){
			return index
		} else {
			index ++
		}
	});
	return index
};

export const applyDrag = (arr, dragResult) => {
	const { removedIndex, addedIndex, payload } = dragResult;
	if (removedIndex === null && addedIndex === null) return arr;

	const result = [...arr];
	let itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0];
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}

	return result;
};

