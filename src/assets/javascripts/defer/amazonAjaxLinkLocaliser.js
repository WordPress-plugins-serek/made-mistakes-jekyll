var amazonAffiliateTags = {
        "US":"oddoneout0a-20",
        "CA":"oddoneout0f-20",
        "DE":"oddoneout0c-21",
        "UK":"oddoneout-21",
        "ES":"oddoneout0e-21",
        "IT":"oddoneout01-21",
        "FR":"oddoneout0b-21",
        "CN":"oddoneout-23",
        "JP":"",
        "MX":"",
        "IN":"",
        "BR":""
};

var amazonAffiliateRegions = {
	"DE":"DE",      //Germany
	"AT":"DE",      //Austria
	"BE":"DE",      //Belgium
	"DK":"DE",      //Denmark
	"FI":"DE",      //Finland
	"NL":"DE",      //Netherlands
	"NO":"DE",      //Norway
	"PL":"DE",      //Poland
	"SE":"DE",      //Sweden
	"LI":"DE",      //Liechtenstein
	"LU":"DE",      //Luxembourg
	"ES":"ES",      //Spain
	"PT":"ES",      //Portugal
	"AD":"ES",      //Andorra
	"GB":"UK",      //United Kingdom
	"UK":"UK",      //United Kingdom (dummy, used since I use UK and not GB)
	"IE":"UK",      //Ireland
	"IM":"UK",      //Isle of Man
	"IT":"IT",      //Italy
	"VA":"IT",      //Holy See (Vatican City State)
	"FR":"FR",      //France
	"CA":"CA",      //Canada
	"US":"US",      //United States
	"CN":"CN",	//China
	"BR":"BR",	//Brazil
	"IN":"IN",	//India
	"MX":"MX",	//Mexico
	"DEFAULT":"US"	//If no match found above, use this country as default
};

var amazonAffiliateTLDs = {
	"DE":"de",
	"UK":"co.uk",
	"ES":"es",
	"IT":"it",
	"FR":"fr",
	"CA":"ca",
	"US":"com",
	"CN":"cn",
	"JP":"co.jp",
	"MX":"com.mx",
	"IN":"in",
	"BR":"com.br"
};

function localiseLinks(){
	(function foo(){ // wrap everything in a self-invoking function, not to expose "times"
  		times = 5; // how many times to run
  		(function run(){
        	if(typeof getCookie == 'function' && getCookie("geo_country_code") !== "") {
            	localiseAmazonLinks(getCookie("geo_country_code"));
            }
    		else if( --times ) {
            	setTimeout(run, 500);
			}
			else {
				localiseAmazonLinks("US");
			}
  		})();
	})();
}

function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
                return uri + separator + key + "=" + value;
        }
}

function localiseAmazonLinks(countryCode){
        //If no country code found, leave the links alone
	if(countryCode){
		var region = mapCountryCodesToAmazonRegion(countryCode);
		var tld = mapRegionToTLD(region);
                var els = document.querySelectorAll("a[href*='://www.amazon.']");
                var asinRegex = RegExp("([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");

                for (var i = 0, l = els.length; i < l; i++) {
                        var el = els[i];
                        //Lets first make sure the rel=nofollow attribute is set for SEO purposes
                        el.setAttribute("rel", "nofollow");

                        //Then get the data
                        var amazonData = el.getAttribute("data-amazon-asin");

			//var region = mapCountryCodesToAmazonRegion(countryCode);
			var affiliateTag = mapAmazonRegionToAffiliateTag(region);

                        //Only update the link if either it is a search url or has information about ASIN numbers
                        if(el.href.indexOf('&field-keywords=') != -1 || el.href.indexOf('?field-keywords=') != -1 ){
                                //Lets change the domain and tag - useful for both direct products links with ASIN and search type links
                                //Replace domain
                                var domain = el.href.split('://', 2)[1].split('/', 1)[0];
                                el.href = el.href.replace("://" + domain, "://www.amazon." + tld);
                                //Update tag
                                el.href = updateQueryStringParameter(el.href, "tag", affiliateTag);
                        }

                        //If no amazonData, then leave link alone
                        else if(amazonData){
                                amazonDataEntry = amazonData.toUpperCase().match("\\[" + region + "\\](\\s*\\[[a-zA-Z\\.]*\\])*\\s*(\\w*)\\s*($|\\[)");
                                if(amazonDataEntry){
					//Handle ASIN
					if(amazonDataEntry[2].length == 10){
						localiseASINTypeLink(amazonDataEntry[2], el, asinRegex, affiliateTag, region);
					}
					//Handle reference to another Amazon region
					else if(amazonDataEntry[2].length == 2){
						//console.log("Ref region: " + amazonDataEntry[2]);
						var refRegion = mapCountryCodesToAmazonRegion(amazonDataEntry[2]);

						//console.log("Ref region check: " + refRegion);
						var refASIN = amazonData.toUpperCase().match("\\[" + refRegion + "\\](\\s*\\[[a-zA-Z\\.]*\\])*\\s*(\\w{10})\\s*($|\\[)");
						//console.log(refASIN);
						var refAffiliateTag = mapAmazonRegionToAffiliateTag(refRegion);
						if(refASIN && refASIN[2].length == 10){
							localiseASINTypeLink(refASIN[2], el, asinRegex, refAffiliateTag, refRegion);
						}
					}
					//TODO: Handle search fallback - remember to adjsut the regex to allow whitespaces and other characters. Remember to urlencode / decode
                                }
                        }
                }
        }
}

function localiseASINTypeLink(localisedASIN, el, asinRegex, affiliateTag, region){
	if(localisedASIN && el && asinRegex && affiliateTag && region){
        	//We should update ASIN if we can find it and we should change it
               	var currentASIN = el.href.match(asinRegex);
                //We do not always have an ASIN to replace.
                if (currentASIN) {
                	//Replace domain
                        var domain = el.href.split('://', 2)[1].split('/', 1)[0];
                        el.href = el.href.replace("://" + domain, "://www.amazon." + mapRegionToTLD(region));
                        //Update tag
                        el.href = updateQueryStringParameter(el.href, "tag", affiliateTag);
                        //Update ASIN
                       	el.href = el.href.split(currentASIN[4]).join(localisedASIN);
                }
	}
}

function mapCountryCodesToAmazonRegion(countryCode){
        if ("amazonAffiliateRegions" in window) {
                return amazonAffiliateRegions[countryCode] || amazonAffiliateRegions["DEFAULT"];
        }
}

function mapAmazonRegionToAffiliateTag(amazonRegion){
	//Global variable found - try to lookup
	if ("amazonAffiliateTags" in window && amazonAffiliateTags[amazonRegion]) {
		return amazonAffiliateTags[amazonRegion];
	}
	var baseAffiliate = "serek-eu-";
	var suffixAffiliate = "-21";
	if(["US","CA"].indexOf(amazonRegion) > -1){
		suffixAffiliate = "-20";
	}
	else if(amazonRegion == "CN"){
                suffixAffiliate = "-23";
        }
	return baseAffiliate + amazonRegion.toLowerCase() + suffixAffiliate;
}

function mapRegionToTLD(region){
        if ("amazonAffiliateTLDs" in window) {
                return amazonAffiliateTLDs[region];
        }
}
