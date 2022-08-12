function testString (str) {
    if (typeof(str) !== 'string') {
        return false;
    }

    let splitStr = str.split('');

    let stack = [],
        open = ['(', '['],
        close = [')', ']'];

    let closeIndex,
        openIndex;

    for (let i = 0; i < splitStr.length; i++) {
       openIndex = open.indexOf(splitStr[i]);
       if (openIndex !== -1) {
           stack.push(openIndex);
           continue;
        }

       closeIndex = close.indexOf(splitStr[i]);
       if (closeIndex !== -1) {
           openIndex = stack.pop();
           if (closeIndex !== openIndex) {
               return false;
            }
        }
    }

    if (stack.length !== 0) {
        return false;
    }

    return true;
}

console.log(testString('isu([syvstc]ts(crs))cs'));
console.log(testString('isu[syv(stc]ts(crs))cs'));