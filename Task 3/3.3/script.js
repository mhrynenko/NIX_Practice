function circleArray() {
    this.array = [];

    this.add = function(element) {
        this.array.push(element);
    }

    this.get = function(position) {
        return this.array[(position % this.array.length + this.array.length) % this.array.length];
    }
}

let circledArray = new circleArray();
circledArray.add("Київ");
circledArray.add("Харків");
circledArray.add("Херсон");

console.log(circledArray.get(4));
console.log(circledArray.get(-1));