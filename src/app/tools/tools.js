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

function partition(items, left, right) {
    let pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;

    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

export function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
        left = typeof left !== "number" ? 0 : left;
        right = typeof right !== "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

