$(document).ready(function () {

	var userLogin = {
		email:"",
		password:"",
	};

	$("#loginForm").submit(function(e) {

		e.preventDefault();
		userLogin.email = $("#loginEmail").val();
		userLogin.password = $("#loginPassword").val();
		
		var tmp = JSON.parse(localStorage.getItem("users"));
		var success = false;
		var sessionID = null;
		for (var user of tmp) {
			if (user.email === userLogin.email && user.password === userLogin.password) {
				success = true;
				sessionID = user.id;
				localStorage.setItem("sessionID",JSON.stringify(sessionID));
			};
		};
		if (success) {
			alert("Login successfull");
			localStorage.setItem("previousPage", "login.html");
			window.location = "tournament.html";
		} else {
			alert("Login invalid, please try again");
		}
	});
});
