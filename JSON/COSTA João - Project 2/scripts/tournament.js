
$(document).ready(function() {
	var sessionID = localStorage.getItem("sessionID");
	//variable to check if there is data in the page to save
	var dataShown = false;
	
	console.log(sessionID);
	if (sessionID == "null" || sessionID == null) {
		alert("Error no session was found. Please make sure you logged in!");
		window.location = "login.html";
	} else {
		$("#userEmail").text("User: " + JSON.parse(localStorage.getItem("users"))[sessionID - 1].email)
		$("#reset").click(function() {
			clear();
			populate(data, "reset");
			$(".sortable").sortable({
				helper:'clone',
				update: function(event, ui) {
					updatePlaceNum();
					updateRo16();
					$(".ro8-right .draggable, .ro8-left .draggable, .ro4-left .draggable, .ro4-right .draggable, .ro2 .draggable").text("");
					$("#first span:nth-child(2), #second span:nth-child(2), #third span:nth-child(2)").text("");
				}
			});
			$(".draggable").draggable({
				helper: "clone",
			});
			dataShown = true;
		});

		$("#load").click(function() {
			var loadData = JSON.parse(localStorage.getItem("user"+sessionID));

			if (loadData != null) {
				clear();
				populate(loadData, "load");
				$(".sortable").sortable({
					helper:"clone",
					update: function(event, ui) {
						updatePlaceNum();
						updateRo16();
						$(".ro8-right .draggable, .ro8-left .draggable, .ro4-left .draggable, .ro4-right .draggable, .ro2 .draggable").text("");
						$("#first span:nth-child(2), #second span:nth-child(2), #third span:nth-child(2)").text("");
					}
				});
				$(".draggable").draggable({
					helper: "clone",
				});
				setDroppables();
				dataShown = true;
			} else {
				alert("You don't have saved data!");
			};
		});

		$("#save").click(function() {
			var saveData = localStorage.getItem("user" + sessionID);
			if (saveData != null && dataShown) {
				alert("Your saved data will be overwritten!");
				localStorage.setItem("user" + sessionID, updateSaveData(JSON.parse(saveData)));
			} else if (dataShown) {
				localStorage.setItem("user" + sessionID, JSON.stringify(data));
				saveData = JSON.parse(localStorage.getItem("user" + sessionID));
				localStorage.setItem("user" + sessionID, updateSaveData(saveData));
			} else if (!dataShown) {
				alert("There is no data to save! Please load or reset data.");
			};
		});

		$("#logout").click(function() {
			sessionID = null;
			localStorage.setItem("sessionID", sessionID);
			window.location = "login.html";
		});
	};
});

function updateSaveData(data) {
	//update groups stage
	$.each(data.groups, function(index, group) {
		//get the current group
		var id = "#" + group.groupID;
		//update the current group's teams with the values on the page
		group.team1 = +$(id).find(".place:nth-child(1) span:nth-child(2)").attr("title").match(/\d/g).join("");
		group.team2 = +$(id).find(".place:nth-child(2) span:nth-child(2)").attr("title").match(/\d/g).join("");
		group.team3 = +$(id).find(".place:nth-child(3) span:nth-child(2)").attr("title").match(/\d/g).join("");
		group.team4 = +$(id).find(".place:nth-child(4) span:nth-child(2)").attr("title").match(/\d/g).join("");
	});

	//update elimination stage
	$(".match").each(function(index, element) {
		//select the correct elimination stage through CSS selectors
		if ($(this).parents().hasClass("ro16-left") || $(this).parents().hasClass("ro16-right")) {
			//update the current match's teams with the values on the page
			data.ro16[$(this).attr("id")].team1 = +$(this).find(".team1 span").attr("title").match(/\d/g).join("");
			data.ro16[$(this).attr("id")].team2 = +$(this).find(".team2 span").attr("title").match(/\d/g).join("");
			
		} else if ($(this).parents().hasClass("ro8-left") || $(this).parents().hasClass("ro8-right")) {
			//update the current match's teams with the values on the page
			data.ro8[$(this).attr("id")].team1 = ($(this).find(".team1 span").text() !== "" ) ? +$(this).find(".team1 span").attr("title").match(/\d/g).join("") : 33;
			data.ro8[$(this).attr("id")].team2 = ($(this).find(".team2 span").text() !== "" ) ? +$(this).find(".team2 span").attr("title").match(/\d/g).join("") : 33;
			
		} else if ($(this).parents().hasClass("ro4-left") || $(this).parents().hasClass("ro4-right")) {
			//update the current match's teams with the values on the page
			data.ro4[$(this).attr("id")].team1 = ($(this).find(".team1 span").text() !== "" ) ? +$(this).find(".team1 span").attr("title").match(/\d/g).join("") : 33;
			data.ro4[$(this).attr("id")].team2 = ($(this).find(".team2 span").text() !== "" ) ? +$(this).find(".team2 span").attr("title").match(/\d/g).join("") : 33;
			
		} else if ($(this).parents().hasClass("ro2")) {
			//update the current match's teams with the values on the page
			data.ro2[$(this).attr("id")].team1 = ($(this).find(".team1 span").text() !== "" ) ? +$(this).find(".team1 span").attr("title").match(/\d/g).join("") : 33;
			data.ro2[$(this).attr("id")].team2 = ($(this).find(".team2 span").text() !== "" ) ? +$(this).find(".team2 span").attr("title").match(/\d/g).join("") : 33;
			
		};
	});

	//update podium
	if ($("#first").find("span:nth-child(2)")[0].hasAttribute("title") && $("#first").find("span:nth-child(2)").attr("title") != "teamplaceholder") {
		data.podium.first = +$("#first").find("span:nth-child(2)").attr("title").match(/\d/g).join("");
	} else {
		data.podium.first = 33;
	};

	if ($("#second").find("span:nth-child(2)")[0].hasAttribute("title") && $("#second").find("span:nth-child(2)").attr("title") != "teamplaceholder") {
		data.podium.second = +$("#second").find("span:nth-child(2)").attr("title").match(/\d/g).join("");
	} else {
		data.podium.second = 33;
	};

	if ($("#third").find("span:nth-child(2)")[0].hasAttribute("title") && $("#third").find("span:nth-child(2)").attr("title") != "teamplaceholder") {
		data.podium.third = +$("#third").find("span:nth-child(2)").attr("title").match(/\d/g).join("");
	} else {
		data.podium.third = 33;
	};

	return JSON.stringify(data);
};

