/**
 * [arrCtrl arrondissement controller]
 * @param  {[object]} $stateParams [contains data passed through URL]
 * @param  {[object]} $scope       [current scope]
 * @param  {[object]} $rootScope   [application scope]
 * @param  {[function]} arrFac       [factory which deliver data]
 * @param  {[object]} NgMap       [google maps directive instance]
 */
function arrCtrl($stateParams, $scope, $rootScope, arrFac, NgMap){
  // GET ARRONDISEMENT NUMBER FROM STATE PARAMS
  var num = $stateParams.numero;
  $rootScope.arrondissement = num;
  $rootScope.title += ' ' + $rootScope.arrondissement;

  // GET CURRENT ARRONDISEMENT DATA
  var arrData = arrFac.getArrData(num);
  arrData.then(function(data){
    $scope.name = data.nom;
    var cinemasCount = data.cinemas.length;
    var museesCount = data.musees.length;
    var evenementsCount = data.evenements.length;

    // GET THE SCORE = TYPE OF THE CURRENT ARRONDISSEMENT (dejante, ambiance, tranquille or calme)
    var type = getType(cinemasCount, museesCount, evenementsCount);
    $rootScope.type = type;

    // INITIALIZE INFOS
    $scope.infos = [];

    // TEST NUMBER OF DIFFERENTS ELEMENTS (1/2/3)

    // 3 ELEMENTS
    if(cinemasCount > 0 && museesCount > 0 && evenementsCount > 0){
      // PUSH CINEMAS INFOS
      var cinemasName = cinemasCount === 1 ? "cinéma" : "cinémas";
      var cinemasObj = {
        "slug" : "cinemas",
        "name" : cinemasName,
        "count" : cinemasCount
      };
      $scope.infos.push(cinemasObj);

      // PUSH MUSEES INFOS
      var museesName = museesCount === 1 ? "musée" : "musées";
      var museesObj = {
        "slug" : "musees",
        "name" : "musées",
        "count" : museesCount
      };
      $scope.infos.push(museesObj);

      // PUSH EVENEMENTS INFOS
      var evenementsName = evenementsCount === 1 ? "événement" : "événements";
      var evenementsObj = {
        "slug" : "evenements",
        "name" : evenementsName,
        "count" : evenementsCount
      };
      $scope.infos.push(evenementsObj);
      // ADD CLASS FOR LAYOUT
      document.querySelector('#arrondissement .right').classList.add('three');
    }

    // 2 ELEMENTS
    else if(cinemasCount > 0 && museesCount > 0 || cinemasCount > 0 && evenementsCount > 0 || museesCount > 0 && evenementsCount > 0){

      // TEST AND PUSH CINEMAS INFOS
      if(cinemasCount > 0){
        var cinemasName = cinemasCount === 1 ? "cinéma" : "cinémas";
        var cinemasObj = {
          "slug" : "cinemas",
          "name" : cinemasName,
          "count" : cinemasCount
        };
        $scope.infos.push(cinemasObj);
      }

      // TEST AND PUSH MUSEES INFOS
      if(museesCount > 0){
        var museesName = museesCount === 1 ? "musée" : "musées";
        var museesObj = {
          "slug" : "musees",
          "name" : "musées",
          "count" : museesCount
        };
        $scope.infos.push(museesObj);
      }

      // TEST AND PUSH EVENEMENTS INFOS
      if(evenementsCount > 0){
        var evenementsName = evenementsCount === 1 ? "événement" : "événements";
        var evenementsObj = {
          "slug" : "evenements",
          "name" : evenementsName,
          "count" : evenementsCount
        };
        $scope.infos.push(evenementsObj);
      }

      // ADD CLASS FOR LAYOUT
      document.querySelector('#arrondissement .right').classList.add('two');
    }

    // 1 ELEMENT
    else {
      // TEST AND PUSH CINEMAS INFOS
      if(cinemasCount > 0){
        var cinemasName = cinemasCount === 1 ? "cinéma" : "cinémas";
        var cinemasObj = {
          "slug" : "cinemas",
          "name" : cinemasName,
          "count" : cinemasCount
        };
        $scope.infos.push(cinemasObj);
      }

      // TEST AND PUSH MUSEES INFOS
      if(museesCount > 0){
        var museesName = museesCount === 1 ? "musée" : "musées";
        var museesObj = {
          "slug" : "musees",
          "name" : "musées",
          "count" : museesCount
        };
        $scope.infos.push(museesObj);
      }

      // TEST AND PUSH EVENEMENTS INFOS
      if(evenementsCount > 0){
        var evenementsName = evenementsCount === 1 ? "événement" : "événements";
        var evenementsObj = {
          "slug" : "evenements",
          "name" : evenementsName,
          "count" : evenementsCount
        };
        $scope.infos.push(evenementsObj);
      }

      // ADD CLASS FOR LAYOUT
      document.querySelector('#arrondissement .right').classList.add('one');
    }

    // PANEL TOGGLE
    $scope.showPanel = false;
    $scope.slidePanel = function(cat){
      $scope.showPanel = true;
      $scope.panel = cat;
      $scope.list = data[cat];
    }

    // ------------------------------------------------------------------------
    // GOOGLE MAPS
    // ------------------------------------------------------------------------

    // GOOGLE MAPS INFOS
    $scope.showMap = false;
    $scope.data = data;
    $scope.arrCenter = $scope.data.centre;

    // MUSEES POSITIONS
    $scope.museesPos = [];
    for(var i = 0; i < $scope.data.musees.length; i++){
      r = $scope.data.musees[i];
      pos = r.coord.split(',');
      $scope.museesPos.push({
        nom: r.nom,
        adresse: r.adresse,
        lat: pos[0],
        long: pos[1]
      });
    }

    // CINEMA POSITIONS
    $scope.cinemasPos = [];
    for(var j = 0; j < $scope.data.cinemas.length; j++){
      r = $scope.data.cinemas[j];
      pos = r.coord.split(',');
      $scope.cinemasPos.push({
        nom: r.nom,
        adresse: r.adresse,
        lat: pos[0],
        long: pos[1]
      });
    }

    // EVENEMNTS POSITIONS
    $scope.evenementsPos = [];
    for(var k = 0; k < $scope.data.evenements.length; k++){
      r = $scope.data.evenements[k];
      pos = r.coord.split(',');
      $scope.evenementsPos.push({
        nom: r.nom,
        adresse: r.adresse,
        lat: pos[0],
        long: pos[1]
      });
    }

    // CUSTOM STYLE FOR GOOGLE MAPS (THX SNAZZYMAPS.COM)
    var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];


    // GET MAP INSTANCE AND SET OPTIONS
    NgMap.getMap().then(function(map){
      map.setOptions({styles: styles});
      google.maps.event.trigger(map, 'resize');
    });
    $scope.$on('mapInitialized', function(event, map) {
      $scope.objMapa = map;
      map.setOptions({styles: styles});
      google.maps.event.trigger(map, 'resize');
    });

    // CLOSE MAP ON BUTTON CLICK
    $scope.toggleMap = function(){
      $scope.showMap = false;
    };

    // CREATE INFOWINDOW
    $scope.showInfoWindow = function (event, data) {
      infowindow = new google.maps.InfoWindow();
      center = new google.maps.LatLng(data.lat,data.long);

      infowindow.setContent('<h3>' + data.nom + '</h3><br>'+data.adresse);
      infowindow.setPosition(center);
      infowindow.open($scope.objMapa);

      // CUSTOM STYLE FOR INFOWINDOW
      google.maps.event.addListener(infowindow, 'domready', function() {
        iwOuter = document.querySelectorAll('.gm-style-iw');
        for(var g = 0; g < iwOuter.length; g++){
          iwBg = iwOuter[g].previousElementSibling;
          iwBg.style.display = "none";
          iwOuter[g].parentNode.parentNode.style.left = "170px";
          btn = iwOuter[g].nextElementSibling;
          btn.style.opacity = "1";
          btn.style.right = "-1px";
          btn.style.top = "-3px";
          btn.style.border = "4px solid #130084";
          btn.style.borderRadius = "50%";
        }
      });
    };
  });
}

angular
  .module('datavizApp')
  .controller('arrCtrl', arrCtrl)
