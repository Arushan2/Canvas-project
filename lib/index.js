console.log("Hii")
const canvas = new fabric.Canvas("canvas",{
    width: 500,
    height: 500,
    backgroundColor: 'red',
});
canvas.renderAll();
fabric.Image.fromURL('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adventuresofjellie.com%2Fsri-lanka%2Fjaffna-in-2022-a-kaleidoscope-of-colour-history-and-people&psig=AOvVaw3Up2sPo7BKOH7wHfLZjs9t&ust=1703234018701000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDJ4qiPoIMDFQAAAAAdAAAAABAI', (img) => {
    canvas.backgroundImage = img
    canvas.renderAll();
})
