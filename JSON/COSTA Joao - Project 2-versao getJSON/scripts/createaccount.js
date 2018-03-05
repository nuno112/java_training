$(document).ready(function() {
	$("#createAccount").submit(function(e) {
		e.preventDefault();
		var newAccount = {};
		var tmp = JSON.parse(localStorage.getItem("users"));
		var success = true;

		if ($("#newPassword").val() === $("#newConfirmPassword").val()) {
			if(tmp != null) {
				for (var i of tmp) {
					if (i.email === $("#newEmail").val()) {
						success = false;
						alert("Email already used");
					};
				};
			} else {
				tmp = [];
			};
		} else {
			success = false;
			alert("Passwords do not match");
		};
		if (success) {
			newAccount.id = tmp.length + 1;
			newAccount.email = $("#newEmail").val();
			newAccount.password = $("#newPassword").val();
			tmp.push(newAccount);
			localStorage.setItem("users", JSON.stringify(tmp));
			alert("Account successfully created!");
			window.close();
		} else {
			alert("Something went wrong");
		}
	});
});