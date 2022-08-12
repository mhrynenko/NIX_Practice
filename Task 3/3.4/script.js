function Rectangle(x, y) {
    this.startX = x;
    this.startY = y;
    this.context = document.getElementById("canvas").getContext("2d");

    this.context.beginPath();
    this.context.rect(this.startX, this.startY, 150, 100);
    this.context.fillStyle = "red";
    this.context.fill();
}

function Triangle(x, y) {
    this.startX = x;
    this.startY = y;
    this.context = document.getElementById("canvas").getContext("2d");

    this.context.beginPath();
    this.context.moveTo(this.startX, this.startY);
    this.context.lineTo(this.startX + 50, this.startY + 100);
    this.context.lineTo(this.startX - 50, this.startY + 100);
    this.context.fillStyle = "blue";
    this.context.fill();
}

let rectangle = new Rectangle(20, 20);
let triangle = new Triangle(250, 20);