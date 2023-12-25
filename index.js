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
        height: 500,
        Selection: false
    });
};

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img;
        canvas.renderAll();
    });
};
const toggleMode= (mode) =>{
    if(mode===modes.pan){
        if(currentMode === modes.pan){
            currentMode=''
        } else {
            currentMode = modes.pan
        }
    } else if (mode===modes.drawing){
        if(currentMode === modes.drawing){
            currentMode=''
        } else {
            currentMode = modes.drawing
        }
    }
    console.log(mode)
    
}

const setPanEvents =(canvas) =>{
    // Event listeners for canvas interaction
    canvas.on('mouse:move', (event) => {
        if (mousePressed && currentMode===modes.pan) {
            canvas.setCursor("grab")
            canvas.renderAll()
            const delta = new fabric.Point(event.e.movementX, event.e.movementY);
            canvas.relativePan(delta);
        }
    });

    canvas.on('mouse:down', () => {
        mousePressed = true;
        if(currentMode===modes.pan){
            canvas.setCursor("grab")
            canvas.renderAll()
        }
        canvas.setCursor("grab")
        canvas.renderAll()
    });

    canvas.on('mouse:up', () => {
        mousePressed = false;
        canvas.setCursor("default")
        canvas.renderAll()

    });

    // Event listener for the button to update the background image
    document.getElementById('updateBackground').addEventListener('click', () => {
        const imageUrl = document.getElementById('imageUrl').value;
        setBackground(imageUrl, canvas);
    });

}

const canvas = initCanvas('canvas');
let mousePressed = false;

let currentMode;
const modes ={
    pan:'pan',
    drawing:'drawing'
}
// Initial background image
setBackground('https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/1dcfee57-9a6e-49bb-9cd2-5088e88b946d/Hindu+Temple+Jaffna.jpg', canvas);
setPanEvents(canvas)
