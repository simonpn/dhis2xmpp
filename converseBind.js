$(document).ready(function() {
    if(getCookie("sid")!=""){
        $('#header').hover(function(evt) {
            $('a[href="../dhis-web-commons-security/logout.action"]').attr("onclick", "logOut()");
            $('a[href="../dhis-web-commons-security/logout.action"]').attr("href", null);
        });
        require(['converse'], function(converse) {
            converse.initialize({
                prebind: true,
                keepalive: true,
                bosh_service_url: 'https://hmis.moh.gov.rw/http-bind/',
                jid: getCookie("jid"),
                sid: getCookie("sid"),
                rid: getCookie("rid"),
                allow_otr: false,
                allow_muc: false,
                animate: false
            });
        });
    }
});

function logOut() {
	try {
		converse.logOut();
	} catch (err) {}
	deleteCookie("sid");
	deleteCookie("jid");
	deleteCookie("rid");
	window.location = "../dhis-web-commons-security/logout.action"
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}

function deleteCookie(cname) {
        document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/hmis;";
}