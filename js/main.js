//main.js

//define the application and pull in ngAnimate to be used
var flickrApp = angular.module('flickrApp',['ngAnimate']);
//main controller for the app
flickrApp.controller('flickrController', function($scope, $http){

	$scope.formSubmitted = false; //form not submitted when app initialized
	$scope.message = null; //no message to display when app initialized

	$scope.submitForm = function(){
		$scope.formSubmitted = true; //form has been submitted
		var tag = $scope.tag;
		searchFlickr(tag);
		console.log('Searched Flickr for: ' + tag);
	};

	function searchFlickr(tag) {
		//flickr api requirements
		var baseUrl = "https://api.flickr.com/services/rest";
        var params = {
            method: 'flickr.photos.search',
            api_key: '2c6c55ca6b5f296450ad15f1d350401b',
            tags: tag,
            format: 'json',
            nojsoncallback: 1
        }
        
        var url = baseUrl + "/?method=" + params.method + "&api_key=" + params.api_key + "&text=" + params.tags + "&format=" + params.format + "&nojsoncallback" + params.nojsoncallback;
		return $http.jsonp(url);

		$http.jsonp(url).success(function(response){
			if(response.meta.code == 200){ //200 status code tells us everything worked
				if(response.data.length > 0){ //if there is at least 1 photo found, do this...
					console.log(response.data);
					$scope.photos = response.data;
					$scope.message = "We found " + response.data.length + "photos with the " + tag + " tag.";
				}
				else { //if there are no photos found, do this...
					$scope.message = "Oh no! We couldn't find any photos tagged with " + tag +'.';
				}
			}
			else { //if we get a status code other than 200, something went wrong
				$scope.message = "Error!";
			}
		});
	};

    $scope.reset = function(){
    	console.log("Reset!");
    	$scope.formSubmitted = false;
    	$scope.message = null;
    	$scope.photos = {};
    }          
});