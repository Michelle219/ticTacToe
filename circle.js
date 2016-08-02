      //global varriables
      var canvas;
      var ctx;
      var dx=5; 
      var dy=5;
      var x = 150;
      var y = 100;
      var r = 30; 
      var width = 1000;
      var height = 570;
      var rectx = 900;
      var recty = 500;
      var rectSize = 68;
      var placeX = 100;
      var placeY =  200;
      var points = 0;
      var lives = 3;


      var circle = function (x, y, r, color) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2*Math.PI, true);
      ctx.fillStyle = color;
      ctx.fill();
    }

      var rect = function(x,y,w,h,color) {
      ctx.beginPath();
      ctx.rect(x,y,w,h);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }

    var clear = function() {
      ctx.clearRect(0, 0, width, height);
    }

    var init = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return setInterval(draw, 10);
    }

    function doKeyDown(evt) { //circle's movement
    switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed */
    if (y - dy > 0){
    y -= dy;
    }
    break;
    case 40:  /* Down arrow was pressed */
    if (y + dy < height){
    y += dy;
    }
    break;
    case 37:  /* Left arrow was pressed */
    if (x - dx > 0){
    x -= dx;
    }
    break;
    case 39:  /* Right arrow was pressed */
    if (x + dx < width){
    x += dx;
    }
    break;
  }
}

    var draw = function() {
      clear();
      checkAndPlaceItem(x,y,placeX,placeY,r);
      document.getElementById("numOfPoints").innerHTML = points;
      drawItem(placeX, placeY);
      circle(x, y, r, "#2dbdfc");
      moveRect (x, y, rectx, recty);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      rect(rectx, recty,rectSize,rectSize, "#f5c4b6");
      livesImg();
      if (isTouch(x,y, r, Math.round(rectx),Math.round(recty), rectSize)) { 
        lives--;
        rePlaceRect();
        if (lives==-1)
          gameEnd();
      }
   }

    var moveRect= function(x, y, rectanglex, rectangley){ //moves the rect towards the  circle
      var veex = x - rectanglex;
      var veey = y - rectangley;
      var undu = Math.sqrt((Math.pow(veey,2))+(Math.pow(veex,2)));
      var ux = veex / undu; 
      var uy = veey / undu;
      var mx = ux*0.7;
      var my = uy*0.7;
      rectx += mx;
      recty += my;
  }

  var rePlaceRect = function() {
    rectx = 900;
    recty = 500;
  }

    var isTouch = function(x, y, r, rectx, recty, rects) {  //Checks collisions bewtween the objects
      var l = Math.min(Math.abs(x-rectx),Math.abs(x-rectx-rects));
      var h = Math.min(Math.abs(y-recty),Math.abs(y-recty-rects));
      if ((l<r)&&(h<r))
        return true;
        return false;
  }

    //actions to happen at the end of the game
    var gameEnd = function() {
        document.getElementById("ending").style.display='block';
        document.getElementById("canvas").style.display='none';
        document.getElementById("gameTool").style.display='none';
        document.getElementById("endPoints").innerHTML = points;
        clearInterval(Game);
    }

  //the function places a new item
  var placeNewItem = function() {
    //coordinate for up-corner
    placeX = Math.floor((Math.random() * (width-40))+20);
    placeY = Math.floor((Math.random() * (height)));
}

var drawItem = function(placeX, placeY) {
    ctx.beginPath();
    ctx.moveTo(placeX-20,placeY+30); //left down corner
    ctx.lineTo(placeX,placeY); //up corner
    ctx.lineTo(placeX+20,placeY+30); //right down corner
    ctx.closePath();
    ctx.fillStyle = "#FFA500";
    ctx.fill();
}

//the function check whether it's necessery] to place a new item then places it.
var checkAndPlaceItem = function(x,y,placeX,placeY,r){
    if (placeX==null)
      return placeNewItem();
    var l = Math.abs(x-placeX);
    var k = Math.abs(y-placeY);
    if (l<=r&&k<=r){
      placeNewItem(); 
      points++;
    }   
}

var livesImg = function(){
    var live=new Image(); //creates a variable for a new image
    live.src= "heart.jpg" //image's location
       if(lives>=1){
         ctx.drawImage(live,900,15); 
          if(lives>=2)
             ctx.drawImage(live,850,15); 
              if(lives>=3)
                 ctx.drawImage(live,800,15); 
    }
  }
 
    var Game = init();
    window.addEventListener('keydown',doKeyDown,true);
