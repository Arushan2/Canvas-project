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
const initiCanvas = (id)=>{
    return new fabric.Canvas(id,{
        width:720,
        height:540,
        Selection: false,
    });
}
const loadImage = () => {
    const url = document.getElementById('imageUrl').value;
    fabric.Image.fromURL(url, (img) => {
        // Calculate the scale to fit the image to the canvas size
        let scale = Math.min(
            canvas.width / img.width, 
            canvas.height / img.height
        );
        img.set({
            scaleX: scale,
            scaleY: scale,
            top: 0,
            left: 0
        });
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}
const setBackground = (url,canvas)=> {
    fabric.Image.fromURL(url,(img)=> {
        canvas.backgroundImage = img
        canvas.renderAll()
    })
}
const toggleMode = (mode) =>{
    if (mode === modes.pan){
        if (currentMode === modes.pan){
            currentMode = ""
        } else{
            currentMode = modes.pan
            canvas.isDrawingMode = false
            canvas.renderAll()
        }
    } else if(mode === modes.drawing){
        if (currentMode === modes.drawing){
            currentMode = ""
            canvas.isDrawingMode = false
            canvas.renderAll()
        } else{
            currentMode = modes.drawing
            canvas.freeDrawingBrush.color =
            color
            canvas.isDrawingMode = true
            canvas.renderAll()
        }
        
    }
}
   
 
const setPanEvents = (canvas) =>{
    canvas.on("mouse:move",(event) => {
        if (mousePressed && currentMode === modes.pan){
            canvas.setCursor("grab")
            canvas.renderAll()
            const mEvent = event.e;
            const delta = new fabric.Point(mEvent.movementX,mEvent.movementY)
            canvas.relativePan(delta)
        }
    })
    
    canvas.on("mouse:down",(event)=>{
        mousePressed = true;
        if (currentMode === modes.pan){
            canvas.setCursor("grab")
            canvas.renderAll()
        }
    })
    
    canvas.on("mouse:up",(event)=>{
        mousePressed = false
        canvas.setCursor("default")
        canvas.renderAll()
    })
}
const setcolorListener = () => {
    const picker = document.getElementById
    ("colorPicker")
    picker.addEventListener("change", (event)=> {
        console.log(event.target.value)
        color = event.target.value
        canvas.freeDrawingBrush.color = color
        canvas.renderAll()
    })
}

const clearCanvas = (canvas) => {
    canvas.getObjects().forEach((o) => {
        if (o !== canvas.backgroundImage) {
            canvas.remove(o);
        }
    })
}
const createRect = (canvas) => {
    console.log("Rect")
    const canvCenter = canvas.getCenter()
    const rect = new fabric.Rect({
        width:100,
        height:100,
        fill: color,
        left: canvCenter.left,
        top:-50,
        originX: 'center',
        originY: 'center',
        cornerColor: 'white'
    });
    canvas.add(rect);
    canvas.renderAll();
    rect.animate('top',canvCenter.top,{
        onchange: canvas.renderAll.bind(canvas)
    });
}
const createCirc = (canvas) => {
    console.log("Circ")
    const canvCenter = canvas.getCenter()
    const circle = new fabric.Circle({
        radius:50,
        fill: color,
        left: canvCenter.left,
        top:canvCenter.top,
        originX: 'center',
        originY: 'center',
        cornerColor: 'white',
    })
    canvas.add(circle);
    canvas.renderAll();    
}

const canvas = initiCanvas("canvas");
let mousePressed = false;
let color = '#000000'
let currentMode;
const modes={
    pan:"pan",
    drawing:"drawing"
}
setBackground("https://www.apple.com/newsroom/images/partnerships/Apple-Google-partner-industry-specification-hero_inline.jpg.slideshow-xlarge_2x.jpg",canvas);
setPanEvents(canvas);

setcolorListener()