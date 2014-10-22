'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Socketclient',
	function($scope, Authentication, Socketclient) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.data={};

$scope.islogged = Authentication.user !== '';


console.log(Authentication);
$scope.submit= function(){
//$scope.data.input1= $scope.data.input1+'from click';



Socketclient.emit('clickhandler',$scope.data);

};

	}
]);