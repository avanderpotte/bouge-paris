function iconSvg(){
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      name: '@name'
    },
    link: function(scope, element, attrs) {
        scope.contentUrl = 'app/directives/icon/templates/' + attrs.name + 'Template.html';
        attrs.$observe("name",function(v){
            scope.contentUrl = 'app/directives/icon/templates/' + v + 'Template.html';
        });
    },
    template: '<div ng-include="contentUrl"></div>'
  }
}

angular
  .module('datavizApp')
  .directive('iconSvg', iconSvg);