function createGroup(group) {
	// html template for creating each group
    return `
        <div class="group" id="${group.groupID}">
			<div class="groupHeader">${group.groupName}</div>
			<div class="sortable">
				<div class="place">
					<span>1</span>
					<span title="team${teams[group.team1 - 1].id}">
						${teams[group.team1 - 1].name}
					</span>	
				</div>
				<div class="place">
					<span>2</span>
					<span title="team${teams[group.team2 - 1].id}">
						${teams[group.team2 - 1].name}
					</span>
				</div>
				<div class="place">
					<span>3</span>
					<span title="team${teams[group.team3 - 1].id}">
						${teams[group.team3 - 1].name}
					</span>
				</div>
				<div class="place">
					<span>4</span>
					<span title="team${teams[group.team4 - 1].id}">
						${teams[group.team4 - 1].name}
					</span>
				</div>
			</div>
		</div>
    	`;
};

function createMatch(match, matchTeams) {
	// html template for creating each elimination match
	return `
		<div>
			<span class="matchNum">Match ${match.match(/\d/g).join("")}</span>
			<div class="match" id="${match}">
				<div class="team1">
					<span title= "team${teams[matchTeams.team1 - 1].id}" class="draggable">${teams[matchTeams.team1 - 1].name}</span>
				</div>
				<div class="team2">
					<span title= "team${teams[matchTeams.team2 - 1].id}" class="draggable">${teams[matchTeams.team2 - 1].name}</span>
				</div>
			</div>
		</div>
		`;
};

