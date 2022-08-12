function changeNames(names) {
    let re = /(\w+),\s(\w+)/;

    return names.split(/\r?\n/).map(lastFirst => {
        return lastFirst.replace(re, '$2, $1').replace(/,/, '');
    }).join('\n\n');
}

console.log(changeNames("Lennon, John\nMcCartney, Paul\nHarrison, George\nStar, Ringo"));