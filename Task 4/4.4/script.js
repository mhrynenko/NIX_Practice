function isDate (dateString) {
    let regEx = /^[0-9]{1,2}\-[0-9]{1,2}\-[0-9]{4}$/;
    return regEx.test(dateString);
}

console.log(isDate('25-07-2021'));
console.log(isDate('25-7-2021'));
console.log(isDate('1-1-2021'));
console.log(isDate('2-12-1979'));


console.log(isDate('25/07-2021'));
console.log(isDate('25/7/2021'));
console.log(isDate('11-2021'));
console.log(isDate('2:12:1979'));