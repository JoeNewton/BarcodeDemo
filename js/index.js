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
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function () {
        try{
            document.addEventListener('deviceready', this.onDeviceReady, false);

            var scanBtn = document.getElementById('scan');
            if (scanBtn) {
                scanBtn.addEventListener('click', this.scan, false);
            }

            var encondeBtn = document.getElementById('encode');
            if (encondeBtn) {
                encondeBtn.addEventListener('click', this.encode, false);
            }
        } catch (error) {
            alert(error);
        }
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        try{
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            if (listeningElement) {
                listeningElement.setAttribute('style', 'display:none;');
            }
            if (receivedElement) {
                receivedElement.setAttribute('style', 'display:block;');
            }

            console.log('Received Event: ' + id);
        } catch (error) {
            alert(error);
        }
    },

    scan: function () {
        try{
            console.log('scanning');
        
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (result) { 

                //alert("We got a barcode\n" + 
                //"Result: " + result.text + "\n" + 
                //"Format: " + result.format + "\n" + 
                //"Cancelled: " + result.cancelled);  

                console.log("Scanner result: \n" +
                     "text: " + result.text + "\n" +
                     "format: " + result.format + "\n" +
                     "cancelled: " + result.cancelled + "\n");
                //document.getElementById("info").innerHTML = result.text;
                console.log(result);
                /*
                if (args.format == "QR_CODE") {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }
                */
                window.open(result.text, '_system', 'location=yes');
            }, function (error) { 
                //console.log("Scanning failed: ", error); 
                alert("Scanning failed: ", error);
            } );
        } catch (error) {
            alert(error);
        }
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    },

};
