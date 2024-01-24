/**
 * Using the JavaScript language, have the function arrayJumping(arr) take the
 * array of numbers stored in arr and first determine the largest element in the
 * array, and then determine whether or not you can reach that same element
 * within the array by moving left or right continuously according to whatever
 * integer is in the current spot. If you can reach the same spot within the
 * array, then your program should output the least amount of jumps it took. For
 * example: if the input is [2, 3, 5, 6, 1] you'll start at the spot where 6 is
 * and if you jump 6 spaces to the right while looping around the array you end
 * up at the last element where the 1 is. Then from here you jump 1 space to the
 * left and you're back where you started, so your program should output 2. If
 * it's impossible to end up back at the largest element in the array your
 * program should output -1. The largest element in the array will never equal
 * the number of elements in the array. The largest element will be unique.
 *
 * https://www.coderbyte.com/results/bhanson:Array%20Jumping:JavaScript
 *
 * 
 * 
 */

function arrayJumping(arr) {
    let ht = {};
    let length = arr.length;
    let maxIndex = arr.indexOf(Math.max(...arr));
    for (let i = 0; i < length; i++)
        ht[i] = [leftPosition(length, i, arr[i]), rightPosition(length, i, arr[i])];
    if (ht[maxIndex].includes(maxIndex)) return 1;
    let jump = 1;
    let travelSet = new Set(ht[maxIndex]);
    // assuming that solution will less than length cause have to stop iteration
    for (jump = 2; jump < length; jump++) {
        for (let i of [...travelSet]) {
            travelSet.add(ht[i][0]);
            travelSet.add(ht[i][1]);
        }
        if (travelSet.has(maxIndex)) return jump;
    }
    return -1;
}
function leftPosition(length, index, number) {
    let val = number % length;
    if (index < val)
        val = length + index - val;
    else
        val = index - val;
    return val;
}
function rightPosition(length, index, number) {
    let val = number % length;
    if (length - 1 - index < val)
        val = val + index - length;
    else
        val = val + index;
    return val;
}
console.log(arrayJumping([2, 3, 5, 6, 1]));