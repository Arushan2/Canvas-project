window.addEventListener('load', function() {
    var canvas = document.getElementById('videoCanvas');
    var ctx = canvas.getContext('2d');
    var drawing = false; // Flag to toggle drawing

    var toggleDrawingButton = document.getElementById('toggleDrawing');
    toggleDrawingButton.addEventListener('click', toggleDrawing);

    var video = document.createElement('video');
    video.src = 'sample.mp4'; // Replace with your video file path
    video.load();

    video.addEventListener('play', function() {
        if (!drawing) {
            draw(this, ctx, canvas.width, canvas.height);
        }
    }, false);

    function draw(video, ctx, width, height) {
        if (video.paused || video.ended || drawing) return;
        ctx.drawImage(video, 0, 0, width, height);
        requestAnimationFrame(function() {
            draw(video, ctx, width, height);
        });
    }

    // Toggle drawing mode
    function toggleDrawing() {
        drawing = !drawing;
        if (!drawing && !video.paused) {
            draw(video, ctx, canvas.width, canvas.height);
        }
        toggleDrawingButton.textContent = drawing ? "Disable Drawing" : "Enable Drawing";
    }

    // Drawing logic
    function startDrawing(event) {
        if (!drawing) return;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
        canvas.addEventListener('mousemove', drawLine);
    }

    function drawLine(event) {
        if (!drawing) return;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

    function stopDrawing() {
        if (!drawing) return;
        canvas.removeEventListener('mousemove', drawLine);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Play/Pause video on canvas click (optional)
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
