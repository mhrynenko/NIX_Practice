function strPad (input, fulllLen, fillStr, fillType = 'FILL_RIGHT') {
    switch (fillType) {
        case 'FILL_LEFT':
            return input.padStart(fulllLen, fillStr);

        case 'FILL_BOTH':
            return input.padStart((input.length + fulllLen) / 2, fillStr).padEnd(fulllLen, fillStr);
        
        case 'FILL_RIGHT':
            return input.padEnd(fulllLen, fillStr);

        default:
            break;
    }
}

console.log(strPad('star', 10, '_*_'));
console.log(strPad('star', 8, '_*_', 'FILL_LEFT' ));
console.log(strPad('star', 8, '*', 'FILL_BOTH')); 