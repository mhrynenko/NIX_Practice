function isEven (number) {
    return (number & 1) === 0;
}

console.log(isEven(5));
console.log(isEven(4));
console.log(isEven(1));
console.log(isEven(0));