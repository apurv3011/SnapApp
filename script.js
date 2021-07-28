let videoFeed = document.querySelector("video");
let recordB =document.querySelector(".inner-record");
let captureB = document.querySelector(".inner-capture");
let filters = document.querySelectorAll(".filter");
let recordingstate = false;
let mediaRecorder;
let filterSelected= "none";



(async function(){
    let constraints = {
        audio: false,
        video: { width: 1920, height: 1080 }
      }
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
     videoFeed.srcObject = mediaStream;
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.onstart = function () {
            
            console.log("Inside onstart");
        };

        mediaRecorder.ondataavailable = function (e) {
            console.log("Inside ondata available");
            console.log(e.data);
            let videoObj = new Blob([e.data] , {type :"video/mp4"});
            console.log(videoObj);      
            let videoURL = URL.createObjectURL(videoObj);
            let aTag = document.createElement("a");
            aTag.download = `video${Date.now()}.mp4`;
            aTag.href = videoURL;
            aTag.click();  
            aTag.remove();
        };
        mediaRecorder.onstops = function () {
            
            console.log("Inside onstop");
        };

        recordB.addEventListener("click" , function () {
            if(recordingstate){
                mediaRecorder.stop();
                // recordB.innerHTML = "Record video";
                recordingstate = false;
                recordB.classList.remove("animate-record");
            }else{
                mediaRecorder.start();
                // recordB.innerHTML = "Recording video";
                recordingstate = true;
                recordB.classList.add("animate-record");
            }            
        });

        captureB.addEventListener("click", function(){

            captureB.classList.add("animate-capture");
            setTimeout(function(){
                captureB.classList.remove("animate-capture");
            
            } , 1000);
            let canvas = document.createElement("canvas");
            canvas.width = 1280;
            canvas.height = 720;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(videoFeed , 0 , 0);
            let aTag = document.createElement("a");
            aTag.download = `Img-${Date.now()}.jpg`;
            aTag.href = canvas.toDataURL("image/jpg");
            aTag.click();
            
        });

})();

for (let filter = 0; filter < filters.length; filter++) {
    
    const element = filters[filter];
    console.log(element);
    element.addEventListener("click" , function(e){
        let currentfilterSelected = e.target.style.backgroundColor;
        let filetrDiv = document.createElement("div");
        filetrDiv.classList.add("filter-div");
        filetrDiv.style.backgroundColor =currentfilterSelected;
        filterSelected = currentfilterSelected;


    });
    
}
