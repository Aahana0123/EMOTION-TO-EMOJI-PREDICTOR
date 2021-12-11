Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach("#camera");

function capture_image() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });

}
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/oP1pzMdUO/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis
    var speakData1 = "The first prediction is - " + prediction1;
    var speakData2 = "The second prediction is - " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function predict_emotion() {
    var image = document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("Error!")
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("result_emoji").innerHTML = "&#128522;";

        }
        if (results[0].label == "Angry") {
            document.getElementById("result_emoji").innerHTML = "&#128548;";
            
        }
        if (results[0].label == "Sad") {
            document.getElementById("result_emoji").innerHTML = "&#128532;";
            
        }
        if (results[1].label == "Happy") {
            document.getElementById("result_emoji2").innerHTML = "&#128512;";
            
        }
        if (results[1].label == "Angry") {
            document.getElementById("result_emoji2").innerHTML = "&#128545;";
            
        }
        if (results[1].label == "Sad") {
            document.getElementById("result_emoji2").innerHTML = "&#128546;";
            
        }
    }

}