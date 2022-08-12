function substrCount(input, needle, offset, length) {
    if (typeof(input) !== 'string') {
        return false;
    }

    let substring = input.substring(offset, offset + length);
    let reg = new RegExp(needle, 'g');

    return (substring.match(reg) || []).length;
}

console.log(substrCount('Good Golly Miss Molly', 'll', 7, 10));
console.log(substrCount('Good Golly Miss Molly', 'll', 7, 100));
console.log(substrCount('Good Golly Miss Molly', 'm', 7, 100));
console.log(substrCount('Good Golly Miss Molly', 'o', 0, 100));