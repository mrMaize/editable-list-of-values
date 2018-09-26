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