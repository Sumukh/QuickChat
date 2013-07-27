/**
 *! Google Chrome notification plugin - v1.0.0 - 2/6/2013
 * http://pixelbay.cz/playground/notifyg/
 * Copyright (c) 2013 Honza Hommer; Licensed MIT
 */
(function() {

	var notifyG;

	notifyG = (function() {

		/** Vars */
		var notifyGNotify = new Array();
		var notifyGBtnId = 'notifyGBtn';
		var notifyGRequested = false;
		var notifyGImage;
		var notifyGTitle;
		var notifyGContent;
		var notifyGAction;
		var notifyGTimeout;
		var notifyGTimeoutValue = 5000;

		/** Init */
		function notifyG() {
			var _this = this;
			
			window.onload = function() {
				_this.init();
			};
		}
		
		/** Add listener */
		notifyG.prototype.addListener = function(element, eventName, handler) {
			if (element.addEventListener) {
				element.addEventListener(eventName, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + eventName, handler);
			} else {
				element['on' + eventName] = handler;
			}
		}
		
		/** Create button */
		notifyG.prototype.init = function() {
			var _body = document.getElementsByTagName('body')[0];
			var _button = document.createElement('button');
				_button.id = notifyGBtnId;
				_button.setAttribute('style', 'position: absolute; left: -9999px;');
				_body.appendChild(_button);
			notifyG.prototype.addListener(document.getElementById(notifyGBtnId), 'click', notifyG.prototype.notify);
		}
		
		/** Request permission */
		notifyG.prototype.permission = function() {
			if(window.webkitNotifications && window.webkitNotifications.checkPermission() != 0 && !notifyGRequested) {;
				notifyGRequested = true;
				window.webkitNotifications.requestPermission();
			} else {
				return true;
			}
		}
		
		/** Create notification */
		notifyG.prototype.create = function(image, title, content, action) {
			notifyGImage = image;
			notifyGTitle = title;
			notifyGContent = content;
			notifyGAction = (action) ? action : null;
			document.getElementById(notifyGBtnId).click();
		}
		
		/** Notify */
		notifyG.prototype.notify = function() {
			if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
			
				// Vars
				var _int = notifyGNotify.length;
				
				// Create
				notifyGNotify[_int] = window.webkitNotifications.createNotification(notifyGImage, notifyGTitle, notifyGContent);
				
				// Show
				notifyGNotify[_int].show();
				
				// Onclick hide and open window
				notifyGNotify[_int].onclick = function(){
					if(notifyGAction) {
						notifyGAction();
					} else {
						window.focus();
					}
					this.cancel();
				};
				
				// Clear timeout
				clearTimeout(notifyGTimeout); notifyGTimeout = null;
				
				// Set timeout
				if(notifyGTimeoutValue > 0) {
					notifyGTimeout = setTimeout(function(){
						notifyGNotify[_int].cancel();
					}, notifyGTimeoutValue);
				}
				
			}
		}
		
		/** Clear notify */
		notifyG.prototype.clear = function() {
			if(notifyGNotify.length > 0) {
				for (var i = 0; i < notifyGNotify.length; i++) { 
					notifyGNotify[i].cancel();
				}
			}
		}
		
		/** Set interval */
		notifyG.prototype.timeoutValue = function(ms) {
			notifyGTimeoutValue = ms;
		}

		return notifyG;

	})();

	window.notifyG = notifyG;

}).call(this);

/** Call UI */
var notifyG = new notifyG();