// function to create the tournament structure
function populate(dataObj, mode) {
	//create groups
	$.each(dataObj.groups, function(index, group) {
		//select the correct group indexes for each side
		if (index > 3) {
			//create left side
			$(".groups-right").append(createGroup(group));
		} else {
			//create right side
			$(".groups-left").append(createGroup(group));
		};
	});

	//create ro16
	$.each(dataObj.ro16, function(match, matchTeams) {
		//select the correct ro16 matches for each side
		if (match === "match49" || match === "match50" || match === "match51" || match === "match52") {
			//create left side
			$(".ro16-left").append(createMatch(match,matchTeams));
		} else {
			//create right side
			$(".ro16-right").append(createMatch(match, matchTeams));
		};
	});

	//updateRo16
	updateRo16();

	//create ro8
	$.each(dataObj.ro8, function(match, matchTeams) {
		//select the correct ro8 matches for each side
		if (match === "match57" || match === "match58") {
			//create left side
			$(".ro8-left").append(createMatch(match,matchTeams));
		} else {
			//create right side
			$(".ro8-right").append(createMatch(match, matchTeams));
		};
	});

	//create ro4
	$.each(dataObj.ro4, function(match,matchTeams) {
		//select the correct ro4 matches for each side
		if (match === "match61") {
			//create left side
			$(".ro4-left").append(createMatch(match,matchTeams));
		} else {
			//create right side
			$(".ro4-right").append(createMatch(match, matchTeams));
		};
	});

	//create ro2
	$(".ro2").prepend(createMatch("match63", dataObj.ro2["match63"]));
	$(".ro2").prepend("<br><br>");
	
	//assign droppable classes
	setDroppables();

	$("#first span:nth-child(2)").text(teams[dataObj.podium.first - 1].name);
	$("#first span:nth-child(2)").attr("title", "team" + teams[dataObj.podium.first - 1].id);
	$("#second span:nth-child(2)").text(teams[dataObj.podium.second - 1].name);
	$("#second span:nth-child(2)").attr("title", "team" + teams[dataObj.podium.second - 1].id);
	$("#third span:nth-child(2)").text(teams[dataObj.podium.third - 1].name);
	$("#third span:nth-child(2)").attr("title", "team" + teams[dataObj.podium.third - 1].id);

	//clear the eliminations teams and podium if reseting
	if (mode === "reset") {
		$(".ro8-right .draggable, .ro8-left .draggable, .ro4-left .draggable, .ro4-right .draggable, .ro2 .draggable").text("");
		$("#first span:nth-child(2), #second span:nth-child(2), #third span:nth-child(2)").text("");
		$(".ro8-right .draggable, .ro8-left .draggable, .ro4-left .draggable, .ro4-right .draggable, .ro2 .draggable").removeAttr("title");
		$("#first span:nth-child(2), #second span:nth-child(2), #third span:nth-child(2)").removeAttr("title");
	};
};

function updateRo16() {
	$(".match").each(function(index, element) {
		switch ($(this).attr("id")) {
			case "match49":
				$(this).find(".team1 span").text($("#groupA").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupB").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupA").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupB").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match51":
				$(this).find(".team1 span").text($("#groupC").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupD").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupC").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupD").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match50":
				$(this).find(".team1 span").text($("#groupB").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupA").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupB").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupA").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match52":
				$(this).find(".team1 span").text($("#groupD").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupC").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupD").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupC").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match53":
				$(this).find(".team1 span").text($("#groupE").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupF").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupE").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupF").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match55":
				$(this).find(".team1 span").text($("#groupG").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupH").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupG").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupH").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match54":
				$(this).find(".team1 span").text($("#groupF").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupE").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupF").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupE").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
				break;
			case "match56":
				$(this).find(".team1 span").text($("#groupH").find(".place:nth-child(1) span:nth-child(2)").text());
				$(this).find(".team2 span").text($("#groupG").find(".place:nth-child(2) span:nth-child(2)").text());
				$(this).find(".team1 span").attr("title",$("#groupH").find(".place:nth-child(1) span:nth-child(2)").attr("title"));
				$(this).find(".team2 span").attr("title",$("#groupG").find(".place:nth-child(2) span:nth-child(2)").attr("title"));
		};
	});
};

function clear() {
	//html template for the base structure of the the tournament
	var template = `
		<div class="groups groups-left"></div>
		<div class="elimination">
			<div class="ro16-left"></div>
			<div class="ro8-left"></div>
			<div class="ro4-left"></div>
			<div class="ro2">
				<h2>FINALS</h2>
			</div>
			<div class="ro4-right"></div>
			<div class="ro8-right"></div>
			<div class="ro16-right"></div>
		</div>
		<div class="groups groups-right"></div>
		<div class="podium">
			<div class="stand" id="second">
				<span>2nd</span>
				<span></span>
			</div>
			<div class="stand" id="first">
				<span>1st</span>
				<span></span>
			</div>
			<div class="stand" id="third">
				<span>3rd</span>
				<span></span>
			</div>
		</div>
		`;
	$(".tournament-grid-container").empty();
	$(".tournament-grid-container").append(template);
};

function updatePlaceNum() {
	$(".place:nth-child(1) span:nth-child(1)").text("1");
	$(".place:nth-child(2) span:nth-child(1)").text("2");
	$(".place:nth-child(3) span:nth-child(1)").text("3");
	$(".place:nth-child(4) span:nth-child(1)").text("4");
}

