// console.log("Hii")
// const canvas = new fabric.Canvas("canvas",{
//     width: 5000,
//     height: 5000,
//     backgroundColor: 'red',
// });
// canvas.renderAll();
// fabric.Image.fromURL('https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/1dcfee57-9a6e-49bb-9cd2-5088e88b946d/Hindu+Temple+Jaffna.jpg', (img) => {
//     canvas.backgroundImage = img
//     canvas.renderAll();
// })
const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 500,
        height: 500
    });
};

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img;
        canvas.renderAll();
    });
};

const canvas = initCanvas('canvas');
let mousePressed = false;

setBackground('https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/1dcfee57-9a6e-49bb-9cd2-5088e88b946d/Hindu+Temple+Jaffna.jpg', canvas);

canvas.on('mouse:move', (event) => {
    if (mousePressed) {
        const delta = new fabric.Point(event.e.movementX, event.e.movementY);
        canvas.relativePan(delta);
    }
});

canvas.on('mouse:down', () => {
    mousePressed = true;
});

canvas.on('mouse:up', () => {
    mousePressed = false;
});
