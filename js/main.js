//main.js

//define the application and pull in ngAnimate to be used
var flickrApp = angular.module('flickrApp',['ngAnimate']);

//main controller for the app
flickrApp.controller('flickrController', function($scope, $http){

	$scope.formSubmitted = false; //form not submitted when app initialized
	$scope.message = ""; //no message to display when app initialized
	$scope.results = []; //array to put our json results in
	$scope.searchingMessage = false; //boolean to show/hide searching message

	$scope.submitForm = function(){
		$scope.formSubmitted = true;
		$scope.searchingMessage = true;
		var tag = $scope.tag;
		searchFlickr(tag);
		console.log('Searched Flickr for: ' + tag);
	};

	function searchFlickr(tag) {
        $http({ //pass in the parameters required by Flickr API
        	url : "https://api.flickr.com/services/rest",
        	method: 'GET',
        	params: {
        		  method: 'flickr.photos.search',
            	api_key: '2c6c55ca6b5f296450ad15f1d350401b',
            	tags: tag,
            	format: 'json',
            	nojsoncallback: 1
        	}
        }).success(function(response){
        	console.log("Success!");
        	console.log(response);
        	$scope.results = response;
        	if(response.photos.total > 0){ //if there is at least 1 photo found, show this message...
			$scope.message = "We found " + response.photos.total + " photos with the tag " + tag + ".";
			$scope.searchingMessage = false;
			}
			else { //if there are no photos found, show this message...
			$scope.message = "Oh no! We couldn't find any photos tagged with " + tag +'.';			
			}  
        }).error(function(error){
        	console.log("Error!");
        	$scope.message = "Error!";
        });
	};

    $scope.startOver = function(){
    	$scope.message = "";
    	document.getElementById("form").reset();
    	$scope.formSubmitted = false;
    	$scope.results = [];
    	console.log("Reset!");
    }       

    //"ABOUT" button modal controls
    var modal = document.getElementById("aboutModal");
    var btn = document.getElementById("aboutButton");
    var span = document.getElementsByClassName("close")[0];

    //open the modal when user clicks the "ABOUT" button
    btn.onclick = function(){
    	modal.style.display = "block";
    }
    //close the modal when user clicks "CLOSE"
    span.onclick = function(){
    	modal.style.display = "none";
    }
    //close the modal if user clicks anywhere outside of the modal itself
    window.onclick = function(){
    	if (event.target == modal){
    		modal.style.display= "none";
    	}
    }
});

