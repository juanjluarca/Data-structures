import HashTable from "./hash-table";

function main() {
    const numbers = [0, 7, 4, 8, 9, 2, 3, 1];
    const objective = 12;
    const hashTable = new HashTable(numbers.length);

    for (const n of numbers) {
        const complement = objective - n;
        hashTable.insert(n, complement);
    }
    const elements = hashTable.elements;
    for (const element of elements) {
        if (element === null || element === undefined){
            continue;
        }
        const complement = element.complement;
        try {
            const index = hashTable.indexOf(complement);
            console.log(`Par encontrado: ${element.key}, ${complement}`);
        } catch (error) {
            console.log("NO hay un par para ese valor objetivo");
        }    
    }
}

main();
