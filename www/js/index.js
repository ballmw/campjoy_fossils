Ext.ns('App', 'App.views', 'App.cache', 'App.stores', 'App.persistence');

App.defaultAnim = Ext.is.Android ? false : 'slide';
App = new Ext.Application({
	defaultTarget : "viewport",
	name : "App",

	profiles : {
		phone : function() {
			return Ext.is.Phone;
		},
		tabletPortrait : function() {
			return Ext.is.Tablet && Ext.getOrientation() == 'portrait';
		},
		tabletLandscape : function() {
			return Ext.is.Tablet && Ext.getOrientation() == 'landscape';
		}
	},

	launch : function() {
		this.longitude = null;
		this.latitude = null;
		this.locationInitialized = false;
		console.log('on orientation:');
		console.log((( typeof window.orientation != 'undefined') && ('onorientationchange' in window)));

		console.log(window.orientation);
		console.log(Ext.getOrientation());
		this.orientation = window.orientation == 0 || window.orientation == 180 ? 'portrait' : 'landscape';
		this.orientation = Ext.getOrientation();
		//if (Ext.is.Phone){
		this.viewport = new App.PhoneApp();
		// }
		// else {
		// this.viewport = new App.WindowApp();
		// }
		for(var prop in window.specimens) {
			if(window.specimens.hasOwnProperty(prop))
				App.stores.Specimen.add(window.specimens[prop]);
		}

		this.on('profilechange', this.onProfileChange);

	},
	onProfileChange : function(profile, oldProfile) {
		console.log('change profile is ' + profile + ' was ' + oldProfile);
		if(profile === 'tabletPortrait')
			App.displayPortrait();
		else
			App.displayLandscape();
	},
	location_init : function(onLocation) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onLocation, this.location_failure);
		}
	},
	default_location_success : function(event) {
		App.longitude = event.coords.longitude;
		App.latitude = event.coords.latitude;
		App.locationInitialized = true;
	},
	location_failure : function(event) {
		console.log("Couldn't determine location.");
	},
	displayLandscape : function() {

		console.log("landscape : width:" + window.innerWidth + " height:" + window.innerHeight);
		App.orientation = 'landscape';
		App.viewport.displayLandscape();
	},
	displayPortrait : function() {

		console.log("portrait : width:" + window.innerWidth + " height:" + window.innerHeight);
		App.orientation = 'portrait';
		App.viewport.displayPortrait();
	}
});
