import {asc} from "../redux/reducers/reducers";

export function findRowNumber(id, data) {

    let guess,
        min = 0,
        max = data.length - 1;

    while(min <= max){
        guess = Math.floor((min + max) /2);
        if(data[guess].id === id)
            return guess;
        else if(data[guess].id < id)
            min = guess + 1;
        else
            max = guess - 1;
    }

    return -1;
}


export function sort(data, sort) {
    let sortedData = data;

    function compare(valA, valB, sortOrder) {

        if (sortOrder === asc) {
            return valA.label.localeCompare(valB.label)
        } else {
            return valB.label.localeCompare(valA.label)
        }
    }

    if (sort !== "") {
        sortedData = data.sort( (valA, valB) => {
            return compare(valA, valB, sort)
        });
    }

    return sortedData;
}