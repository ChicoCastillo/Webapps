'use strict';

angular.module('core').factory('Socketclient', ['socketFactory',
	function(socketFactory) {
		var mySocket = socketFactory();
  mySocket.forward('clickhandler');
  mySocket.forward('getTweets');
		return mySocket;
	}
]);