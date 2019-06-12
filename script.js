var j = null;

function toOldStyles()
{
  $('.mycontainer').css("margin-top","0px");
}

function openOptions()
{
  $('.mypos1').css('display','inline-block');
}

var elem = document.getElementById("carouselExampleIndicators");
var a;
$.getJSON( "appData.json", function( data ) {
  console.log(data);
  a = data;
  j = data.appId;

  var agenda_arr = [];
  a.events[0].tabs.map((function(obj){
	if(obj.type == "agenda"){	
		agenda_arr.push(obj);
  };
  }))
  
  for(let i =0;i<a.events[0].tabs[1].agenda[0].detail.length;i++)
  {
      let k = a.events[0].tabs[1].agenda[0].detail[i].topic;
      $('#mydrop').append("<a class='dropdown-item' id='"+i+"' href='#' onclick='eventMaking("+i+")'>"+k+"</a>");
  }

  for(let i =0;i<a.events[0].tabs[18].items[0].poll.length;i++)
  {
      let k = a.events[0].tabs[18].items[0].poll[i].question;
      if(i==0){
      $('.carousel-inner').append('<div class="carousel-item active">'+
      '<div class="elementpage">'+
        '<div class="container mycontainer">'+
            '<div id="main" class="card card-body margintp">'+
              '<h2 class="title">'+k+'<button type="button" onclick="openFullscreen();" class="btn float-right">TV Screen</button></h2>'+
                '<ul id="items'+i+'"class="list-group">'+
                '</ul>'+
              '</body>'+
              '</html>'+
            '</div>'+
        '</div>'+
      '</div>'+
      '</div>');
      }

      if(i>0){
        $('.carousel-inner').append('<div class="carousel-item">'+
        '<div class="elementpage">'+
          '<div class="container mycontainer">'+
              '<div id="main" class="card card-body margintp">'+
                '<h2 class="title">'+k+'<button type="button" onclick="openFullscreen();" class="btn float-right">TV Screen</button></h2>'+
                '<ul id="items'+i+'"class="list-group">'+
                '</ul>'+
                '</body>'+
                '</html>'+
              '</div>'+
          '</div>'+
        '</div>'+
        '</div>');
        }
      }

      for(let i =0;i<a.events[0].tabs[18].items[0].poll.length;i++)
      {
        console.log(i);
        for(let j =0;j<a.events[0].tabs[18].items[0].poll[i].answer.length;j++)
        {
          let opt = a.events[0].tabs[18].items[0].poll[i].answer[j];
          if(i==0){
          $('#items'+i).append('<li class="list-group-item">'+opt+'<button class="btn btn-danger btn-sm float-right delete">X</button></li>');
          }
    
          if(i>0){
            $('#items'+i).append('<li class="list-group-item">'+opt+'<button class="btn btn-danger btn-sm float-right delete">X</button></li>');
            }
        }
      }


});

var socket = io.connect('http://104.131.76.15:3030/socket/con');
    // socket.emit('connection','88');
    socket.on('connection', function (data) {
      console.log(socket.connected);
      // socket.emit('my other event', { my: 'data' });
    });
socket.on('disconnect', function (data) {
  console.log(data);
  // socket.emit('my other event', { my: 'data' });
});

socket.on('report_data98df7a044a71a3cad6d8fef726c868bbc36b', function(data) {
  console.log('conreportnected',data);
  // socket.emit('my other event', { my: 'data' });
});

socket.on('confirm_connection', function (data) {
    console.log('connected',data);
    socket.emit('polling_report',a.appId,'Event Feedback','global',0)
    // socket.emit('my other event', { my: 'data' });
});


var a = $('#mydrop')



  function openFullscreen()
  {
    $('.mycontainer').css("margin-top","60px");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        $('.mycontainer').css("margin-top","60px");
        $('#carouselExampleIndicators').css("pointer-events","none");
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
        $('.mycontainer').css("margin-top","60px");
        $('#carouselExampleIndicators').css("pointer-events","none");
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
        $('.mycontainer').css("margin-top","60px");
        $('#carouselExampleIndicators').css("pointer-events","none");
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
        $('.mycontainer').css("margin-top","60px");
        $('#carouselExampleIndicators').css("pointer-events","none");
      }
  }

  function eventMaking(i)
  {
    console.log(i);
    a = $('#'+i).text();
    console.log(a);
    $('#myTopic').text(' '+a);
  }

  $(document).keypress(function(e) { 
    if (e.keyCode === 27)
    {
      console.log('hello');
      window.location.reload(false);
    }
});









