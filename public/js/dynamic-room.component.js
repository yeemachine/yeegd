/**
 * Setup the Networked-Aframe scene component based on query parameters
 */

// AFRAME.registerComponent('suntime', {
//   schema: {
//     from: {type:'vec3', default: {x: 0, y: 1, z: -0.2}},
//     to: {type: 'vec3', default: {x: 0, y: 1, z: 0.2}},
//     duration: {type: 'int', default: 5000}
//   },
//   update: function(oldData){
//     this.sunPos = {x: this.data.from.x, y: this.data.from.y, z: this.data.from.z};
//     // this.moveSun();
//     this.tween = new AFRAME.TWEEN.Tween(this.sunPos).
//       to(this.data.to, this.data.duration).
//       start();
//   },
//    tick: function (t) {
//      var p = this.sunPos;
//      var angle = (Math.sin(t/10000)+1)/2;
//      // console.log(Math.sin(t/10000)+1)
//      this.el.setAttribute('environment', {lightPosition: {x: p.x, y: p.y*angle, z: p.z}});
//   // console.log(t)
//  }
// });

AFRAME.registerComponent('sunMove', {
 schema: {},
 tick: function (t) {
   var p = this.sunPos;
     var angle = (Math.sin(t/10000)+1)/2;
     // console.log(Math.sin(t/10000)+1)
     this.el.setAttribute('environment', {lightPosition: {x: 0, y: 0.01+0.2*angle, z: .3}});
 }
})

AFRAME.registerComponent('reality', {
 schema: {
     value: {default: 'vr'},
 },
  update: function(){
    // this.el.setAttribute('reality', 'vr')
  }
})

