var swaps = 0;
var checks = 0;

    // Add a delay for the animation
function delay(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

}

async function check(i,j){
    document.getElementsByClassName("bar")[i].classList.add("checking");
    document.getElementsByClassName("bar")[j].classList.add("checking"); 
    
    checks += 1;
    document.getElementById("checks").innerHTML = checks;

    await delay(1000);

    document.getElementsByClassName("bar")[i].classList.remove("checking");
    document.getElementsByClassName("bar")[j].classList.remove("checking");
}

async function select(index){

    var selected = document.getElementsByClassName("bar")[index];
    selected.classList.add("checking")

    await delay(1000);
    selected.classList.remove("checking")
}

function sortComplete() {
    var bars = document.getElementsByClassName("bar");
    for (var i = 0; i < array.length; i++) {
        bars[i].className += " correct";
        passes += 1;
    }
}

async function swap(array, firstIndex, secondIndex) {

    var bars = document.getElementsByClassName("bar");

    const firstTransform = bars[firstIndex].style.cssText.match(/transform:\s*([^;]+)/);
    const secondTransform = bars[secondIndex].style.cssText.match(/transform:\s*([^;]+)/);

    // Update the transform parts
    bars[firstIndex].style.cssText = bars[firstIndex].style.cssText.replace(firstTransform[0], `transform: translateX(${secondIndex * 35}px)`);
    bars[secondIndex].style.cssText = bars[secondIndex].style.cssText.replace(secondTransform[0], `transform: translateX(${firstIndex * 35}px)`);

    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    swaps += 1;
    document.getElementById("swaps").innerHTML = swaps;
    // Wait for the animation to complete
    await delay(1000);

    // Swap the elements in the array after the animation
    await printArray(array);
}

async function selectionSort(array) {
    var i, j, minIndex;

    for (i = 0; i < array.length; i++) {
        minIndex = i;
        for (j = i + 1; j < array.length; j++) {
            await check(minIndex,j);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Use await to wait for the swap to complete
        await swap(array, i, minIndex);
    }

    // Call printArray after the sorting is complete
    printArray(array);
    sortComplete();
}

async function bubbleSort(array) {

    var i, j;

    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length - i - 1; j++) {

            await check(j,j+1);

            if (array[j] > array[j + 1]) {

                await swap(array, j, j + 1);
            }
        }
    }

    sortComplete();     

}

async function insertionSort(array) {

    var i, j, key;

    for (i = 1; i < array.length; i++) {
        key = array[i];
        j = i - 1;

        while (j >= 0 && array[j] > key) {

            await swap(array, j, j + 1);
            j = j - 1;
        }

        array[j + 1] = key;
    }
    sortComplete();
    printArray(array);
}

function generateArray() {
    var array = [];

    for (var i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 50));
    }

    return array;
}

async function printArray(array) {

    var sortedArray = [...array].sort((a,b)=>(a>b));
    console.log(sortedArray)

    var container = document.getElementById("array");
    container.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        var bar = document.createElement("div");
        if(value == sortedArray[i]){
            bar.classList.add("completed");
        }
        bar.classList.add("bar");
        bar.style.height = `${value * 3 + 50}px`;
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

var array;

window.onload = function(){
    array = generateArray();
    printArray(array);
}

function generateRandom(){
    array = generateArray();
    printArray(array);
}

async function main(i) {
    if(i === 1){
    await insertionSort(array);
    }
    else if(i === 2){
    await bubbleSort(array);
    }
    else if(i === 3){
    await selectionSort(array);
    }
}

// main();
