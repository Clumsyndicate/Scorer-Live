
/*
var socket = io.connect('http://47.91.241.189:9000/');
    socket.on('connect', function() {
        socket.emit('request', {data: 'I\'m connected!'});
    });
*/
var socket = io.connect('http://127.0.0.1:5000/');

socket.on('connect', function() {
    socket.emit('yo', {data: 'I\'m connected!'});
});

socket.on('disconnect', function() {
    running = false;
    document.getElementById("timer").innerHTML = "Disconnected";
    alert('Disconnected!');
})
    
socket.on('update', function(data) {
    console.log(data);
    $('.game-num').text(data.gNum);
    $('#1.team').text(data.t1N);
    $('#2.team').text(data.t2N);
    $('#1.score').text(data.t1S);
    $('#2.score').text(data.t2S);
    countDownDate = new Date(new Date().getTime() + data.time * 1000);
    time = data.time * 1000;
    running = data.running;
})

var countDownDate;
var running = false;
var time;


function countDown(interval) {
    // Set the date we're counting down to
    countDownDate = new Date(new Date().getTime() + interval*1000);
    
    // Update the count down every 1 second
    var x = window.setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      /*var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); */
      

      // Display the result in the element with id="demo"
        if (running) {
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var centisec = Math.floor((distance % (10 * 60)) / 10);
            
            document.getElementById("timer").innerHTML = minutes + ":" + ((seconds<10) ? ("0" + seconds) : seconds) + ":" + ((centisec<10) ? ("0" + centisec) : centisec);
        } else {
            var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((time % (1000 * 60)) / 1000);
            var centisec = Math.floor((time % (1000)) / 10);
            
            document.getElementById("timer").innerHTML = minutes + ":" + ((seconds<10) ? ("0" + seconds) : seconds) + ":" + ((centisec<10) ? ("0" + centisec) : centisec);
        }

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 10);
}

countDown(10*60);
