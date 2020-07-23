// Get value for a query string parameter key
$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^&#]*)").exec(window.location.href);return null==e?null:e[1]||""};

// Update the query string parameter with new value
function updateURLParameter(t,e,r){var a="",l=t.split("?"),n=l[0],o=l[1],p="";if(o)for(l=o.split("&"),i=0;i<l.length;i++)l[i].split("=")[0].toLowerCase()!=e&&(a+=p+l[i],p="&");return n+"?"+a+(p+""+e+"="+r)}

// Remove param from query string
function removeURLParameter(e,r){var t="",o=e.split("?"),a=o[0],l=o[1],n="";if(l)for(o=l.split("&"),i=0;i<o.length;i++)o[i].split("=")[0].toLowerCase()!=r&&(t+=n+o[i],n="&");return a+"?"+t}

// Default values
var jCmpId; var rCmpId; var urlLoc = window.location.pathname.split('/')[1]; 
var tc_tm_version = urlLoc; var tc_hpc = window.location.host;
var queryStr = "", joinLink = "/member-join-clean/", joinSpanish = "https://appsec.aarp.org/mem/join", renewLink = "https://appsec.aarp.org/mem/renew",
    qStrLower = new Array, kcToRm = new Array("keycode", "jkc", "rkc"),
    joinCmpid = new Array("jkc", "campaignid", "keycode"), renewCmpid = new Array("rkc", "campaignid", "keycode");
	
// Fetch the tc_tm_version value till tc_hpc
var tcTmVersionVal;
tcTmVersionVal = window.location.search.match("tc_tm_version=(.*)&tc_");
if(tcTmVersionVal == null) { tcTmVersionVal = window.location.search.match("tc_tm_version=(.*)");}

// Expereince based default campaignid assignment
if(urlLoc.match(/^sem-|-sem-|-sem$/)){ jCmpId = "UDFLTTCP"; rCmpId = "ZDFLTTCP"; }
else if(urlLoc.match(/^soc-|-soc-|-soc$/)) { jCmpId = "UDFLTTCS"; rCmpId = "ZDFLTTCS"; }
else if(urlLoc.match(/^dis-|-dis-|-dis$/)) { jCmpId = "UDFLTTCD"; rCmpId = "ZDFLTTCD"; }
else { jCmpId = "UDFLTTC"; rCmpId = "ZDFLTTC"; }

// Only for flue expereince name - Join link to appsec cart
if(urlLoc.match(/^flue-|-flue-|-flue$/)){ joinLink = "https://appsec.aarp.org/mem/join" }

// Expereince based default campaignid assignment
var domainName = window.location.hostname;
if( (domainName=="info-aarp-org-preview.cms.targetclose.com" || domainName=="info-aarp-org.stage.targetclose.com" ||  
    domainName=="info.aarp.org") ||  urlLoc.match(/^flue-|-flue-|-flue$/) || urlLoc.match(/^fluecpa-|-fluecpa-|-fluecpa$/)) { 
    jCmpId = "ULGC059"; rCmpId = "ULGC059"; 
}

$(document).ready(function() {
    // Get query string
    jQuery.queryString=function(r){if(""==r)return{};for(var e={},n=0;n<r.length;++n){var t=r[n].split("=");2==t.length&&(e[t[0]]=decodeURIComponent(t[1].replace(/\\+/g," ")))}return e}(window.location.search.substr(1).split("&"));

    // Update query string parameters and prepare joina and renew links
    
    $.queryString.cmp&&(cmp=$.queryString.cmp),
	$.queryString.tc_hpc&&(tc_hpc=$.queryString.tc_hpc),
	$.each($.queryString, function(e, r) { e = e.toLowerCase(), qStrLower[e] = r }),
	$.each(joinCmpid, function(e, r) { return !qStrLower[joinCmpid[e]] || (jCmpId = qStrLower[joinCmpid[e]], !1) }),
	$.each(renewCmpid, function(e, r) { return !qStrLower[renewCmpid[e]] || (rCmpId = qStrLower[renewCmpid[e]], !1) }),
	(""!=$.urlParam("tc_tm_version") && null!=$.urlParam("tc_tm_version"))&&(tc_tm_version=tcTmVersionVal[1]), 

    // Remove keycode,jkc, rkc params from QS so that only campaignid is present
    queryStrJoin = queryStrRenew = location.search,
    $.each(kcToRm, function(e, r) {
        queryStrJoin = removeURLParameter(queryStrJoin, r),
        queryStrRenew = removeURLParameter(queryStrRenew, r)
    });

    // Update query params
    if($.queryString["cmp"]){ 
        queryStrJoin = queryStrRenew = updateURLParameter(queryStrJoin, "cmp", $.queryString["cmp"]);        
   }

	queryStrJoin = updateURLParameter(queryStrJoin, "campaignid", jCmpId),
	queryStrRenew = updateURLParameter(queryStrRenew, "campaignid", rCmpId),
    queryStrJoin = updateURLParameter(queryStrJoin, "tc_hpc", tc_hpc),
    queryStrRenew = updateURLParameter(queryStrRenew, "tc_hpc", tc_hpc),
	queryStrJoin = updateURLParameter(queryStrJoin, "tc_tm_version", tc_tm_version),
	queryStrRenew = updateURLParameter(queryStrRenew, "tc_tm_version", tc_tm_version),
	
    // Prepare and join and renew links
    prepareJoinLink(queryStrJoin); prepareRenewLink(queryStrRenew);
    assignJoinLink(joinLink, joinLinkES); assignRenewLink(renewLink, renewLinkES);
});

// Function for preparing final join and renew links and assign to CTA
function prepareJoinLink(joinQryStr) { joinLink += joinQryStr, joinLinkES = joinSpanish + "&request_locale=es" }
function prepareRenewLink(renewQryStr) { renewLink += renewQryStr, renewLinkES = renewLink + "&request_locale=es" }
function assignJoinLink(joinLink, joinLinkES) { joinLinkES = (joinLinkES === undefined) ? '' : joinLinkES; $(".joinNow").attr("href", joinLink), $(".joinES").attr("href", joinLinkES) }
function assignRenewLink(renewLink, renewLinkES) { renewLinkES = (renewLinkES === undefined) ? '' : renewLinkES; $(".renew").attr("href", renewLink), $(".renewES").attr("href", renewLinkES) }