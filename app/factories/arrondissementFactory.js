/**
 * [arrFac deliver data about arrondissements]
 * @param  {[function]} $http [allow ajax call]
 * @param  {[function]} $q    [implementation of promises/deferred objects]
 * @return {[object]}       [asked data]
 */
function arrFac($http, $q){
  var Factory = {
    getData: function(){
      var defer = $q.defer();
      $http.get('app/data/data.json')
        .success(function(data, status){
          defer.resolve(data);
        })
        .error(function(data, status){
          defer.reject(data);
        });
      return defer.promise;
    },

    getArrData: function(num){
      var defer = $q.defer();
      $http.get('app/data/data.json')
        .success(function(data, status){
          defer.resolve(data[num]);
        })
        .error(function(data, status){
          defer.reject(data);
        });
      return defer.promise;
    }
  }
  return Factory;
};

angular
  .module('datavizApp')
  .factory('arrFac', arrFac);
