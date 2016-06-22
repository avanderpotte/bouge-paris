function creditsOverlay(){
  return {
    restrict: 'E',
    replace: 'true',
    templateUrl: 'app/directives/credits/creditsTemplate.html',
    link: function($scope, element, attrs){
    }
  }
}

angular
  .module('datavizApp')
  .directive('creditsOverlay', creditsOverlay);
