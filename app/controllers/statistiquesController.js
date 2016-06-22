/**
 * [statsCtrl statistiques controller]
 * @param  {[object]} $scope     [current scope]
 * @param  {[function]} arrFac     [factory which deliver data]
 * @param  {[object]} $rootScope [application scope]
 */
function statsCtrl($scope, arrFac, $rootScope){
  var arrData = [];
  var chart = document.querySelector('.ct-chart');
  var cWidth = chart.offsetWidth;
  var cHeight = chart.offsetHeight;
  var barWidth = (cWidth - 190) / 20;

  // GET ALL ARRONDISSEMENTS DATA
  var allData = arrFac.getData();
  allData.then(function(data){
    var labels = [];
    var series = [];
    var mArr = [];
    var cArr = [];
    var eArr = [];
    var clArr = [];
    // LOOP TO FILL ARRAYS
    for(var i = 1; i <= 20; i++){
      labels.push(''+i+'');
      var m = data[i].musees.length > 0 ? data[i].musees.length : 0;
      var c = data[i].cinemas.length > 0 ? data[i].cinemas.length : 0;
      var e = data[i].evenements.length > 0 ? data[i].evenements.length : 0;
      var score = m + c + e;
      var cl = getType(m, c, e);
      clArr.push(cl);
      mArr.push({
        meta: 'Musées : ',
        value: m
      });
      cArr.push({
        meta: 'Cinémas : ',
        value: c
      });
      eArr.push({
        meta: 'Événements : ',
        value: e
      });
    }
    series.push(mArr, cArr, eArr);

    // CREATE STACKED BAR CHAR
    new Chartist.Bar('.ct-chart', {
      labels: labels,
      series: series
    }, {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return Math.ceil(value);
        }
      },
      plugins: [
        Chartist.plugins.tooltip({
          appendToBody: true
        })
      ]
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: '+barWidth+'px'
        });
        data.element._node.classList.add(clArr[data.index], 'n-'+(data.index+1));
      }
    });

    // CLICK FUNCTION TO PUT FORWARD CHOSEN ELEMENTS
    $scope.filter = function($event){
      var lis = document.querySelectorAll('.legend li');

      if($event.target.classList.contains('active')){
        // REMOVE ACTIVE
        for(r = 0; r < lis.length; r++){
          lis[r].classList.remove('active');
        }

        // SET OPACITY TO 1 FOR ALL
        var lAll = document.querySelectorAll('line');
        for( var j = 0; j < lAll.length; j++){
          var current = lAll[j];
          current.style.opacity = "1";
        }
      } else {
        // REMOVE ACTIVE
        for(r = 0; r < lis.length; r++){
          lis[r].classList.remove('active');
        }

        $event.target.classList.add('active');
        // SET OPACITY TO 0.3 FOR THE OTHERS
        var lAll = document.querySelectorAll('line');
        for( var j = 0; j < lAll.length; j++){
          var current = lAll[j];
          current.style.opacity = "0.2";
          current.classList.add('off');
        }

        // OPACITY FOR CHOSEN ELEMENTS
        var f = $event.target.classList[0];
        var l = document.querySelectorAll('line.'+f);
        for( var k = 0; k < l.length; k++){
          var current = l[k];
          current.style.opacity = "1";
          current.classList.remove('off');
        }
      }
    }

    // LINE HOVER DECOMPOSITION EFFECT
    document.querySelector('.ct-chart').addEventListener('mousemove', function(e){
      if(e.target.nodeName === 'line' && e.target.classList[0] === 'ct-bar'){
        if(document.querySelector('.l-1')) document.querySelector('.l-1').classList.remove('l-1');
        if(document.querySelector('.l-2')) document.querySelector('.l-2').classList.remove('l-2');
        if(document.querySelector('.l-3')) document.querySelector('.l-3').classList.remove('l-3');
        classes = e.target.classList;
        arr = classes[2].substring(2, classes[2].length);
        lines = document.getElementsByClassName(classes[2]);
        for(var d = 0; d < lines.length; d++){
          lines[d].classList.add('l-'+(d+1));
        }
      }
    });
    document.querySelector('.ct-chart').addEventListener('mouseleave', function(e){
      if(document.querySelector('.l-1')) document.querySelector('.l-1').classList.remove('l-1');
      if(document.querySelector('.l-2')) document.querySelector('.l-2').classList.remove('l-2');
      if(document.querySelector('.l-3')) document.querySelector('.l-3').classList.remove('l-3');
    });
  });
}

angular
  .module('datavizApp')
  .controller('statsCtrl', statsCtrl)