AFRAME.registerComponent('dynamic-room', {
  init: function () {
    var el = this.el;
    var params = this.getUrlParams();
    var baseURLData = ""
     $(function() {
            console.log( "ready!" );
          $.ajax({
            dataType: "json",
            url: 'https://screenshot-api.glitch.me/display?url='+params.room+'&imagename='+params.room.replace(/\//g, "_"),
            success: function(response) {
              console.log(response)
                    $('a-assets').append('<img id="website" crossorigin="anonymous" src="'+response.image+'">')
                    // $("a-sky").attr("src","#website");
                    $("#ground").attr("material","src:#website; transparent: false; metalness:0.6; roughness: 0.4; sphericalEnvMap: #sky;");
                        document.querySelector('#player').setAttribute('position', '10 50 20');
                        document.querySelector('#player').setAttribute('rotation', '-45 20 0');
                    document.querySelector('#player').removeAttribute("static-body");
                    $(".loader").fadeOut( "slow", function() {
                      $(".loader").hide();
                    });                    
              
              var image = new Image();
              image.onload = cutImageUp;
              image.src = response.image;
              
              function cutImageUp() {
                  var imagePieces = [];
                  var numColsToCut = 15;
                  var numRowsToCut = 15;
                  var widthOfOnePiece = image.width/numColsToCut;
                  var heightOfOnePiece = image.height/numRowsToCut
                  for(var x = 0; x < numColsToCut; ++x) {
                      for(var y = 0; y < numRowsToCut; ++y) {
                          var canvas = document.createElement('canvas');
                          canvas.width = widthOfOnePiece;
                          canvas.height = heightOfOnePiece;
                          var context = canvas.getContext('2d');
                          context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                          imagePieces.push(canvas.toDataURL());
                          var data = context.getImageData(0, 0, widthOfOnePiece, heightOfOnePiece).data;
                          // console.log(data)
                        
                        var rgb = {r:0,g:0,b:0,a:0}, // Set a base colour as a fallback for non-compliant browsers
                            pixelInterval = 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
                            count = 0,
                            i = -4,
                            data, length;
                           var length = data.length;
                            var i = -4
                            var pixelInterval = 5;
                            
                            while ((i += pixelInterval * 4) < length) {
                              count++;
                              rgb.r += data[i];
                              rgb.g += data[i+1];
                              rgb.b += data[i+2];
                              rgb.a += data[i+3];
                            }

                            // floor the average values to give correct rgb values (ie: round number values)
                            rgb.r = Math.floor(rgb.r/count);
                            rgb.g = Math.floor(rgb.g/count);
                            rgb.b = Math.floor(rgb.b/count);
                            rgb.a = Math.floor(rgb.b/count);
                        
                          var intensity = Math.floor((0.2125 * rgb.r) + (0.7154 * rgb.g) + (0.0721 * rgb.b));
                        
                          var scene = document.querySelector('a-scene');
                          var cube = document.createElement('a-box');
                          var primitives = ['box','sphere','cone','cylinder','dodecahedron','octahedron','tetrahedron','torus','torusKnot']
                          var randPrim = primitives[Math.floor(Math.random() * primitives.length)];
                          var sphere = document.createElement('a-'+randPrim);
                          var intensityChange = (1-(intensity/255))
                          cube.setAttribute('metalness', '0.6');
                          cube.setAttribute('material', 'color:#fff');
                          cube.setAttribute('roughness', '0.4');
                          cube.setAttribute('sphericalEnvMap', '#sky');
                          cube.setAttribute('static-body','');
                          cube.setAttribute('height', 1+intensityChange*15);
                          cube.setAttribute('width', '5');
                          cube.setAttribute('depth', '5');
                          cube.setAttribute('src', canvas.toDataURL()); 
                          cube.setAttribute('id', 'x_'+x+'y_'+y);
                          cube.setAttribute('position', {
                              x: ((x-(numColsToCut/2))*5),
                              y: (.2+ (1-(intensity/255))*15)/2,
                              z: ((y-(numRowsToCut/2))*5)
                            });
                          sphere.setAttribute('radius', '.75');
                          sphere.setAttribute('dynamic-body','');
                          sphere.setAttribute('metalness', '0.3');
                          // sphere.setAttribute('mirror','');
                          sphere.setAttribute('src', canvas.toDataURL()); 
                          sphere.setAttribute('position', {
                              x: ((x-(numColsToCut/2))*5),
                              y: (.2+ (1-(intensity/255))*15),
                              z: ((y-(numRowsToCut/2))*5)
                            });
                          cube.setAttribute('id', 'x_'+x+'y_'+y);
                          scene.appendChild(cube);
                          if(Math.round(Math.random()) === 1){
                            scene.appendChild(sphere);
                          }

                      }
                  }
                // console.log(imagePieces)
              }              
              

              },
          });
          });
    
      console.log(baseURLData)

    
    
    if (!params.room) {
      window.alert('Please add a room name in the URL, eg. ?room=myroom');
    }

    var webrtc = params.hasOwnProperty('webrtc');
    var adapter = webrtc ? 'easyrtc' : 'wseasyrtc';
    var voice = params.hasOwnProperty('voice');
    
    // Set local user's name
    var player = document.getElementById('player');
    var myNametag = player.querySelector('.nametag');
    // console.log(params.username)
    console.log(myNametag)
    if(params.username !== ""){
          // myNametag.setAttribute('text', 'value', params.username);
    }
    document.querySelector('#player .avatar').setAttribute('vr_ar', 'vr');

    // Setup networked-scene
    var networkedComp = {
      room: params.room.replace(/\//g, "-"),
      adapter: 'easyrtc',
      audio: true
    };
    console.info('Init networked-aframe with settings:', networkedComp);
    // document.querySelector('a-scene').setAttribute('networked-scene', networkedComp);
    document.querySelector('a-scene').setAttribute('environment', 'preset:starry;lightPosition:0.01 0.001 0;ground:none')
    // document.querySelector('a-scene').setAttribute('sunMove', '')


  },

  getUrlParams: function () {
    var match;
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    var query = window.location.search.substring(1);
    var urlParams = {};

    match = search.exec(query);
    while (match) {
      urlParams[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }
    return urlParams;
  }
});