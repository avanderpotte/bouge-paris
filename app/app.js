angular.module('datavizApp', ['ui.router','ngAnimate','ngMap']);

// ------------------- CONFIG -------------------
  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $sceDelegateProvider){
    // ----- ROUTING -----
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('accueil', {
        url: "/",
        templateUrl: 'app/views/accueil.html',
        controller: 'accueilCtrl',
        seo: {
          title: 'Accueil',
          description: ''
        }
      })
      .state('arrondissement', {
        url: "/arrondissement/:numero",
        templateUrl: 'app/views/arrondissement.html',
        controller: 'arrCtrl',
        seo: {
          title: 'Arrondissement',
          description: ''
        }
      })
      .state('statistiques', {
        url: "/statistiques",
        templateUrl: 'app/views/statistiques.html',
        controller: 'statsCtrl',
        seo: {
          title: 'Statistiques',
          description: ''
        }
      });

    // ----- HTTP HEADERS -----
    // $httpProvider.defaults.headers.common['IniRequestAjax'] = 'angular request';
    // $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    // $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    // $httpProvider.defaults.useXDomain = true;

    // ----- URL WHITELIST -----
    // $sceDelegateProvider.resourceUrlWhitelist(['self','http://adrien-vanderpotte.net/**']);

    // ----- HASHBANG -----
    // $locationProvider.html5Mode(true);
  }

  function state($rootScope, $location, $state, $timeout){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $rootScope.title = toState.seo.title;
      $rootScope.description = toState.seo.description;
    });
  }

  angular
    .module('datavizApp')
    .config(config)
    .run(state);
