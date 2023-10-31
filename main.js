function select(index){

    var selected = document.getElementsByClassName("bar")[index];
    selected.style.backgroundColor = "blue";

}
function deselect(index) {
    var deselected = document.getElementsByClassName("bar")[index];
    deselected.style.backgroundColor = ""; // This removes the background color
}

async function swap(array, firstIndex, secondIndex) {

    select(firstIndex);
    select(secondIndex);

    var bars = document.getElementsByClassName("bar");

    const firstTransform = bars[firstIndex].style.cssText.match(/transform:\s*([^;]+)/);
    const secondTransform = bars[secondIndex].style.cssText.match(/transform:\s*([^;]+)/);

    // Update the transform parts
    bars[firstIndex].style.cssText = bars[firstIndex].style.cssText.replace(firstTransform[0], `transform: translateX(${secondIndex * 35}px)`);
    bars[secondIndex].style.cssText = bars[secondIndex].style.cssText.replace(secondTransform[0], `transform: translateX(${firstIndex * 35}px)`);

    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;

    // Add a delay for the animation
    function delay(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Wait for the animation to complete
    await delay(1000);

    // Swap the elements in the array after the animation
    await printArray(array);

    console.log("Swap animation complete");
}

async function selectionSort(array) {
    var i, j, minIndex;

    for (i = 0; i < array.length; i++) {
        minIndex = i;
        for (j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Use await to wait for the swap to complete
        await swap(array, i, minIndex);
    }

    // Call printArray after the sorting is complete
    printArray(array);
}

async function bubbleSort(array) {

    var i, j;

    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length - i - 1; j++) {

            if (array[j] > array[j + 1]) {

                await swap(array, j, j + 1);
            }
        }
    }

}

function generateArray() {
    var array = [];

    for (var i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    return array;
}

async function printArray(array) {
    var container = document.getElementById("array");
    container.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        var bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3 + 10}px`;
        bar.style.transform = `translateX(${i * 35}px`;
        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;
        bar.appendChild(barLabel);
        container.appendChild(bar);
    }

    // Introduce a delay with async/await
    await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed
}

async function main() {
    const array = generateArray();
    printArray(array);
    await bubbleSort(array);
}

main();
