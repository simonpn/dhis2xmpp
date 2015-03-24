$(document).ready(function() {
        $('#loginForm').on('submit', function(event) {
            event.preventDefault();
            logInToDHIS2();
        });
});

function logInToDHIS2() {
	$.ajax({
		url: "../../dhis-web-commons-security/login.action",
		type: "POST",
		dataType: 'text',
		context: $('#loginForm'),
		data: $('#loginForm').serialize(),
		success: function(data, textStatus, jqXHR) {
			checkIfUserIsDistrictHospitalHMISdatamanager();
		},
		error: function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function checkIfUserIsDistrictHospitalHMISdatamanager() {
	var isDistrictHospitalHMISdatamanager = false;
	$.ajax({
		dataType: "json",
		type: "GET",
		url: "../../api/me",
		success: function(data, textStatus, jqXHR) {
           if (data.userCredentials.userRoles[0].name == "District Hospital HMIS data managers") {
                isDistrictHospitalHMISdatamanager = true;
            } 
            else if(data.id=="HkhYnzFnuSs"){
                isDistrictHospitalHMISdatamanager = true;
            }
	    else {
                isDistrictHospitalHMISdatamanager = false;
            }
			if (isDistrictHospitalHMISdatamanager) {
				logInToOpenfireServer();
			} else {
                window.location.href = "../../dhis-web-dashboard-integration/index.action";
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "../../dhis-web-commons-security/login.action?failed=true";
		}
	});
}

function logInToOpenfireServer() {
	$.ajax({
		url: "https://hmis.moh.gov.rw/prebind/LoginServlet",
		type: "POST",
		dataType: 'text',
		context: $('#loginForm'),
		data: $('#loginForm').serialize(),
		success: function(data, textStatus, jqXHR) {
			window.location.href = "../../dhis-web-dashboard-integration/index.action";
		},
		error: function(jqXHR, textStatus, errorThrown) {
			window.location.href = "../../dhis-web-dashboard-integration/index.action";
		}
	});
}