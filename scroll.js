

function scrolltwo() {

  var windowHeight = $(window).height();
  // Get the offset position of the navbar

  var logoScroll = windowHeight*.05
  var scrollTop = $('.secondaryLoad').scrollTop()

    var isMobile = window.matchMedia("only screen and (max-width: 800px)");
  if (isMobile.matches) {
    // $(".yeehover").css({"margin-top": "-.4em","transition":".25s"});        
  }else{
    if((scrollTop/logoScroll)< 1 ){
      var ratio = scrollTop/logoScroll
      // console.log(ratio)
      $(".yeehover").css("margin-top", -0.8+ratio*0.4+"em");
    }
    if((scrollTop/logoScroll) >= 1 ){
      $(".yeehover").css("margin-top", "-.4em");
    }
  }
}



// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scroll() {

  var header = document.querySelector("nav");
  var heroHeight = $('.hero').height();

  // Get the offset position of the navbar
  var sticky = heroHeight
  // console.log(sticky)

  var logoScroll = heroHeight*.45


  var isMobile = window.matchMedia("only screen and (max-width: 800px)");
  if (isMobile.matches) {
    if((window.pageYOffset)< .1 ){
      $(".hero .yeeshadow").css({"margin-top": "-.8em","transition":".25s"});
    }else{
      $(".hero .yeeshadow").css({"margin-top": "-.4em","transition":".25s"});
    }

  }else{
    var scrollRatio = (window.pageYOffset-$(window).height()*0.7)/($(document).height()-$(window).height()*1.7);
    console.log(scrollRatio)
    
    document.querySelector('nav .line').style.height = "calc("+scrollRatio*100+"% - 0.5vw)"
    // $("nav .line").css("height","calc("+scrollRatio*100+"% - 0.5vw)");
    
    if((window.pageYOffset/logoScroll)< 1 ){
    var ratio = window.pageYOffset/logoScroll
    var color = ratio*255
    var colorFixed = color.toFixed(0)
    var opacity = 1-ratio*0.91
    var opacity2 = 1-ratio*0.8
    var opacityFixed = opacity.toFixed(4)
    var opacityFixed2 = opacity2.toFixed(4)
    $(".hero .yeeshadow").css("margin-top", -0.8+ratio*0.8+"em");
    $(".hero").css("opacity",opacityFixed);
    // $(".hero span").css("opacity",opacityFixed2);
    // $(".red").css("color", "rgb(0,0,"+colorFixed+")");
  }
  if((window.pageYOffset/logoScroll) >= 1 ){
    $(".hero .yeeshadow").css("margin-top", "0em");
    // $(".red").css("color", "rgb(0,0,255)");
    $(".hero").css("opacity","0.09");

  }
  // if (window.pageYOffset >= sticky) {
  //   header.classList.add("sticky"); 
  // } else {
  //   header.classList.remove("sticky");
  // }
  }

};


