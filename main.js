
function swap(array , firstIndex , secondIndex){

    var temp = array[firstIndex];

    array[firstIndex] = array[secondIndex];

    array[secondIndex] = temp;
}

function selectionSort(array){

    var i , j , minIndex;

    for(i = 0 ; i < array.length ; i++){

        minIndex = i;

        for(j = i + 1 ; j < array.length ; j++){

            if(array[j] < array[minIndex]){

                minIndex = j;
            }
        }

        swap(array , i , minIndex);   

    }
}

function bubbleSort(array){

    var i , j;

    for(i = 0 ; i < array.length ; i++){

        for(j = 0 ; j < array.length - 1 ; j++){

            if(array[j] > array[j + 1]){

                swap(array , j , j + 1);
            }
        }
    }
}

function insertionSort(array){
    
        var i , j , temp;
    
        for(i = 1 ; i < array.length ; i++){
    
            j = i;
    
            while(j > 0 && array[j - 1] > array[j]){
    
                swap(array , j , j - 1);
    
                j--;
            }
        }
    
}