function isPowOfTwo(number) {
    if (number === 0 || number === 1) {
        return false;
    }

    return (number & (number - 1)) === 0 ? true : false;
}

console.log(isPowOfTwo(16));
console.log(isPowOfTwo(14));