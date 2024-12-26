document.addEventListener("DOMContentLoaded",function(){

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const divs = document.body.querySelectorAll("div");
    let circles = [];
    
    let alreadyConnected = false;
    let pickedCircle = 0;
    let lastpickedCircle = 0;

    let mouseX = 0;
    let mouseY = 0;

    for(let i=1;i<divs.length+1;i++){ //find and aplly to the circles[] array all circles
        circles[i-1] = document.getElementById("circle"+i.toString());
    }

    for(let i=0;i<circles.length;i++){ //give all circles a mouseClick searcher
        circles[i].addEventListener("click",drawLine, lastpickedCircle = pickedCircle, pickedCircle = i);
        
    }

    document.addEventListener('mousemove', function(event) { //getMousePosition
        mouseX = event.pageX;
        mouseY = event.pageY;
    })

    function drawLine(){ //determine if to draw following circle or let two circles connect with a line
        if(alreadyConnected === true){
            //draw together line from first selected circle to other circle;
            alreadyConnected = false;
            connectCircles();
        } else{
            createFollowingLine(circles[pickedCircle]);
            alreadyConnected = true;
        } 
    }

    function createFollowingLine(startingLineCircle){ // first step (creating line)
        ctx.beginPath();
        ctx.moveTo(startingLineCircle.style.left,startingLineCircle.style.top);
        followMouse();
    }

    function followMouse(){ //create line that comes out of selected circle that follows cursor
        ctx.lineTo(mouseX,mouseY);
        ctx.stroke();
        followMouse();
        ctx.clearRect(0, 0, canvas.style.width, canvas.style.height);
    }

    function stopFollowingLine(){
        // if pressed anywhere else other then on circles then delete the following line that is comming out of the selected circle
    }

    function connectCircles(){
        if(lastpickedCircle !== pickedCircle){
            ctx.beginPath();
            ctx.moveTo(circles[lastpickedCircle].style.left, circles[lastpickedCircle.stlye.top]);
            ctx.lineTo(circles[pickedCircle].style.left, circles[pickedCircle].style.top);
        }
    }


})