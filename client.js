// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  
  var config = {
    apiKey: "AIzaSyCIi4whBgkNKOoediWDR2oxVePerWpMpHg",
    authproject: "yeemachine-fc409.firebaseapp.com",
    databaseURL: "https://yeemachine-fc409.firebaseio.com",
    projectId: "yeemachine-fc409",
    storageBucket: "yeemachine-fc409.appspot.com",
    messagingSenderId: "563165122469"
  };
  
firebase.initializeApp(config);
var database = firebase.database();
var projectRef = database.ref('spreadsheets2/projects');
var projectID = []

  projectRef.on('value', function(snap) {
    var firebaseContainer = $('<section class="firebaseLoad"></section>')
    var secondaryContainer = $('<section class="secondaryLoad"></section>')
    var nav = $('<nav><div class="home">Projects</div></nav>');
    var homeContainer = $('<container class="homeContainer"></container>')
     var projectData = snap.val();
     projectID = Object.keys(projectData)
     console.log(projectID)
     var css = ""

    projectID.forEach(function(item){
      var projectName = projectData[item][0].project
      var projectLength = Object.keys(projectData[item]).length
      
      for (var i=0; i<projectLength; i++){
        var projectPhoto = projectData[item][i].photo
        var projectVideo = projectData[item][i].video
        var projectText = projectData[item][i].text
        var projectYear = projectData[item][i].year
        var projectHome = projectData[item][i].home
        var projectCss = projectData[item][i].css
        var projectAspect = projectData[item][i].aspect
        var projectOrder = projectData[item][i].homeOrder
        var projectOrientation = projectData[item][i].orientation
        
        if(projectHome === true){
          console.log(projectName)
          if(projectPhoto !== ""){
             homeContainer.append('<a href="#'+item+'" class="homeThumb projectClick '+item+'" project="'+item+'" style="order:'+projectOrder+'" ><div class="title">'+projectName+'<span>'+projectYear+'</span></div><img src="'+projectPhoto+'" style="'+projectCss+'"/></a>')
          }
          if(projectVideo !== ""){
            homeContainer.append('<a class="homeThumb projectClick '+item+'" project="'+item+'" style="order:'+projectOrder+'"><div class="title">'+projectName+'<span>'+projectYear+'</span></div><video autoplay loop playsinline mute style="'+projectCss+'"><source src="'+projectVideo+'" type="video/mp4">Your browser does not support the video tag.</video></a>')
          } 
        }
      }
      // console.log(projectName, projectLength)
      nav.append("<a href='#"+item+"' class='projectClick "+item+"' project='"+item+"' style='order:"+projectOrder+"'>"+projectName+"</a>")
    });
    
    function firebaseClick(project) {
      var heroHeight = $('.hero').height()
      if(window.pageYOffset < heroHeight){
           $('html, body').animate({
          scrollTop: $(".projects").offset().top
      }, 500);

        }
      

                        (function () {
                      var _overlay = document.querySelector('.secondaryLoad');
                      var _clientY = null; // remember Y position on touch start

                      _overlay.addEventListener('touchstart', function (event) {
                          if (event.targetTouches.length === 1) {
                              // detect single touch
                              _clientY = event.targetTouches[0].clientY;
                          }
                      }, false);

                      _overlay.addEventListener('touchmove', function (event) {
                          if (event.targetTouches.length === 1) {
                              // detect single touch
                              disableRubberBand(event);
                          }
                      }, false);

                      function disableRubberBand(event) {
                          var clientY = event.targetTouches[0].clientY - _clientY;

                          if (_overlay.scrollTop === 0 && clientY > 0) {
                              // element is at the top of its scroll
                              event.preventDefault();
                          }

                          if (isOverlayTotallyScrolled() && clientY < 0) {
                              //element is at the top of its scroll
                              event.preventDefault();
                          }
                      }

                      function isOverlayTotallyScrolled() {
                          // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
                          return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
                      }
                  }())
      
      
      
      $('.secondaryLoad').scroll(function() {
          scrolltwo();
      });
      
      $('.right').addClass('hide');
      $('body').addClass('lock');
      $(".selected").removeClass("selected");
      var secondaryContainer = $('<container aria-hidden="false" class="secondaryContainer"><i class="material-icons button">&#xE5CD;</i></container>')
      console.log(project);
      var projectName = projectData[project][0].project
      var projectLength = Object.keys(projectData[project]).length
      var projectYear = projectData[project][0].year
      var projectText = projectData[project][0].text


      secondaryContainer.append('<h3 class="logo folded about"><div class="line solid"><p class="yeehover" style="margin-top:-0.8em">&nbsp</p><p>'+projectName+'<span> — '+projectYear+'</span></p></div><div class="line shadow"><p class="yeehover" style="margin-top:-0.8em">'+projectName+'<span> — '+projectYear+'</span></p></div></h3><div class="text"><div class="para">'+projectText+'</div></div>')
      for (var i=0; i<projectLength; i++){
        var projectPhoto = projectData[project][i].photo
        var projectVideo = projectData[project][i].video
        var projectOrientation = projectData[project][i].orientation
        var projectAspect = projectData[project][i].aspect
        var projectCaption = projectData[project][i].caption
        console.log(projectPhoto,projectVideo,projectText,projectYear)
        if(projectPhoto !== ""){
          secondaryContainer.append('<div class="block '+projectOrientation+'"><img class="" src="'+projectPhoto+'"/><p class="caption"><i>'+projectCaption+'</i></p></div>')
        }
        if(projectVideo !== ""){
          secondaryContainer.append("<div class='videoContainer block "+projectOrientation+"'><div class='embed-container' style='"+projectAspect+"'><iframe src='"+projectVideo+"' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div><p class='caption'>"+projectCaption+"</p></div>")
        }
        }
      
      $('.secondaryLoad').html(secondaryContainer);
      $('.secondaryLoad').addClass('show');
      $("nav ."+project).addClass("selected")
      $('.secondaryLoad').scrollTop(0);

      $('.button').bind('click', function(){
        firebaseClose()
        
      })
    }
    function firebaseClose() {
      var lastPos = $(window).scrollTop();
      var hash = location.hash.replace('#','');
         if(hash != ''){
        // Show the hash if it's set
        // alert(hash);

        // Clear the hash in the URL
        location.hash = '';
        $(window).scrollTop(lastPos);
        }
      
      $(".selected").removeClass("selected")
      $(".show").removeClass("show")
      $(".hover").removeClass("hover")
      $(".lock").removeClass("lock")
      $(".hide").removeClass("hide")
      $('.ham .material-icons').html('&#xE5D2;')
    }
    
    nav.append("<div class='linkedin'><a href='https://www.linkedin.com/in/yeemachine/' target='blank'>LinkedIn</a></div><div class='about'><a>About</a></div>")
    firebaseContainer.append(nav, homeContainer, secondaryContainer)  
    
    
        function aboutClick() {
          var heroHeight = $('.hero').height()
            if(window.pageYOffset < heroHeight){
                 $('html, body').animate({
                scrollTop: $(".projects").offset().top
            }, 500);

            }
          $('body').addClass('lock');
          $(".selected").removeClass("selected");
          $('.secondaryLoad').addClass('show');
          $('.right').addClass('hide');
          var secondaryContainer = $('<container aria-hidden="false" class="secondaryContainer"><i class="material-icons button">&#xE5CD;</i></container>')
          var aboutTitle = "From CA to NY"
          var aboutText = "I am an aspring graphic designer and developer interested in the potential of web technologies. I am a new graduate of Cooper Union in New York City. In addition to using design software for much of my graphic work, I use code to prototype my more experimental content in WebGL and WebVR."
          var skillList = "HTML / CSS / JS / PHP / JQuery / Three.js / Aframe.js / Web VR-AR / WebGL / Web Audio API / Vue.js / Node.js / Lottie.js / Firebase"
          var skillList2 = "Photoshop / Illustrator / InDesign / After Effects / Final Cut Pro / Motion / Blender / RoboFont / Bodymovin (After Effects) / Sketch / Principle"
          var experience = "Code and Theory<br><i>New York, NY – May 2018 to Present</i><br><br>The Herb Lubalin Study Center of Design and Typography<br><i>New York, NY – Feb 2018 to Present</i><br><br>Trilon Graphics / Digital Printers<br><i>New York, NY – Feb 2018 to Present</i><br><br>SFMOMA.domains<br><i>New York, NY – Jan 2018 to Mar 2018</i><br><br>Typographics<br><i>New York, NY – Sep 2017 to Present</i><br><br>The Cooper Union Intra-Disciplinary Seminar<br><i>New York, NY – Sep 2017 to Present</i><br><br>Piscatello Design Centre<br><i>New York, NY – May 2017 to Aug 2017</i><br><br>Facebook Global Hackathon 2016<br><i>Menlo Park, CA – Nov 2016</i>"
          var bio2 = $('<h3 class="logo folded about"><div class="line solid"><p class="yeehover" style="margin-top:-0.8em">&nbsp</p><p>'+aboutTitle+'</p></div><div class="line shadow"><p class="yeehover" style="margin-top:-0.8em">'+aboutTitle+'</p></div></h3><div class="text"><div class="para">'+aboutText+'<br><br><br><a class="external" href="mailto:rich@yeemachine.com" target="blank">Contact Me</a><br><br><br><br><b>Experience</b><br><br>'+experience+'<br><br><br><b>Design Software</b><br><br>'+skillList2+'<br><br><br><b>Web Skills</b><br><br>'+skillList+'</div></div>')
          secondaryContainer.append(bio2)
          $('.secondaryLoad').html(secondaryContainer);
          
          $('.button').bind('click', function(){
              firebaseClose()
            })
          function firebaseClose() {
            $(".selected").removeClass("selected")
            $(".show").removeClass("show")
            $(".hover").removeClass("hover")
            $(".lock").removeClass("lock")
            $(".hide").removeClass("hide")
            $('.ham .material-icons').html('&#xE5D2;')
          }
          $('.secondaryLoad').scroll(function() {
          scrolltwo();
          });
        }
    
     $('.projects').html(firebaseContainer)
    
   
     $('.projectClick').bind('click', function(){
      firebaseClick($(this).attr("project"));
      })
    
      if(location.hash.replace('#','') != ''){
        console.log(location.hash.replace('#',''))
        firebaseClick(location.hash.replace('#',''));
      }
    

    
    
    $('.about').bind('click', function(){
      aboutClick();
      })
    $( ".ham" ).bind("click", function(){
      $('nav, .ham').toggleClass("show");
      if($('.ham').hasClass('show')){
        $('.ham .material-icons').html('&#xE14C;')
      }else{
        $('.ham .material-icons').html('&#xE5D2;')
      }
    });
    
    $('.projectClick').mouseenter(function(){
      var isMobile = window.matchMedia("only screen and (max-width: 800px)");
      if (isMobile.matches) {
      }else{
        $('.'+$(this).attr("project")).addClass('hover');
      }
    })
    $('.projectClick').mouseleave(function(){
      var isMobile = window.matchMedia("only screen and (max-width: 800px)");
      if (isMobile.matches) {
      }else{
        $('.'+$(this).attr("project")).removeClass('hover');
      }
    })
       
    window.onscroll = function() {
      scroll()
    };   
  
  }); 
  
})
