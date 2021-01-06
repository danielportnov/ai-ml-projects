let mobilenet;
let file_name;
var canvas;

function imageReady(){
    image(puffin, 0,0, width, height);
    mobilenet.predict(puffin, gotResults);
}

function gotResults(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        let label = results[0].label;
        let prob = results[0].confidence;
        fill(0);
        textSize(64);
        createP(label);
        createP(prob);
    }
}

function setup() {
    canvas = createCanvas(600, 400);

    dropzone = select('#dropzone');
    dropzone_txt = select('#dropzone-txt');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile,unhighlight);


    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}

function highlight(){
    dropzone.style('background-color', '#ccc');
}

function unhighlight(){
    dropzone.style('background-color', '#fff');
}

function gotFile(file){
    var img = createImg(file.data)
    img.size(600,500);
    img.position(180,50);
    dropzone.parent(img);
    mobilenet.predict(img,gotResults);
}

function modelReady(){
    dropzone_txt.html("Drop Image Here.");
}

function draw() {

}