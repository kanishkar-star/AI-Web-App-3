harryPotterSong = "";
peterPanSong = "";

leftWristX = 0;
rightWristX =0;

leftWristY = 0;
rightWristY = 0;
var canvas;
var color_timer;
function preload(){
    harryPotterSong = loadSound('music.mp3');
    peterPanSong = loadSound('music2.mp3');
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotpose);
}

function modelLoaded(){
    console.log("PoseNet is Intialized");
}

function gotpose(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log('The X Position of the Left Wrist is = ' + leftWristX
         + " and The Y Position of Left Wrist = " + leftWristY + ' The X Position of the Right Wrist is = ' + rightWristX 
         + 'and The Y Position of the right Wrist = ' + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    color_timer = color(random(255), random(255), random(255))
    setInterval(change_color, 1000);
    canvas.mousePressed(canvasPressed);
    function canvasPressed(){
        tint(color_timer)
    }
    canvas.mouseReleased(noTint_function);
    function noTint_function(){
        document.getElementById('say_timer').innerHTML = 'The song will start in:';
    }
    canvas.mouseOver(say_info);
    function say_info(){
        document.getElementById('say_timer').innerHTML = 'Click on The Canvas to change the tint color';
    }
}

function change_color(){
    document.getElementById('say_timer').style.color = color_timer;
}

