function findWord (str, subStr) {
    if (typeof(str) !== 'string') {
        return false;
    }

    const answ = str.split(/[,.\s]/).filter(word => {
        if (word.includes(subStr) === true) {
            return word;
        }
    });
    
    return answ.length !== 0 ? answ : false;
}

console.log(findWord('Ми знаємо, що монохромний колір – це градації сірого', 'хром'))
console.log(findWord('Ми знаємо, що монохромний колір – це градації сірого хромаак', 'хром'))
console.log(findWord('Ми знаємо, що монохромний колір – це градації сірого', 'хром2'))