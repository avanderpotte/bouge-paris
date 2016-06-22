function navTop(){
  return {
    restrict: 'E',
    replace: 'true',
    templateUrl: 'app/directives/nav/navTemplate.html',
    link: function($scope, element, attrs){
    }
  }
}

angular
  .module('datavizApp')
  .directive('navTop', navTop);
