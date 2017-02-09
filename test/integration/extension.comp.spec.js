/*global browser, protractor, $, expect*/

describe( "Extension rendering", function () {
	var EC = protractor.ExpectedConditions;
	var timeoutTime = 20000;

	//Should be fixed in default conf file
	browser.baseUrl = browser.getProcessedConfig().value_.baseUrl;

	//Selectors
	var renderedSelector = element( by.css( ".rendered" ) );
	var appAvailableSelector = element( by.css( ".appAvailable" ) );

	before( function () {
		//Saving apiKey to sessionStorage
		browser.get( "/" );
		browser.executeScript( "sessionStorage.setItem( \"apiKey\", arguments[arguments.length - 1] )", process.env.apiKey );

		//authenticate against palyground
		browser.get( "/index.html" );
		browser.executeScript( "authenticate()" );
		waitForUrlToChangeTo( /main/ );
		browser.sleep(5000); //Delay to preFetch font
	} );

	it( "should render default settings correctly", function() {
		const dataDef = [
			{ "qDef": { "qFieldDefs": ["Characters"]}, "qOtherTotalSpec": { "qOtherMode": "OTHER_COUNTED", "qOtherCounted": "5", "qSuppressOther": true }},
			{ "qDef" : { "qDef": "Count([Kills])", "qLabel": "Kills" }}
		];

		const options = {
			"title": "My own title"
		};

		browser.get( "/main.html"  );
		browser.executeScript( "addExtension(arguments)", JSON.stringify( dataDef ), JSON.stringify( options ) );

		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		//Any interaction or verification using Protractor
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( camelize( this.test.title ) );
	} );
} );

// #############################################################################
// Support functions
// #############################################################################

function waitForUrlToChangeTo( urlRegex ) {
	var currentUrl;

	return browser.getCurrentUrl().then(function storeCurrentUrl( url ) {
			currentUrl = url;
		}
	).then(function waitForUrlToChangeTo() {
			return browser.wait(function waitForUrlToChangeTo() {
				return browser.getCurrentUrl().then(function compareCurrentUrl( url ) {
					return urlRegex.test( url );
				});
			});
		}
	);
}

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return "";
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	});
}
