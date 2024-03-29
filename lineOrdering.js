/**
 * Using the JavaScript language, have the function lineOrdering(strArr) read
 * the strArr parameter being passed which will represent the relations among
 * people standing in a line. The structure of the input will be
 * ["A>B","B>C","A<D",etc..]. The letters stand for different people and the
 * greater than and less than signs stand for a person being in front of someone
 * or behind someone. A>B means A is in front of B and B<C means that B is
 * behind C in line. For example if strArr is: ["J>B","B<S","D>J"], these are
 * the following ways you can arrange the people in line: DSJB, SDJB and DJSB.
 * Your program will determine the number of ways people can be arranged in
 * line. So for this example your program should return the number 3. It also
 * may be the case that the relations produce an impossible line ordering,
 * resulting in zero as the answer.
 *
 * Only the symbols <, >, and the uppercase letters A...Z will be used. The
 * maximum number of relations strArr will contain is ten.
 *
 * https://www.coderbyte.com/results/bhanson:Line%20Ordering:JavaScript
 *
 * 
 * 
 */
function lineOrdering(strArr) {
    strArr=strArr.map(element=>{
        if(element.length >3){
            let personA = strArr.slice(0,1);
            let personB = strArr.slice(element.length-1);
            element = `${personA}<${personB}`;
        }
        return element;
    });
    // Unique people
    const people = Array.from(new Set(strArr.join(',').match(/[A-Z]+/g)));
    // const temp = permutatePeople([...people]);
    // Brute-force all permutations
    // const peoplePermutations = permute(people);
    const peoplePermutations = permutatePeople([...people]);
    // console.log(temp, peoplePermutations);
    const validPermutations = [];

    peoplePermutations.forEach(permutation => {
        const permutationValid = relationsPossible(permutation, strArr);
        if (permutationValid) {
            validPermutations.push(permutation);
        }
    });

    return validPermutations.length;
}

function relationsPossible(people, relations) {
    for (let i = 0; i < relations.length; i++) {
        let [personA, relationship, personB] = relations[i].split('');

        // Switch everything to A > B
        if (relationship === '<') {
            [personB, personA] = [personA, personB];
        }

        const indexPersonA = people.indexOf(personA);
        const indexPersonB = people.indexOf(personB);

        if (indexPersonA <= indexPersonB) {
            return false;
        }
    }
    return true;
}

// https://en.wikipedia.org/wiki/Heap's_algorithm
// Iterative
function permute(arr) {
    let count = Array(arr.length).fill(0);

    const results = [arr.slice()];

    let i = 0;
    while (i < arr.length) {
        if (count[i] < i) {
            if (i % 2 === 0) {
                const temp = arr[0];
                arr[0] = arr[i];
                arr[i] = temp;
            } else {
                const temp = arr[count[i]];
                arr[count[i]] = arr[i];
                arr[i] = temp;
            }
            results.push(arr.slice());
            count[i]++;
            i = 0;
        } else {
            count[i] = 0;
            i++;
        }
    }
    return results;
}

console.log(lineOrdering(["J>B", "B<S", "D>J"]));

function permutatePeople(people) {
    // let result = [];
    // if (people.length === 0) return [];
    // if (people.length === 1) return [people];
    // for (let i = 0; i < people.length; i++) {
    //     const currentNum = people[i];
    //     const remainingNums = people.slice(0, i).concat(people.slice(i + 1));
    //     const remainingNumsPermuted = permute(remainingNums);
    //     for (let j = 0; j < remainingNumsPermuted.length; j++) {
    //         const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
    //         result.push(permutedArray);
    //     }
    // }
    // return result;

    let result = [];
    if (people.length === 0) return [];
    if (people.length === 1) return [people];
    for (let i = 0; i < people.length; i++) {
        const currentPeople = people[i];
        const remainPeople = people.slice(0, i).concat(people.slice(i + 1));
        const remainPermute = permutatePeople(remainPeople);
        for (let j = 0; j < remainPermute.length; j++) {
            const res = [currentPeople].concat(remainPermute[j]);
            result.push(res);
        }
    }
    return result;
}
