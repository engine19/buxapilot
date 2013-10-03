/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
		var element = document.getElementById('deviceProperties');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                            'Device PhoneGap: ' + device.phonegap + '<br />' + 
                            'Device Platform: ' + device.platform + '<br />' + 
                            'Device UUID: '     + device.uuid     + '<br />' + 
                            'Device Version: '  + device.version  + '<br />';
							
		var networkinfo = function(){
			alert(navigator.network.connection.type);
		}
		
		function openbarcode(){
			var scanner = cordova.require("cordova/plugin/BarcodeScanner");

			scanner.scan(
				function (result) {
				  alert("We got a barcode\n" +
						"Result: " + result.text + "\n" +
						"Format: " + result.format + "\n" +
						"Cancelled: " + result.cancelled);
				}, 
				function (error) {
					alert("Scanning failed: " + error);
				}
			);
		};
		
		function getcontacts(){
			var options = new ContactFindOptions();
			options.filter=""; 
			options.multiple = true;
			var fields = ["*"];
			
			function onSuccess(contacts){
				$("#list").html('');
				$(contacts).each(function(){
					$("#list").append("<li>" + this.displayName + "</li>");
				});
			
				console.log('Found: ' + contacts.length);
			}
			
			function onError(contactError) {
				alert('onError!');
			};
			
			navigator.contacts.find(fields, onSuccess, onError, options);
		}
		
		function geolocation(){
			var onSuccess = function(position) {
				alert('Latitude: '          + position.coords.latitude          + '\n' +
					  'Longitude: '         + position.coords.longitude         + '\n' +
					  'Altitude: '          + position.coords.altitude          + '\n' +
					  'Accuracy: '          + position.coords.accuracy          + '\n' +
					  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
					  'Heading: '           + position.coords.heading           + '\n' +
					  'Speed: '             + position.coords.speed             + '\n' +
					  'Timestamp: '         + position.timestamp                + '\n');
			};

			// onError Callback receives a PositionError object
			//
			function onError(error) {
				alert('code: '    + error.code    + '\n' +
					  'message: ' + error.message + '\n');
			}

			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
		
		$('form').submit(function(){
			$.ajax({
				type: 'POST',
				data: { userid: $("#userid").val() },
				url: 'https://www.buxa.eu/Buxa.api/Api/User',
				success: function(data){
					console.log(data);
					alert(JSON.stringify(data));
				},
				error: function(){
					console.log(data);
					alert('There was an error...');
				}
			});
			
			return false;
		});
    }
};
