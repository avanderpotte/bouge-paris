/**
 * [accueilCtrl accueil controller]
 * @param  {[object]} $scope     [current scope]
 * @param  {[object]} $state     [ui router instance]
 * @param  {[function]} arrFac     [factory which deliver data]
 * @param  {[object]} $rootScope [application scope]
 */
function accueilCtrl($scope, $state, arrFac, $rootScope){

  // GET ALL ARRONDISSEMENTS DATA
  var allData = arrFac.getData();
  allData.then(function(data){
    // CALCULATE THE SCORE AND GET THE TYPE OF EACH ARRONDISSEMENT
    for(var i = 1; i <= 20; i++){
      var m = data[i].musees.length;
      var c = data[i].cinemas.length;
      var e = data[i].evenements.length;
      var score = m + c + e;
      var cl = getType(m, c, e);
      document.getElementById('arr'+i).classList.add(cl);
    }
  });

  // ADD CLICK EVENT LISTNER ON EACH ARRONDISSEMENT PATH
  var gs = document.querySelectorAll('g');
  for(var k = 0; k < gs.length; k++){
    gs[k].addEventListener('click', function(e){
      t = e.target.parentNode;
      id = t.id;
      arr = id.substring(3, id.length);
      type = t.classList[0];
      $rootScope.type = type;
      $state.go('arrondissement', {numero: arr})
    });
  }

  // CLICK FUNCTION TO PUT FORWARD CHOSEN ELEMENTS
  $scope.filter = function($event){
    var lis = document.querySelectorAll('.legend li');
    if($event.target.classList.contains('active')){
      // REMOVE ACTIVE
      for(r = 0; r < lis.length; r++){
        lis[r].classList.remove('active');
      }

      // SET OPACITY TO A FOR ALL
      var gAll = document.querySelectorAll('g');
      for( var j = 0; j < gAll.length; j++){
        var current = gAll[j];
        current.style.opacity = "1";
      }
    } else {
      // REMOVE ACTIVE
      for(r = 0; r < lis.length; r++){
        lis[r].classList.remove('active');
      }

      $event.target.classList.add('active');

      // SET OPACITY TO 0.3 FOR THE OTHERS
      var gAll = document.querySelectorAll('g');
      for( var j = 0; j < gAll.length; j++){
        var current = gAll[j];
        current.style.opacity = "0.2";
      }

      // OPACITY FOR CHOSEN ELEMENTS
      var f = $event.target.classList[0];
      var g = document.querySelectorAll('g.'+f);
      for( var k = 0; k < g.length; k++){
        var current = g[k];
        current.style.opacity = "1";
      }
    }
  }
}

angular
  .module('datavizApp')
  .controller('accueilCtrl', accueilCtrl)
