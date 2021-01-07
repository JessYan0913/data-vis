const dimensionArray = arr => {
  let a = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      a++;
      arr = arr[i];
      dimensionArray(arr);
    }
  }
  return a;
};

const arrayTrans = (arr, num) => {
  const iconsArr = [];
  arr.forEach((item, index) => {
    const page = Math.floor(index / num);
    if (!iconsArr[page]) {
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });

  return iconsArr;
};

export { dimensionArray, arrayTrans };
