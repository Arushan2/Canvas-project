window.addEventListener('load', function() {
    var canvas = document.getElementById('videoCanvas');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var isPanning = false;
    var startX, startY;

    var toggleDrawingButton = document.getElementById('toggleDrawing');
    toggleDrawingButton.addEventListener('click', function() {
        drawing = !drawing;
        toggleDrawingButton.textContent = drawing ? "Disable Drawing" : "Enable Drawing";
    });

    var video = document.createElement('video');
    video.src = 'sample.mp4'; // Replace with your video file path
    video.load();

    video.addEventListener('play', function() {
        draw(this, ctx, canvas.width, canvas.height);
    }, false);

    function draw(video, ctx, width, height) {
        if (video.paused || video.ended || drawing) return;
        ctx.drawImage(video, 0, 0, width, height);
        requestAnimationFrame(function() {
            draw(video, ctx, width, height);
        });
    }

    canvas.addEventListener('mousedown', function(e) {
        if (drawing) {
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        } else {
            isPanning = true;
            startX = e.offsetX;
            startY = e.offsetY;
        }
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (isPanning) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            startX = e.offsetX;
            startY = e.offsetY;
            panCanvas(dx, dy);
        }
    });

    canvas.addEventListener('mouseup', function() {
        if (drawing) {
            ctx.closePath();
        }
        isPanning = false;
    });

    canvas.addEventListener('mouseout', function() {
        if (drawing) {
            ctx.closePath();
        }
    });

    function panCanvas(dx, dy) {
        ctx.translate(dx, dy);
        redrawCanvas();
    }

    function redrawCanvas() {
        ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
        // Redraw the canvas content
    }

    canvas.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
    // Drawing specific shapes
    function drawShape(shape) {

        ctx.beginPath();
        switch (shape) {
            case 'rectangle':
                console.log("rectangle")
                ctx.rect(100, 100, 150, 100); // Customize dimensions as needed
                break;
            case 'circle':
                ctx.arc(200, 200, 50, 0, 2 * Math.PI); // Customize position and radius as needed
                break;
            case 'triangle':
                ctx.moveTo(100, 100);
                ctx.lineTo(150, 200);
                ctx.lineTo(50, 200);
                ctx.closePath();
                break;
            case 'square':
                ctx.rect(100, 100, 100, 100); // Customize position and size as needed
                break;
        }
        ctx.stroke();
    }

    document.getElementById('drawRect').addEventListener('click', function() {
        drawShape('rectangle');
    });

    document.getElementById('drawCircle').addEventListener('click', function() {
        drawShape('circle');
    });

    document.getElementById('drawTriangle').addEventListener('click', function() {
        drawShape('triangle');
    });

    document.getElementById('drawSquare').addEventListener('click', function() {
        drawShape('square');
    });
});
