export function arraySameValues<T>(array: T[], array2: T[]) : boolean {

    if (array.length != array2.length)
        return false;
    
    return array.every(element => array2.includes(element));
}