function setDroppables() {
	$("#match57 .team1").droppable( {
		helper: "clone",
		accept: "#match49 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match61 .team1").children().text("");
				$("#match61 .team1").children().removeAttr("title");
				$("#match63 .team1").children().text("");
				$("#match63 .team1").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		},
	});
	$("#match57 .team2").droppable( {
		helper: "clone",
		accept: "#match50 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match61 .team1").children().text("");
				$("#match61 .team1").children().removeAttr("title");
				$("#match63 .team1").children().text("");
				$("#match63 .team1").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match58 .team1").droppable( {
		helper: "clone",
		accept: "#match51 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match61 .team2").children().text("");
				$("#match61 .team2").children().removeAttr("title");
				$("#match63 .team1").children().text("");
				$("#match63 .team1").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match58 .team2").droppable( {
		helper: "clone",
		accept: "#match52 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match61 .team2").children().text("");
				$("#match61 .team2").children().removeAttr("title");
				$("#match63 .team1").children().text("");
				$("#match63 .team1").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match59 .team1").droppable( {
		helper: "clone",
		accept: "#match53 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match62 .team1").children().text("");
				$("#match62 .team1").children().removeAttr("title");
				$("#match63 .team2").children().text("");
				$("#match63 .team2").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match59 .team2").droppable( {
		helper: "clone",
		accept: "#match54 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match62 .team1").children().text("");
				$("#match62 .team1").children().removeAttr("title");
				$("#match63 .team2").children().text("");
				$("#match63 .team2").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match60 .team1").droppable( {
		helper: "clone",
		accept: "#match55 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match62 .team2").children().text("");
				$("#match62 .team2").children().removeAttr("title");
				$("#match63 .team2").children().text("");
				$("#match63 .team2").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match60 .team2").droppable( {
		helper: "clone",
		accept: "#match56 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match62 .team2").children().text("");
				$("#match62 .team2").children().removeAttr("title");
				$("#match63 .team2").children().text("");
				$("#match63 .team2").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match61 .team1").droppable( {
		helper: "clone",
		accept: "#match57 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match63 .team1").children().text("");
				$("#match63 .team1").children().removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
			$(".stand").children("span:nth-child(2)").text("");
			$(".stand").children("span:nth-child(2)").removeAttr("title");
		}
	});
	$("#match61 .team2").droppable( {
		helper: "clone",
		accept: "#match58 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match63 .team1").children().text("");
				$("#match63 .team1").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match62 .team1").droppable( {
		helper: "clone",
		accept: "#match59 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match63 .team2").children().text("");
				$("#match63 .team2").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match62 .team2").droppable( {
		helper: "clone",
		accept: "#match60 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$("#match63 .team2").children().text("");
				$("#match63 .team2").children().removeAttr("title");
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match63 .team1").droppable( {
		helper: "clone",
		accept: "#match61 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#match63 .team2").droppable( {
		helper: "clone",
		accept: "#match62 span",
		drop: function(event, d) {
			if(d.draggable.attr("title") != $(this).children().attr("title") && $(this).children().text() !== "") {
				$(".stand").children("span:nth-child(2)").text("");
				$(".stand").children("span:nth-child(2)").removeAttr("title");
			};
			$(this).children().text(d.draggable.text());
			$(this).children().attr("title", d.draggable.attr("title"));
		}
	});
	$("#first").droppable( {
		helper: "clone",
		accept: "#match63 span",
		drop: function(event, d) {
			if (d.draggable.attr("title") == $("#second").children("span:nth-child(2)").attr("title")) {
				$("#second").children("span:nth-child(2)").text($("#first").children("span:nth-child(2)").text())
				$("#second").children("span:nth-child(2)").attr("title", $("#first").children("span:nth-child(2)").attr("title" ));
			};
			$(this).children("span:nth-child(2)").text(d.draggable.text());
			$(this).children("span:nth-child(2)").attr("title", d.draggable.attr("title"));	
		}
	});
	$("#second").droppable( {
		helper: "clone",
		accept: "#match63 span",
		drop: function(event, d) {
			if (d.draggable.attr("title") == $("#first").children("span:nth-child(2)").attr("title")) {
				$("#first").children("span:nth-child(2)").text($("#second").children("span:nth-child(2)").text())
				$("#first").children("span:nth-child(2)").attr("title", $("#second").children("span:nth-child(2)").attr("title" ));
			};
			$(this).children("span:nth-child(2)").text(d.draggable.text());
			$(this).children("span:nth-child(2)").attr("title", d.draggable.attr("title"));
		}
	});
	$("#third").droppable( {
		helper: "clone",
		accept: function(d) {
			if (d.parents().find("#match62")[0].hasAttribute("id")){
				if ( d.text() == $("#match63 .team1 span").text() || d.text() == $("#match63 .team2 span").text()) {
					return false;
				} else {
					return true;
				};
			} else {
				return false;
			};
		},
		drop: function(event, d) {
			$(this).children("span:nth-child(2)").text(d.draggable.text());
			$(this).children("span:nth-child(2)").attr("title", d.draggable.attr("title"));
		}
	});
};
