function factorial(number) {
  if (number === 1) {
    return 1;
  }
  return factorial(number-1)*number
}

console.log(factorial(3));



function findSum(array, k, i=0) {
  if (i === array.length || array[i] > k) {
    return false;
  }
  
  if (array[i] === k){
      return true;
  }
  
  return findSum(array, k-array[i], i+1) || findSum(array, k, i+1);
}

console.log(findSum([3,2,8,4,18],14));



