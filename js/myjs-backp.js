/*$(document).bind('mouseover',function(){
						 event.preventDefault();
});

function getword(){
	$("#src1").on('mouseover','span',function() {
	alert("iam hjere");
		selected_word = $(this).text();
		alert(selected_word);
	});
}*/
var s1 = '';
var s2 = '';
var storealljobs = {
	"suggestions": {}
};
var originalobj = {};
var feedback = {
	"src": [],
	"tgt": []
};
var mtstory = {
	"src": {
		"para": []
	},
	"tgt": {
		"para": []
	},
	"tgt2": {
		"para": []
	},
	"pet": {
		"para": [],
	}
};

var trans_memory = {

};

//Called when page loads shows all jobs/
$("html, body").on("click", function() {
	//$(".synonyms").hide().remove();
});

//google search click
$(document).on("click", "li[id='lidict']", function() {
	$("#dicttab").siblings().hide();
	$("#dicttab").show();
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
	$("#limt").removeClass('active');
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();
	$("#bidict").click();
});
$(document).on("click", "li[id='limt']", function() {
	//alert("iam h ere:");
	$("#mttab").siblings().hide();
	$("#mttab").show();
	$("#lidict").removeClass('active');
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();

});
$(document).on("click", "li[id='lifb']", function() {
	if ($.inArray("10", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$("#fbtab").siblings().hide();
	$("#fbtab").show();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();
});
//concordance tab click
$(document).on("click", "li[id='licc']", function() {
	$("#cctab").siblings().hide();
	$("#cctab").show();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();
	var text = getselectedtext(current_id);
	$("#ccsrch").val(text);
	concordance_search();
});

$(document).on("click", "li[id='lits']", function() {
	$("#tstab").siblings().hide();
	$("#tstab").show();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();
});

$(document).on("click", "li[id='lisc']", function() {
	$("#sctab").siblings().hide();
	$("#sctab").show();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();
	var text = getselectedtext(current_id);
	$("#scsrch").val(text);
	spell_custom();
});
//google search click
$(document).on("click", "button[id='gsearch']", function() {
	if (current_id != "") {
		search_google(current_id);
	} else {
		alert("Select a segment");
	}
});

//google translate click
$(document).on("click", "button[id='gtrans']", function() {
	if (current_id != "") {
		translate_google(current_id);
	} else {
		alert("Select a segment");
	}
});

//toggle top menu
$(document).on("click", "button[id='menuexit']", function() {
	$(".firsttop").toggle();
	$(".fa-angle-double-up").toggleClass("fa-angle-double-down");
	triggerChange();
});

//toggle font menu 
$(document).on("click", "button[id='ftog']", function() {
	$("#fontpanel").toggle();
	triggerChange();
});

$("#save").unbind("click").on("click", function(e) {
	//saveid=this.id;
	if (current_id == "") {
		alert("Please select a segment!!");
		return false;
	}
	var saveid = current_id;
	var srcid = saveid.replace(/tgt/i, "src");
	var segid = saveid.replace(/tgt/i, "seg");
	saveid = saveid.replace(/tgt/i, "save");
	var parsent = saveid;
	saveid = saveid.replace(/save/, "tgt");
	parsent = parsent.replace(/save/, "");
	parsent = parsent.replace(/sentence/, "____");
	var paraid = parsent.split("____")[0];
	var sentid = parsent.split("____")[1];

	savesurvey(saveid, "tgt", paraid, sentid);
	tgttext = $("#" + saveid + "> #sentence" + sentid).text();

	//gotoNextSegment(current_id);
});

function saveall() {
	var msg = "SAVE INFO:Clicked save all";
	//if (impersonate_by != "") {
	insert_logs("admin", msg);
	//}
	setTimeout(function() {
		$("div[id^='tgt']").each(function() {
			//console.log(this.id);
			$.notify("Saving your data...Please Wait", {
				type: "success",
				"position": "top"
			});
			//alert(this.id);
			var id = this.id;
			var tt = id.replace(/sentence/, "____");
			tt = tt.replace(/tgt/, "");
			var pid = tt.split("____")[0];
			var sid = tt.split("____")[1];
			savesurvey(id, "tgt", pid, sid);
		});
		$(".notify").remove();
		/*		if (callback) {
					//alert("iam jere");
					callback();
				}*/
	}, 200);
}

function next_segment(curid) {
	alert(curid);
	curid = curid.replace(/sentence.*$/i, "");
	curid = curid.replace(/src/i, "");
	curid = curid.replace(/tgt/i, "");
	alert(curid);
}

var moreobj = {
	"stats": []
};
var tablejobs = '';
var user_roles = '';
//Called when page loads shows all jobs/
$("html, body").on("click", function() {
	//$(".synonyms").hide().remove();
});

function sel_langpair() {
	type = $("#url-file").val();
	if (type == "ht") {
		$("#langpair").val("eng_hin");
	} else if (type == "liveht") {
		$("#langpair").val("hin_pan");
	}
}

function loadsuggestions1() {
	loadsuggestions("system", "");
}

function loadsuggestions2() {
	loadsuggestions("user", "domain");
}

$("#jobclose").on("click", function() {
	$("#demo").html("");
	$("#final").html("");
	$("#created").html("");
	$("#updated").html("");
	$("#jobclose").hide();
});

/*$('input[type="checkbox"]').on("click", function() {
	if (this.id == "srchpetuns") {
		if ($('#' + this.id).is(":checked")) {
			petuns = 1;
		} else {
			petuns = 0;
		}
	} else if (this.id == "srchrevuns") {
		if ($('#' + this.id).is(":checked")) {
			revuns = 1;
		} else {
			revuns = 0;
		}
	}
	showpetjobs(1);
	$('#pagination').twbsPagination('destroy');
});*/

$("#stats").on("click", function() {
	$(document).attr("title", "eBhashaLSP | Manager | Stats View");
	$("#advSearchManagersContainer").hide();
	$("#taskname").html("");
	$("#reworkfilterdiv").hide();
	$('#startdate,#todate').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		todayHighlight: true
	});
	//$("#jobstable").hide();
	$("#pajination").hide();
	$("#jumpdiv").hide();

	$(".goback").hide();
	var editor_users = '';
	/*    for (var n = 0; n < user_roles.users.length; n++) {
			var fuser = user_roles.users[n].user;
			var fname = user_roles.users[n].fname;
			var emailid = user_roles.users[n].EmailId;
			var lname = user_roles.users[n].lname;
			//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
		//console.log(editor_users);
		$("#statsuser").html(editor_users);*/
	if (role == "admin") {
		$("#statsuser").append('<option value="all">ALL USERS</option>');
	}

	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$("#upload").hide();
	$("#jobpanel").show();
	$("#filterbar").hide();
	$("#storytoolbar").hide();
	$(".bottomdiv").hide();
	$("#demo").html("");

	$('#pagination').twbsPagination('destroy');
	$("#statsdiv").show();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$("#jobstable").hide();
	$("#userjobstatsdiv").hide();
	$("#createuser").hide();
	$("#searchuser").hide();
	//alert(crole);
	if (crole == "admin") {
		get_allClients();
		get_Projects();
	} else {
		get_clients();
	}
	//getStats("");
});

//user stats click
$("#userjobstats").on("click", function() {
	$(document).attr("title", "eBhashaLSP | Manager | User Stats View");
	$("#taskname").html("");
	$("#reworkfilterdiv").hide();
	$("#pajination").hide();
	$("#jumpdiv").hide();

	$(".goback").hide();
	var editor_users = '';
	/*    for (var n = 0; n < user_roles.users.length; n++) {
			var fuser = user_roles.users[n].user;
			var fname = user_roles.users[n].fname;
			var emailid = user_roles.users[n].EmailId;
			var lname = user_roles.users[n].lname;
			//console.log(fname);
			//console.log(lname);
			//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
			//editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
		//console.log(editor_users);
		$("#statsuser2").html(editor_users);*/
	//    $("#loguser").html(editor_users);
	// if (role == "admin") {
	//   $("#statsuser2").append('<option value="all">ALL USERS</option>');
	// }

	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#jobpanel").show();
	$("#filterbar").hide();
	$("#storytoolbar").hide();
	$(".bottomdiv").hide();
	$("#demo").html("");

	$('#pagination').twbsPagination('destroy');
	$("#userjobstatsdiv").show();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$("#jobstable").hide();
	$("#createuser").hide();
	$("#searchuser").hide();
	//getStats("");
});

function getStats(date) {
	var statstext = '<!--<input placeholder="Search by date" data-provide="datepicker">--><div class="container"><table style="margin-top:3.5%;" class="table table-striped table-bordered dt-responsive nowrap"><thead><tr><td style="width:30%;">Paramerter</td><td>Count</td></tr></thead><tr><td>Total Jobs created</td><td>' + total + '</td></tr>';
	statstext += '</div>';

	//PET finished rest call
	var petcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_postedit_status=finished",
		datatype: "json"
	})
	petcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Post Edit Finished</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});

	//Rev finished rest call
	var revcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_review_status=finished",
		datatype: "json"
	})
	revcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Review Finsihed</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//Under postedit
	var petcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_postedit_status=under_postedit",
		datatype: "json"
	})
	petcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Under Post Edit</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//Rev under edit
	var revcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_review_status=under_review",
		datatype: "json"
	});
	revcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Under Review</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//postedit yet to start
	var petcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_postedit_status=submitted",
		datatype: "json"
	})
	petcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Post Edit yet to start</td><td>' + count + '</td></tr>';

		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//review yet to start
	var petcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_review_status=submitted&search_postedit_status=finished",
		datatype: "json"
	})
	petcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Review yet to Start</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//postedit yet to assign
	var petcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_postedit_status=unassigned",
		datatype: "json"
	})
	petcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Post edit yet to assign</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//Review yet to assign
	var revcon = $.ajax({
		type: "POST",
		url: config.getAdminStats,
		async: false,
		data: "user=" + user + "&search_user=" + user + "&search_review_status=available_to_review",
		datatype: "json"
	});
	revcon.done(function(data) {
		var count = data.noOfRecords;
		if (typeof count == "undefined") {
			count = 0;
		}
		statstext += '<tr><td>Review yet to assign</td><td>' + count + '</td></tr>';
		//alert(statstext);
		$("#jobstable").html(statstext);
	});
	//
	statstext += '</table>';
}

function create_user() {
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#jobstable").hide();
	$("#filterbar").hide();
	$('#pagination').twbsPagination('destroy');
	$('#pajination').hide();
	$('#jumpdiv').hide();
	$("#createuser").show();
	$("#searchuser").hide();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$("#reworkfilterdiv").hide();
	$('form#userCreationForm')[0].reset();
	$("#unamemsg").html("");
	$("#emailmsg").html("");
	var editor_users = '';
	editor_users += '<option value="">Select Manager</option>';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var lname = user_roles.users[n].lname;
		var userid = user_roles.users[n].User_id;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		if (user_roles.users[n].role == "manager") {
			editor_users += '<option value="' + userid + '">' + lname + " " + fname + '</option>';
		}
	}
	//console.log(editor_users);
	$("#selectmanager").html(editor_users);
	var getRoles = $.ajax({
		url: 'scripts/getRoles.php',
		type: "POST",
		async: false,
		data: ''
	});
	getRoles.done(function(data) {
		//console.log(data);
		var userRoles = '';
		if (data.status == "success") {
			for (var i = 0; i < data.roledb.length; i++) {
				userRoles += '<option value="' + data.roledb[i].split("____")[1] + '">' + data.roledb[i].split("____")[0] + '</option>';
			}
			$("#selectrole").html(userRoles);
		} else {
			alert("Could not get roles");
		}
	});
}

//add to user manager 
function user_manager() {
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#jobstable").hide();
	$("#filterbar").hide();
	$('#pagination').twbsPagination('destroy');
	$("#createuser").hide();
	$("#usermanager").show();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$("#searchuser").hide();
	$("#reworkfilterdiv").hide();
}
//button click to add user manager
function addUserManager() {
	var um_userid = $("#umuserid").val();
	var um_managerid = $("#ummanagerid").val();
	if (typeof um_userid == "undefined" && um_userid == "") {
		alert("Please fill in userid");
		return;
	}
	if (typeof um_managerid == "undefined" && um_managerid == "") {
		alert("Please fill in managerid");
		return;
	}
	var updateUserManager = $.ajax({
		url: 'scripts/userManager.php',
		data: 'userid=' + um_userid + '&managerid=' + um_managerid,
		type: "POST",
		async: false,
	});
	updateUserManager.done(function(data) {
		if (data.status == "success") {
			$('.notify').remove();
			$.notify("Query success:" + data.message, {
				type: "success",
				"position": "top",
				background: "#31b0d5",
				"delay": 5000
			});
		} else {
			$('.notify').remove();
			$.notify("Failure:" + data.message, {
				type: "warning",
				"position": "top",
				"delay": 6000
			});
			//alert("Failure: "+data.message);
		}
	});
}

//add roles to user roles
function add_user_roles() {
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#jobstable").hide();
	$("#filterbar").hide();
	$('#pagination').twbsPagination('destroy');
	$("#createuser").hide();
	$("#usermanager").hide();
	$("#userroles").show();
	$("#rolesperms").hide();
	$("#searchuser").hide();
	$("#reworkfilterdiv").hide();
	var getRoles = $.ajax({
		url: 'scripts/getRoles.php',
		type: "POST",
		async: false,
		data: ''
	});
	getRoles.done(function(data) {
		//console.log(data);
		var userRoles = '';
		if (data.status == "success") {
			for (var i = 0; i < data.roledb.length; i++) {
				userRoles += '<option value="' + data.roledb[i].split("____")[1] + '">' + data.roledb[i].split("____")[0] + '</option>';
			}
			$("#urroleid").html(userRoles);
			$("#urroleid").chosen({
				'width': '100%',
				allow_single_deselect: true
			});
		} else {
			alert("Could not get roles");
		}
	});
}

//user id onchange for roles
$("#uruserid").on('change', function() {
	var uruserid = $("#uruserid").val();

	var getRoles = $.ajax({
		url: 'scripts/getRoles.php',
		type: "POST",
		async: false,
		data: 'userid=' + uruserid
	});
	getRoles.done(function(data) {
		//console.log(data);
		var userRoles = [];
		var userRoleid = [];
		if (data.status == "success") {
			for (var i = 0; i < data.roledb.length; i++) {
				userRoles.push(data.roledb[i].split("____")[0]);
				userRoleid.push(data.roledb[i].split("____")[1]);
				//		    $("#urroleid").trigger("chosen:updated");
			}
			//console.log(userRoles);
			//console.log(userRoleid);
			$("#urroleid").val(userRoleid).trigger("chosen:updated");
			$("#userRolesResult").html('<p>Current Roles: ' + userRoles + '</p>');
		} else {
			alert("Could not get roles");
		}
	});
});
//button click for add user roles
function addUserRoles() {
	var ur_userid = $("#uruserid").val();
	var ur_roles = $("#urroleid").val();

	if (typeof ur_userid == "undefined" || ur_userid == "") {
		alert("Userid cannot be empty!!");
		return;
	}

	if (typeof ur_roles == "undefined" || ur_roles == null || ur_roles.length == 0 || ur_roles == "") {
		alert("Define atleast one role!!");
		return;
	}
	//console.log(ur_roles);
	var updateUserRoles = $.ajax({
		url: 'scripts/userRoles.php',
		data: 'userid=' + ur_userid + '&roles=' + ur_roles,
		type: "POST",
		async: false,
	});
	updateUserRoles.done(function(data) {
		if (data.status == "success") {
			$("#urroleid").val([]).trigger('choosen:updated');
			$("#uruserid").val('').trigger('choosen:updated');
			$('.notify').remove();
			$.notify("Query success:" + data.message, {
				type: "success",
				"position": "top",
				background: "#31b0d5",
				"delay": 5000
			});
		} else {
			$('.notify').remove();
			$.notify("Failure:" + data.message, {
				type: "warning",
				"position": "top",
				"delay": 6000
			});
			//alert("Failure: "+data.message);
		}
	});

}

function add_roles_perms() {
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#jobstable").hide();
	$("#filterbar").hide();
	$('#pagination').twbsPagination('destroy');
	$("#createuser").hide();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").show();
	$("#searchuser").hide();
	$("#reworkfilterdiv").hide();
}

//search user 
function search_user() {
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#jobstable").hide();
	$("#filterbar").hide();
	$('#pagination').twbsPagination('destroy');
	$('#pajination').hide();
	$("#createuser").hide();
	$("#jumpdiv").hide();
	$("#searchuser").show();
	$("#reworkfilterdiv").hide();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
}

function getlpair() {
	user = $("#user").val();
	$.ajax({
		url: "scripts/getuserinfo.php",
		type: 'POST',
		data: "username=" + user,
		async: false,
		cache: false,
		processData: false,
		dataType: 'json',
		success: function(data) {
			if (data["status"].toLowerCase() == "success") {
				//$.notify(status1,{type:"success","position":"top"});
				lang_pair = data.pair;
			} else {
				alert("User info not available");
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert(msg);
		}

	});
	return false;
}

function loadsuggestions(dtype, domtype) {
	//alert(dicttype);
	dom = $("#domain").val();
	//lang_pair = $("#langpair").val();
	var ll = lang_pair.split("_");
	var lang = ll[1];

	//user = $("#user").val();
	$("#jobs").show();
	var param = "lang=" + lang + "&user=" + user;
	param += "&dictType=" + dtype;
	if (domtype != "") {
		param += "&domain=" + dom;
	}
	$.ajax({
		url: config.suggestionsMono,
		type: 'POST',
		//data: "lang="+lang+"&user="+user,
		data: param,
		//async:false,
		cache: false,
		//contentType: 'application/json',
		processData: false,
		dataType: 'json',
		//contentType: 'application/json',
		success: function(data) {
			//data = JSON.stringify(data);
			//obj = JSON.parse(data);
			//alert(data['status']);

			//storealljobs = data;
			var jsonsugg = data.suggestions;
			for (var key in jsonsugg) {
				//alert(jsonsugg[key]);
				storealljobs.suggestions[key] = jsonsugg[key];
			}
			//console.log(storealljobs);
			var status1 = "<p style=\"direction:ltr;\">Jobs load status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			//$("#messages").html(status1);
			//$("#messages").html(status1).slideUp('slow').delay(100).slideDown('slow').delay(5000).fadeOut('slow');
			if (data["status"].toLowerCase() == "success") {
				//$.notify(status1,{type:"success","position":"top"});
				$('.notify').remove();
				$.notify(status1, {
					type: "success",
					"position": "top",
					align: "top",
					background: "#31b0d5"
				});
			} else {
				$('.notify').remove();
				$.notify(status1, {
					type: "warning",
					"position": "top",
					align: "top"
				});
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert(msg);
		}

	});

}

function showpetjobs(pgno) {

	$("#wcstatus").html("");
	$("#remindCommitt").hide();
	$("#updateClientProject").hide();
	$("#tmBatchCall").hide();
	$("#addtotm").hide();
	$("#updateProjectGuidelines").hide();
	$("#uploadextraMT").hide();
	$("#assignPetMultiple").hide();
	$("#assignRevMultiple").hide();
	$("#downloadStory").hide();
	$("#updateJobComplete").hide();
	$("#updateJobNotComplete").hide();
	$("#petUnCommitt").hide();
	$("#petReassign").hide();
	$("#revUnCommitt").hide();
	$("#revReassign").hide();
	$("#recoverTrash").hide();
	$("#createChildTask").hide();
	selected_items = {};
	sj = 0;
	totaljobsWc = 0;
	totalWc = 0;
	activepage = pgno;
	var end = parseInt(pgno) * noOfrows;
	//var start = end-9;
	var start = end - noOfrows + 1;
	dom = $("#domain").val();
	lang_pair = $("#langpair").val();
	selected_user = $("#user").val();
	type = $("#url-file").val();
	type = "file";
	var unassigned = $("#unass").val();
	if (typeof unassigned != "undefiend" && unassigned != "") {
		if (unassigned == "pet") {
			petuns = 1;
			revuns = 0;
		} else {
			revuns = 1;
			petuns = 0;
		}
	} else {
		petuns = 0;
		revuns = 0;
	}
	//alert(type);
	$("#jobs").show();
	var temp_url = '';
	var param = '';
	if (admin_flag == 1) {
		if (srch_manager != "") {
			param = "&search_user=" + srch_manager;
		}
	} else {
		param = "&search_user=" + user;
	}
	param += "&user=" + user;
	//param += "&start=1&end=50";
	param += "&start=" + start + "&end=" + end;
	//param += "&sort_by=words_count&sort_type=des";
	//param += "&sort_by=priority&sort_type=asc";
	if (search_param != "") {
		param += search_param;
	}
	//search_param = "";
	/*if (typeof selected_user == "undefined" || selected_user == "") {
		selected_user = '';
	} else {
		//param += "&search_postedit_assigned_to=" + selected_user
		param += "&search_assigned_to=" + selected_user
	}
	if (typeof dom == "undefined" || dom == "") {
		dom = '';
	} else {
		param += "&search_domain=" + dom;
	}
	if (typeof lang_pair == "undefined" || lang_pair == "") {
		lang_pair = '';
	} else {
		param += "&search_lang_pair=" + lang_pair;
	}
	if (petuns == 1) {
		param += "&search_postedit_status=unassigned";
	}
	if (revuns == 1) {
		param += "&search_review_status=available_to_review&search_postedit_status=finished";
	}*/
	if ($("#reworkfilter").is(":checked")) {
		param += "&search_rework=on";
	} else {}

	if (type == "file") {
		//temp_url = config.getUserStories;
		temp_url = config.getAdminStats;
	} else {
		//temp_url = config.getUserStories1;
		temp_url = config.getAdminStats;
		if (type == "ht") {
			param += "&story_source=ht"
		} else if (type == "liveht") {
			param += "&story_source=liveht"
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
	}

	//console.log(search_param);
	if (/fromdate/.test(search_param) && /todate/.test(search_param)) {
		//console.log(search_param);
		temp_url = config.getAdminSIDR;
	}
	$.ajax({
		url: temp_url,
		type: 'POST',
		data: param,
		//data: "lang_pair="+lang_pair+"&user="+user+"&domain="+dom,
		//async:false,
		cache: false,
		//contentType: 'application/json',
		processData: false,
		dataType: 'json',
		//contentType: 'application/json',
		success: function(data) {
			//data = JSON.stringify(data);
			//obj = JSON.parse(data);
			//alert(data['status']);
			//storealljobs = data;
			var status1 = "<p style=\"direction:ltr;\">Jobs load status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			//$("#messages").html(status1);
			//$("#messages").html(status1).slideUp('slow').delay(100).slideDown('slow').delay(5000).fadeOut('slow');
			if (data["status"].toLowerCase() == "success") {
				$('.notify').remove();
				//$.notify(status1,{type:"success","position":"top"});
				$.notify(status1, {
					type: "success",
					"position": "top",
					"position": "top",
					background: "#31b0d5"
				});
				$("#submitted").show();
				$("#published").show();
				$("#showhidedoubt").show();
			} else {
				//alert("No job exists");
				$('.notify').remove();
				$.notify("No tasks to show. If you are using this tool for first time <a target='_blank' href='help.html'>click here for help</a>", {
					type: "warning",
					"position": "top",
					"delay": 10000
				});
				$("#jobstable").html('<h3 style="text-transform:none;" align="center">There are no tasks to show </h3>');
				$("#jumpdiv").hide();
				$("#pajination").hide();
				return false;
				$("#submitted").hide();
				$("#published").hide();
				$.notify(status1, {
					type: "warning",
					"position": "top",
					align: "top"
				});
			}
			create_list(data);
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert(msg);
		}

	});

}

//search based on query
function searchpetjobs() {
	var search_text = $("#searchmanagertext").val();
	search_text = search_text.replace(/^ /g, "");
	var tmp_text = search_text;
	//console.log(search_text);
	search_text = search_text.replace(/&.*$/g, "");
	search_text = search_text.replace(/ \(.*\)/g, "");
	//console.log(search_text);
	//search_text = search_text.replace(/ +$/g,"");
	search_text = search_text.replace(/  /g, " ");
	search_param = '';
	if (/^posteditby/.test(search_text)) {
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_postedit_assigned_to=" + selected_user;
	} else if (/^reviewby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_review_assigned_to=" + selected_user;
	} else if (/^tasksof/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_assigned_to=" + selected_user;
	} else if (/^reassignedtasks/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_reassign_status=false";
	} else if (/^available_for_posteditby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_postedit_assigned_to=" + selected_user + "&search_postedit_status=submitted";
	} else if (/^available_for_reviewby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_review_assigned_to=" + selected_user + "&search_review_status=submitted";
	} else if (/^under_posteditby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_postedit_assigned_to=" + selected_user + "&search_postedit_status=under_postedit";
	} else if (/^postedit_finishedby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_postedit_assigned_to=" + selected_user + "&search_postedit_status=finished&search_pet_commit_status=false";
	} else if (/^pet_committedby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_postedit_assigned_to=" + selected_user + "&search_pet_commit_status=true";
	} else if (/^under_reviewby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_review_assigned_to=" + selected_user + "&search_review_status=under_review";
	} else if (/^review_finishedby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_review_assigned_to=" + selected_user + "&search_review_status=finished&search_review_commit_status=false";
	} else if (/^review_committedby/.test(search_text)) {
		//var selected_user = search_text.split(":")[1];
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_review_assigned_to=" + selected_user + "&search_review_commit_status=true";
	} else if (/^domain/.test(search_text)) {
		var dom = search_text.split(":")[1];
		search_param += "&search_domain=" + dom;
	} else if (/^langpair/.test(search_text)) {
		var lang_pair = search_text.split(":")[1];
		search_param += "&search_lang_pair=" + lang_pair;
	} else if (/^search_lang_pair/.test(search_text)) {
		var lang_pair = search_text.split("=")[1];
		search_param += "&search_lang_pair=" + lang_pair;
	} else if (/^postedit_status:available_for_postedit/.test(search_text)) {
		search_param += "&search_postedit_status=submitted";
	} else if (/^postedit_status:finished/.test(search_text)) {
		search_param += "&search_postedit_status=finished&search_pet_commit_status=false";
	} else if (/^postedit_status/.test(search_text)) {
		var sts = search_text.split(":")[1];
		sts = sts.replace(/&.*$/, "");
		search_param += "&search_postedit_status=" + sts;
	} else if (/^review_status:unassigned/.test(search_text)) {
		search_param += "&search_review_status=available_to_review&search_postedit_status=finished&search_complete_flag=false";
	} else if (/^review_status:available_for_review/.test(search_text)) {
		search_param += "&search_review_status=submitted";
	} else if (/^review_status:finished/.test(search_text)) {
		search_param += "&search_review_status=finished&search_review_commit_status=false";
	} else if (/^review_status/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_review_status=" + sts;
	} else if (/^rework/.test(search_text)) {
		//var sts = search_text.split(":")[1];
		search_param += "&search_rework=yes";
	} else if (/^taskid/.test(search_text)) {
		var taskid = search_text.split(":")[1];
		search_param += "&search_taskid=" + taskid;
	} else if (/^posteditStartTime/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_postedit_starttime=" + sts;
	} else if (/^posteditEndTime/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_postedit_endtime=" + sts;
	} else if (/^reviewStartTime/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_review_starttime=" + sts;
	} else if (/^reviewEndTime/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_review_endtime=" + sts;
	} else if (/^pet_commit_status/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_pet_commit_status=" + sts + "&search_review_status=available_to_review";
	} else if (/^review_commit_status/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_review_commit_status=" + sts;
	} else if (/^date/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_creation_time=" + sts + "&search_date=" + sts;
	} else if (/^description/.test(search_text)) {
		var sts = search_text.split(":")[1];
		search_param += "&search_description=" + sts;
	} else if (/^client/.test(search_text)) {
		var cli = search_text.split(":")[1];
		search_param += "&search_client=" + cli;
	} else if (/^project/.test(search_text)) {
		var pro = search_text.split(":")[1];
		search_param += "&search_project=" + pro;
	} else if (/^search_client/.test(search_text)) {
		var cli = search_text.split("=")[1];
		search_param += "&search_client=" + cli;
	} else if (/^search_project/.test(search_text)) {
		var pro = search_text.split("=")[1];
		search_param += "&search_project=" + pro;
	} else if (/^trash/.test(search_text)) {
		search_param += "&search_delete_flag=true";
	} else if (/^completed:/.test(search_text)) {
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_assigned_to=" + selected_user;
		search_param += "&search_complete_flag=true";
	} else if (/^completed/.test(search_text)) {
		search_param += "&search_complete_flag=true";
	} else if (/^notcompleted:/.test(search_text)) {
		var selected_user = getUserName(search_text.split(":")[1]);
		search_param += "&search_assigned_to=" + selected_user;
		search_param += "&search_complete_flag=false";
	} else if (/^notcompleted/.test(search_text)) {
		search_param += "&search_complete_flag=false";
	} else if (/^pending/.test(search_text)) {
		search_param += "&search_complete_flag=false";
	} else if (/^status:unassigned/.test(search_text)) {
		search_param += "&search_unassigned_status=true&search_complete_flag=false";
	} else if (/^priority/.test(search_text)) {
		var pri = search_text.split(":")[1];
		search_param += "&search_priority=" + pri;
		//var tmp = search_text.split(":")[1];
	} else {
		//	    return;
	}

	//add dates range if any to fetch from getAdminStatistics
	/*if(/fromdate/.test(tmp_text) && /todate/.test(tmp_text)) {
		var qry = "&" + tmp_text.split("&")[1] + "&" + tmp_text.split("&")[2];
		search_param += qry;
	}*/
	if (/^finished/.test(tmp_text) || (/\&finished/.test(tmp_text))) {
		search_param += "&search_finish_status=true";
		tmp_text = tmp_text.replace(/\&finished/g, "");
	}
	if (/^committed/.test(tmp_text) || (/\&committed/.test(tmp_text))) {
		search_param += "&search_commit_status=true";
		tmp_text = tmp_text.replace(/\&committed/g, "");
	}
	if (/^underediting/.test(tmp_text) || (/\&underediting/.test(tmp_text))) {
		search_param += "&search_under_process_status=true";
		tmp_text = tmp_text.replace(/\&underediting/g, "");
	}

	if (/&/.test(tmp_text)) {
		var array = tmp_text.split("&");
		//console.log(array);
		var qry = '';
		for (var i = 1; i < array.length; i++) {
			qry += "&" + array[i];
		}
		search_param += qry;
	}
	showpetjobs(1);
	$('#pagination').twbsPagination('destroy');
}

//advanced search
function advancedSearch() {
	$('#srchenddate,#srchstartdate').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		todayHighlight: true
	});
	/*var editor_users = '';
	editor_users += '<option value="">Select User</option>';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var lname = user_roles.users[n].lname;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
	}
	//console.log(editor_users);
	$("#advSearchUsers").html(editor_users);*/

	$("#searchdialog").modal();

	$("#currentStatus_chosen").show();
	$("#advSearchUsers_chosen").show();
	$("#advSearchManagersContainers_chosen").show();
	$("#srchstartdate").show();
	$("#srchenddate").show();

	$("#searchdialog > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Advanced Search");
	var search_query = '';
	$("#resetadvSrch").unbind("click").on("click", function(e) {
		$("#currentStatus").val("").trigger('chosen:updated');
		$("#srchstartdate").val("");
		$("#srchenddate").val("");
		$("#advSearchLangpair").val("");
		$("#advSearchUsers").val("");
		$("#advSearchClients").val("");
		$("#advSearchProjects").val("");
		$("#advSearchManagers").val("");
		$("#advSearchUsers").trigger('chosen:updated');
		$("#advSearchClients").trigger('chosen:updated');
		$("#advSearchProjects").trigger('chosen:updated');
		$("#advSearchManagers").trigger('chosen:updated');
		$("#advSearchLangpair").trigger('chosen:updated');
	});
	$("#advSrchOk").unbind("click").on("click", function(e) {
		var current_status = $("#currentStatus").val();
		//console.log(current_status);
		var startdate = $("#srchstartdate").val();
		var todate = $("#srchenddate").val();
		if (typeof startdate != "undefined" && typeof todate != "" && startdate != "" && todate != "") {
			startdate = startdate.toLowerCase();
			var tempdate = startdate.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};

			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			startdate = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);
			todate = todate.toLowerCase();
			var tempdate = todate.split("-");
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			var d1 = new Date(d.setDate(d.getDate() + 1));
			todate = d1.getFullYear() + '/' + ('0' + parseInt(d1.getMonth() + 1)).slice(-2) + '/' + ('0' + d1.getDate()).slice(-2);
			//todate = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		var srch_client = $("#advSearchClients").val();
		var srch_project = $("#advSearchProjects").val();
		srch_manager = $("#advSearchManagers").val();
		//var srch_lang_pair = $("#advSearchLangpair").val();
		var srch_lang_pair = '';
		if(typeof $("#advSearchSrcLangpair").val() != "" && $("#advSearchTgtLangpair").val() !="") {
			srch_lang_pair = $("#advSearchSrcLangpair").val() + "_" + $("#advSearchTgtLangpair").val();
		}
		if (typeof current_status != "undefined" || current_status != "") {
			if (current_status == "allpetunassined" || current_status == "allrevunassigned") {
				$("#advSearchUsers").val("");
			}
			//var srch_user = $("#advSearchUsers").val();
			var srch_user = $("#advSearchUsers option:selected").text();
			//srch_user = srch_user.replace(/ \(.*\)/g,"");
			if (current_status == "allpetunassigned") {
				search_query = "postedit_status:unassigned";
			} else if (current_status == "allunassigned") {
				search_query = "status:unassigned";
			} else if (current_status == "allrevunassigned") {
				search_query = "review_status:unassigned";
			} else if (current_status == "alltasks") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "tasksof:" + srch_user;
				} else {
					search_query = "tasksof:";
				}
			} else if (current_status == "completedtasks") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "completed:" + srch_user;
				} else {
					search_query = "completed";
				}
			} else if (current_status == "notcompletedtasks") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "notcompleted:" + srch_user;
				} else {
					search_query = "notcompleted";
				}
			} else if (current_status == "reassignedtasks") {
				search_query = "reassignedtasks";
			} else if (current_status == "allunderedittasks") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "tasksof:" + srch_user + "&underediting";
				} else {
					search_query = "underediting";
				}
			} else if (current_status == "allfinishedtasks") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "tasksof:" + srch_user + "&finished";
				} else {
					search_query = "finished";
				}
			} else if (current_status == "allcommittedtasks") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "tasksof:" + srch_user + "&committed";
				} else {
					search_query = "committed";
				}
			} else if (current_status == "allpet") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "posteditby:" + srch_user;
				} else {
					search_query = "posteditby:";
				}
			} else if (current_status == "allrev") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "reviewby:" + srch_user;
				} else {
					search_query = "reviewby:";
				}
			} else if (current_status == "allpetsubmitted") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "available_for_posteditby:" + srch_user;
				} else {
					search_query = "postedit_status:available_for_postedit";
				}
			} else if (current_status == "allrevsubmitted") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "available_for_reviewby:" + srch_user;
				} else {
					search_query = "review_status:available_for_review";
				}
			} else if (current_status == "under_postedit") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "under_posteditby:" + srch_user;
				} else {
					search_query = "postedit_status:under_postedit";
				}
			} else if (current_status == "under_review") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "under_reviewby:" + srch_user;
				} else {
					search_query = "review_status:under_review";
				}
			} else if (current_status == "petfinished") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "postedit_finishedby:" + srch_user;
				} else {
					search_query = "postedit_status:finished";
				}
			} else if (current_status == "revfinished") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "review_finishedby:" + srch_user;
				} else {
					search_query = "review_status:finished";
				}
			} else if (current_status == "petcommitted") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "pet_committedby:" + srch_user;
				} else {
					search_query = "pet_commit_status:true";
				}
			} else if (current_status == "revcommitted") {
				if (srch_user != "" && srch_user != "Select User") {
					search_query = "review_committedby:" + srch_user;
				} else {
					search_query = "review_commit_status:true";
				}
			}
		}

		if (typeof startdate != "undefined" && typeof todate != "" && startdate != "" && todate != "") {
			if (search_query != "") {
				search_query += '&search_fromdate=' + startdate + '&search_todate=' + todate;
			} else {
				search_query += '&search_fromdate=' + startdate + '&search_todate=' + todate;
			}
		}
		//console.log(search_query);
		if (typeof srch_client != "undefined" && srch_client != "") {
			if (search_query != "") {
				search_query += '&search_client=' + srch_client;
			} else {
				search_query += 'search_client=' + srch_client;
			}
		}
		if (typeof srch_project != "undefined" && srch_project != "") {
			if (search_query != "") {
				search_query += '&search_project=' + srch_project;
			} else {
				search_query += 'search_project=' + srch_project;
			}
		}

		//console.log(search_query);
		if (typeof srch_lang_pair != "undefined" && srch_lang_pair != "") {
			if (search_query != "") {
				search_query += '&search_lang_pair=' + srch_lang_pair;
			} else {
				search_query += 'search_lang_pair=' + srch_lang_pair;
			}
		}

		if (typeof srch_manager != "undefined" && srch_manager != "") {
			/*            if (search_query != "") {
							search_query += '&search_user=' + srch_manager;
						} else {
							search_query += 'search_user=' + srch_manager;
						}*/
		}

		//console.log(search_query);
		$("#searchdialog").modal('hide');
		$("#searchmanagertext").val(search_query);
		searchpetjobs();
	});
}

//stats filters
var stats_param = '';

function statsMoreFilters() {
	$("#searchdialog").modal();
	$("#currentStatus_chosen").hide();
	$("#advSearchUsers_chosen").hide();
	$("#advSearchManagersContainers_chosen").hide();
	$("#srchstartdate").hide();
	$("#srchenddate").hide();
	stats_param = '';
	$("#stats_applied_filters").html("");
	$("#resetadvSrch").unbind("click").on("click", function(e) {
		$("#advSearchProjects").val("");
		$("#advSearchProjects").trigger('chosen:updated');
		//$("#advSearchLangpair").val("");
		$("#advSearchSrcLangpair").val("");
		$("#advSearchSrcLangpair").trigger('chosen:updated');
		$("#advSearchTgtLangpair").val("");
		$("#advSearchTgtLangpair").trigger('chosen:updated');
	});

	$("#advSrchOk").unbind("click").on("click", function(e) {
		var stats_lang_pair = $("#advSearchLangpair").val();
		if (stats_lang_pair != "undefined" && stats_lang_pair != "") {
			stats_param = "&search_lang_pair=" + stats_lang_pair;
			$("#stats_applied_filters").append("Selected languagepair:" + stats_lang_pair + ";");
		}
		var stats_projects = $("#advSearchProjects").val();
		if (stats_projects != "undefined" && stats_projects != "") {
			stats_param += "&search_project=" + stats_projects;
			$("#stats_applied_filters").append("Selected project:" + stats_projects + ";");
		}
		var stats_clients = $("#advSearchClients").val();
		if (stats_clients != "undefined" && stats_clients != "") {
			stats_param += "&search_client=" + stats_clients;
			$("#stats_applied_filters").append("Selected Client:" + stats_clients + ";");
		}
		$("#searchdialog").modal('hide');
		//getWc();
	});
	$("#resetadvSrch").unbind("click").on("click", function(e) {
		$("#currentStatus").val("").trigger('chosen:updated');
		$("#srchstartdate").val("");
		$("#srchenddate").val("");
		$("#advSearchLangpair").val("");
		$("#advSearchUsers").val("");
		$("#advSearchClients").val("");
		$("#advSearchProjects").val("");
		$("#advSearchManagers").val("");
		$("#advSearchUsers").trigger('chosen:updated');
		$("#advSearchClients").trigger('chosen:updated');
		$("#advSearchProjects").trigger('chosen:updated');
		$("#advSearchManagers").trigger('chosen:updated');
	});

}

var sort_type = '';

function sort_wc() {
	search_param = search_param.replace(/\&sort_by=words_count/g, "")
	search_param = search_param.replace(/\&sort_type=asc/g, "")
	search_param = search_param.replace(/\&sort_type=dsc/g, "")
		//search_param = '';
	if (/dsc/.test(sort_type)) {
		search_param += "&sort_by=words_count&sort_type=asc";
		sort_type = 'asc';
	} else {
		search_param += "&sort_by=words_count&sort_type=dsc";
		sort_type = 'dsc';
	}
	showpetjobs(1);
	//searchpetjobs();
	$('#pagination').twbsPagination('destroy');
}

var list_item = '';
var specific_user_item = '';
var specific_manager_item = '';

function create_list(data) {
	$("#demo").html("");
	$("#jobstable").html("");
	$("#final").html("");
	$("#jobclose").hide();
	var search = $('<input type="text" id="search" onkeyup="findMyText(event)"></input>');
	var table = $('<table></table>').addClass('table table-striped table-bordered dt-responsive nowrap').attr('id', "jtable").css("width", "100%").css("margin-bottom", "0");
	var th = $('<thead><tr><td><input type="checkbox" id="allch" onclick="allWc(this.id)" name="allch"></input></td>' +
		'<td>Task Id</td>'
		//+'<td>Created at</td>'
		//+'<td>Task Name (language)</td>'
		+
		'<td title="Client-Project-Task Name-Description">Task Description</td>'
		//+'<td>Post edit Status</td>'
		+
		'<td onclick="sort_wc();" title="Wordcount">Words<i class="fa fa-sort" aria-hidden="true"></i></td>'
		//+'<!--<td>Domain</td>'
		//+'--><td>Review Status</td>'
		+
		'<td>Current Status</td>' +
		'<td>Modified At</td>' +
		'<!--<td><i class="fa fa-eye"></i></td>' +
		'<td><i class="fa fa-download" aria-hidden="true"></i></td>' +
		'<td><i class="fa fa-trash" aria-hidden="true"></i></td>' +
		'<td title="details"><i class="fa fa-info-circle" aria-hidden="true"></i></td>' +
		'--><td align="center" colspan="5">Actions</td>' +
		'<td class="managed_by" align="center">Manager</td>' +
		'</tr></thead>').css("font-weight", "600").appendTo(table);
	//var tdel =$('<td><i class="fa fa-trash" aria-hidden="true"></i></td>').appendTo(th);
	var j = i;
	count = 1;
	var tr = '';
	moreobj["stats"] = [];
	var specific_pet_item = '';
	var last_modified = '';
	var expected_finish = '';
	total = data.noOfRecords;
	for (var i = data.records.length - 1; i >= 0; i--, count++) {
		list_item = 'trow';
		list_item += user;
		specific_user_item = 'trow';
		specific_pet_item = 'trow';
		specific_manager_item = 'trow';
		if (data.records[i].postedit_status == "finished" || data.records[i].review_status == "unassigned" || data.records[i].review_status == "submitted") {
			specific_pet_item += data.records[i].postedit_assigned_to;
		} else {
			specific_pet_item += '';
		}

		var cur_user = '';
		if (data.records[i].review_status == "under_review" || data.records[i].review_status == "finished") {
			specific_user_item += data.records[i].review_assigned_to;
			cur_user = data.records[i].review_assigned_to;
		} else if (data.records[i].postedit_status == "finished" || data.records[i].review_status == "unassigned" || data.records[i].review_status == "submitted" || data.records[i].review_status == "available_to_review") {
			specific_user_item += data.records[i].postedit_assigned_to;
			cur_user = data.records[i].postedit_assigned_to;
		} else {
			specific_user_item += data.records[i].postedit_assigned_to;
			cur_user = data.records[i].postedit_assigned_to;
		}
		list_item += "____" + data.records[i].taskid + "____" + data.records[i].lang_pair + "____" + data.records[i].domain + "____" + cur_user;

		var taskname = '';
		if (typeof data.records[i].fileNames != "undefined" && data.records[i].fileNames != "") {
			taskname = data.records[i].fileNames.srcFile;
		} else {
			taskname = data.records[i].taskid;
		}

		specific_user_item += "____" + data.records[i].taskid + "____" + data.records[i].lang_pair + "____" + data.records[i].domain + "____" + data.records[i].review_status + "____" + taskname;
		specific_manager_item += data.records[i].user + "____" + data.records[i].taskid + "____" + data.records[i].lang_pair + "____" + data.records[i].domain + "____" + data.records[i].review_status + "____" + taskname;
		specific_pet_item += "____" + data.records[i].taskid + "____" + data.records[i].lang_pair + "____" + data.records[i].domain + "____" + data.records[i].postedit_status + "____" + taskname;
		var creation_time = '<span style="display:none;">' + data.records[i].creation_time + '</span>' + formatDate(data.records[i].creation_time);

		var display_time = data.records[i].creation_time;
		display_time = data.records[i].creation_time.replace(/ .*$/, "");

		var inputDate = new Date(display_time);
		// Get today's date
		var todaysDate = new Date();
		// call setHours to take the time out of the comparison
		if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
			creation_time = '<span title="' + formatDate(data.records[i].creation_time) + '">' + formatDateToTime(data.records[i].creation_time) + '</span>';
			// Date equals today's date
		} else {
			var d = new Date(Date.parse(data.records[i].creation_time));
			//var n = d.toDateString(); //date in format like Thur Apr 26b 2017
			var n = formatDate_ddmonyyyy(d);
			creation_time = '<span title="' + formatDate(data.records[i].creation_time) + '">' + n + '</span>';
		}

		//format postedit endtime and review end time
		var pete = new Date(Date.parse(data.records[i].postedit_endtime));
		var n = formatDate_ddmonyyyy(pete);
		var postedit_endtime = '<span title="' + formatDate(data.records[i].postedit_endtime) + '">' + n + '</span>';

		var rete = new Date(Date.parse(data.records[i].review_endtime));
		var n = formatDate_ddmonyyyy(rete);
		var review_endtime = '<span title="' + formatDate(data.records[i].review_endtime) + '">' + n + '</span>';

		var pcte = new Date(Date.parse(data.records[i].pet_commit_time));
		var n = formatDate_ddmonyyyy(pcte);
		var pet_commit_time = '';
		if (typeof data.records[i].pet_commit_time != "undefined" && data.records[i].pet_commit_time != "") {
			pet_commit_time = '<span title="' + formatDate(data.records[i].pet_commit_time) + '">' + n + '</span>';
		} else {
			pet_commit_time = postedit_endtime;
		}
		var rcte = new Date(Date.parse(data.records[i].review_commit_time));
		var n = formatDate_ddmonyyyy(rcte);
		var review_commit_time = '';
		if (typeof data.records[i].review_commit_time != "undefined" && data.records[i].review_commit_time != "") {
			review_commit_time = '<span title="' + formatDate(data.records[i].review_commit_time) + '">' + n + '</span>';
		} else {
			review_commit_time = review_endtime;
		}
		//console.log(review_commit_time);

		if (typeof data.records[i].review_commit_time != "undefined" && data.records[i].review_commit_time != "") {
			last_modified = data.records[i].review_commit_time;
		} else if (typeof data.records[i].review_endtime && data.records[i].review_endtime != "") {
			last_modified = data.records[i].review_endtime;
		} else if (typeof data.records[i].review_starttime && data.records[i].review_starttime != "") {
			last_modified = data.records[i].review_starttime;
		} else if (typeof data.records[i].pet_commit_time != "undefined" && data.records[i].pet_commit_time != "") {
			last_modified = data.records[i].pet_commit_time;
		} else if (typeof data.records[i].postedit_endtime && data.records[i].postedit_endtime != "") {
			last_modified = data.records[i].postedit_endtime;
		} else if (typeof data.records[i].postedit_starttime && data.records[i].postedit_starttime != "") {
			last_modified = data.records[i].postedit_starttime;
		} else {
			last_modified = data.records[i].creation_time;
		}

		var dis_last_modified;
		var dt = last_modified;
		dt = last_modified.replace(/ .*$/, "");

		var inputDate = new Date(dt);
		if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
			dis_last_modified = '<span title="' + formatDate(last_modified) + '">' + formatDateToTimeM(last_modified) + '</span>';
			// Date equals today's date
		} else {
			var d = new Date(Date.parse(last_modified));
			//var n = d.toDateString(); //date in format like Thur Apr 26b 2017
			var n = formatDate_ddmonyyyy(d);
			dis_last_modified = '<span title="' + formatDate(last_modified) + '">' + n + '</span>';
		}
		if (typeof data.records[i].complete_flag != "undefined" && data.records[i].complete_flag === true) {
			dis_last_modified += ' <span title="Marked as completed"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>';
		}
		//format jobid+creation_time
		var lp = data.records[i].lang_pair;
		var datetime = formatDate(data.records[i].creation_time);
		//console.log(datetime);
		datetime = datetime.replace(/-/g, "");
		var disdatetime = formatDate_ddmonyyyy(data.records[i].creation_time);
		var showdatetime = disdatetime; //.replace(//g,"");
		disdatetime += ' ' + formatDateToTime(data.records[i].creation_time);
		//var disdatetime = datetime.replace(/:/g,"");
		//disdatetime = disdatetime.replace(/ /g,"");
		//console.log(datetime);
		//var jobid_creationtime = '<span title="'+disdatetime+'_'+data.records[i].taskid+'">'+datetime.replace(/ .*$/, "") + "_" + data.records[i].taskid+'</span>';

		//var jobid_creationtime = '<span title="' + disdatetime + '">' + datetime.replace(/ .*$/, "") + "_" + data.records[i].taskid + '</span>';
		var jobid_creationtime = '<span title="' + disdatetime + '">' + showdatetime + "<br>" + data.records[i].taskid + '</span>';
		var p = count - 1;

		var taskname = '';
		if (typeof data.records[i].fileNames != "undefined" && data.records[i].fileNames != "") {
			taskname = data.records[i].fileNames.srcFile;
		} else {
			taskname = "NA";
		}

		var wordcount = '';
		if (typeof data.records[i].words_count != "undefined" && data.records[i].words_count != "") {
			wordcount = data.records[i].words_count;
		} else {
			wordcount = "NA";
		}

		var flen = taskname.length;
		var fdis = '';
		if (flen > 20) {
			fdis = taskname.substring(0, 10) + '...' + taskname.substring(flen - 9, flen);
		} else {
			fdis = taskname;
		}

		var client_project = '';
		if (typeof data.records[i].client != "undefined") {
			client_project = data.records[i].client + '-';
		} else {
			client_project = 'NA' + '-';
		}
		if (typeof data.records[i].project != "undefined") {
			client_project += data.records[i].project + '-';
		} else {
			client_project += 'NA' + '-';
		}
		var description = '';
		description += taskname + '-';
		if (typeof data.records[i].description != "undefined") {
			description += data.records[i].description;
		} else {
			description += "NA";
		}
		var deslen = description.length;
		var ddis = '';
		if (deslen > 25) {
			ddis = description.substring(0, 12) + '...' + description.substring(deslen - 7, deslen);
		} else {
			ddis = description;
		}

		ddis = client_project + ddis + '<span style="text-transform:lowercase;"> (' + lp.split("_")[0].substring(0, 2) + '_' + lp.split("_")[1].substring(0, 2) + ')</span>';

		fdis += '<span style="text-transform:lowercase;"> (' + lp.split("_")[0].substring(0, 2) + '_' + lp.split("_")[1].substring(0, 2) + ')</span>';
		var rework_flag = '';
		if (typeof data.records[i].rework_flag != "undefined") {
			rework_flag = data.records[i].rework_flag;
		} else {
			rework_flag = '';
		}

		reassign_flag = '';
		review_reassign_flag = '';
		reassign_feedback = '';
		review_reassign_feedback = '';
		if (typeof data.records[i].reassign_status != "undefined") {
			reassign_flag = data.records[i].reassign_status;
			reassign_feedback = data.records[i].reassign_comment;
		} else {
			reassign_flag = '';
		}
		if (typeof data.records[i].review_reassign_status != "undefined") {
			review_reassign_flag = data.records[i].review_reassign_status;
			review_reassign_feedback = data.records[i].review_reassign_comment;
		} else {
			review_reassign_flag = '';
		}
		var postedit_by = '';
		//if (pet_commit_time != "") 
		if (typeof data.records[i].pet_commit_time != "undefined" && data.records[i].pet_commit_time != "") {
			postedit_by = 'Postedit by ' + capitalizeFirstLetter(data.records[i].postedit_assigned_to) + ' ' + formatDate(data.records[i].pet_commit_time);
		} else {
			postedit_by = 'Postedit by ' + capitalizeFirstLetter(data.records[i].postedit_assigned_to) + ' ' + formatDate(data.records[i].postedit_endtime);
		}

		if (typeof data.records[i].expected_finish != "undefined") {
			var tmpdate = data.records[i].expected_finish;
			var disdatetime = formatDate_ddmonyyyy(data.records[i].expected_finish);
			disdatetime += ' ' + formatDateToTime(data.records[i].expected_finish);
			expected_finish = " Expected by: " + disdatetime;
		} else {
			expected_finish = '';
		}
		var mt_failed = '';
		if (typeof data.records[i].mt_failed != "undefined" && data.records[i].mt_failed === true) {
			mt_failed = true;
		}
		var complete_mt_failed = '';
		if (typeof data.records[i].complete_mt_failed != "undefined" && data.records[i].complete_mt_failed === true) {
			complete_mt_failed = true;
		}
		//console.log(mt_failed);
		var mt_type = '';
		if (typeof data.records[i].mt_type != "undefined") {
			mt_type = data.records[i].mt_type;
		} else if (typeof data.records[i].fileNames != "undefined") {
			if (typeof data.records[i].fileNames.tgtFile != "undefined") {
				mt_type = 'From File';
			} else {
				mt_type = 'None';
			}
		} else {
			mt_type = 'None';
		}

		//alert(creation_time);
		if ((data.records[i]["postedit_status"] == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "finished" && rework_flag == "off") { //postedit and review finished and rework is off
			if (typeof data.records[i]["review_commit_status"] != "undefined") {
				if (data.records[i]["review_commit_status"] === false) {
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td class="afinished" id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span>  Waiting for Rev Commit (' + getLastFirstName(data.records[i].review_assigned_to) + '(R) ' + review_endtime + ')</td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="managerviewrev' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_finished').appendTo(table);
				} else {
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td class="afinished" id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Committed (' + getLastFirstName(data.records[i].review_assigned_to) + '(R) ' + review_commit_time + ')</td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="managerviewrev' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_committed').appendTo(table);
				}
			} else {
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td class="afinished" id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Committed (' + getLastFirstName(data.records[i].review_assigned_to) + '(R) ' + review_commit_time + ')</td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="managerviewrev' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_committed').appendTo(table);
			}
		} else if ((data.records[i]["postedit_status"] == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "finished") { //normal cycle for published jobs
			if (typeof data.records[i]["review_commit_status"] != "undefined") {
				if (data.records[i]["review_commit_status"] === false) {
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td class="afinished" id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Waiting for Rev Commit (' + getLastFirstName(data.records[i].review_assigned_to) + ' ' + review_endtime + ')</td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="managerviewrev' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_finished').appendTo(table);
				} else {
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td class="afinished" id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Committed (' + getLastFirstName(data.records[i].review_assigned_to) + ' ' + review_commit_time + ')</td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="managerviewrev' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_committed').appendTo(table);
				}
			} else {
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td class="afinished" id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Committed (' + getLastFirstName(data.records[i].review_assigned_to) + ' ' + review_commit_time + ')</td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="managerviewrev' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_committed').appendTo(table);
			}
		} else if ((data.records[i]["postedit_status"] == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "under_review" && rework_flag == "on") { //under_review with rework on
			tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
				+
				'<td title="' + description + '">' + ddis + '</td>'
				+
				'<td>' + wordcount + '</td>'
				+
				'<td><!--PE Committed--><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Waiting for PE Commit (' + getLastFirstName(data.records[i].postedit_assigned_to) + '(R) ' + postedit_endtime + ')</td>' +
				'<td>' + dis_last_modified + '</td>'
				+
				'<td id="posteditview' + specific_user_item + '" title="View" id=""><i class="fa fa-pencil" aria-hidden="true"></i></td>' +
				'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
				'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_review').appendTo(table);
		} else if ((data.records[i]["postedit_status"] == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "under_review" && rework_flag == "on") { //under_review with rework on
			tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
				+
				'<td title="' + description + '">' + ddis + '</td>'
				+
				'<td>' + wordcount + '</td>'
				+
				'<td><!--PE Committed--><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Waiting for PE Commit (' + getLastFirstName(data.records[i].postedit_assigned_to) + '(R) ' + postedit_endtime + ')</td>' +
				'<td>' + dis_last_modified + '</td>'
				+
				'<td id="posteditview' + specific_user_item + '" title="View" id=""><i class="fa fa-pencil" aria-hidden="true"></i></td>' +
				'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
				'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_review').appendTo(table);
		} else if ((data.records[i]["postedit_status"] == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "under_review" && reassign_flag === true) { //under_review with Reassign true
			tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
				+
				'<td title="' + description + '">' + ddis + '</td>'
				+
				'<td>' + wordcount + '</td>'
				+
				'<td id="reassign' + list_item + ' "title="' + data.records[i].reassign_comment + ' ' + postedit_by + '"><a id="posteditreassign' + list_item + '"><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Pet Assign to (Rework)</a></td>' +
				'<td>' + dis_last_modified + '</td>' +
				'<td title="View" id="reviewview' + specific_user_item + '"><i class="fa fa-pencil" aria-hidden="true"></i></td>' +
				'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
				'</tr>').attr('id', "tablerow" + list_item).attr('class', 'assign_postedit').appendTo(table);
		} else if ((data.records[i]["postedit_status"] == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "under_review") { //under_review
			tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
				+
				'<td title="' + description + '">' + ddis + '</td>'
				+
				'<td>' + wordcount + '</td>'
				+
				'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> ' + data.records[i].review_status + ' (' + getLastFirstName(data.records[i].review_assigned_to) + ')  <!--<a title="cancel" id="revunassigntrow' + getLastFirstName(data.records[i].review_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
				'<td>' + dis_last_modified + '</td>' +
				'<td title="View" id="reviewview' + specific_user_item + '"><i class="fa fa-pencil" aria-hidden="true"></i></td>' +
				'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
				'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_review').appendTo(table);
		} else {
			if (data.records[i].postedit_status == "unassigned") {
				if (data.records[i].translation_status == "under_processing") { //Under MT
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td>Under Translation</td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id=""><i class="fa fa-pencil disableddiv"></i></td>' +
						'<td title="download"><i class="fa fa-download disableddiv" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_translation').appendTo(table);
				} else if (data.records[i].translation_status == "translation_finished"  && complete_mt_failed === true) { //Under MT
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td><span class="under_mt_failed"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </span><a   class="' + mt_type + '"id="resubmitfortranslation' + specific_manager_item + '">Translation failed</a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id=""><i class="fa fa-pencil disableddiv"></i></td>' +
						'<td title="download"><i class="fa fa-download disableddiv" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_translation').appendTo(table);
				} else if (data.records[i].translation_status == "translation_finished"  && mt_failed === true) { //Under MT
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						//'<td><span id="dontassign' + list_item + '"><span class="available_for_edit"><i class="fas fa-circle" aria-   hidden="true"></i> </span> Partial MT Completed</span> <span style="font-weight:400;font-size:12px;">(Ready to edit)</span></td>' +
						'<td><a id="assign' + list_item + '"><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Pet Assign to</a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="adminview' + specific_manager_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td id="tdow'+specific_user_item+'" title="download"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'assign_postedit').appendTo(table);

				} else { //pet assign
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td><a id="assign' + list_item + '"><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Pet Assign to</a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="adminview' + specific_manager_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td id="tdow'+specific_user_item+'" title="download"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'assign_postedit').appendTo(table);
				}
			} else if ((data.records[i].postedit_status == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "unassigned" && rework_flag == "on") { //rework postedit finished but not committed
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>' +
					'</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td id="reviewassign' + list_item + '"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Waiting for PE(R) Commit</td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="reviewview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'postedit_finished').appendTo(table);
			} else if ((data.records[i].postedit_status == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "unassigned") { //postedit finished but not committed
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td><!--PE finished--><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Waiting for PE Commit (' + getLastFirstName(data.records[i].postedit_assigned_to) + ' ' + postedit_endtime + ')</td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'postedit_finished').appendTo(table);
			} else if ((data.records[i].postedit_status == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "available_to_review" && rework_flag == "on") { //Review Assign
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>' +
					'</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td title="Postedit by ' + getLastFirstName(data.records[i].postedit_assigned_to) + ' (' + pete + ')"><i id="managerviewpet' + specific_pet_item + '" class="fa fa-pencil"></i></td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_assigned').appendTo(table);
			} else if ((data.records[i].postedit_status == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "available_to_review" && reassign_flag === false) { //Review ReAssign
				if (typeof data.records[i].complete_flag != "undefined" && data.records[i].complete_flag === true) { //complete flag exists/true
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>' +
						'</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i> </span> Task Completed <a id="norevassign' + list_item + '" ><span class="noavailable_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span><span style="text-decoration:line-through;"> Review Assign to (Rework)</span></a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'task_completed').appendTo(table);
				} else { //complete flag not defined or false
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>' +
						'</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><a id="revassign' + list_item + '" ><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Assign to (Rework)</a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'assign_review').appendTo(table);
				}
			} else if ((data.records[i].postedit_status == "published" || data.records[i]["postedit_status"] == "finished") && data.records[i].review_status == "available_to_review") { //Review Assign
				//	    alert("iam here");
				if (typeof data.records[i].complete_flag != "undefined" && data.records[i].complete_flag === true) { //complete flag exists/true
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>' +
						'</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i> </span> Task Completed <a id="norevassign' + list_item + '" ><span class="noavailable_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span><span style="text-decoration:line-through;">Review Assign to</span></a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'task_completed').appendTo(table);
				} else { //complete flag not exists or false
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>' +
						'</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><a id="revassign' + list_item + '" ><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Assign to</a></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'assign_review').appendTo(table);
				}
			} else if (data.records[i].postedit_status == "submitted" && rework_flag == "on") { //Postedit submitted in rework
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td title="Rework"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Postedit Assigned(R) (' + getLastFirstName(data.records[i].postedit_assigned_to) + ') <!--<a title="cancel" id="petunassigntrow' + getLastFirstName(data.records[i].postedit_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'postedit_assigned').appendTo(table);
			} else if (data.records[i].postedit_status == "submitted") { //Postedit submitted
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Postedit Assigned (' + getLastFirstName(data.records[i].postedit_assigned_to) + ')<!--<a title="cancel" id="petunassigntrow' + getLastFirstName(data.records[i].postedit_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'postedit_assigned').appendTo(table);
			} else if (data.records[i].postedit_status == "under_postedit" && rework_flag == "on") { //under postedit rework
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> ' + data.records[i].postedit_status + '(R) (' + getLastFirstName(data.records[i].postedit_assigned_to) + ') <!--<a title="cancel" id="petunassigntrow' + getLastFirstName(data.records[i].postedit_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_postedit').appendTo(table);
			} else if (data.records[i].postedit_status == "under_postedit") { //under postedit
				tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
					+
					'<td title="' + description + '">' + ddis + '</td>'
					+
					'<td>' + wordcount + '</td>'
					+
					'<td><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> ' + data.records[i].postedit_status + ' (' + getLastFirstName(data.records[i].postedit_assigned_to) + ') <!--<a title="cancel" id="petunassigntrow' + getLastFirstName(data.records[i].postedit_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
					'<td>' + dis_last_modified + '</td>' +
					'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
					'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
					'</tr>').attr('id', "tablerow" + list_item).attr('class', 'under_postedit').appendTo(table);
			} else { //review assigned
				if (rework_flag == "off") { //review submitted/assigned in rework after postedit commit
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Assigned(R) (' + getLastFirstName(data.records[i].review_assigned_to) + ')  <!--<a title="cancel" id="revunassigntrow' + getLastFirstName(data.records[i].review_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_assigned').appendTo(table);
				} else { //review assigned in normal mode
					tr = $('<tr><td id="jobdetails' + p + '"><a>' + jobid_creationtime + '</a></td>'
						+
						'<td title="' + description + '">' + ddis + '</td>'
						+
						'<td>' + wordcount + '</td>'
						+
						'<td id="reviewassign' + list_item + '" title="' + postedit_by + '"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Assigned (' + getLastFirstName(data.records[i].review_assigned_to) + ')  <!--<a title="cancel" id="revunassigntrow' + getLastFirstName(data.records[i].review_assigned_to) + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>--></td>' +
						'<td>' + dis_last_modified + '</td>' +
						'<td title="View" id="posteditview' + specific_user_item + '"><i class="fa fa-pencil"></i></td>' +
						'<td title="download" id="tdow' + specific_user_item + '"><i class="fa fa-download" aria-hidden="true"></i></td>' +
						'</tr>').attr('id', "tablerow" + list_item).attr('class', 'review_assigned').appendTo(table);
				}
			}
		}
		//var tdview =$('<td id="trow'+list_item+'">View</td>').appendTo(tr);
		//console.log(tr);

		//var tdel = $('<td id="deletestory' + list_item + '"><i class="fa fa-trash" aria-hidden="true"></i></td>').appendTo(tr);
		//var tdel = $('<td title="details" id="details' + p + '">'+
		//'<a href="#" data-toggle="popover" title="Popover Header" data-content="Some content inside the popover">Toggle popover</a>'+
		//		'<i class="fa fa-info-circle" aria-hidden="true"></i></td>').appendTo(tr);
		var tcheck = $('<td title="select" id=""><input type="checkbox" id="check' + p + '" name="checktask"></input></td>').prependTo(tr);

		if (typeof data.records[i].reassign_status != "undefined" && data.records[i].reassign_status === true) {
			var tunassign = $('<td><a title="cancel"><i class="fa fa-undo disableddiv" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else if (data.records[i].review_status == "under_review" || data.records[i].review_status == "submitted" || data.records[i].review_status == "finished") {
			var tunassign = $('<td title="select" id=""> <a title="cancel" id="revunassigntrow' + data.records[i].review_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a>').appendTo(tr);
			//more actions button
			//var tdmore = $('<td><a style="cursor:pointer;" id="morebutton' + data.records[i].review_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" class="moreaction" title="more"><i class="fa fa-bars" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else if (data.records[i].postedit_status == "under_postedit" || data.records[i].postedit_status == "submitted" || data.records[i].postedit_status == "finished") {
			var tunassign = $('<td><a title="cancel" id="petunassigntrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else {
			//var tunassign = $('<td><a title="cancel" id="petunassigntrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '"><i class="fa fa-undo" aria-hidden="true"></i></a></td>').appendTo(tr);
			var tunassign = $('<td><a title="cancel"><i class="fa fa-undo disableddiv" aria-hidden="true"></i></a></td>').appendTo(tr);
		}

		var validate_source_content_flag = '';
		if (typeof data.records[i].validate_source_content_flag != "undefined") {
			validate_source_content_flag = data.records[i].validate_source_content_flag;
		} else {}

		if (data.records[i].project != "undefined") {
			tr.attr("data-project", data.records[i].project);
		} else {
			tr.attr("data-project", "");
		}

		//update priority button
		if (data.records[i].validate_source_content_flag === true && data.records[i].priority == 4) {
			tr.attr("class", "onhold");
			var tdpriority = $('<td><a id="updateprioritytrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" title="Put on hold for source verification"><i style="color:green;" class="fa fa-times-circle-o" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else if (validate_source_content_flag === true) {
			tr.attr("class", "onhold");
			var tdpriority = $('<td><a id="updateprioritytrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" title="Marked for Source validation"><i style="color:#000;" class="fa fa-times-circle-o" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else if (data.records[i].priority == "1") { //high
			var tdpriority = $('<td><a id="updateprioritytrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" title="High Priority"><i style="color:red;" class="fa fa-arrow-up" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else if (data.records[i].priority == "4") { //on hold
			var tdpriority = $('<td><a id="updateprioritytrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" title="On Hold"><i style="color:#333;" class="fa fa-times-circle-o" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else if (typeof data.records[i].priority == "undefined" || data.records[i].priority == "2") { //medium
			var tdpriority = $('<td><a id="updateprioritytrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" title="Medium priority"><i style="color:orange;" class="fa fa-arrow-up" aria-hidden="true"></i></a></td>').appendTo(tr);
		} else {
			var tdpriority = $('<td><a id="updateprioritytrow' + data.records[i].postedit_assigned_to + '____' + data.records[i].taskid + '____' + data.records[i].lang_pair + '____' + data.records[i].domain + '" title="Low priority"><i style="color:#ddd;" class="fa fa-arrow-up" aria-hidden="true"></i></a></td>').appendTo(tr);
		}

		//expected finish
		if (expected_finish != "") {
			var tdexp_finish = $('<td title="' + expected_finish + '"><i class="fa fa-flag" aria-hidden="true"></i></td>').appendTo(tr);
		} else {
			var tdexp_finish = $('<td title="Expected By"><i class="fa fa-flag-o" aria-hidden="true"></i></td>').appendTo(tr);
		}
		var td_manager = $('<td class="managed_by" title="Managed by">' + data.records[i].user + '</td>').appendTo(tr);

		var fnames = data.records[i].fileNames;
		if (typeof fnames != "undefined") {
			fnames = data.records[i].fileNames.srcFile;
			if (typeof data.records[i].fileNames.tgtFile != "undefined") {
				fnames += " ," + data.records[i].fileNames.tgtFile;
			}
		} else {
			fnames = "NA";
		}

		if (typeof data.records[i].uploadedFileURL != "undefined" && data.records[i].fileNames != "undefined") {
			fnames = '<a target="_blank" href="' + config.reference_url + '/' + data.records[i].uploadedFileURL + '">' + data.records[i].fileNames.srcFile + '</a>';
		}
		var desc = data.records[i].description;
		if (typeof desc != "undefined") {
			desc = data.records[i].description;
		} else {
			//desc ="NA";
		}
		if (typeof data.records[i].words_count != "undefined" && data.records[i].words_count != "") {
			totaljobsWc += data.records[i].words_count;
		} else {
			totaljobsWc += 0;
		}

		var petby = '';
		var revby = '';
		var pestime = '';
		var restime = '';
		var pectime = '';
		var rectime = '';
		var peetime = '';
		var reetime = '';
		var petime = '';
		var retime = '';
		var pefeedback = '';
		var refeedback = '';
		if (typeof data.records[i].postedit_iteration != "undefined" && data.records[i].postedit_iteration > 1) {
			for (var q = 1; q < data.records[i].postedit_iteration; q++) {
				petby += data.records[i]["postedit_assigned_to_" + q] + ",";
				pestime += data.records[i]["postedit_starttime_" + q] + ",";
				peetime += data.records[i]["postedit_endtime_" + q] + ",";
				pectime += data.records[i]["pet_commit_time_" + q] + ",";
				petime += data.records[i]["postedit_time_" + q] + ",";
				if (typeof data.records[i]["reassign_comment_" + q] != "undefined") {
					pefeedback += data.records[i]["reassign_comment" + q] + ",";
				}
			}
		}
		petby += data.records[i].postedit_assigned_to;
		pestime += data.records[i].postedit_starttime;
		peetime += data.records[i].postedit_endtime;
		pectime += data.records[i].pet_commit_time;
		petime += data.records[i].postedit_time;
		pefeedback += data.records[i].reassign_comment;

		if (typeof data.records[i].review_iteration != "undefined" && data.records[i].review_iteration > 1) {
			for (var q = 1; q < data.records[i].review_iteration; q++) {
				if (typeof data.records[i]["review_assigned_to_reviewiteration_" + q] == "undefined") {
					revby += data.records[i]["review_assigned_to_" + q] + ",";
					restime += data.records[i]["review_starttime_" + q] + ",";
					reetime += data.records[i]["review_endtime_" + q] + ",";
					rectime += data.records[i]["reassign_comment_time"] + ",";
					retime += data.records[i]["review_time_" + q] + ",";
					if (typeof data.records[i]["review_reassign_comment_" + q] != "undefined") {
						refeedback += data.records[i]["review_reassign_comment_" + q] + ",";;
					}
				} else {
					revby += data.records[i]["review_assigned_to_reviewiteration_" + q] + ",";
					restime += data.records[i]["review_starttime_reviewiteration_" + q] + ",";
					reetime += data.records[i]["review_endtime_reviewiteration_" + q] + ",";
					rectime += data.records[i]["review_commit_time_reviewiteration_" + q] + ",";
					retime += data.records[i]["review_time_reviewiteration_" + q] + ",";
					if (typeof data.records[i]["review_reassign_comment_reviewiteration_" + q] != "undefined") {
						refeedback += data.records[i]["review_reassign_comment_reviewiteration_" + q] + ",";;
					}
				}
			}
		}
		var parenttaskinfo = 'NA';
		if (typeof data.records[i].parentJobId != "undefined") {
			parenttaskinfo = "Taskid: " + data.records[i].parentJobId;
		}
		revby += data.records[i].review_assigned_to;
		restime += data.records[i].review_starttime;
		reetime += data.records[i].review_endtime;
		rectime += data.records[i].review_commit_time;
		retime += data.records[i].review_time;
		refeedback += data.records[i].review_reassign_comment;
		//console.log(petime);
		moreobj["stats"].push({
			//"description" : data.records[i].description,
			"description": desc,
			"fname": fnames,
			"wordcount": data.records[i].words_count,
			"priority": data.records[i].priority,
			//"petby": data.records[i].postedit_assigned_to,
			"petby": petby,
			"taskid": data.records[i].taskid,
			"revby": revby,
			//"petime": data.records[i].postedit_time,
			"petime": petime,
			"revtime": retime,
			//"pestime": data.records[i].postedit_starttime,
			//"peetime": data.records[i].postedit_endtime,
			"pestime": pestime,
			"peetime": peetime,
			"restime": restime,
			"reetime": reetime,
			//"pectime": data.records[i].pet_commit_time,
			"pectime": pectime,
			"rectime": rectime,
			"domain": data.records[i].domain,
			"from_to": data.records[i].lang_pair,
			"list_item": list_item,
			"jobId": data.records[i].taskid,
			"reassign_feedback": pefeedback,
			"review_reassign_feedback": refeedback,
			"mt_type": mt_type,
			"parentTask": parenttaskinfo,
		});
	}
	$("#search").html(search);
	//console.log(table);
	$("#jobstable").html(table);
	//$('[data-toggle="popover"]').popover(); 
	/*tablejobs = $('#jtable').DataTable({
		"bLengthChange": false,
		  "iTotalRecords":57,
		  "scrollX": true,
		columnDefs: [ { orderable: false, targets: [6,7,8], } ],
		//"aaSorting": [[1,'asc'], [3,'desc']]
		"aaSorting": [1,'desc'],
	//"ordering": false
	});
	jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');*/

	$("#jobstable").show();
	//var tp = Math.ceil(total/10);
	var tp = Math.ceil(total / noOfrows);
	$("#totpages").html(tp);
	$("#totjobs").html(total);
	activepage = parseInt(activepage);
	//alert(activepage);
	$('#pagination').twbsPagination({
		totalPages: tp,
		visiblePages: 4,
		startPage: activepage,
		onPageClick: function(event, page) {
			$('#page-content').text('Page ' + page);
			showpetjobs(page);
		}
	});
	if (admin_flag == 0) {
		$("td.managed_by").hide();
	} else {
		$("td.managed_by").show();
	}
	/*$('#jtable').on('page.dt', function() {
		var info = tablejobs.page.info();
		var page = info.page+1;
		alert('changed - page '+page+' out of '+info.pages+' is clicked');
	});*/
	//$("#jobpanel").show();

}

//edit/view button click
var selected_items = {};
$(document).on('click', 'input[id^="check"]', function(event) {
	var checkid = this.id;
	checkid = checkid.replace(/check/, "");
	var tr = $(this).closest('tr');
	var wc = getWordcount(checkid);
	wc = parseInt(wc);
	if ($('#' + this.id).is(':checked')) {
		selected_items[checkid] = tr.attr('id') + '____' + tr.attr('class');
		//console.log(selected_items);
		totalWc += wc;
		sj = sj + 1;
		//        $("#allch").prop("checked", false);
		//alert("chekced");
	} else {
		totalWc -= wc;
		//console.log(totalWc);
		//console.log(wc);
		delete selected_items[checkid];
		//console.log(selected_items);
		sj = sj - 1;
		//      $("#allch").prop("checked", false);
		//alert("Unchekced");
	}
	//console.log(selected_items);
	show_actions(selected_items);
	//console.log(selected_items);
	$("#wcstatus").html("<b>Word count:" + totalWc + "(" + sj + ")</b>");
	//alert(checkid);
});

function getWordcount(id) {
	var jd = moreobj.stats[id];
	return jd.wordcount;
	//console.log(jd);
}

//select/unselect all checkboxes
function allWc(id) {
	//sj = 0;
	if ($('#' + id).is(':checked')) {
		$("input[id^='check']").each(function() {
			//console.log("if");
			if (!$('#' + this.id).is(':checked')) {
				//$("#" + this.id).prop("checked", false);
				$("#" + this.id).click();
			}
			//sj = sj + 1;
		});
		$("#" + id).prop("checked", true);
		//totalWc = totaljobsWc;
		//$("#wcstatus").html("<b>Word count:" + totaljobsWc + "(All)</b>");
		if (/search_delete_flag=true/.test(search_param)) {
			$("#recoverTrash").show();
			return;
		} else {
			$("#recoverTrash").hide();
		}
		$("#updateClientProject").show();
		//$("#tmBatchCall").show();
		//$("#addtotm").show();
	} else {
		//console.log("else");
		//totalWc = 0;
		//sj = 0;
		$("input[id^='check']").each(function() {
			if ($('#' + this.id).is(':checked')) {
				//$("#" + this.id).prop("checked", true);
				$("#" + this.id).click();
			}
		});
		$("#" + id).prop("checked", false);
		if (/search_delete_flag=true/.test(search_param)) {
			$("#recoverTrash").hide();
			return;
		} else {
			$("#recoverTrash").hide();
		}
		//$("#wcstatus").html("");
		$("#updateClientProject").hide();
		$("#tmBatchCall").hide();
		$("#addtotm").hide();
		$("#downloadStory").hide();
		$("#wcstatus").html("");
		$("#uploadextraMT").hide();
	}
}

//buttons based on selected jobs
function show_actions(items) {
	var job_completed = 100;
	var job_incomplete = 100;
	var marked_as_completed = '';
	var marked_as_incompleted = '';
	var pet_job_assigned = '';
	var pet_job_unassigned = '';
	var rev_job_assigned = '';
	var rev_job_unassigned = '';
	var pet_committed = '';
	var pet_not_committed = '';
	var rev_committed = '';
	var rev_not_committed = '';
	var checkflag = 0;
	var count = 0;
	$("#updateProjectGuidelines").hide();
	for (var key in items) {
		count++;
		checkflag = 1;
		//console.log(key);
		//console.log(items[key]);
		var pef = 100;
		var ref = 100;
		var job_status = items[key].split("____")[5];
		//to know jobs that are postedit committed
		if (job_status == "assign_review") {
			pet_committed = 1;
		} else {
			pet_not_committed = 1;
		}
		//to know jobs that are review committed
		if (job_status == "review_committed") {
			rev_committed = 1;
		} else {
			rev_not_committed = 1;
		}
		//console.log("|" + job_status + "|");
		if (job_status == "review_committed" || job_status == "assign_review") {
			job_completed = 1;
		} else {
			job_incomplete = 1;
		}
		// to know jobs that are either postedit finished or review finished
		if (items[key] == 'postedit_finished') {
			pef = 1;
			ref = 0;
		} else if (items[key] == 'review_finished') {
			ref = 1;
			pef = 0;
		}
		// to know jobs that are postedit unassigned
		if (job_status == 'assign_postedit') {
			pet_job_unassigned = 1;
		} else {
			pet_job_assigned = 1;
		}
		// to know jobs that are review unassigned or potedit committed
		if (job_status == 'assign_review') {
			rev_job_unassigned = 1;
		} else {
			rev_job_assigned = 1;
		}

		if (job_status == 'task_completed') {
			marked_as_completed = 1;
		} else {
			marked_as_completed = 0;
			marked_as_incompleted = 1;
		}
	}

	//Recover trash button searching in trash
	if (/search_delete_flag=true/.test(search_param)) {
		$("#recoverTrash").show();
		return;
	} else {
		$("#recoverTrash").hide();
	}

	//Mark complete button when postedit committed or review committed
	if (job_completed == 1 && job_incomplete == 1) {
		$("#updateJobComplete").hide();
	} else if (job_incomplete == 1) {
		$("#updateJobComplete").hide();
	} else if (job_completed == 1) {
		$("#updateJobComplete").show();
	}

	if (marked_as_completed == 1 && marked_as_incompleted == 0) {
		$("#updateJobNotComplete").show();
	} else {
		$("#updateJobNotComplete").hide();
	}

	//console.log("pet_job_assigned=="+pet_job_assigned);
	if (pet_job_unassigned == 1 && pet_job_assigned == 0) {
		$("#assignPetMultiple").show();
		$("#createChildTask").hide();
	} else {
		$("#createChildTask").show();
		$("#assignPetMultiple").hide();
	}

	//console.log("rev_job_assigned=="+rev_job_assigned);
	if (rev_job_unassigned == 1 && rev_job_assigned == 0) {
		$("#assignRevMultiple").show();
	} else {
		$("#assignRevMultiple").hide();
	}

	if (pet_committed == 1 && pet_not_committed != 1) {
		$("#petUnCommitt").show();
		$("#petReassign").show();
	} else {
		$("#petUnCommitt").hide();
		$("#petReassign").hide();
	}
	if (rev_committed == 1 && rev_not_committed != 1) {
		$("#revUnCommitt").show();
		$("#revReassign").show();
	} else {
		$("#revUnCommitt").hide();
		$("#revReassign").hide();
	}

	if (checkflag == 0) {
		$("#updateClientProject").hide();
		$("#tmBatchCall").hide();
		$("#addtotm").hide();
		$("#updateJobComplete").hide();
		$("#assignPetMultiple").hide();
		$("#assignRevMultiple").hide();
		$("#uploadextraMT").hide();
		$("#downloadStory").hide();
		$("#revUnCommitt").hide();
		$("#revReassign").hide();
		$("#petUnCommitt").hide();
		$("#petReassign").hide();
		$("#updateJobNotComplete").hide();
		$("#addTaskToTM").hide();
		$("#createChildTask").hide();
	} else {
		$("#updateClientProject").show();
		$("#tmBatchCall").show();
		$("#addtotm").show();
		$("#downloadStory").show();
	}
	if (count > 1) {
		$("#updateProjectGuidelines").hide();
		$("#createChildTask").hide();
		$("#uploadextraMT").hide();
		$("#tmBatchCall").hide();
		$("#addtotm").hide();
	} else if (count == 1) {
		$("#updateProjectGuidelines").show();
		$("#uploadextraMT").show();
	}
	/*if(pef == 1 || ref == 1) {
		$("#remindCommitt").show();
	}
	else {
		$("#remindCommitt").hide();
	}*/
}

//update client/project click
$(document).on('click', 'button[id^="updateClientProject"]', function(event) {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$("#updateclientprojectModal").modal();
	$("#c3managers").hide();
	$("#c3clients_chosen").hide();
	$("#c3clients").hide();
	$("#c2clients_chosen").show();
	$("#c2projects_chosen").show();
	$("#updateclientprojectModal").on('shown.bs.modal', function() {
		$('#c2clients').trigger("chosen:updated");
	});
	$("#updateclientprojectModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Update Client/Project");
	$("#updatecliprobtn").unbind('click').on('click', function() {
		//alert(activepage);
		var selclient = $("#c2clients").val();
		var selproject = $("#c2projects").val();
		if (typeof selclient == "undefined" || selclient == "" || selclient == null) {
			alert("Select a client");
			return false;
		}
		if (typeof selproject == "undefined" || selproject == "" || selproject == null) {
			alert("Select a project");
			return false;
		}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			var rest_curl = config.updateClient;
			var rest_purl = config.updateProject;
			var rest_param1 = 'user=' + user + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&client=' + selclient + '&domain=' + details[3];
			var rest_param2 = 'user=' + user + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&project=' + selproject + '&domain=' + details[3];
			doAjax(rest_curl, rest_param1);
			doAjax(rest_purl, rest_param2);
			if (crole == "manager" || crole == "admin") {
				var msg = 'EBS MANAGER INFO Updated Client and Project;user=' + user + ',lang_pair=' + details[2] + ',id=' + details[1] + ',client=' + selclient + ',domain=' + details[3] + ',project=' + selproject;
				insert_logs(crole, msg);
			}
		}
		if (ajax_flag == 1) {
			showpetjobs(activepage);
			ajax_flag = 0;
		}
	});
});

//TM batch call click
$(document).on('click', 'button[id^="tmBatchCall"]', function(event) {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
		//	console.log(id_class);
			var details = id_class.split("____");
			var rest_curl = TMBatch_HOST + 'single';
			var rest_param = 'user=' + user + '&lPair=' + details[2] + '&taskid=' + details[1] + '&domain=' + details[3] + '&th=60';
			insert_logs(crole,"Calling TM Batch-"+rest_param);
			$.ajax({
				type: 'GET',
				url: rest_curl + '?' + rest_param,
				//contentType: 'application/json',
				dataType: "json",
				//async: true,
				success: function(data) {
					if(data.status.toLowerCase() == "success") {
						insert_logs(crole,"TM Batch call success-"+rest_param);
						console.log("TM batch call success");
						$('.notify').remove();
						$.notify("TM batch success.", {
							"postion": "top",
							"type": "danger"
						});
					} else {
						$('.notify').remove();
						$.notify("TM batch failure.", {
							"postion": "top",
							"type": "danger"
						});
						insert_logs(crole,"TM Batch call failure-"+rest_param);
						console.log("TM batch call failure 1");
					}
				},
				error: function(jqXHR, exception) {
					$('.notify').remove();
						$.notify("TM batch failure.", {
							"postion": "top",
							"type": "danger"
						});
					insert_logs(crole,"TM Batch call failure2-"+rest_param);
					console.log("TM batch call failure 2");
				}
			});
		}
		$('.notify').remove();
		$.notify("TM batch called for selected task.", {
			"postion": "top",
			"type": "danger"
		});
});

//add task to TM call
$(document).on('click', 'button[id^="addtotm"]', function(event) {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			console.log(id_class);
			var details = id_class.split("____");
			var rest_curl = 'scripts/insertTM.php';
			var project = $('tr[id^=' + details[0] + '____' + details[1] + '____' + details[2] + '____' + details[3] + '____]').attr("data-project");
			var rest_param = 'user=' + details[0] + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&domain=' + details[3] + '&project=project';
			insert_logs(crole,"Called TM insert for task-"+rest_param);
			$.ajax({
				type: 'POST',
				url: rest_curl,
				data: rest_param,
				//contentType: 'application/json',
				dataType: "json",
				//async: true,
				success: function(data) {
					if(data.status.toLowerCase() == "success") {
						insert_logs(crole,"Add to TM call success-"+rest_param);
						console.log("Add to TM call success");
						$('.notify').remove();
						$.notify("Add to TM success.", {
							"postion": "top",
							"type": "danger"
						});
					} else {
						$('.notify').remove();
						$.notify("Add to TM failure.", {
							"postion": "top",
							"type": "danger"
						});
						insert_logs(crole,"Add to TM call failure-"+rest_param);
						console.log("Add to TM call failure 1");
					}
				},
				error: function(jqXHR, exception) {
					$('.notify').remove();
						$.notify("Add to TM call failure.", {
							"postion": "top",
							"type": "danger"
						});
					insert_logs(crole,"Add to TM call failure2-"+rest_param);
					console.log("Add to TM call failure 2");
				}
			});
		}
});
//update langpair/domain click
$(document).on('click', 'i[id^="updateTaskLangpair"],i[id^="updateTaskDomain"]', function(event) {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}

	var utaskid = '';
	utaskid = $(this).attr("data-taskid");

	var url = '';
	var flag = 0;
	if (this.id == "updateTaskLangpair") {
		$("#updateSrcLangList_chosen").show();
		$("#updateTgtLangList_chosen").show();
		$("#updateDomainList_chosen").hide();
		$("#updateLangpairDomainModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Update Language Pair");
		url = config.updateLangPair;
		flag = 0;
	} else {
		$("#updateSrcLangList_chosen").hide();
		$("#updateTgtLangList_chosen").hide();
		$("#updateDomainList_chosen").show();
		$("#updateLangpairModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Update Domain");
		url = config.updateDomain;
		flag = 1;
	}
	$("#updateLangpairDomainModal").modal();
	$('.dialogdrag').draggable({
		handle: ".modal-header",
		cursor: "move",
		containment: '#updateLangpairDomainModal'
	});

	$("#updateLangPairDomainModal").on('shown.bs.modal', function() {
		//$('#c2clients').trigger("chosen:updated");
	});
	$("#updatelpdombtn").unbind('click').on('click', function() {
		var param = '';
		param = 'user=' + user + '&taskid=' + utaskid;

		//alert(activepage);
		var sel_lp = '';
		var sel_dom = '';
		if (flag == 0) {
			var s = $("#updateSrcLangList").val();
			var t = $("#updateTgtLangList").val();
			if (typeof s == "undefined" || s == "" || s == null) {
				alert("Select source language");
				return false;
			}
			if (typeof t == "undefined" || t == "" || t == null) {
				alert("Select target language");
				return false;
			}
			var sel_lp = $("#updateSrcLangList").val() + "_" + $("#updateTgtLangList").val();
			param += '&updated_lang_pair=' + sel_lp;
		} else {
			var sel_dom = $("#updateDomainList").val();
			if (typeof sel_dom == "undefined" || sel_dom == "" || sel_dom == null) {
				alert("Select a client");
				return false;
			}
			param += '&updated_domain=' + sel_dom;
		}
		doAjax(url, param);
		if (ajax_flag == 1) {
			showpetjobs(activepage);
			ajax_flag = 0;
		}
	});
});

//update projectGuidelines click
$(document).on('click', 'button[id^="updateProjectGuidelines"]', function(event) {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$("#updateprojectguidelinesModal").modal();
	$("#updateprojectguidelinesModal").on('shown.bs.modal', function() {
		$('#gprojects').trigger("chosen:updated");
	});
	$("#updateprojectguidelinesModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Update Project Guidelines");
	$('.dialogdrag').draggable({
		handle: ".modal-header",
		cursor: "move",
		containment: '#updateprojectguidelinesModal'
	});


	var project = '';
	for (var key in selected_items) {
		var id_class = selected_items[key];
		var details = id_class.split("____");
		//console.log($('tr[id^='+details[0]+'____'+details[1]+'____'+details[2]+'____'+details[3]+'____]').attr("data-project"));
		project = $('tr[id^=' + details[0] + '____' + details[1] + '____' + details[2] + '____' + details[3] + '____]').attr("data-project");
		$("#gprojects").val(project);
	}

	var gflag = 0;
	var getGuidelines = $.ajax({
		url: config.searchGuidelines,
		data: 'user=' + user + '&search_project=' + project,
		type: "POST",
		async: false,
	});
	getGuidelines.done(function(data) {
		if (data.status.toLowerCase() == "success") {
			$("#gguidelines").html(data.records[0].guidelines);
			gflag = 1;
		} else {
			$("#gguidelines").html('');
		}
	});

	$("#updateproguidebtn").unbind('click').on('click', function() {
		//alert(activepage);
		var selproject = $("#gprojects").val();
		if (typeof selproject == "undefined" || selproject == "" || selproject == null) {
			alert("Select a project");
			return false;
		}

		var general_guidelines = $("#gguidelines").html();
		if (typeof general_guidelines == "undefined" || general_guidelines == "" || general_guidelines == null) {
			alert("Fill Guidelines!!");
			return false;
		}
		general_guidelines = encodeURIComponent(general_guidelines);

		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			var rest_url = '';
			var rest_param = '';
			if (gflag == 0) {
				rest_url = config.createGuidelines;
				rest_param = 'user=' + user + '&project=' + selproject + '&guidelines=' + general_guidelines;
			} else {
				rest_url = config.updateGuidelines;
				rest_param = 'user=' + user + '&project=' + selproject + '&update_field=guidelines&update_value=' + general_guidelines;
			}
			doAjax(rest_url, rest_param);
			if (crole == "manager" || crole == "admin") {
				var msg = 'EBS MANAGER INFO Updated Project Guidelines;user=' + user + ',project=' + selproject;
				insert_logs(crole, msg);
			}
		}
		if (ajax_flag == 1) {
			showpetjobs(activepage);
			ajax_flag = 0;
		}
	});
});

//update task with multiple MT click
$(document).on('click', 'button[id="uploadextraMT"]', function(event) {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$("#uploadextraMTModal").modal();
	$("#mt2filejob").val("");
	$("#mt2filelabel").val("");
	$("#uploadextraMTModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Add another MT file");
	$('.dialogdrag').draggable({
		handle: ".modal-header",
		cursor: "move",
		containment: '#uploadextraMTModal'
	});

	var task = ''
	for (var key in selected_items) {
		//console.log(key);
		//console.log(selected_items);
		task = selected_items[key];
	}
	var stage = task.split("____")[5];
	//console.log(stage);
	$("#uploadextraMTbtn").unbind('click').on('click', function() {
		//alert(activepage);
		var mt_label = $("#mt2filelabel").val();
		if (typeof mt_label == "undefined" || mt_label == "" || mt_label == null) {
			mt_label = "Default";
		}

		var mt_lang = $("#mt2filelang").val();
		if (typeof mt_lang == "undefined" || mt_lang == "" || mt_lang == null) {
			mt_lang = "Default";
		}

		var x = document.getElementById("mt2filejob");
		if (x.files.length == 0 && typeof in_url == "undefined") {
			alert("Please upload a file");
			return false;
		}

		var formData = new FormData();
		var rest_url = '';
		if ($("#mtupdate").is(":checked")) {
			formData.append('inputfile', $('input[id=mt2filejob]')[0].files[0]);
			if (confirm("Are you sure you want to override target text?")) {} else {
				return;
			}
			if(stage == "assign_postedit") {
				rest_url = config.updateMTinUnAssigned;
			} else if(stage == "review_assigned" || stage == "under_review" || stage == "review_finished" || stage == "review_committed") {
				rest_url = config.updateMTinReview;
			} else if(stage == "postedit_assigned" || stage == "under_postedit" || stage == "postedit_finished" || stage == "postedit_committed" || stage == "assign_review") {
				rest_url = config.updateMTinExisting;
			} else {
				alert("Not allowed at this stage");
				return;
			}
		} else {
			rest_url = config.uploadMTinExisting;
			formData.append("mt2_type", mt_label);
			formData.append('mt2_lang', mt_lang);
			formData.append('mt2File', $('input[id=mt2filejob]')[0].files[0]);
		}

		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			//console.log(details);
			var cur_stage = '';
			if (/under_postedit/.test(details[5]) || /postedit_finished/.test(details[5]) || /postedit_assigned/.test(details[5])) {
				cur_stage = 'after_postedit_assign';
			} else {
				cur_stage = 'before_postedit_assign';
			}
			if(cur_stage == "before_postedit_assign") {
				formData.append('user', user);
			} else {
				formData.append('user', details[4]);
			}
			formData.append('lang_pair', details[2]);
			formData.append('taskid', details[1]);
			formData.append('domain', details[3]);
			formData.append('stage', cur_stage);

			$.ajax({
				url: rest_url,
				type: 'POST',
				//data: "file1="+file1,//+"&file2="+file2,
				data: formData,
				async: false,
				cache: false,
				contentType: false,
				//contentType: 'application/json',
				processData: false,
				success: function(data) {
					//alert("Submit status:" + data['status']);
					var status = "<br><b>Submit Status:</b>" + data['status'] + ", <b>Message:</b>" + data['message'];
					//$("#message").html(status);
					if (data['status'] == "SUCCESS") {
						$("#mt2filejob").val("");
						$("#mt2filelabel").val("");
						$("#uploadextraMTModal").modal('hide');
						var msg = '<p>Hello ' + user + '!File upload has been successful.</p>';
						$('.notify').remove();
						$.notify(msg, {
							type: "success",
							"position": "top",
							delay: 15000
						});
						var msg = 'EBS Transzaar INFO Uploaded extra MT file for taskid in ' + details + '&url=' + rest_url;
						insert_logs(crole, msg);
					} else {
						//var msg = "<p>Something has gone wrong. Please try again...</p>";
						var msg = "<p style=\"direction:ltr;\"> Message:" + data['message'] + "</p>";
						$('.notify').remove();
						$.notify(msg, {
							type: "warning",
							"position": "top",
							delay: 30000
						});
						var msg = 'EBS Transzaar INFO Failure in Uploaded extra MT file for taskid in' + details + ',reason: ' + data.message;
						insert_logs(crole, msg);
					}
					//alert(data['status']+data['message']);                                   
				}
			});
		}
	});
});

//multiple download selected jobs click
$(document).on('click', 'button[id^="downloadStory"]', function(event) {
	if ($.inArray("11", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$("#download-box").modal();
	$(".getfile").hide();
	$(".getzip").show();
	$(".viewstory").hide();
	var singleview = 0;
	var original_flag = 0;
	var param = '';

	var zip = new JSZip();
	/*zip.file("Hello.txt", "Hello World\n");
	var img = zip.folder("images");
	img.file("smile.gif", imgData, {base64: true});
	zip.generateAsync({type:"blob"})
		.then(function(content) {
			// see FileSaver.js
			saveAs(content, "example.zip");
			});*/
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date1 = time.getDate();
	var hour = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	var date = year + "-" + month + "-" + date1 + "-" + hour + "-" + minutes + "-" + seconds;
	$("#getzip,#getzip2").unbind('click').on('click', function() {
		$("#download-box").modal('hide');
		var count = 0;
		var param = '';
		$("input[name='optradio']:checked").each(function() {
			//alert($(this).val());
			var radio_text = $(this).val();
			if (radio_text == "src") {
				param += '&output_type=source';
				singleview = 1;
			} else if (radio_text == "tgt") {
				param += '&output_type=mt';
				singleview = 1;
			} else if (radio_text == "pet") {
				param += '&output_type=postedited';
				singleview = 1;
			} else if (radio_text == "rev") {
				param += '&output_type=reviewed';
				singleview = 1;
			} else if (radio_text == "src-mt") {
				param += '&output_type=source-mt';
			} else if (radio_text == "src-pet") {
				param += '&output_type=source-postedited';
			} else if (radio_text == "src-mt-pet") {
				param += '&output_type=source-mt-postedited';
			} else if (radio_text == "src-mt-rev") {
				param += '&output_type=source-mt-reviewed';
			} else if (radio_text == "src-rev") {
				param += '&output_type=';
			} else if (radio_text == "vieworiginal") {
				original_flag = 1;
				if (original_url != "") {
					window.open(original_url);
				} else {
					alert("Not available");
				}
			} else {
				param += '&output_type=';
			}

		});
		var a = $("#atab2").attr('class');
		if (a == "active") {
			param += '&order=sent';
		} else {
			param += '&order=para';
		}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			//console.log(details);
			var link = '';
			var job_status = details[5];
			//console.log(job_status);
			if (job_status == "review_committed" || job_status == "under_review" || job_status == "review_finished") {
				link = config.downloadRevStory;
			} else {
				link = config.downloadPetStory;
			}

			link += "?" + param + '&user=' + details[4] + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&domain=' + details[3];
			//console.log(link);
			var save_type = $("#savetype-text").val();
			var filename = details[4] + '_' + details[1] + '_' + details[2] + '_' + details[3] + '_' + details[5]; // + '.txt';
			if (typeof save_type != "undefined") {
				filename += save_type;
			} else {
				save_type = '.txt';
				filename += save_type;
			}

			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("GET", link, false); // false for synchronous request
			xmlHttp.send(null);
			var savetext = xmlHttp.responseText;
			var msg = 'EBS MANAGER INFO: Multiple task download;' + filename;
			if (crole == "manager" || crole == "admin") {
				//if (impersonate_by != "") {
				insert_logs(crole, msg);
				//}
			}
			//saveTextAs(savetext, filename, "", "txt");
			var folder = zip.folder(user + '_' + date);
			folder.file(filename, savetext);
			count++;
			//var rest_param2 = 'user=' + user + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&project=' + selproject + '&domain=' + details[3];
		}
		zip.generateAsync({
				type: "blob"
			})
			.then(function(content) {
				//see FileSaver.js
				saveAs(content, user + '_' + date + '_' + count + '.zip');
			});
	});

});

//Mark a job as complete
$(document).on('click', 'button[id^="updateJobComplete"]', function(event) {
	for (var key in selected_items) {
		var id_class = selected_items[key];
		id_class = id_class.replace(/tablerowtrow/, "");
		var details = id_class.split("____");
		var rest_url = config.markComplete;
		var rest_param = 'user=' + user + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&domain=' + details[3];
		doAjax(rest_url, rest_param);
		if (ajax_flag == 1) {
			var trow = 'tablerowtrow' + details[0] + '____' + details[1] + '____' + details[2] + '____' + details[3];
			var td_text = $("tr[id^=" + trow + "] td:eq(5)").html();
			if (/fa-check-square-o/.test(td_text)) {} else {
				$('tr[id^=' + trow + '] td:eq(5)').append(' <i class="fa fa-check-square-o" aria-hidden="true"></i>');
			}
		}
	}
	if (ajax_flag == 1) {
		$('.notify').remove();
		//$.notify(status1,{type:"success","position":"top"});
		$.notify("Selected jobs marked as completed..", {
			type: "success",
			"position": "top",
			"delay": 5000,
			background: "#31b0d5"
		});
		var msg = 'EBS MANAGER INFO: Marked as completed; user=' + user + ',lang_pair=' + details[2] + ',id=' + details[1] + ',domain=' + details[3];
		//if (impersonate_by != "") {
		insert_logs(crole, msg);
		//}
		//showpetjobs(activepage);
		ajax_flag = 0;
	}
});

//Postedit reassign a job
$(document).on('click', 'button[id="petReassign"]', function(event) {
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		startDate: new Date(),
		todayHighlight: true
	});
	//$('.notify').remove();
	//$.notify("Saving all sentences",{type:"success","position":"top", background: "#31b0d5" });
	if (confirm('Are you sure you want to reassign for Postedit? This action cannot be reversed.')) {
		//alert(document.getElementById("time").innerHTML);
	} else {
		return false;
	}
	var editor_users = '';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var emailid = user_roles.users[n].EmailId;
		var lname = user_roles.users[n].lname;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		//    editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
		if (user_roles.users[n].role == "editor") {
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(editor_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Postedit ReAssign multiple jobs");
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").show();
	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//$('#myModal').modal('hide');
		//alert("iam here");
		var fdpettext = $("#fdassigntext").val();
		if (typeof fdpettext == "undefined" || fdpettext == "") {
			alert("Please provide some feedback");
			return false;
		}
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}
		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			var rest_url = config.reassignPetbyManager;
			var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2] + "&reassign_comment=" + fdpettext;
			var mail_param = "user=" + selected_user + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2] + "&type=postedit_assigned";
			var sms_param = selected_user + "\t" + details[1] + "\t" + details[3] + "\t" + details[2] + "\tpostedit_assign";
			if (expected_finish != "") {
				rest_param += '&expected_postedit_finish=' + expected_finish;
			}
			//$('#myModal').modal('hide');
			//alert(rest_param);
			e.preventDefault();
			var mN = $('#sendCommittMail').is(":checked");
			var sN = $('#sendAssignSMS').is(":checked");
			doAjax(rest_url, rest_param);
			var msg = 'EBS MANAGER INFO: Postedit Reassign Task assigned_to=' + selected_user + ',lang_pair=' + details[2] + ',id=' + details[1] + ',domain=' + details[3] + ';type=' + this.id;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			if (mN) {
				sendNotification(mail_param);
			} else {}
			if (sN) {
				sendSMSNotification(sms_param);
			} else {}
			//}
		}
		if (ajax_flag == 1) {
			showpetjobs(activepage);
			ajax_flag = 0;
		}
	});
});
//Review reassign a job
$(document).on('click', 'button[id="revReassign"]', function(event) {
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		startDate: new Date(),
		todayHighlight: true
	});
	//$('.notify').remove();
	//$.notify("Saving all sentences",{type:"success","position":"top", background: "#31b0d5" });
	if (confirm('Are you sure you want to reassign for Review? This action cannot be reversed.')) {
		//alert(document.getElementById("time").innerHTML);
	} else {
		return false;
	}
	var editor_users = '';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var emailid = user_roles.users[n].EmailId;
		var lname = user_roles.users[n].lname;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		//    editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
		if (user_roles.users[n].role == "reviewer") {
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(editor_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("ReAssign multiple jobs");
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").show();
	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//$('#myModal').modal('hide');
		//alert("iam here");
		var fdpettext = $("#fdassigntext").val();
		if (typeof fdpettext == "undefined" || fdpettext == "") {
			alert("Please provide some feedback");
			return false;
		}
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}
		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			var rest_url = config.reassignRevByManager;
			var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2] + "&review_reassign_comment=" + fdpettext;
			var mail_param = "user=" + selected_user + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2] + "&type=review_assigned";
			var sms_param = selected_user + "\t" + details[1] + "\t" + details[3] + "\t" + details[2] + "\treview_assign";
			if (expected_finish != "") {
				rest_param += '&expected_review_finish=' + expected_finish;
			}
			//$('#myModal').modal('hide');
			//alert(rest_param);
			e.preventDefault();
			var mN = $('#sendCommittMail').is(":checked");
			var sN = $('#sendAssignSMS').is(":checked");
			doAjax(rest_url, rest_param);
			var msg = 'EBS MANAGER INFO: Review Reassign Task assigned_to=' + selected_user + ',lang_pair=' + details[2] + ',id=' + details[1] + ',domain=' + details[3] + ';type=' + this.id;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			if (mN) {
				sendNotification(mail_param);
			} else {}
			if (sN) {
				sendSMSNotification(sms_param);
			} else {}
			//}
		}
		if (ajax_flag == 1) {
			showpetjobs(activepage);
			ajax_flag = 0;
		}
	});
});

//Uncommit postedit job
$(document).on('click', 'button[id^="petUnCommitt"],button[id^="revUnCommitt"]', function(event) {
	for (var key in selected_items) {
		var id_class = selected_items[key];
		id_class = id_class.replace(/tablerowtrow/, "");
		var details = id_class.split("____");
		var rest_url = '';
		if (this.id == "petUnCommitt") {
			rest_url = config.uncommittPetJob;
		} else if (this.id == "revUnCommitt") {
			rest_url = config.uncommittRevJob;
		} else {
			return;
		}
		var rest_param = 'user=' + user + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&domain=' + details[3];
		doAjax(rest_url, rest_param);
	}
	if (ajax_flag == 1) {
		showpetjobs(activepage);
		ajax_flag = 0;
		var msg = 'EBS MANAGER INFO: Uncommit task=' + user + ',lang_pair=' + details[2] + ',id=' + details[1] + ',domain=' + details[3] + ';type=' + this.id;
		//if (impersonate_by != "") {
		insert_logs(crole, msg);
		//}
	}

});

//Recover a job from trash
$(document).on('click', 'button[id^="recoverTrash"]', function(event) {
	//console.log(selected_items);
	for (var key in selected_items) {
		var id_class = selected_items[key];
		id_class = id_class.replace(/tablerowtrow/, "");
		var details = id_class.split("____");
		var rest_url = config.recoverTrash;
		var rest_param = 'user=' + user + '&lang_pair=' + details[2] + '&taskid=' + details[1] + '&domain=' + details[3];
		doAjax(rest_url, rest_param);
	}
	if (ajax_flag == 1) {
		showpetjobs(activepage);
		var msg = 'EBS MANAGER INFO: Recover trash user=' + user + ',lang_pair=' + details[2] + ',id=' + details[1] + ',domain=' + details[3];
		//if (impersonate_by != "") {
		insert_logs(crole, msg);
		//}
		ajax_flag = 0;
	}
});

//Multiple Postedit assign
$(document).on('click', 'button[id^="assignPetMultiple"]', function(event) {
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}

	//console.log(selected_items);
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		startDate: new Date(),
		todayHighlight: true
	});
	//alert(jid+lpair+dmn);
	var editor_users = '';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var lname = user_roles.users[n].lname;
		var emailid = user_roles.users[n].EmailId;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
		if (user_roles.users[n].role == "editor") {
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(editor_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Assign Multiple PE jobs ");
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").hide();

	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//$('#myModal').modal('hide');
		//alert("iam here");
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}
		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		var rest_url = config.assignJob;
		var param = "user=" + selected_user + "&admin=" + user;
		if (expected_finish != "") {
			param += '&expected_postedit_finish=' + expected_finish;
		}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			//console.log(id_class);
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			var rest_param = param + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2];
			var mail_param = "user=" + selected_user + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2] + "&type=postedit_assigned";
			var sms_param = selected_user + "\t" + details[1] + "\t" + details[3] + "\t" + details[2] + "\tpostedit_assign";
			//console.log(id_class);
			var mN = $('#sendCommittMail').is(":checked");
			var sN = $('#sendAssignSMS').is(":checked");
			doAjax(rest_url, rest_param);
			if (ajax_flag == 1) {
				//showpetjobs(activepage);
				var trow = 'tablerowtrow' + details[0] + '____' + details[1] + '____' + details[2] + '____' + details[3];
				$('tr[id^=' + trow + '] td:eq(4)').html('Postedit Assigned (' + selected_user + ' )  <!--<a title="cancel" id="petunassigntrow' + selected_user + '____' + details[1] + '____' + details[2] + '____' + details[3] + '"><i class="fa fa-undo" aria-hidden="true"></i>--></a>');
				$('tr[id^=' + trow + '] td:eq(8)').html('<a title="cancel" id="petunassigntrow' + selected_user + '____' + details[1] + '____' + details[2] + '____' + details[3] + '"><i class="fa fa-undo" aria-hidden="true"></i></a>');
				if (ajax_flag == 1) {
					ajax_flag = 0;
					var msg = 'EBS MANAGER INFO: Postedit Assign (Multiple)id=' + details[1] + ',langpair=' + details[2] + ',domain=' + details[3] + ',assigned_to=' + selected_user;
					//if (impersonate_by != "") {
					insert_logs(crole, msg);
					if (mN) {
						//console.log(mail_param);
						sendNotification(mail_param);
					} else {}
					if (sN) {
						sendSMSNotification(sms_param);
					} else {}
					//}
					/*var mail_url = config.sendMail;
					doAjax(mail_url, mail_param);
					ajax_flag = 0;*/
				}
			}
		}
		showpetjobs(activepage);
	});
});

//Multiple Review assign
$(document).on('click', 'button[id^="assignRevMultiple"]', function(event) {
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	//console.log(selected_items);
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		startDate: new Date(),
		todayHighlight: true
	});
	//alert(jid+lpair+dmn);
	var editor_users = '';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var emailid = user_roles.users[n].EmailId;
		var lname = user_roles.users[n].lname;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		if (user_roles.users[n].role == "reviewer") {
			// editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(editor_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Assign Multiple Review jobs");
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").hide();

	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//$('#myModal').modal('hide');
		//alert("iam here");
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}
		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		var rest_url = config.assignRevJob;
		var param = "user=" + selected_user + "&admin=" + user;
		if (expected_finish != "") {
			param += '&expected_review_finish=' + expected_finish;
		}
		for (var key in selected_items) {
			var id_class = selected_items[key];
			id_class = id_class.replace(/tablerowtrow/, "");
			var details = id_class.split("____");
			var rest_param = param + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2];
			var mail_param = "user=" + selected_user + "&taskid=" + details[1] + "&domain=" + details[3] + "&lang_pair=" + details[2] + "&type=review_assigned";
			var sms_param = selected_user + "\t" + details[1] + "\t" + details[3] + "\t" + details[2] + "\treview_assign";
			var mN = $('#sendCommittMail').is(":checked");
			var sN = $('#sendAssignSMS').is(":checked");
			doAjax(rest_url, rest_param);
			if (ajax_flag == 1) {
				var trow = 'tablerowtrow' + details[0] + '____' + details[1] + '____' + details[2] + '____' + details[3];
				//  $('tr[id^=' + trow + '] td:eq(4)').html('Review Assigned (' + selected_user + ' )  <!--<a title="cancel" id="petunassigntrow' + selected_user + '____' + details[1] + '____' + details[2] + '____' + details[3] + '"><i class="fa fa-undo" aria-hidden="true"></i>--></a>');
				//    $('tr[id^=' + trow + '] td:eq(8)').html('<a title="cancel" id="revunassigntrow' + selected_user + '____' + details[1] + '____' + details[2] + '____' + details[3] + '"><i class="fa fa-undo" aria-hidden="true"></i></a>');
				ajax_flag = 0;
				var msg = 'EBS MANAGER INFO: Review Assign (Multiple)id=' + details[1] + ',langpair=' + details[2] + ',domain=' + details[3] + ',assigned_to=' + selected_user;
				//if (impersonate_by != "") {
				insert_logs(crole, msg);
				if (mN) {
					sendNotification(mail_param);
				} else {}
				if (sN) {
					sendSMSNotification(sms_param);
				} else {}
				//}
			}
		}
		showpetjobs(activepage);
	});
});
//create new task from existing task
$(document).on('click', 'button[id^="createChildTask"]', function(event) {
	$("#createChildTaskModal").modal();
	$('.dialogdrag').draggable({
		handle: ".modal-header",
		cursor: "move",
		containment: '#createChildTaskModal'
	});

	var id_class = '';
	for (var key in selected_items) {
		id_class = selected_items[key];
		//console.log(id_class);
	}

	var task_details = id_class.split("____");
	//$("#createChildTaskModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("New task creation from Task Id: " + task_details[1] + ", Language: " + task_details[2]);
	$("#createChildTaskModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("New task from Id: " + task_details[1]);
	var schildlang = task_details[2];
	$("#childTaskflang > option").each(function() {
		//alert(this.text + ' ' + this.value);
		var rg1 = new RegExp(task_details[2].split("_")[0]);
		var rg2 = new RegExp(task_details[2].split("_")[1]);
		if (!rg1.test(this.value) && !rg2.test(this.value)) {
			var itemToDisable = $(this);
			$(this).hide();
			//	itemToDisable.attr("disabled",true);
		} else {
			var itemToDisable = $(this);
			$(this).show();
			//itemToDisable.attr("disabled",false);
		}
	});
	$('#childTaskflang').trigger("chosen:updated");
	$("#childTaskflang").on("change", function() {
		var cslang = $(this).val();
		if (typeof cslang != "undefined" && cslang != "") {
			if (cslang == task_details[2].split("_")[0]) {
				$("#childTasksrcType").prop("checked", true);
				$("#childTasktgtType").prop("checked", false);
			} else {
				$("#childTasktgtType").prop("checked", true);
				$("#childTasksrcType").prop("checked", false);
			}
		}
	});
});

//remind committ button click
$(document).on('click', 'button[id^="remindCommitt"]', function(event) {
	for (var key in selected_items) {
		if (selected_items[key] == 'postedit_finished') {
			var jd = moreobj.stats[key];
			var petby = jd.petby;
			petby = petby.charAt(0).toUpperCase() + petby.slice(1); //convert first letter to uppercase
			var email = getEmail(petby);
			//console.log(jd);
			//alert(jd.jobId+jd.from_to+jd.domain+jd.petby);
			commitJobReminder(jd.jobId, jd.from_to, jd.domain, email, petby);
		} else if (selected_items[key] == 'review_finished') {}
	}
});

//getEmail function
function getEmail(name) {
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		if (fuser == name) {
			return user_roles.users[n].EmailId;
		}
	}
}

//Commit job reminder
function commitJobReminder(jid, fto, dmn, emailid, ln) {
	var rest_url = "http://localhost/ebhashalsp/scripts/commitReminder.php";
	var param = "jobid=" + jid + "&langpair=" + fto + "&domain=" + dmn + "&emailid=" + emailid + "&name=" + ln
	var ret = doAjax(rest_url, param);
	$("#remindCommitt").hide();
}
//edit/view button click
$(document).on('click', 'td[id^="trow"]', function(event) {
	if ($.inArray("4", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}

	var curid = this.id;
	job_id = curid.replace(/trow/, "");
	$(".goback").show();
	$(".bottomdiv").show();
	$("#ptcontent").show();
	$(".topheader").show();
	$(".stmenu").show();
	$("#jumpdiv").hide();
	loadpet(job_id);
	//$("#jtog").click();
	$("#showhidedoubt").show();
	triggerChange();
	/*$('html, body').animate({
		scrollTop: $("#demo").offset().top
	}, 1000);*/
	//	alert(curid);
});

//managerview click
$(document).on('click', 'i[id^="managerview"],td[id^="managerview"],td[id^="adminview"],td[id^="posteditview"],td[id^="reviewview"]', function(event) {
	var viewid = this.id;
	//alert(viewid);
	if (/managerviewpet/.test(viewid)) {
		eflag = 1;
		viewid = viewid.replace(/managerviewpettrow/, "");
		$(".rev").hide();
		$(".srcrev").hide();
		$(".srcmtrev").hide();
	} else if (/adminviewtrow/.test(viewid)) {
		eflag = 2;
		viewid = viewid.replace(/adminviewtrow/, "");
		$(".rev").hide();
		$(".srcrev").hide();
		$(".srcmtrev").hide();
	} else if (/posteditviewtrow/.test(viewid)) {
		eflag = 3;
		viewid = viewid.replace(/posteditviewtrow/, "");
		$(".rev").hide();
		$(".srcrev").hide();
		$(".srcmtrev").hide();
	} else if (/reviewviewtrow/.test(viewid)) {
		eflag = 4;
		viewid = viewid.replace(/reviewviewtrow/, "");
		$(".rev").hide();
		$(".srcrev").hide();
		$(".srcmtrev").hide();
	} else {
		eflag = 0;
		viewid = viewid.replace(/managerviewrevtrow/, "");
		$(".rev").show();
		$(".srcrev").show();
		$(".srcmtrev").show();
	}
	job_id = viewid;
	var ar = job_id.split("____");
	var jobid = ar[1];
	lang_pair = ar[2];
	//user = ar[0];
	dom = ar[3];
	$("#jumpdiv").hide();
	$(".goback").show();
	$(".bottomdiv").show();
	$("#ptcontent").show();
	$(".topheader").show();
	$(".stmenu").show();
	loadpet(job_id);
	$(".bottomdiv").show();
	var lp = lang_pair.split("_");
	$("#srcdict").val(lp[0]);
	$("#tgtdict").val(lp[1]);
	$("#srctrans").val(lp[0]);
	$("#tgttrans").val(lp[1]);
	$("#domdict").val('all');
	//$("#domdict").val(dom);
	$("#syndictselect").val(lp[1]);
	$("#syndomdict").val(dom);
	$("#showhidedoubt").show();
	$("#storytoolbar").show();
	triggerChange();

	//alert(this.id);
});
$(document).on('click', 'i[id^="view"]', function(event) {
	var curid = this.id;
	job_id = curid.replace(/viewtrow/, "");
	$(".getfile").hide();
	$(".getzip").hide();
});

//resubmit for translation if mt failed
$(document).on('click', "a[id^='resubmitfortranslation']", function() {
    var rid = this.id;
    //console.log(rid);
    var mtType = $(this).attr("class");
    rid = rid.replace(/resubmitfortranslation/g, "");
    var vals = rid.split("____");
    var jid = vals[1];
    var lpair = vals[2];
    var dmn = vals[3];

    /*var assign_url = config.assignJob;
    var assign_param = "user=" + user + "&admin=" + user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair;
    doAjax(assign_url, assign_param);*/
    $('.notify').remove();

    if (confirm("This task will be Resubmitted for translation!!")) {} else {
        return;
    }
    var rurl = config.reSubmitForTranslationManager;
    var rparam = 'user=' + user + '&lang_pair=' + lpair + '&domain=' + dmn + '&taskid=' + jid + '&mt_type=' + mtType;
	//console.log(rparam);
    doAjax(rurl, rparam);
    if (ajax_flag == 1) {
        $('.notify').remove();
        $.notify("Task submited for Translation!", {
            "postion": "top",
            "type": "danger"
        });
        showpetjobs(activepage);
        ajax_flag = 0;
    }
});

//initial assign to posteditor button click 
$(document).on('click', "a[id^='assigntrow']", function() {
	//console.log($.inArray("5____assign_task",permissions));
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		startDate: new Date(),
		todayHighlight: true
	});
	//alert(this.id);
	var bid = this.id;
	var trow = bid.replace(/assign/, "tablerow");
	bid = bid.replace(/assigntrow/, "");
	//alert(bid);
	var vals = bid.split("____");
	var jid = vals[1];
	var lpair = vals[2];
	var dmn = vals[3];
	//alert(jid+lpair+dmn);
	var editor_users = '';
	editor_users = '<option value="">Select Editor</option>';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var emailid = user_roles.users[n].EmailId;
		var lname = user_roles.users[n].lname;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
		if (user_roles.users[n].role == "editor") {
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(editor_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Assign job " + jid + " of " + lpair + " of " + dmn);
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	if ($('#sendAssignSMS').is(":checked")) {
		$("#sendAssignSMS").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").hide();

	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//$('#myModal').modal('hide');
		//alert("iam here");
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}
		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);
		}
		var rest_url = config.assignJob;
		var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair;
		var mail_param = "user=" + selected_user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair + "&type=postedit_assigned";
		var sms_param = selected_user + "\t" + jid + "\t" + dmn + "\t" + lpair + "\tpostedit_assign";
		if (expected_finish != "") {
			rest_param += '&expected_postedit_finish=' + expected_finish;
		}

		//$('#myModal').modal('hide');
		//alert(rest_param);
		e.preventDefault();
		var mN = $('#sendCommittMail').is(":checked");
		var sN = $('#sendAssignSMS').is(":checked");
		doAjax(rest_url, rest_param);
		//ajax_flag = 1;
		if (ajax_flag == 1) {
			//$('#jtable').dataTable().fnUpdate('Assigned ('+selected_user+' )', $('tr#'+trow)[0], 2, false );
			//$('tr[id^=' + trow + '] td:eq(4)').html('Assigned (' + selected_user + ' )  <!--<a title="cancel" id="petunassigntrow' + selected_user + '____' + jid + '____' + lpair + '____' + dmn + '"><i class="fa fa-undo" aria-hidden="true"></i>--></a>');
			//$('tr[id^=' + trow + '] td:eq(8)').html('<a title="cancel" id="petunassigntrow' + selected_user + '____' + jid + '____' + lpair + '____' + dmn + '"><i class="fa fa-undo" aria-hidden="true"></i></a>');
			//$('#jtable').dataTable().fnUpdate("Assigned", $('tr#'+trow)[0], 3, false );
			ajax_flag = 0;
			/*var mail_url = config.sendMail;
			doAjax(mail_url, mail_param);*/
			ajax_flag = 0;
			var msg = 'EBS MANAGER INFO: Postedit Assign id=' + jid + ',langpair=' + lpair + ',domain=' + dmn + ',assigned_to=' + selected_user;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			if (mN) {
				sendNotification(mail_param);
			} else {}
			if (sN) {
				sendSMSNotification(sms_param);
			} else {}
			//}
		}
		showpetjobs(activepage);
	});
});

//Assign to Review
$(document).on('click', "a[id^='revassign']", function() {
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		startDate: new Date(),
		todayHighlight: true
	});

	//alert(this.id);
	var bid = this.id;
	var trow = bid.replace(/revassign/, "tablerow");
	var list_item = bid.replace(/revassign/, "revunassign");
	bid = bid.replace(/revassigntrow/, "");
	//alert(bid);
	var vals = bid.split("____");
	var jid = vals[1];
	var lpair = vals[2];
	var dmn = vals[3];
	//alert(jid+lpair+dmn);

	var reviewer_users = '';
	reviewer_users = '<option value="">Select Reviewer</option>';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var emailid = user_roles.users[n].EmailId;
		var lname = user_roles.users[n].lname;
		if (user_roles.users[n].role == "reviewer") {
			//reviewer_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
			//reviewer_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
			reviewer_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(reviewer_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$(".chosen-select").chosen({
		'width': '35%',
		allow_single_deselect: true
	});
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Review Assign job " + jid + " of " + lpair + " of " + dmn);
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").hide();

	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//alert("iam here");
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}

		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		var rest_url = config.assignRevJob;
		var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair;
		var mail_param = "user=" + selected_user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair + "&type=review_assigned";
		var sms_param = selected_user + "\t" + vals[1] + "\t" + vals[3] + "\t" + vals[2] + "\treview_assign";
		if (expected_finish != "") {
			rest_param += '&expected_review_finish=' + expected_finish;
		}
		//$('#myModal').modal('hide');
		//alert(rest_param);
		e.preventDefault();
		var mN = $('#sendCommittMail').is(":checked");
		var sN = $('#sendAssignSMS').is(":checked");
		doAjax(rest_url, rest_param);
		if (ajax_flag == 1) {
			//    $('tr[id^=' + trow + '] td:eq(4)').html('Assigned (' + selected_user + ' ) <!-- <a title="cancel" id="revunassigntrow' + selected_user + '____' + jid + '____' + lpair + '____' + dmn + '"><i class="fa fa-undo" aria-hidden="true"></i>--></a>');
			//  $('tr[id^=' + trow + '] td:eq(8)').html('<a title="cancel" id="revunassigntrow' + selected_user + '____' + jid + '____' + lpair + '____' + dmn + '"><i class="fa fa-undo" aria-hidden="true"></i></a>');
			//$('#jtable').dataTable().fnUpdate('Assigned('+ selected_user+')', $('tr#'+trow)[0], 5, false );
			ajax_flag = 0;
			var msg = 'EBS MANAGER INFO: Review Assign id=' + jid + ',langpair=' + lpair + ',domain=' + dmn + ',assigned_to=' + selected_user;
			insert_logs(crole, msg);
			if (mN) {
				sendNotification(mail_param);
			} else {}
			if (sN) {
				sendSMSNotification(sms_param);
			} else {}
		}
		showpetjobs(activepage);
	});
});

//reassignto posteditor button click (marked by reviewer)
$(document).on('click', "a[id^='posteditreassigntrow']", function() {
	if ($.inArray("5", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$('#assignexpectedfinish').datepicker({
		autoclose: true,
		format: 'dd-M-yyyy',
		todayHighlight: true
	});
	//alert(this.id);
	var bid = this.id;
	var trow = bid.replace(/posteditreassign/, "tablerow");
	bid = bid.replace(/assigntrow/, "");
	//alert(bid);
	var vals = bid.split("____");
	var jid = vals[1];
	var lpair = vals[2];
	var dmn = vals[3];
	//alert(jid+lpair+dmn);
	var editor_users = '';
	for (var n = 0; n < user_roles.users.length; n++) {
		var fuser = user_roles.users[n].user;
		var fname = user_roles.users[n].fname;
		var emailid = user_roles.users[n].EmailId;
		var lname = user_roles.users[n].lname;
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
		//editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
		if (user_roles.users[n].role == "editor") {
			editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
		}
	}
	//console.log(editor_users);
	$("#assignuser").html(editor_users);
	$("#assignuser").chosen({
		'width': '85%',
		allow_single_deselect: true
	});
	$('#assignuser').trigger("chosen:updated");
	$("#myModal").modal();
	$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Assign job " + jid + " of " + lpair + " of " + dmn);
	if ($('#sendCommittMail').is(":checked")) {
		$("#sendCommittMail").attr("checked", false); //uncheck if already checked
	} else {}
	$("#fdassigntext").hide();
	//assignjob btn click for selected job
	$("#assignbtn").unbind("click").on("click", function(e) {
		//$('#myModal').modal('hide');
		//alert("iam here");
		var selected_user = $("#assignuser").val();
		if (typeof selected_user == "undefined" || selected_user == "") {
			alert("Please select a user!!");
			return false;
		}
		var rest_url = config.reassignPet;
		var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair;
		var mail_param = "user=" + selected_user + "&taskid=" + jid + "&domain=" + dmn + "&lang_pair=" + lpair + "&type=postedit_assigned";
		var sms_param = selected_user + "\t" + vals[1] + "\t" + vals[3] + "\t" + vals[2] + "\tpostedit_assign";
		var expected_finish = $("#assignexpectedfinish").val();

		if (typeof expected_finish != "undefined" && expected_finish != "") {
			expected_finish = expected_finish.toLowerCase();
			var tempdate = expected_finish.split("-");
			var map = {
				jan: "01",
				feb: "02",
				mar: "03",
				apr: "04",
				may: "05",
				june: "06",
				jun: "06",
				july: "07",
				jul: "07",
				aug: "08",
				sep: "09",
				oct: "10",
				nov: "11",
				dec: "12"
			};
			var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
			expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

		}
		if (expected_finish != "") {
			rest_param += '&expected_postedit_finish=' + expected_finish;
		}
		//$('#myModal').modal('hide');
		//alert(rest_param);
		e.preventDefault();
		var mN = $('#sendCommittMail').is(":checked");
		var sN = $('#sendAssignSMS').is(":checked");
		doAjax(rest_url, rest_param);
		if (ajax_flag == 1) {
			//$('#jtable').dataTable().fnUpdate('Assigned ('+selected_user+' )', $('tr#'+trow)[0], 2, false );
			$('tr[id^=' + trow + '] td:eq(4)').html('Assigned (' + selected_user + ' )  <!--<a title="cancel" id="petunassigntrow' + selected_user + '____' + jid + '____' + lpair + '____' + dmn + '"><i class="fa fa-undo" aria-hidden="true"></i>--></a>');
			$('tr[id^=' + trow + '] td:eq(8)').html('<a title="cancel" id="petunassigntrow' + selected_user + '____' + jid + '____' + lpair + '____' + dmn + '"><i class="fa fa-undo" aria-hidden="true"></i></a>');
			//$('#jtable').dataTable().fnUpdate("Assigned", $('tr#'+trow)[0], 3, false );
			ajax_flag = 0;
			var msg = 'EBS MANAGER INFO: Postedit ReAssign marked by reviewer id=' + jid + ',langpair=' + lpair + ',domain=' + dmn + ',assigned_to=' + selected_user;
			insert_logs(crole, msg);
			if (mN) {
				sendNotification(mail_param);
			} else {}
			if (sN) {
				sendSMSNotification(sms_param);
			} else {}
		}

	});
});
//download button click
$(document).on('click', "td[id^='tdow']", function() {
	/*$("#download-box").dialog({
		"position":{ my: "center", at: "center",of:document}
		});
		$('html, body').animate({
		scrollTop: $(".ui-dialog").offset().top
		}, 100);*/
	$(".getfile").show();
	$(".getzip").hide();
	$(".viewstory").show();
	$("#download-box").modal();
	$(".pet").show();
	$(".src").show();
	$(".mt").show();
	$(".rev").show();
	$(".srcmtrev").show();
	$(".srcrev").show();
	$(".srcmtpet").show();
	$(".srcpet").show();
	$(".srcmt").show();
	$(".original").hide();
	var did = this.id;
	did = did.replace(/tdowtrow/, "");
	job_id = did;
	if (job_id.split("____")[4] == "available_to_review" || job_id.split("____")[4] == "unassigned" || job_id.split("____")[4] == "submitted") {
		eflag = 1;
		$(".rev").hide();
		if(job_id.split("____")[4] == "unassigned") {
		$(".pet").hide();
		} else {
		$(".pet").show();
		}
		$(".srcrev").hide();
		$(".srcmtrev").hide();
	} else {
		eflag = 0;
		$(".pet").show();
		//$(".srcpet").hide();
		$(".rev").show();
		$(".srcrev").show();
		$(".srcmtrev").show();
	}
});

//delete button click to delete a story
$(document).on('click', "td[id^='deletestory']", function() {
	if ($.inArray("13", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}

	if (confirm('Are you sure you want to delete story?')) {
		//alert(document.getElementById("time").innerHTML);
	} else {
		return false;
	}
	if (confirm('Click Ok to confirm....')) {
		//alert(document.getElementById("time").innerHTML);
	} else {
		return false;
	}

	//var table = $("#jtable").DataTable();
	var delid = this.id;
	var tablerowdelid = delid.replace(/deletestorytrow/, "tablerowtrow");
	delid = delid.replace(/deletestorytrow/, "");
	var arr = delid.split("____");
	var rest_param = "user=" + arr[0] + "&taskid=" + arr[1] + "&lang_pair=" + arr[2] + "&domain=" + arr[3];
	var rest_url = config.deleteStoryByAdmin;
	doAjax(rest_url, rest_param);
	if (ajax_flag == 1) {
		var row = this.parentNode;
		//row.parentNode.parentNode.removeChild(row);
		$("#" + tablerowdelid).next().remove();
		$("#" + tablerowdelid).remove();
		var msg = 'EBS MANAGER INFO: Delete task id=' + arr[1] + ',langpair=' + arr[2] + ',domain=' + arr[3];
		//if (impersonate_by != "") {
		insert_logs(crole, msg);
		//}
		ajax_flag = 0;
		/*  var rowindex = row.rowIndex;
		  ajax_flag = 0;
		  total = total - 1;
		  var tp = Math.ceil(total / 10);
		  $('#pagination').twbsPagination('destroy');
		  $('#pagination').twbsPagination({
			  totalPages: tp,
			  visiblePages: 4,
			  onPageClick: function(event, page) {
				  $('#page-content').text('Page ' + page);
				  showpetjobs(page);
			  }
		  });*/

	}

});

//getting details of a job
$(document).on('click', "td[id^='details'],td[id^='jobdetails']", function() {
	var detid = this.id;
	var num = detid.replace(/details/, "");
	num = num.replace(/job/, "");
	//console.log(moreobj.stats[num]);
	//console.log(moreobj);
	var jd = moreobj.stats[num];
	var tr = $(this).closest('tr');
	var trid = tr.attr('id');
	/*trid = trid.replace(/(@)/g, "\\$1");
	trid = trid.replace(/(\.)/g, "\\$1");
	trid = trid.replace(/( )/g, "\\$1");*/
	//trid = encodeURIComponent(trid);
	//alert(tr.attr('class'));
	if (/shown/.test(tr.attr('class'))) {
		//$("#"+trid+" table.childtable").hide();
		$("table.childtable").parent().remove();
		tr.removeClass('shown');
	} else {
		//hide opened details
		$("table.childtable").parent().remove();
		$("tr").each(function(i) {
			$(this).removeClass("shown");
		});

		// Open this row
		//row.child( formattable(jd) ).show();
		//trid = trid.replace(/[^\w\s]/gi, '\\$&')
		//	alert(trid);
		//jQuery("#" + trid).after(formattable(jd));
		jQuery('tr[id="' + trid + '"]').after(formattable(jd));
		tr.addClass('shown');
	}
});

//initial unassignto posteditor button click 
$(document).on('click', "a[id^='petunassigntrow'],a[id^='revunassigntrow']", function() {
	if ($.inArray("23", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}

	if (confirm('Are you sure you want to unassign the job?Current state data will be lost, this action cannot be reverted.')) {} else {
		return false;
	}
	if (confirm('Please click Ok to confirm')) {} else {
		return false;
	}

	//alert(this.id);
	if ((/petunassigntrow/).test(this.id)) {
		var bid = this.id;
		var list_item = bid.replace(/petunassign/, "assign");
		bid = bid.replace(/petunassigntrow/, "");
		//alert(bid);
		var vals = bid.split("____");
		var jid = vals[1];
		var lpair = vals[2];
		var dm = vals[3];
		var suser = vals[0];
		var resturl = config.unassignPetJob;
		//var restparam = "lang_pair=" + lpair + "&domain=" + dm + "&user=" + suser + "&taskid=" + jid + "&admin=" + user;
		var restparam = "lang_pair=" + lpair + "&domain=" + dm + "&user=" + user + "&taskid=" + jid;
		restparam += '&canceltype=postedit';
		var trow = "tablerowtrow" + user + '____' + jid + '____' + lpair + '____' + dm;
		doAjax(resturl, restparam);
		if (ajax_flag == 1) {
			//$("tr[id^=" + trow + '] td:eq(4)').html('<a id="assigntrow' + user + '____' + jid + '____' + lpair + '____' + dm + '">Pet Assign to</a>');
			//$("#" + this.id).addClass("disableddiv");
			var msg = 'EBS MANAGER INFO: Cancel Task user=' + user + ',lang_pair=' + lpair + ',id=' + jid + ',domain=' + dm + ';type=' + this.id;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			showpetjobs(activepage);
			//}
		}
	} else if ((/revunassigntrow/).test(this.id)) {
		var bid = this.id;
		var list_item = bid.replace(/revunassign/, "revassign");
		bid = bid.replace(/revunassigntrow/, "");
		//alert(bid);
		var vals = bid.split("____");
		var jid = vals[1];
		var lpair = vals[2];
		var dm = vals[3];
		var suser = vals[0];
		var resturl = config.unassignRevJob;
		//var restparam = "lang_pair=" + lpair + "&domain=" + dm + "&user=" + suser + "&taskid=" + jid + "&admin=" + user;
		var restparam = "lang_pair=" + lpair + "&domain=" + dm + "&user=" + user + "&taskid=" + jid;
		restparam += '&canceltype=review';
		var trow = "tablerowtrow" + user + '____' + jid + '____' + lpair + '____' + dm;
		doAjax(resturl, restparam);
		if (ajax_flag == 1) {
			//$("#"+trow+ ' td:eq(6)').html('<a id="'+list_item + '">Review Assign to</a>');
			//$("tr[id^=" + trow + '] td:eq(4)').html('<a id="revassigntrow' + user + '____' + jid + '____' + lpair + '____' + dm + '"><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i> </span> Review Assign to</a>');
			//$("#" + this.id).addClass("disableddiv");
			var msg = 'EBS MANAGER INFO: Cancel Task user=' + user + ',lang_pair=' + lpair + ',id=' + jid + ',domain=' + dm + ';type=' + this.id;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			showpetjobs(activepage);
			//}
		}
	}
});

//update priority button click 
$(document).on('click', "a[id^='updateprioritytrow']", function() {
	if ($.inArray("24", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	var old_priority = '';
	if (this.title == "Put on hold for source verification") {
		old_priority = "4";
	}
	//alert(this.id);
	var bid = this.id;
	var list_item = bid.replace(/updatepriority/, "");
	bid = bid.replace(/updatepriorityrow/, "");
	//alert(bid);
	var vals = bid.split("____");
	var jid = vals[1];
	var lpair = vals[2];
	var dm = vals[3];
	var suser = vals[0];
	$("#priorityModal").modal();
	$("#priorityModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Update priority of task id " + jid + " (" + lpair + ")");

	$("#updatepribtn").unbind("click").on("click", function(e) {
		//alert("iam here");
		var selected_pri = $("#editpriority").val();
		if (typeof selected_pri == "undefined" || selected_user == "") {
			alert("Please select priority!!");
			return false;
		}
		var resturl = config.updatePriority;
		var restparam = "lang_pair=" + lpair + "&domain=" + dm + "&user=" + user + "&taskid=" + jid + "&priority=" + selected_pri;
		doAjax(resturl, restparam);
		var trow = "tablerowtrow" + user + '____' + jid + '____' + lpair + '____' + dm;
		if (ajax_flag == 1) {
			if (selected_pri == "1") {
				$("tr[id^=" + trow + '] td:eq(9)').html('<a id="updateprioritytrow' + user + '____' + jid + '____' + lpair + '____' + dm + '" title="High Priority"><i style="color:red;" class="fa fa-arrow-up"></i></a>');
			} else if (selected_pri == "2") {
				$("tr[id^=" + trow + '] td:eq(9)').html('<a id="updateprioritytrow' + user + '____' + jid + '____' + lpair + '____' + dm + '" title="Medium Priority"><i style="color:orange;" class="fa fa-arrow-up"></i></a>');
			} else if (selected_pri == "4") {
				$("tr[id^=" + trow + '] td:eq(9)').html('<a id="updateprioritytrow' + user + '____' + jid + '____' + lpair + '____' + dm + '" title="Put on Hold"><i style="color:#ddd;" class="fa fa-times-circle-o"></i></a>');
			} else {
				$("tr[id^=" + trow + '] td:eq(9)').html('<a id="updateprioritytrow' + user + '____' + jid + '____' + lpair + '____' + dm + '" title="Low Priority"><i style="color:#ddd;" class="fa fa-arrow-up"></i></a>');
			}
			var msg = 'EBS MANAGER INFO: Updated priority id=' + jid + ',langpair=' + lpair + ',domain=' + dm;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			//}
		}
		if (old_priority == "4" && selected_pri != "4") {
			var trid = $("tr[id^=" + trow + "").attr("id");
			var euser = trid.split("____")[4];
			ajax_flag = 0;
			var rurl = config.markSrcValidationByPet;
			var rparam = "lang_pair=" + lpair + "&domain=" + dm + "&user=" + euser + "&taskid=" + jid + "&validate_source_content_flag=false";
			doAjax(rurl, rparam);
		}
		$("#priorityModal").modal('hide');
	});
});

function formattable(d) {
	var prior = d.priority;
	var wc = d.wordcount;
	var desc = d.description;
	var fname = d.fname;
	var domain = d.domain;
	var fromto = d.from_to;
	var domain = d.domain;
	var fromto = d.from_to;
	var petby = d.petby;
	var revby = d.revby;
	var more_taskid = d.taskid;
	var reassign_feedback = d.reassign_feedback;
	var review_reassign_feedback = d.review_reassign_feedback;
	var refeedback = '';
	var pefeedback = '';
	//console.log(d.revtime);
	if (typeof prior == "undefined" || prior == "undefined") {
		prior = "medium";
	} else {
		if (prior == "1") {
			prior = "high";
		} else if (prior == "2") {
			prior = "medium";
		} else {
			prior = "low";
		}
	}
	if (typeof wc == "undefined" || wc == "undefined") {
		wc = "";
	}
	if (typeof petby == "undefined" || petby == "undefined" || petby == "") {
		petby = "";
	} else {
		if (/,/.test(petby)) {
			var a = petby.split(",");
			petby = '';
			for (var p = 0; p < a.length; p++) {
				petby += getLastFirstName(a[p]) + "<b>,</b> ";
			}
		} else {
			petby = getLastFirstName(petby);
		}
		if (typeof petby != "undefined") {
			petby = petby.replace(/<b>,<\/b> $/g, "");
		}
	}
	if (typeof revby == "undefined" || revby == "undefined" || revby == "") {
		revby = "";
	} else {
		if (/,/.test(revby)) {
			var a = revby.split(",");
			revby = '';
			for (var p = 0; p < a.length; p++) {
				revby += getLastFirstName(a[p]) + "<b>,</b> ";
			}
		} else {
			revby = getLastFirstName(revby);
		}
		if (typeof revby != "undefined") {
			revby = revby.replace(/<b>,<\/b> $/g, "");
		}
	}
	if (typeof desc == "undefined" || desc == "undefined") {
		desc = "If your description is not shown here, we will update it soon...";
	}
	if (typeof fname == "undefined" || fname == "undefined") {
		fname = "If your filename is not shown here, we will update it soon...";
	}
	if (typeof reassign_feedback != "undefined" && reassign_feedback != "undefined" && reassign_feedback != "") {
		pefeedback = '<span style="color:red;"> (P-Reassigned)</span> Feedback: ' + reassign_feedback;
		$("tr.pfdbk").show();
	} else {
		$("tr.pfdbk").hide();
	}
	if (typeof review_reassign_feedback != "undefined" && review_reassign_feedback != "undefined" && review_reassign_feedback != "") {
		refeedback += '<span style="color:red;"> (R-Reassigned)</span> Feedback: ' + review_reassign_feedback;
		$("tr.rfdbk").show();
	} else {
		$("tr.rfdbk").hide();
	}
	var petime = d.petime;
	var revtime = d.revtime;

	var pestime = d.pestime;
	var peetime = d.peetime;
	var restime = d.restime;
	var reetime = d.reetime;
	var pectime = d.pectime;
	var rectime = d.rectime;
	var li = d.list_item;
	var parentTask = d.parentaskinfo;
	if (typeof pectime == "undefined" || pectime == "undefined") {
		pectime = "";
	}
	if (typeof rectime == "undefined" || rectime == "undefined") {
		rectime = "";
	}

	if (typeof petime != "undefined" && petime != "") {
		if (/,/.test(petime)) {
			var p = petime.split(",");
			petime = '';
			//console.log(p);
			for (var n = 0; n < p.length; n++) {
				if (typeof p[n] != "undefined" && p[n] != "") {
					petime += parseFloat(p[n]).toFixed(2) + "<b>,</b> ";
				}
			}
		} else {
			petime = parseFloat(petime).toFixed(2);
		}
		petime = petime.replace(/<b>,<\/b> $/, "");
	}
	if (typeof revtime != "undefined" && revtime != "") {
		//console.log("Ima "+revtime);
		if (/,/.test(revtime)) {
			var r = revtime.split(",");
			revtime = '';
			//console.log(p);
			for (var n = 0; n < r.length; n++) {
				if (typeof r[n] != "undefined" && r[n] != "") {
					revtime += parseFloat(r[n]).toFixed(2) + "<b>,</b> ";
				}
			}
		} else {
			revtime = parseFloat(revtime).toFixed(2);
		}
		revtime = revtime.replace(/<b>,<\/b> $/, "");
	}

	if (typeof pestime != "undefined" && pestime != "") {
		if (/,/.test(pestime)) {
			var p = pestime.split(",");
			pestime = '';
			//console.log(p);
			for (var n = 0; n < p.length; n++) {
				if (typeof p[n] != "undefined" && p[n] != "") {
					var tmp = formatDate(p[n]);
					pestime += tmp + "<b>,</b> ";
				}
			}
		} else {
			pestime = formatDate(pestime);
		}
		pestime = pestime.replace(/<b>,<\/b> $/, "");
		//pestime = formatDate(pestime);
	}
	if (typeof restime != "undefined" && restime != "") {
		if (/,/.test(restime)) {
			var r = restime.split(",");
			restime = '';
			//console.log(p);
			for (var n = 0; n < r.length; n++) {
				if (typeof r[n] != "undefined" && r[n] != "") {
					var tmp = formatDate(r[n]);
					restime += tmp + "<b>,</b> ";
				}
			}
		} else {
			restime = formatDate(restime);
		}
		restime = restime.replace(/<b>,<\/b> $/, "");
	}
	if (typeof peetime != "undefined" && peetime != "") {
		if (/,/.test(peetime)) {
			var p = peetime.split(",");
			peetime = '';
			//console.log(p);
			for (var n = 0; n < p.length; n++) {
				if (typeof p[n] != "undefined" && p[n] != "") {
					//console.log(p[n]);
					var tmp = formatDate(p[n]);
					//console.log(tmp);
					peetime += tmp + "<b>,</b> ";
				}
			}
		} else {
			peetime = formatDate(peetime);
		}
		peetime = peetime.replace(/<b>,<\/b> $/, "");
		//peetime = formatDate(peetime);
	}
	if (typeof reetime != "undefined" && reetime != "") {
		if (/,/.test(reetime)) {
			var r = reetime.split(",");
			reetime = '';
			//console.log(p);
			for (var n = 0; n < r.length; n++) {
				if (typeof r[n] != "undefined" && r[n] != "") {
					var tmp = formatDate(r[n]);
					reetime += tmp + "<b>,</b> ";
				}
			}
		} else {
			reetime = formatDate(reetime);
		}
		reetime = reetime.replace(/<b>,<\/b> $/, "");
	}
	if (typeof pectime != "undefined" && pectime != "") {
		if (/,/.test(pectime)) {
			var p = pectime.split(",");
			pectime = '';
			//console.log(p);
			for (var n = 0; n < p.length; n++) {
				if (typeof p[n] != "undefined" && p[n] != "") {
					//console.log(p[n]);
					var tmp = formatDate(p[n]);
					//console.log(tmp);
					pectime += tmp + "<b>,</b> ";
				}
			}
		} else {
			pectime = formatDate(pectime);
		}
		pectime = pectime.replace(/<b>,<\/b> $/, "");
		//pectime = formatDate(pectime);
	}
	if (typeof rectime != "undefined" && rectime != "") {
		//console.log(rectime);
		if (/,/.test(rectime)) {
			var r = rectime.split(",");
			rectime = '';
			//console.log(p);
			for (var n = 0; n < r.length; n++) {
				if (typeof r[n] != "undefined" && r[n] != "") {
					var tmp = formatDate(r[n]);
					rectime += tmp + "<b>,</b> ";
				}
			}
		} else {
			rectime = formatDate(rectime);
		}
		rectime = rectime.replace(/<b>,<\/b> $/, "");
	}
	//update colspan when a column is increased/decreased in the table accordingly
	var return_text = '<td colspan="11"><table class="table childtable" style="padding-left:50px;">' +
		'<tbody>' +
		'<tr>' +
		'<td style="width:20%;">Description</td>' +
		'<td style="text-transform:none;">' + desc + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">File Name</td>' +
		//'<td style="text-transform:none;">' + fname + ' ' + refeedback + '</td>' +
		'<td style="text-transform:none;">' + fname + '</td>' +
		'</tr>';

	if (typeof reassign_feedback != "undefined" && reassign_feedback != "undefined" && reassign_feedback != "") {
		return_text += '</tr>' +
			'<tr class="pfdbk">' +
			'<td style="width:20%;">Postedit Feedback</td>' +
			'<td style="text-transform:none;">' + pefeedback + '</td>';
	} else {}
	if (typeof review_reassign_feedback != "undefined" && review_reassign_feedback != "undefined" && review_reassign_feedback != "") {
		return_text += '<tr class="rfdbk">' +
			'<td style="width:20%;">Review Feedback</td>' +
			'<td style="text-transform:none;">' + refeedback + '</td>' +
			'</tr>';
	} else {}
	return return_text + '<tr>' +
		'<td style="width:20%;">PostEditor</td>' +
		'<td>' + petby + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">Reviewer</td>' +
		'<td>' + revby + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">Word count</td>' +
		'<td>' + wc + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">MT Type</td>' +
		'<td>' + d.mt_type + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">Parent Task</td>' +
		'<td>' + d.parentTask + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Post edit time (mins)</td>' +
		'<td>' + petime + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Review Time (mins)</td>' +
		'<td>' + revtime + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">Lang Pair</td>' +
		'<td style="text-transform:none;">' + fromto + ' &nbsp;<i id="updateTaskLangpair" data-taskid="' + d.taskid + '" class="fa fa-pencil"></i></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="width:20%;">Domain</td>' +
		'<td style="text-transform:none;">' + domain + ' &nbsp;<i id="updateTaskDomain" data-taskid="' + d.taskid + '" class="fa fa-pencil"></i></td>' +
		'</tr>' +
		'<tr title="Show More" style="cursor:pointer;" onclick="toggleExtrarows();"class="plus"><td> Show More (<i class="fa fa-plus" ></i>)</td></tr>' +
		'<tr title="Show Less" style="cursor:pointer;display:none;" onclick="toggleExtrarows();"class="minus"><td> Show Less (<i class="fa fa-minus"></i>)</td></tr>' +
		'<tr class="extrarows">' +
		'<td>Priority</td>' +
		'<td>' + prior + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>Post edit start time</td>' +
		'<td>' + pestime + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>Post edit end time</td>' +
		'<td>' + peetime + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>Review start time</td>' +
		'<td>' + restime + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>Review end time</td>' +
		'<td>' + reetime + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>PostEdit Commit</td>' +
		'<td>' + pectime + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>Review Commit</td>' +
		'<td>' + rectime + '</td>' +
		'</tr>' +
		'<tr class="extrarows">' +
		'<td>Delete Story </td>' +
		'<td id="deletestory' + li + '"><i class="fa fa-trash" aria-hidden="true"></i></td>' +
		'</tr>' +
		'</tbody>' +
		'</table></td>';
}
$("#getfile,#viewstory").unbind("click").on("click", function() {
	if (this.id == "getfile") {
		if ($.inArray("11", permissions) == -1) {
			$('.notify').remove();
			$.notify("You don't have permission to do this operation", {
				"postion": "top",
				"type": "danger"
			});
			return;
		}
	} else {
		if ($.inArray("12", permissions) == -1) {
			$('.notify').remove();
			$.notify("You don't have permission to do this operation", {
				"postion": "top",
				"type": "danger"
			});
			return;
		}
	}

	var param = '?'
	var singleview = 0;
	var original_flag = 0;
	var theader = '<tr><td style="border:1px solid #000;">SNO</td>'; //<td style="border:1px solid #000;">MT</td><td style="border:1px solid #000;">Postedit</td></tr>';
	$("input[name='optradio']:checked").each(function() {
		//alert($(this).val());
		var radio_text = $(this).val();
		if (radio_text == "src") {
			param += '&output_type=source';
			singleview = 1;
			theader += '<td style="border:1px solid #000;">Source</td>';
		} else if (radio_text == "tgt") {
			param += '&output_type=mt';
			//param += '-mt';
			singleview = 1;
			theader += '<td style="border:1px solid #000;">MT</td>';
		} else if (radio_text == "pet") {
			param += '&output_type=postedited';
			theader += '<td style="border:1px solid #000;">Postedited</td>';
			//param += '-postedited';
			singleview = 1;
		} else if (radio_text == "rev") {
			param += '&output_type=reviewed';
			theader += '<td style="border:1px solid #000;">Reviewed</td>';
			//param += '-reviewed';
			singleview = 1;
		} else if (radio_text == "src-mt") {
			param += '&output_type=source-mt';
		} else if (radio_text == "src-pet") {
			param += '&output_type=source-postedited';
		} else if (radio_text == "src-mt-pet") {
			param += '&output_type=source-mt-postedited';
		} else if (radio_text == "src-mt-rev") {
			param += '&output_type=source-mt-reviewed';
		} else if (radio_text == "src-rev") {
			param += '&output_type=';
		} else if (radio_text == "vieworiginal") {
			original_flag = 1;
			if (original_url != "") {
				window.open(original_url);
			} else {
				alert("Not available");
			}
		} else {
			//    param += '&output_type=';
		}

	});
	theader += '</tr>';
	//console.log(param);
	param = param.replace(/\&output_type=/, "OUTTYPE");
	param = param.replace(/\&output_type=/g, "-");
	param = param.replace(/OUTTYPE/, "&output_type=");

	var old_param = param;

	if (/-/.test(param)) {
		//console.log(param);
		param = param.replace(/=mt-/g, "=source-mt-");
		//console.log(param);
		param = param.replace(/=postedited-/g, "=source-postedited-");
		param = param.replace(/source-mt-postedited-reviewed/g, "all");
		param = param.replace(/source-postedited-reviewed/g, "all");
		singleview = 0;
	} else {
		singleview = 1;
	}
	//console.log(param);
	if (original_flag == 1) {
		return;
	}
	var a = $("#atab2").attr('class');
	if (a == "active") {
		param += '&order=sent';
	} else {
		param += '&order=para';
	}

	job_id = job_id.replace(/trow/, "");
	//alert(job_id);
	//var tempjobid = $("#"+list_type).val();
	var tempjobid = job_id;


	arr = tempjobid.split("____");
	var filename = arr[5];
	filename = filename.replace(/\.txt/, "_");
	var save_type = $("#savetype-text").val();
	filename += arr[2]; // + ".txt";
	if (typeof save_type != "undefined") {
		filename += save_type;
	} else {
		save_type = '.txt';
		filename += save_type;
	}
	//alert(arr);
	if (job_id.split("____")[4] == "unassigned") {
		param += "&user=" + user + "&lang_pair=" + arr[2] + "&domain=" + arr[3] + "&taskid=" + arr[1];
	} else {
		param += "&user=" + arr[0] + "&lang_pair=" + arr[2] + "&domain=" + arr[3] + "&taskid=" + arr[1];
	}
	//alert(param);
	if (type == "file") {
		if (job_id.split("____")[4] == "unassigned") {
			temp_url = config.downloadBeforeAssign;
		} else if ((eflag == 1) || (job_id.split("____")[4] == "available_to_review" || job_id.split("____")[4] == "unassigned")) {
			temp_url = config.downloadPetStory;
		} else {
			temp_url = config.downloadRevStory;
		}
	} else {
		temp_url = config.downloadStory1;
		if (type == "ht") {
			param += "&story_source=ht"
		} else if (type == "liveht") {
			param += "&story_source=liveht"
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
	}
	//var link = config.downloadStory + param;
	var link = temp_url + param;
	//window.open('http://10.4.22.151:8007/postedittool-0.9/downloadUserStory'+param,'download.txt');
	//$("#download-box").dialog('close');
	var myRegExp = /output_type=(.*)&order/g;
	var match = myRegExp.exec(param);
	//console.log(match);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", link, false); // false for synchronous request
	xmlHttp.send(null);
	$('input[name=optradio]').prop('checked', false); // Unchecks it(to remove previous selection)
	var savetext = xmlHttp.responseText;
	savetext = savetext.replace(/ /g, " "); //00A0
	savetext = savetext.replace(/ +/g, " "); //multiple spaces into single space
	if (this.id == "getfile" && save_type == ".txt") {
		var dtype = '';
		if (match[1] == "all") {
			dtype = "source-mt-postedited-reviewed";
		}else {
			dtype = match[1];
		}
		//console.log(old_param);
		filename = filename + "-" + dtype;
		filename = filename.replace(/\.txt/g, "");
		filename = filename + ".txt";
		savetext = savetext.replace(/&nbsp;/g, " ");
		savetext = savetext.replace(/ +/g, " ");
		savetext = savetext.replace(/ $/g,"");
		savetext = savetext.replace(/ \t/g,"	");
		savetext = savetext.replace(/\t /g,"	");
		savetext = savetext.trim();

		var splittext = savetext.split("\n");;
		var downloadtext = '';
		if (match[1] == "all" && /=source-postedited-reviewed/.test(old_param)) {
			//console.log("Iam ejre" + old_param);
			for (var n = 0; n < splittext.length; n++) {
				var ctext = splittext[n].split("\t");
				downloadtext += ctext[0] + ctext[2] + ctext[3] + "\n";
			}

		} else if (match[1] == "all" && /=mt-postedited-reviewed/.test(old_param)) {
			//console.log("Iam ejre" + old_param);
			for (var n = 0; n < splittext.length; n++) {
				var ctext = splittext[n].split("\t");
				downloadtext += ctext[1] + ctext[2] + ctext[3] + "\n";
			}
		} else if (match[1] == "all" && /=postedited-reviewed/.test(old_param)) {
			//console.log("Iam ejre" + old_param);
			for (var n = 0; n < splittext.length; n++) {
				var ctext = splittext[n].split("\t");
				downloadtext += ctext[2] + ctext[3] + "\n";
			}
		} else {
			downloadtext = savetext;
		}
		//saveTextAs(savetext, filename, "", "txt");
		saveTextAs(downloadtext, filename, "", "txt");
		//saveTextAs(savetext, "myfile.doc", "", "doc");
		var msg = 'EBS MANAGER INFO: Download task id=' + arr[1] + ',langpair=' + arr[2] + ',domain=' + arr[3];
		//if (impersonate_by != "") {
		insert_logs(crole, msg);
		//}
	} else {
		var msg = 'EBS MANAGER INFO: Preview task id=' + arr[1] + ',langpair=' + arr[2] + ',domain=' + arr[3];
		//if (impersonate_by != "") {
		insert_logs(crole, msg);
		//}
		savetext = escapeHtml(savetext);
		var features = 'status=1, menubar=1, location=0, left=100, top=100';
		var winName = 'Story View';
		var alltext = savetext.split("\n");
		var ptext = '';
		if (singleview == 0) {
			ptext = '<html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><table class="table table-striped table-bordered dt-responsive nowrap">';
		} else {
			ptext = '<html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="padding-top:2%;"class="container">';
		}
		if (singleview == 0) {
			ptext += theader;
		}
		var srctgt;
		s1 = '';
		s2 = '';
		for (var i = 0; i < alltext.length; i++) {
			if (typeof alltext[i] != "undefined" && alltext[i] != "") {
				srctgt = alltext[i].split("\t");
				var tt = srctgt[0];
				var num = i + 1;
				if (singleview == 0 && /source/.test(old_param)) {
					ptext += '<tr><td style="border:1px solid #000;">' + num + '</td><td class="src" style="width:auto;border:1px solid #000;">' + tt + '</td>';
				} else {
					if (/source/.test(old_param) && (/urd/.test(arr[2]))) {
						ptext += '<p align="justify" style="margin-left:7%;margin-right:7%;">' + tt + '</p>';
					} else if (!/-/.test(old_param)) {
						ptext += '<p align="justify" class="mt" style="margin-left:7%;margin-right:7%;">' + tt + '</p>';
					} else {
						ptext += '<td style="width:2%;border:1px solid #000;">' + num + '</td>';
					}
				}
				if ((typeof srctgt[1] != "undefined" && srctgt[1] != "") && (typeof srctgt[2] != "undefined" && srctgt[2] != "") && (typeof srctgt[3] != "undefined" && srctgt[3] != "")) {
					if (/mt/.test(old_param)) {
						ptext += '<td class="mt" style="width:25%;border:1px solid #000;">' + srctgt[1] + '</td>';
					}
					ptext += '<td class="mt" style="width:25%;border:1px solid #000;">' + srctgt[2] + '</td>';
					ptext += '<td class="mt" style="width:25%;border:1px solid #000;">' + srctgt[3] + '</td>';
				} else if ((typeof srctgt[1] != "undefined" && srctgt[1] != "") && (typeof srctgt[2] != "undefined" && srctgt[2] != "")) {
					ptext += '<td class="mt" style="width:33%;border:1px solid #000;">' + srctgt[1] + '</td>';
					ptext += '<td class="mt" style="width:33%;border:1px solid #000;">' + srctgt[2] + '</td>';
					//ptext += '<p style="float:left;">'+tt+'</p>';
				} else if (typeof srctgt[1] != "undefined" && srctgt[1] != "") {
					ptext += '<td class="mt" style="width:49%;border:1px solid #000;">' + srctgt[1] + '</td>';
				}

				/*tt = srctgt[1];
				if (typeof tt != "undefined" && tt != "") {
					ptext += '<td class="mt" style="border:1px solid #000;">' + tt + '</td>';
					//ptext += '<p style="float:left;">'+tt+'</p>';
				}
				tt = srctgt[2];
				if (typeof tt != "undefined" && tt != "") {
					ptext += '<td class="mt" style="border:1px solid #000;">' + tt + '</td>';
					//ptext += '<p style="floatt:left" >'+tt+'</p>';
				}*/

				ptext += '</tr>';
				s1 += alltext[i].split("\t")[0] + "\n";
				s2 += alltext[i].split("\t")[1] + "\n";
			}
		}
		ptext += '</table>';
		//console.log(arr[2]);
		if (save_type == ".doc") {
			//ptext = ptext.replace(/border:1px solid #000;/g,"");
			if ((/urd/.test(arr[2]))) {
				ptext = ptext.replace(/td class="mt"/g, "td class=\"mt\" align=\"right\"");
				ptext = ptext.replace(/p align="justify"/g, "p align=\"right\"");
				//console.log(ptext);
			}

			saveTextAs(ptext, filename, "", "doc");
			return;
		}
		//console.log(ptext);
		savetext = savetext.replace(/\n/, "<br>");
		$("#download-box").modal('hide');
		$("#pane").html(ptext);
		$("#viewModal").modal();
		$("#viewModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html('Story preview of task id ' + arr[1] + ' (' + arr[2] + ')  <button class="print" id="print"  title="Print" onclick="printtext(' + 'pane' + ',' + 'arr[5]' + ');"> <span aria-hidden="true" class="glyphicon glyphicon-print"></span></button><button class="btn" title="Annotate Sentence" id="senAnt" onclick="sentenceAnnotate(' + 's1' + ',' + 's2' + ',' + 'arr[2]' + ',' + 'arr[5]' + ');"> Tokenize</button>');
		$('#viewModal').on('hidden.bs.modal', function() {
			$("body").children("*").removeClass("blur");
		});
		$('#viewModal').on('shown.bs.modal', function() {
			//$("body").children("*").addClass("blur");
			$("#viewModal").removeClass("blur");
		});
		var slang = arr[2].split("_")[0];
		var tlang = arr[2].split("_")[1];
		if (slang == "tel") {
			$("td.src").css("font-family", "telugumandali");
			$("p.src").css("font-family", "telugumandali");
			$("p.src").css("font-size", "20px");
			$("td.src").css("font-size", "18px");
			$("td.src").css("color", "#000");
			$("p.src").css("color", "#000");
		}
		if (slang == "hin") {
			$("td.src").css("font-family", "\'Lohit Devanagari\'");
			$("p.src").css("font-family", "\'Lohit Devanagari\'");
			$("p.src").css("font-size", "18px");
			$("td.src").css("font-size", "18px");
		}
		if (slang == "ara") {
			$("td.src").css("font-family", "arabicfont");
			$("td.src").css("direction", "rtl");
			$("td.src").css("font-size", "20px");
			$("p.src").css("font-family", "arabicfont");
			$("p.src").css("direction", "rtl");
			$("p.src").css("font-size", "20px");
		}
		if (tlang == "urd") {
			$("td.mt").css("font-family", "Urdufont1");
			$("td.mt").css("direction", "rtl");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "Urdufont1");
			$("p.mt").css("direction", "rtl");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "ara") {
			$("td.mt").css("font-family", "arabicfont");
			$("td.mt").css("direction", "rtl");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "arabicfont");
			$("p.mt").css("direction", "rtl");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "ben") {
			$("td.mt").css("font-family", "lohitbengali");
			$("td.mt").css("font-size", "20px");
			$("td.mt").css("color", "#000");
		} else if (tlang == "tel") {
			$("td.mt").css("font-family", "telugumandali");
			$("td.mt").css("color", "#000");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "telugumandali");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "kan") {
			$("td.mt").css("font-family", "kannada");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "lohitkannada");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "hin") {
			$("td.mt").css("font-family", "\'Lohit Devanagari\'");
			$("td.mt").css("color", "#000");
			$("td.mt").css("font-size", "18px");
			$("p.mt").css("font-family", "\'Lohit Devanagari\'");
			$("p.mt").css("font-size", "20px");
		}
		if (singleview == 1) {
			//$(".modal-title").html("Story Preview");
			$("#viewModal").css("width", "60%");
			$("#viewModal").css("left", "25%");
		} else {
			//$(".modal-title").html("Story Preview");
			$("#viewModal").css("width", "");
			$("#viewModal").css("left", "");
		}
		var stext = '';
		var ttext = '';

		/*// populate the html elements
	var para = document.createElement('p');
	var title = document.createElement('title');
	para = savetext;
	title= 'Story View';

	// define a reference to the new window
	// and open it with defined attributes
	var winRef = window.open('', winName, features);

	// append the html elements to the head
	// and body of the new window
	winRef.document.write(ptext);
//window.open(link, '_blank', 'location=yes,scrollbars=yes,status=yes');*/
	}
	return false;
});

//view diff
$("#viewdiff").unbind("click").on("click", function() {
	var param = '?'
	var singleview = 0;
	var original_flag = 0;
	var theader = '';
	$("input[name='optradiodiff']:checked").each(function() {
		//alert($(this).val());
		var radio_text = $(this).val();
		if (radio_text == "mt-pet") {
			param += '&output_type=source-mt-postedited';
			theader = '<tr><td style="border:1px solid #000;">SNO</td><td style="border:1px solid #000;">Source</td><td style="border:1px solid #000;">MT</td><td style="border:1px solid #000;">Postedit</td></tr>';
		} else if (radio_text == "mt-rev") {
			theader = '<tr><td style="border:1px solid #000;">SNO</td><td style="border:1px solid #000;">Source</td><td style="border:1px solid #000;">MT</td><td style="border:1px solid #000;">Review</td></tr>';
			param += '&output_type=source-mt-reviewed';
		} else { //postedit-review
			theader = '<tr><td style="border:1px solid #000;">SNO</td><td style="border:1px solid #000;">Source</td><td style="border:1px solid #000;">Postedit</td><td style="border:1px solid #000;">Review</td></tr>';
			param += '&output_type=all';
		}

	});
	param += '&order=sent';

	job_id = job_id.replace(/trow/, "");
	//alert(job_id);
	//var tempjobid = $("#"+list_type).val();
	var tempjobid = job_id;
	arr = tempjobid.split("____");
	var filename = arr[5];
	filename = filename.replace(/\.txt/, "_");
	filename += arr[2] + ".txt";
	//alert(arr);
	param += "&user=" + arr[0] + "&lang_pair=" + arr[2] + "&domain=" + arr[3] + "&taskid=" + arr[1];
	//alert(param);
	if (type == "file") {
		if ((eflag == 1) || (job_id.split("____")[4] == "available_to_review" || job_id.split("____")[4] == "unassigned")) {
			temp_url = config.downloadPetStory;
		} else {
			temp_url = config.downloadRevStory;
		}
	} else {
		temp_url = config.downloadStory1;
		if (type == "ht") {
			param += "&story_source=ht"
		} else if (type == "liveht") {
			param += "&story_source=liveht"
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
	}
	//var link = config.downloadStory + param;
	var link = temp_url + param;
	//window.open('http://10.4.22.151:8007/postedittool-0.9/downloadUserStory'+param,'download.txt');
	//$("#download-box").dialog('close');
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", link, false); // false for synchronous request
	xmlHttp.send(null);
	var savetext = xmlHttp.responseText;
	if (this.id == "getfile") {
		saveTextAs(savetext, filename, "", "txt");
	} else {
		savetext = escapeHtml(savetext);
		savetext = normalize(savetext);
		var features = 'status=1, menubar=1, location=0, left=100, top=100';
		var winName = 'Story View';
		var alltext = savetext.split("\n");
		var ptext = '';
		var ptext = '';
		if (singleview == 0) {
			ptext = '<table class="table table-striped table-bordered dt-responsive nowrap">';
		} else {
			ptext = '<div style="padding-top:2%;"class="container">';
		}
		ptext += theader;
		var num = 0;
		var a1 = [];
		a2 = [];
		for (var i = 0; i < alltext.length; i++) {
			if (typeof alltext[i] != "undefined" && alltext[i] != "") {
				var srctgt = alltext[i].split("\t");
				var tt = srctgt[0];
				num = num + 1;
				if ((typeof srctgt[2] != "undefined" && srctgt[2] != "") && (typeof srctgt[3] != "undefined" && srctgt[3] != "") && (/output_type=all/.test(param))) {
					var diff_result = diff_type2(srctgt[2], srctgt[3]);
					//console.log(diff_result);
					var dd = diff_result.text.split("####DIFF____SPLIT____HERE####");
					a1 = a1.concat(diff_result.arr1);
					a2 = a2.concat(diff_result.arr2);
					ptext += '<tr><td class="mt" style="border:1px solid #000;">' + num + '</td><td class="mt" style="border:1px solid #000;width:32%;">' + srctgt[0] + '</td><td class="mt" style="width:32%;border:1px solid #000;">' + dd[0] + '</td>';
					ptext += '<td class="mt" style="width:32%;border:1px solid #000;">' + dd[1] + '</td>';

				} else if ((typeof srctgt[1] != "undefined" && srctgt[1] != "") && (typeof srctgt[2] != "undefined" && srctgt[2] != "")) {
					var diff_result = diff_type2(srctgt[1], srctgt[2]);
					//console.log(diff_result);
					var dd = diff_result.text.split("####DIFF____SPLIT____HERE####");
					a1 = a1.concat(diff_result.arr1);
					a2 = a2.concat(diff_result.arr2);
					ptext += '<tr><td class="mt" style="border:1px solid #000;">' + num + '</td><td class="mt" style="border:1px solid #000;width:32%;">' + srctgt[0] + '</td><td class="mt" style="width:32%;border:1px solid #000;">' + dd[0] + '</td>';
					ptext += '<td class="mt" style="width:32%;border:1px solid #000;">' + dd[1] + '</td>';
					//ptext += '<p style="float:left;">'+tt+'</p>';
				}

				ptext += '</tr>';
			}
		}
		var unique = [];
		$.each(a1, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		a1 = unique;
		unique = [];
		$.each(a2, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		a2 = unique;
		//console.log(a1);
		//console.log(a2);
		ptext += '</table>';
		ptext += '<p class="mt">Text Removed: ' + a1.join(", ") + '</p>';
		ptext += '<p class="mt">Text Added:' + a2.join(", ") + '</p>';
		//saveTextAs(savetext, "pet.rtf", "", "rtf");
		//console.log(ptext);
		//saveTextAs(ptext, "pet.rtf", "", "rtf");
		savetext = savetext.replace(/\n/, "<br>");
		$("#download-box").modal('hide');
		$("#pane").html(ptext);
		$("#viewModal").modal();
		$("#viewModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html('Story diff view of task id ' + arr[1] + ' (' + arr[2] + ')  <button class="print" id="print"  title="Print" onclick="printtext(' + 'pane' + ',' + 'arr[5]' + ');"> <span aria-hidden="true" class="glyphicon glyphicon-print"></span></button>&nbsp;&nbsp;<i style="color:red;font-size:12px;" class="fa fa-square"></i> Missing in target text <i style="color:blue;font-size:12px;" class="fa fa-square"></i> Missing in source text');
		$('#viewModal').on('hidden.bs.modal', function() {
			$("body").children("*").removeClass("blur");
		});
		$('#viewModal').on('shown.bs.modal', function() {
			//$("body").children("*").addClass("blur");
			$("#viewModal").removeClass("blur");
		});
		var slang = arr[2].split("_")[0];
		var tlang = arr[2].split("_")[1];
		if (slang == "tel") {
			$("td.src").css("font-family", "telugumandali");
			$("p.src").css("font-family", "telugumandali");
			$("p.src").css("font-size", "20px");
			$("td.src").css("font-size", "18px");
			$("td.src").css("color", "#000");
			$("p.src").css("color", "#000");
		}
		if (slang == "hin") {
			$("td.src").css("font-family", "\'Lohit Devanagari\'");
			$("p.src").css("font-family", "\'Lohit Devanagari\'");
			$("p.src").css("font-size", "18px");
			$("td.src").css("font-size", "18px");
		}
		if (slang == "ara") {
			$("td.src").css("font-family", "arabicfont");
			$("td.src").css("direction", "rtl");
			$("td.src").css("font-size", "20px");
			$("p.src").css("font-family", "arabicfont");
			$("p.src").css("direction", "rtl");
			$("p.src").css("font-size", "20px");
		}
		if (tlang == "urd") {
			$("td.mt").css("font-family", "Urdufont1");
			$("td.mt").css("direction", "rtl");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "Urdufont1");
			$("p.mt").css("direction", "rtl");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "ara") {
			$("td.mt").css("font-family", "arabicfont");
			$("td.mt").css("direction", "rtl");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "arabicfont");
			$("p.mt").css("direction", "rtl");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "ben") {
			$("td.mt").css("font-family", "lohitbengali");
			$("td.mt").css("font-size", "20px");
			$("td.mt").css("color", "#000");
		} else if (tlang == "tel") {
			$("td.mt").css("font-family", "telugumandali");
			$("td.mt").css("color", "#000");
			$("td.mt").css("font-size", "20px");
			$("p.mt").css("font-family", "telugumandali");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "tam") {
			$("td.mt").css("font-family", "lohittamil");
			$("td.mt").css("font-size", "18px");
			$("p.mt").css("font-family", "lohittamil");
			$("p.mt").css("font-size", "18px");
		} else if (tlang == "guj") {
			$("td.mt").css("font-family", "lohitgujrati");
			$("td.mt").css("font-size", "18px");
			$("p.mt").css("font-family", "lohitgujarati");
			$("p.mt").css("font-size", "20px");
		} else if (tlang == "mal") {
			$("td.mt").css("font-family", "lohitmalyalam");
			$("td.mt").css("font-size", "18px");
			$("p.mt").css("font-family", "lohitmalayalam");
			$("p.mt").css("font-size", "18px");
		} else if (tlang == "pan") {
			$("td.mt").css("font-family", "lohitpunjabi");
			$("td.mt").css("font-size", "18px");
			$("p.mt").css("font-family", "lohitpunjabi");
			$("p.mt").css("font-size", "18px");
		} else if (tlang == "hin") {
			$("td.mt").css("font-family", "\'Lohit Devanagari\'");
			$("td.mt").css("color", "#000");
			$("td.mt").css("font-size", "18px");
			$("p.mt").css("font-family", "\'Lohit Devanagari\'");
			$("p.mt").css("font-size", "20px");
		}
		if (singleview == 1) {
			//$(".modal-title").html("Story Preview");
			$("#viewModal").css("width", "60%");
			$("#viewModal").css("left", "25%");
		} else {
			//$(".modal-title").html("Story Preview");
			$("#viewModal").css("width", "");
			$("#viewModal").css("left", "");
		}
		var stext = '';
		var ttext = '';

	}
	return false;
});

function findMyText(event) {
	//alert(event.keyCode);
	var needle = document.getElementById('search').value;
	if (event.keyCode == 13) {
		var allText = '';
		if (allText.length == 0) {
			$("textarea[id^='tgt']").each(function() {
				var tempid = this.id;
				//alert($("#"+tempid).val());
				allText += $("#" + tempid).val();
			});
		}
		//	alert(allText);

		var match = new RegExp(needle, "ig");

		var replaced = "";


		var boldText = "<span style=\"background-color: yellow; display: inline; font-weight: bold;\">" + needle + "</span>";

		replaced = allText.replace(match, boldText);
		alert(replaced);


		//document.getElementById("haystack").innerHTML = replaced;
	}

}
//Called when jobs is selected
function loadpet(lid) {
	$("#hidesrc").html('<i class="fa fa-square-o" aria-hidden="true"></i><i class="fa fa-square-o" aria-hidden="true"></i>&nbsp;');
	$("#tspellcheck").html('<img width="20" height="20" src="images/hinspell.ico"></img><!--<i class="fa fa-square-o" aria-hidden="true"></i>-->');
	$("#tspellcheck").prop('title', 'Spell check is Off');
	$("#loadingDiv").modal();
	$(".goback").show();
	$("#jobclose").show();
	$("#jobpanel").hide();
	$("#filterbar").hide();
	/*  $("#jobstable").hide();
	  $('#pagination').twbsPagination('destroy');*/
	//$("#jobpanel").hide();
	mtstory = {
		"src": {
			"para": []
		},
		"tgt": {
			"para": []
		},
		"tgt2": {
			"para": []
		},
		"pet": {
			"para": []
		}
	};
	$("#loadingDiv").modal();
	$("#jobclose").show();

	//alert(lid);
	arr = lid.split("____");
	var jobid = arr[1];
	lang_pair = arr[2];
	if (lang_pair == "eng_hin") {
		$("#anutranslate").show();
		$("#samparktranslate").hide();
	} else if (lang_pair == "hin_pan" || lang_pair == "hin_urd") {
		$("#samparktranslate").show();
		$("#anutranslate").hide();
	} else {
		$("#samparktranslate").hide();
		$("#anutranslate").hide();
	}

	dom = arr[3];
	//var jobid = $("#"+id).prop('selectedIndex')-1;
	//ert(jobid);
	/*if(id == "list"){
		url = storealljobs["submittedStories"][jobid];
	}
	else{
		url = storealljobs["publishedStories"][jobid];
	}*/
	//alert(url);
	var temp_url = '';
	var param = '';
	//param = "&user="+arr[4]+"&taskid="+jobid+"&domain="+dom+"&lang_pair="+lang_pair;
	param = "&user=" + arr[0] + "&taskid=" + arr[1] + "&domain=" + arr[3] + "&lang_pair=" + arr[2];
	if (type == "file") {
		if (eflag == 1) {
			temp_url = config.getUserStoryForPostEdit;
		} else if (eflag == 2) {
			temp_url = config.getAdminStory
		} else if (eflag == 3) {
			temp_url = config.getPetStory
		} else if (eflag == 4) {
			temp_url = config.getRevStory
		} else {
			temp_url = config.getUserStoryForReview;
		}
	} else {
		temp_url = config.getUserStory1;
		if (type == "ht") {
			param += "&story_source=ht"
		} else if (type == "liveht") {
			param += "&story_source=liveht"
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
	}
	$.ajax({
		url: temp_url,
		type: 'POST',
		//data: "user="+arr[0]+"&taskid="+jobid+"&domain="+dom+"&lang_pair="+lang_pair,
		data: param,
		//async:false,
		cache: false,
		//contentType: 'application/json',
		processData: false,
		dataType: 'json',
		//contentType: 'application/json',
		success: function(data) {
			story = data;
			var status2 = "<p style=\"direction:ltr;\">Current job load status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			//$("#messages").html(status2).hide(0).delay(1000).show(0);
			//$("#messages").show();
			//$("#messages").html(status2);//.hide(0).delay(1000).show(0).delay(5000).fadeOut('slow');
			var msg = 'EBS MANAGER INFO: Open task id=' + arr[1] + ',langpair=' + arr[2] + ',domain=' + arr[3] + ',user=' + user;
			//if (impersonate_by != "") {
			insert_logs(crole, msg);
			//}
			if (data["status"].toLowerCase() == "success") {
				$('.notify').remove();
				$.notify(status2, {
					type: "success",
					"position": "top",
					background: "#31b0d5"
				});
			} else {
				$('.notify').remove();
				$.notify(status2, {
					type: "warning",
					"position": "top"
				});
			}
			//$("#messages").html(status2).fadeIn('slow');
			//currentjob = elem;
			currentjob = job_id;
			complete_story = data;
			//console.log(complete_story);
			loaduserjob(data);

			$("#loadingDiv").modal('hide');
			//c = loaduserjob(data);
			//hidefirst(c);
		}
	});
	//return false;
}

var posteditor = '';
var reviewer = '';

function loaduserjob(data) {
	$("#limt").click();
	$("#mttab").html("");
	prevtrid = '';
	assigned_by = data.story.assigned_by;
	//console.log(data);
	review_sjob = data;
	if (typeof data.story.rework_flag != "undefined") {
		rework_flag = data.story.rework_flag;
	} else {
		rework_flag = '';
	}
	if (typeof data.story.reassign_status != "undefined") {
		reassign_flag = data.story.reassign_status;
		postedit_iteration = data.story.postedit_iteration;
	} else {
		reassign_flag = '';
		postedit_iteration = '';
	}
	postedit_status = data.story.postedit_status;
	if (typeof data.story.review_reassign_status != "undefined") {
		review_reassign_flag = data.story.review_reassign_status;
		review_iteration = data.story.review_iteration;
	} else {
		review_reassign_flag = '';
		review_iteration = '';
	}

	jobdata = data;
	current_project = data.story.project;
	var datetime = formatDate(data.story.creation_time);
	datetime = datetime.replace(/-/g, "");
	//var jobid_ct = datetime.replace(/ .*$/, "") + "_" + data.story["taskid"];
	var jobid_ct = datetime.replace(/ .*$/, "") + "_" + data.story["taskid"];
	if (typeof data.story.fileNames != "undefined" && data.story.fileNames != "") {
		$(document).attr("title", data.story.fileNames.srcFile + "-" + jobid_ct);
		//$("#taskname").html(data.story.fileNames.srcFile + "-" + jobid_ct);
		var flen = data.story.fileNames.srcFile.length;
		var fdis = '';
		if (flen > 40) {
			fdis = '<span title="' + data.story.fileNames.srcFile + '">' + (data.story.fileNames.srcFile).substring(0, 10) + '...' + (data.story.fileNames.srcFile).substring(flen - 9, flen) + '</span>';
			//fdis = fnames;//.substring(0, 12) + '...';
		} else {
			fdis = data.story.fileNames.srcFile;
		}

		$("#storyWC").html(fdis + "-" + jobid_ct);
		//$("#storyWC").html(data.story.fileNames.srcFile + "-" + jobid_ct);
	} else {
		$(document).attr("title", "Task Id " + jobid_ct);
		//$("#taskname").html("Task Id " + jobid_ct);
		$("#storyWC").html("Task Id " + jobid_ct);
	}

	/*if (typeof data.story.fileNames.original_url != "undefined" && data.story.fileNames.original_url != "") {
		original_url = data.story.fileNames.original_url;
	} else if(typeof data.story.fileNames.originalfile != "undefined" && data.story.fileNames.originalfile != ""){
		original_url = data.story.fileNames.originalfile;;
	} else {
		original_url = '';
	}*/
	if (typeof data.story.original_url != "undefined" && data.story.original_url != "") {
		original_url = data.story.original_url;
	} else {
		original_url = '';
	}


	if (typeof data.story.project != "undefined" && data.story.client != "") {
		$("li#project1").html(data.story.project);
	}

	$("#storyWC").show();
	$("#storyWC").append(", Word count: " + data.story.words_count);
	//bottom tab task info
	var tasktable = $("<table></table>").css("text-transform", "capitalize").addClass("table");
	var tr = $("<tr></tr>").appendTo(tasktable);

	$('<td>File Name</td>').appendTo(tr);
	var datetime = formatDate(data.story.creation_time);
	datetime = datetime.replace(/-/g, "");
	datetime = datetime.replace(/ .*$/, "") + "_" + data.story.taskid;
	if (typeof data.story.fileNames != "undefined") {
		$('<td>' + data.story.fileNames.srcFile + '</td>').appendTo(tr);
	} else {
		$('<td>' + datetime + '</td>').appendTo(tr);
	}
	if (typeof data.story.project != "undefined" && data.story.project != "") {
		projectGuidelines(data.story.project)
	}
	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>Task Id</td>').appendTo(tr);
	//$('<td>' + datetime + '</td>').appendTo(tr);
	$('<td>' + data.story.taskid + '</td>').appendTo(tr);

	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>Word count</td>').appendTo(tr);
	$('<td>' + data.story.words_count + '</td>').appendTo(tr);

	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>Lang Pair</td>').appendTo(tr);
	$('<td>' + data.story.lang_pair + '</td>').appendTo(tr);

	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>MT Type</td>').appendTo(tr);
	var mt_type = '';
	if (typeof data.story.mt_type != "undefined") {
		mt_type = data.story.mt_type;
	} else if (typeof data.story.fileNames != "undefined") {
		if (typeof data.story.fileNames.tgtFile != "undefined") {
			mt_type = 'From File';
		} else {
			mt_type = 'None';
		}
	} else {
		mt_type = 'None';
	}
	$('<td>' + mt_type + '</td>').appendTo(tr);

	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>Clinet - Project - Domain</td>').appendTo(tr);
	$('<td>[' + data.story.client + "] [" + data.story.project + "] [" + data.story.domain + ']</td>').appendTo(tr);

	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>Manager</td>').appendTo(tr);
	if(typeof data.story.assigned_by != "undefined") {
	$('<td>' + data.story.assigned_by + '</td>').appendTo(tr);
	} else {
	$('<td>' + data.story.user + '</td>').appendTo(tr);
	}

	if (typeof data.story.postedited_by != "undefined") {
		tr = $("<tr></tr>").appendTo(tasktable);
		$('<td>Posteditor</td>').appendTo(tr);
		$('<td>' + data.story.postedited_by + '</td>').appendTo(tr);
		tr = $("<tr></tr>").appendTo(tasktable);
		$('<td>Reviewer</td>').appendTo(tr);
		$('<td>' + data.story.user + '</td>').appendTo(tr);
		posteditor = data.story.postedited_by;
		reviewer = data.story.user;
	} else {
		tr = $("<tr></tr>").appendTo(tasktable);
		$('<td>Posteditor</td>').appendTo(tr);
		$('<td>' + data.story.user + '</td>').appendTo(tr);
		posteditor = data.story.user;
		reviewer = '';
	}

	tr = $("<tr></tr>").appendTo(tasktable);
	$('<td>Status</td>').appendTo(tr);
	if (data.story.status != "finished" && data.story.status != "published") {
		$('<td>Under Editing</td>').appendTo(tr);
	} else {
		$('<td>finished</td>').appendTo(tr);
	}

	if (typeof data.story.rework_flag != "undefined") {
		tr = $("<tr></tr>").appendTo(tasktable);
		$('<td>Posteditor (Rework)</td>').appendTo(tr);
		$('<td>' + data.story.postedited_by + '</td>').appendTo(tr);
		tr = $("<tr></tr>").appendTo(tasktable);
		$('<td>Reviewer (Rework)</td>').appendTo(tr);
		$('<td>' + data.story.user + '</td>').appendTo(tr);
		tr = $("<tr></tr>").appendTo(tasktable);
		$('<td>Rework status</td>').appendTo(tr);
		$('<td>' + data.story.rework_status + '</td>').appendTo(tr);
	}
	if (data.story["status"] == "submitted" && data.story["postedit_status"] == "unassigned") {
		//alert("iam here1");
		$("#save").removeClass("disabled");
		$("#save").prop('disabled', false);
		$("#saveall").removeClass("disabled");
		$("#saveall").prop('disabled', false);
		$("#tsplit").removeClass("disabled");
		$("#tsplit").prop('disabled', false);
		$("#tmerge").removeClass("disabled");
		$("#tmerge").prop('disabled', false);
		//$('#final').html(finish);
	} else {
		//alert("iam here2");
		$("#save").addClass("disabled");
		$("#save").prop('disabled', true);
		$("#saveall").addClass("disabled");
		$("#saveall").prop('disabled', true);
		$("#tsplit").addClass("disabled");
		$("#tsplit").prop('disabled', true);
		$("#tmerge").addClass("disabled");
		$("#tmerge").prop('disabled', true);
	}

	$("#tstab").html(tasktable);
	var count = '';
	counter = 4;
	previd = '';
	var aa = job_id.split("____");

	if (type == "file") {
		if (typeof data.story.datetime != "undefined") {
			var datetime = data.story.datetime;
			datetime = datetime.replace(/Updated: /g, "");
			$("#created").html("Viewing Job Id " + aa[1] + " - Created: <b><i>" + datetime + "</b></i>");
		} else {
			$("#created").html("");
		}
	} else {
		if (typeof data.story.creation_time != "undefined") {
			var datetime = data.story.creation_time;
			datetime = datetime.replace(/Updated: /g, "");
			$("#created").html("-Created: <b><i>" + datetime + "</b></i>");
		} else {
			$("#created").html("");
		}
	}
	if (typeof data.story.last_updated != "undefined") {
		$("#updated").html("&nbsp;&nbsp;Last Updated: <b><i>" + data.story.last_updated + "</b><i>");
	} else {
		$("#updated").html("");
	}

	/*var toolbar = $('<div class="btn-group" role="group" aria-label="..."></div>');//.appendTo(table);
	$("#storytoolbar").html(toolbar);
	var btns = $('<button type="button" id="resumepause" class="btn btn-default">Pause <i class="fa fa-pause" aria-hidden="true"></i></button>'+
			//'<button type="button" class="btn btn-default"></button>'+
			'<!--<button type="button" class="btn btn-default">Right</button>-->').appendTo(toolbar);*/

	var table = $('<table></table>').addClass('petable table table-striped table-bordered dt-responsive nowrap').attr('id', 'easyPaginate');

	var src_text = '';
	var pet_text = '';
	var segment_no = 1;
	//alert(data.story.predited_srcstory.length);
	//alert(data.story.postedited_targetstory.length);
	//console.log(feedback);
	var lng = data.story.lang_pair.split("_");
	for (var k = 0; k < data.story.predited_srcstory.length; k++) {
		var sent_src = {
			"sent": [],
			"fb": []
		};
		var sent_mt = {
			"sent": [],
			"fb": []
		};
		var sent_mt2 = {
			"sent": [],
			"mt_pe": [],
			"fb": []
		};
		var sent_rev = {
			"sent": [],
			"fb": [],
			"fb1": [],
			"dflags": [],
		};

		for (var j = 0; j <= data.story.predited_srcstory[k].para.length - 1; j++) {
			var src_id = j + 1;
			var src_para = data.story.predited_srcstory[k].story;
			getlangpair = data.story.lang_pair;
			trid = "tr" + [src_id];
			src = "src" + [src_id];
			tgt = "tgt" + [src_id];
			tdsrc = "tdsrc" + [src_id];
			tdtgt = "tdtgt" + [src_id];
			edit = "edit" + [src_id];
			savetgt = "savetgt" + [src_id];
			savesrc = "savesrc" + [src_id];
			reset = "reset" + [src_id];
			retranslate = "retranslate" + [src_id];
			searchsrc = "searchsrc" + [src_id];
			searchtgt = "searchtgt" + [src_id];
			moresrc = "moresrc" + [src_id];
			fontsrc = "fontsrc" + [src_id];
			fonttgt = "fonttgt" + [src_id];
			moretgt = "moretgt" + [src_id];
			extrasrc = "extrasrc" + [src_id];
			extramt = "extramt" + [src_id];
			extratgt = "extratgt" + [src_id];

			var tt = '';
			tt = extratgt;

			var tr = '';
			tr = $('<div></div>').attr("id", "tr" + segment_no).addClass("divrow nodoubt").attr("data-paraid",data.story.predited_srcstory[k].id);

			var lng = lang_pair.split("_");
			var temptext = '';
			var segid = '';
			var segsrc = '';
			var colnum = $('<div></div>').attr("title", "para" + data.story.predited_srcstory[k].id + "-sent" + data.story.predited_srcstory[k].para[j].id).attr("id", "seg_" + segment_no).addClass("title col-num").appendTo(tr);
			var colsrc = $('<div></div>').attr("id", "divsrc" + segment_no).addClass("title srctitle").appendTo(tr);
			var coltgt = $('<div></div>').attr("id", "divtgt" + segment_no).addClass("title tgttitle").appendTo(tr);
			var colsave = $('<div></div>').attr("id", "divsave" + segment_no).addClass("title savetitle").appendTo(tr);
			var colsyn = $('<div></div>').attr("id", "divsyn" + segment_no).addClass("title syntitle").appendTo(tr);

			searchsrc = "searchsrc" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
			src = "src" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
			segsrc = "seg" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
			moresrc = "moresrc" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
			extrasrc = "extrasrc" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;

			sent_src["sent"].push(data.story.predited_srcstory[k].para[j].sentence);
			if ((data.story.predited_srcstory[k].para[j].sentence == "" || data.story.predited_srcstory[k].para[j].sentence == " ") && (data.story.postedited_targetstory[k].para[j].sentence == "" || data.story.postedited_targetstory[k].para[j].sentence == " " || data.story.postedited_targetstory[k].para[j].sentence == "Target text empty../Translation not available" || data.story.postedited_targetstory[k].para[j].sentence == "Intentionally left blank")) {
				tr.addClass("hidetr");
				tr.addClass("emptyseg");
			}
			if (typeof data.story.tgt_story[k].para[j] != "undefined") {
				sent_mt["sent"].push(data.story.tgt_story[k].para[j].sentence);
			} else {
				sent_mt["sent"].push(data.story.postedited_targetstory[k].para[j].sentence);
			}
			if (typeof data.story.mt2_story != "undefined") {
				if (data.story.mt2_story[k].para[j] != "undefined") {
					sent_mt2["sent"].push(data.story.mt2_story[k].para[j].sentence);
				} else {
					sent_mt2["sent"].push(" ");
				}
			} else {
				sent_mt2["sent"].push(data.story.postedited_targetstory[k].para[j].sentence);
			}
			sent_mt2["mt_pe"].push(data.story.postedited_targetstory[k].para[j].mt_pe_equal_status);
			sent_rev["sent"].push(data.story.postedited_targetstory[k].para[j].sentence);

			temptext = '<div contenteditable="true" id="sentence' + data.story.predited_srcstory[k].para[j].id + '" class="grid">' + escapeHtml(data.story.predited_srcstory[k].para[j].sentence) + '</div>';
			var segtext = '<div align="center" id="segment' + data.story.predited_srcstory[k].para[j].id + '" class="grid">' + segment_no + '<span style="font-size:14px;"><sup class="parano">P' + data.story.predited_srcstory[k].id + '</sup></span></div>'

			var textareasrc = $('<div>' + temptext + '</div>').attr("id", src).addClass('mytxtarea' + segment_no).appendTo(colsrc);
			$('<div>' + segtext + '</div>').attr("id", segsrc).addClass('mytxtarea').appendTo(colnum);

			var moresrc_div = $('<div></div>').attr("id", extrasrc).addClass("btn btn-group").appendTo(textareasrc);
			//$("<button></button>").attr("id",searchsrc).attr("title","Google it").attr("onclick","search_google(this.id)").html($("<span></span>").addClass('glyphicon glyphicon-search')).appendTo(moresrc_div);
			$("<button>GS</button>").attr("id", searchsrc).attr("title", "Google it").attr("onclick", "search_google(this.id)").addClass("btn btn-info").appendTo(moresrc_div);

			//$("<button></button>").attr("id",searchsrc).attr("title","Search in Wordnet").attr("onclick","search_wordnet(this.id)").html($("<img></img>").attr('src','images/hwn.ico')).appendTo(moresrc_div);
			if (lang_pair == "pan_hin") {
				$("<button>SK</button>").attr("id", searchsrc).attr("title", "Search in Shabdkosh").attr("onclick", "search_shabdkosh(this.id)").addClass("btn btn-success").appendTo(moresrc_div);
			}
			if (lang_pair == "eng_hin") {
				$("<button>GL</button>").attr("id", searchsrc).attr("title", "Search in Glosbe").attr("onclick", "search_glosbe(this.id)").addClass("btn btn-info").appendTo(moresrc_div);
			} else if (lang_pair == "urd_hin") {
				$("<button>UW</button>").attr("id", searchsrc).attr("title", "Search in UrduDict").attr("onclick", "search_urduengdict(this.id)").addClass("btn btn-success").appendTo(moresrc_div);
			}

			$("<button>GT</button>").attr("id", searchsrc).attr("title", "Google Translate").attr("onclick", "translate_google(this.id)").addClass("btn btn-primary").appendTo(moresrc_div);

			$("<button>Dict</button>").attr("id", searchsrc).attr("title", "Search Dictionary").attr("onclick", "search_dictionary(this.id)").addClass("btn btn-primary").appendTo(moresrc_div);


			//$("<button>Save</button>").attr("id",savesrc).attr("title","Save").attr("onclick","").addClass("btn btn-success").appendTo(moresrc_div);
			$("<button>More..</button>").attr("id", moresrc).attr("title", "More..").attr("onclick", "open_more(event,this)").addClass("btn btn-warning").appendTo(moresrc_div);
			$("<button><span>" + src_id + "</span></button>").attr("class", "label label-default").appendTo(moresrc_div);
			if (eflag == 1 || eflag == 2 || eflag == 3) { //load postedited
				extratgt = tt + "sentence" + data.story.predited_srcstory[k].para[j].id;
				savetgt = "savetgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				moretgt = "moretgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				searchtgt = "searchtgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				tgt = "tgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var saveid = "save" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var synid = "syndict" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var doubtid = "doubtid" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var pet_req_flagid = "petreqflag" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var savetext = '';
				var syndivtext = '';
				if (typeof data.story.postedited_targetstory[k].para[j].postedit_not_required != "undefined" && data.story.postedited_targetstory[k].para[j].postedit_not_required === true) {
					syndivtext = '<div class="grid targetpet"><i title="SynonymDictionarySearch" id="' + synid + '" class="fa fa-book" aria-hidden="true"></i><i title="Mark as postedit not required" id="' + pet_req_flagid + '" class="fa fa-lock editsaved"></i></div>';
				} else {
					syndivtext = '<div class="grid targetpet"><i title="SynonymDictionarySearch" id="' + synid + '" class="fa fa-book" aria-hidden="true"></i><i title="Mark as postedit not required" id="' + pet_req_flagid + '" class="fa fa-lock editsave"></i></div>';
				}
				/*if(typeof data.story.postedited_targetstory[k].para[j].doubt != "undefined") {
					//console.log(typeof data.story.postedited_targetstory[k].para[j].doubt);
					if(data.story.postedited_targetstory[k].para[j].doubt == "true") {
						syndivtext += '<i title="Toggle doubt yes/no"  class="doubttrue fa fa-question-circle" id="' + doubtid+ '"></i>';
						sent_rev["dflags"].push("true");
					} else {
						syndivtext += '<i title="Toggle doubt yes/no"  class="doubtfalse fa fa-question-circle" id="' + doubtid+ '"></i>';
						sent_rev["dflags"].push("false");
					}
				} else {
					syndivtext += '<i title="Toggle doubt yes/no"  class="doubtfalse fa fa-question-circle" id="' + doubtid+ '"></i>';
					sent_rev["dflags"].push("false");
				}*/


				if (typeof data.story.postedited_targetstory[k].para[j].feedback == "undefined") {
					sent_rev["fb"].push(" ");
					sent_rev["fb1"].push(" ");
					savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></i></div>';
				} else {
					sent_rev["fb"].push(data.story.postedited_targetstory[k].para[j].feedback);
					sent_rev["fb1"].push("");
					savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></i><i class="fa fa-comment" aria-hidden="true"></i></div>';
				}

				var newtext = data.story.postedited_targetstory[k].para[j].sentence;
				//var retext = identify_syn(newtext);
				//var retext = newtext;
				var retext = normalize(newtext);
				retext = escapeHtml(retext);
				if (data.story.predited_srcstory[k].para[j].sentence == "" && retext == "") {
					retext = "Intentionally left blank";
				} else if (retext == "") {
					//retext = "Target text empty../Translation not available";
					retext = " "
				}
				temptext = '<div contenteditable="true" id="sentence' + data.story.predited_srcstory[k].para[j].id + '" class="grid targetpet ">' + retext + '</div>';
				//var savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></div>';

				if (data.story.postedited_targetstory[k].flag == 1) {
					var textareatgt = $('<div>' + temptext + '</div>').attr("id", tgt).addClass('mytxtarea' + segment_no).appendTo(coltgt);
				} else {
					var textareatgt = $('<div>' + temptext + '</div>').attr("id", tgt).addClass('mytxtarea' + segment_no).appendTo(coltgt);
				}
				if (data.story.postedited_targetstory[k].flag == 1) {
					$('<div>' + savetext + '</div>').attr("id", saveid).addClass('editsaved').appendTo(colsave);
				} else {
					$('<div>' + savetext + '</div>').attr("id", saveid).addClass('editsave mytextarea').appendTo(colsave);
				}
				$('<div>' + syndivtext + '</div>').attr("id", saveid).addClass('mytextarea').appendTo(colsyn);

				var morediv = $('<div></div>').attr("id", extratgt).addClass("btn-group").appendTo(textareatgt);
				//$("<button></button>").attr("id",searchtgt).attr("title","Google it").attr("onclick","search_google(this.id)").html($("<span></span>").addClass('glyphicon glyphicon-search')).appendTo(morediv);
				$("<button>GS</button>").attr("id", searchtgt).attr("title", "Google it").attr("onclick", "search_google(this.id)").addClass("btn btn-info").appendTo(morediv);

				//$("<button></button>").attr("id",searchtgt).attr("title","Search in Wordnet").attr("onclick","search_wordnet(this.id)").html($("<img></img>").attr('src','images/hwn.ico')).appendTo(morediv);

				$("<button>More..</button>").attr("id", moretgt).attr("title", "More..").attr("onclick", "open_more(event,this)").addClass("btn btn-success").appendTo(morediv);

				$("<button>HW</button>").attr("id", searchtgt).attr("title", "Search in Wordnet").addClass("btn btn-info").attr("onclick", "search_wordnet(this.id)").appendTo(morediv);

				//td=$('<td></td>').addClass('tr').html( $('<button>Edit</button>').attr("id",edit )).appendTo(tr);
				//td=$('<td></td>').addClass('tr').appendTo(tr);

				$('<button>Save</button>').attr("id", savetgt).addClass("btn btn-success").appendTo(morediv);

				$('<button>Reset</button>').attr("id", reset).addClass("btn btn-warning").appendTo(morediv);
				$("<button><span>" + src_id + "</span></button>").attr("class", "label label-default").appendTo(morediv);
			} else { //load review
				extratgt = tt + "sentence" + data.story.predited_srcstory[k].para[j].id;
				savetgt = "savetgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				moretgt = "moretgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				searchtgt = "searchtgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				tgt = "tgt" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var saveid = "save" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var synid = "syndict" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var doubtid = "doubtid" + data.story.predited_srcstory[k].id + "sentence" + data.story.predited_srcstory[k].para[j].id;
				var savetext = '';
				var syndivtext = '';
				var pet_req_flag = '';
				syndivtext = '<div class="grid targetpet"><i title="SynonymDictionarySearch" id="' + synid + '" class="fa fa-book" aria-hidden="true"></i></div>';
				/*if(typeof data.story.review_story[k].para[j].doubt != "undefined") {
					//console.log(typeof data.story.postedited_targetstory[k].para[j].doubt);
					if(data.story.review_story[k].para[j].doubt == "true") {
						syndivtext += '<i title="Toggle doubt yes/no"  class="doubttrue fa fa-question-circle" id="' + doubtid+ '"></i>';
						sent_rev["dflags"].push("true");
					} else {
						syndivtext += '<i title="Toggle doubt yes/no"  class="doubtfalse fa fa-question-circle" id="' + doubtid+ '"></i>';
						sent_rev["dflags"].push("false");
					}
				} else {
					syndivtext += '<i title="Toggle doubt yes/no"  class="doubtfalse fa fa-question-circle" id="' + doubtid+ '"></i>';
					sent_rev["dflags"].push("false");
				}*/


				var pf = 0;
				if (typeof data.story.review_story[k].para[j].review_feedback == "undefined") {
					sent_rev["fb1"].push(" ");
					if (typeof data.story.postedited_targetstory[k].para[j].feedback == "undefined") {
						sent_rev["fb"].push(" ");
						savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></i>';
						savetext += '</div>';
					} else {
						sent_rev["fb"].push(data.story.postedited_targetstory[k].para[j].feedback);
						savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></i>';
						savetext += '<i class="fa fa-comment" style="color:lightblue;" aria-hidden="true"></i></div>';
					}
				} else {
					sent_rev["fb1"].push(data.story.review_story[k].para[j].review_feedback);
					if (typeof data.story.postedited_targetstory[k].para[j].feedback == "undefined") {
						sent_rev["fb"].push(" ");
						savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></i><i class="fa fa-comment" aria-hidden="true"></i>';
						savetext += '</div>';
					} else {
						sent_rev["fb"].push(data.story.postedited_targetstory[k].para[j].feedback);
						savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></i><i class="fa fa-comments" aria-hidden="true"></i>';
					}
				}

				var newtext = data.story.review_story[k].para[j].sentence;
				//var retext = identify_syn(newtext);
				var retext = newtext;
				retext = escapeHtml(retext);
				if (retext == "") {
					retext = "Target text empty../Translation not available";
				}

				temptext = '<div contenteditable="true" id="sentence' + data.story.predited_srcstory[k].para[j].id + '" class="grid targetpet ">' + retext + '</div>';
				//var savetext = '<div class="grid targetpet"><i class="fa fa-check" aria-hidden="true"></div>';

				if (data.story.review_story[k].flag == 1) {
					var textareatgt = $('<div>' + temptext + '</div>').attr("id", tgt).addClass('mytxtarea' + segment_no).appendTo(coltgt);
				} else {
					var textareatgt = $('<div>' + temptext + '</div>').attr("id", tgt).addClass('mytxtarea' + segment_no).appendTo(coltgt);
				}
				if (data.story.postedited_targetstory[k].flag == 1) {
					$('<div>' + savetext + '</div>').attr("id", saveid).addClass('editsaved').appendTo(colsave);
				} else {
					$('<div>' + savetext + '</div>').attr("id", saveid).addClass('editsave mytextarea').appendTo(colsave);
				}
				$('<div>' + syndivtext + '</div>').attr("id", saveid).addClass('mytextarea').appendTo(colsyn);
			}
			table.append(tr);
			segment_no++;
		}
		mtstory["src"]["para"].push(sent_src);
		mtstory["tgt"]["para"].push(sent_mt);
		mtstory["tgt2"]["para"].push(sent_mt2);
		mtstory["pet"]["para"].push(sent_rev);
		//$('<br><button>ReTranslate</button>').attr("id",retranslate).appendTo(td);
		//alert(src_para+postedit_para);
		count = src_id;
	}
	//console.log(mtstory);
	if (data.story.mt2_type != "undefined" && data.story.mt2_type != "") {
		mtstory["mt2type"] = data.story.mt2_type;
	}

	//var loadmore = $('<button>Load More..</button>').attr("id","load").attr("onclick",'loadmore()');
	//$('#loadmore').html(loadmore);

	var finish = $('<button>Finish Story</button>').addClass("btn btn-danger").attr("id", "finish");
	var download = $('<button>Download Story</button>').addClass("btn btn-primary").attr("id", "download");
	var generatehtml = $('<button>Generate Webpage</button>').addClass("btn btn-danger").attr("id", "generate");
	//$('#demo').html(refreshbutton);
	var headertext = '<div class="row" id="titleheader"><div class="col-lg-6 col-xs-6 col-sm-6 col-md-6 title" id="title"><div class="panel panel-default"><div class="panel-body"><div style="font-family: &quot;Lohit Devanagari&quot;;" class="mytxtarea" id="srcheader"><div class="grid">Source Text</div></div></div></div></div><div style="display:none;" class="col-lg-4 col-xs-4 col-sm-4 col-md-4 mttitle" id="title"><div class="panel panel-default"><div class="panel-body"><div style="" class="targetpet mytxtarea" id="mttgtheader"><div class="grid">Machine Output</div></div></div></div></div><div class="col-lg-6 col-xs-6 col-sm-6 col-md-6 title" id="title"><div class="panel panel-default"><div class="panel-body"><div disable="true" style="direction: ltr !important; font-size: 25px; font-family: Verdana" class="targetpet" id="tgtheader"><div style="cursor: text;" class="grid">Review Text</div></div></div></div></div></div>';
	//$('#demo').html(headertext);
	$('#demo').html(table);

	//call tm generated from batch mode
	loadBatchTM(data.story["taskid"], data.story.domain, data.story.lang_pair);

	//hide_source();
	$("div[id^='extra']").each(function() {
		$(this).css("direction", "ltr");
		$(this).hide();
	});
	//loadEqualHeights();
	if (data.story.review_status == "pause") {
		pause_resume_flag = 1;
		$("#easyPaginate").addClass("disableddiv");
		$("#finish").addClass("disableddiv");
		$("#resumepause").html('<i class="fa fa-play" aria-hidden="true"></i>&nbsp;');
	} else {
		pause_resume_flag = 0;
		$("#easyPaginate").removeClass("disableddiv");
		$("#finish").removeClass("disableddiv");
		$("#resumepause").html('<i class="fa fa-pause" aria-hidden="true"></i>&nbsp;');
	}
	if (lang_pair == "hin_urd") {
		$(".targetpet").css("direction", "rtl");
	}
	/*		$('#easyPaginate').easyPaginate({
				paginateElement: 'li',
				elementsPerPage: 3,
				effect: 'climb'
			});*/
	$("#ftog").show();
	$("#refresh").show();
	$('#final').html("");
	var pub_id = '';
	story_status = data.story["status"];
	if (data.story["status"] != "published" && data.story["status"] != "finished") {
		$("#tpublish").addClass("disabled");
		$("#tpublish").prop('disabled', true);
		//$('#final').html(finish);
	} else {
		$("#tpublish").addClass("disabled");
		$("#tpublish").prop('disabled', true);
		if (type == "web" || type == "ht" || type == "liveht") {
			$("#final").append(generatehtml);
			pub_id = data.story.published_id;
		}
	}
	if (typeof data.story["pet_commit_status"] != "undefined" && typeof data.story.review_status == "undefined") {
		if (data.story["pet_commit_status"] === true) {
			$("#trework").show();
		} else {
			$("#trework").hide();
		}
	} else {
		if (data.story["postedit_status"] == "finished" && typeof data.story.review_status == "undefined") {
			$("#trework").show();
		} else {
			$("#trework").hide();
		}
	}
	if (typeof data.story["review_commit_status"] != "undefined" && typeof data.story.review_status != "undefined") {
		if (data.story["review_commit_status"] === true) {
			$("#revrework").show();
		} else {
			$("#revrework").hide();
		}
	} else {
		if (data.story["review_status"] == "finished" && typeof data.story.review_status != "undefined") {
			$("#revrework").show();
		} else {
			$("#revrework").hide();
		}
	}
	//$("#final").append(download);
	if (type == "web") {
		//$("#final").append(generate_html);
	}

	$("#tdownload").on("click", function() {
		/*$("#download-box").dialog({
			"position":{ my: "center", at: "center",of:document}
		});
		$('html, body').animate({
			scrollTop: $(".ui-dialog").offset().top
		}, 100);*/
		$("#download-box").modal();
		$(".getfile").show();
		$(".getzip").hide();
		$(".viewstory").hide();
		$(".original").hide();
	});
	$("#tview").on("click", function() {
		/*$("#download-box").dialog({
			"position":{ my: "center", at: "center",of:document}
		});
		$('html, body').animate({
			scrollTop: $(".ui-dialog").offset().top
		}, 100);*/
		$("#download-box").modal();
		$(".getfile").hide();
		$(".getzip").hide();
		$(".viewstory").show();
		$(".original").show();
	});

	var arr = getlangpair.split("_");
	lang1 = arr[0];
	lang2 = arr[1];

	insert_symbols(lang2);
	config_buttons(lang2);
	$("#mttab").css("direction", "ltr");
	$("#roughpad").css("direction", "ltr");
	if (lang2 != "hin" && lang2 != "pan" && lang2 != "urd") {
		$("div[id^='src']").css("font-family", "\'Lohit Devanagari\'");
	}
	if (lang2 == "hin") {
		$("div[id^='tgt']").css("font-family", "\'Lohit Devanagari\'");
		$("div[id^='tgt']").css("font-size", "21px");
		$("#roughpad").css("font-family", "\'Lohit Devanagari\'");
		$("#roughpad").css("color", "#000");
		$("#mttab").css("font-family", "\'Lohit Devanagari\'");
		$("#dicttab").css("font-family", "\'Lohit Devanagari\'");
		$("#cctab").css("font-family", "\'Lohit Devanagari\'");
		$("#gsttab").css("font-family", "\'Lohit Devanagari\'");
		$("#tsttab").css("font-family", "\'Lohit Devanagari\'");
		$("#termttab").css("font-family", "\'Lohit Devanagari\'");
		$("#tmview2").css("font-family", "\'Lohit Devanagari\'");
		$("#tip").css("font-family", "\'Lohit Devanagari\'");
	}
	if (lang2 == "ben") {
		$("div[id^='tgt']").css("font-family", "\'lohitbengali\'");
		$("#dicttab").css("font-family", "\'lohitbengali\'");
		$("#ccttab").css("font-family", "\'lohitbengali\'");
		$("#gsttab").css("font-family", "\'lohitbengali\'");
		$("#tsttab").css("font-family", "\'lohitbengali\'");
		$("#termttab").css("font-family", "\'lohitbengali\'");
	}
	if (lang1 == "tel") {
		$("div[id^='src']").css("font-family", "\'telugumandali\'");
		$("div[id^='src']").css("color", "#000");
		$("div[id^='src']").css("fontSize", "20px");
	}
	if (lang2 == "tel") {
		$("div[id^='tgt']").css("font-family", "\'telugumandali\'");
		$("div[id^='tgt']").css("color", "#000");
		$("div[id^='tgt']").css("fontSize", "20px");
		$("#roughpad").css("font-family", "\'telugumandali\'");
		$("#roughpad").css("color", "#000");
		$("#mttab").css("font-family", "\'telugumandali\'");
		$("#dicttab").css("font-family", "\'telugumandali\'");
		$("#ccttab").css("font-family", "\'telugumandali\'");
		$("#gsttab").css("font-family", "\'telugumandali\'");
		$("#tsttab").css("font-family", "\'telugumandali\'");
		$("#termttab").css("font-family", "\'telugumandali\'");
		$("#tip").css("font-family", "\'telugumandali\'");
	}
	if (lang2 == "kan") {
		$("div[id^='tgt']").css("font-family", "lohitkannada");
		$("div[id^='tgt']").css("color", "#000");
		$("#roughpad").css("font-family", "\'lohitkannada\'");
		$("#roughpad").css("color", "#000");
		$("#mttab").css("font-family", "\'lohitkannada\'");
		$("#dicttab").css("font-family", "\'lohitkannada\'");
		$("#ccttab").css("font-family", "\'lohitkannada\'");
		$("#gsttab").css("font-family", "\'lohitkannada\'");
		$("#tsttab").css("font-family", "\'lohitkannada\'");
		$("#termttab").css("font-family", "\'lohitkannada\'");
		$("#tip").css("font-family", "\'lohitkannada\'");
	}

	if (lang1 == "ara") {
		$("div[id^='src']").css("fontSize", "25px");
		$("div[id^='src']").css("font-family", "\'arabicfont\'");
		$("div[id^='src']").css("direction", "rtl");
	}
	if (lang2 == "ara") {
		$("div[id^='tgt']").css("fontSize", "25px");
		$("div[id^='tgt']").css("font-family", "\'arabicfont\'");
		$("div[id^='tgt']").css("direction", "rtl");
		$("#roughpad").css("font-family", "\'arabicfont\'");
		$("#tip").css("font-family", "\'arabicfont\'");
		$("#mttab").css("font-family", "\'arabicfont\'");
		$("#mttab").css("font-size", "16px");
		$("#mttab").css("direction", "rtl");
		$("#roughpad").css("direction", "rtl");
		$("#transtab").css("font-family", "\'arabicfont\'");
		$("#transtab").css("font-size", "25px");
	}
	if (lang1 == "urd") {
		$("div[id^='src']").css("fontSize", "22px");
		$("div[id^='src']").css("font-family", "\'Urdufont1\'");
		$("div[id^='src']").css("direction", "rtl");
	}
	if (lang2 == "urd") {
		//$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
		//alert("iam here");
		$("div[id^='tgt']").css("fontSize", "25px");
		$("div[id^='tgt']").css("direction", "rtl");
		$("div[id^='mttgt']").css("fontSize", "25px");

		$("div[id^='tgt']").css("font-family", "\'Urdufont1\'");
		$("div[id^='mttgt']").css("font-family", "\'Urdufont1\'");
		$("#roughpad").css("font-family", "\'Urdufont1\'");
		$("#tip").css("font-family", "\'Urdufont1\'");
		$("#mttab").css("font-family", "\'Urdufont1\'");
		$("#mttab").css("font-size", "16px");
		$("#mttab").css("direction", "rtl");
		$("#syndicttab").css("font-family", "\'Urdufont1\'");
		$("#syndicttab").css("font-size", "20px");
		$("#syndicttab").css("direction", "rtl");
		$("#roughpad").css("direction", "rtl");

		$("#transtab").css("font-family", "\'Urdufont1\'");
		$("#transtab").css("font-size", "25px");
		$("#mttab").css("direction", "rtl");
		$("#dicttab").css("font-family", "\'Urdufont1\'");
		$("#dicttab").css("font-size", "25px");
		$("#dicttab").css("direction", "rtl");
		$("#ccttab").css("font-family", "\'Urdufont1\'");
		$("#cctab").css("font-size", "25px");
		$("#cctab").css("direction", "rtl");
		$("#gsttab").css("font-family", "\'Urdufont1\'");
		$("#gstab").css("font-size", "25px");
		$("#gstab").css("direction", "rtl");
		$("#tsttab").css("font-family", "\'Urdufont1\'");
		$("#tstab").css("font-size", "25px");
		$("#tstab").css("direction", "rtl");
		$("#termttab").css("font-family", "\'Urdufont1\'");
		$("#termtab").css("font-size", "25px");
		$("#termtab").css("direction", "rtl");
	}
	if (lang1 == "guj") {
		$("div[id^='src']").css("font-family", "\'lohitgujrati\'");
	}
	if (lang1 == "tam") {
		$("div[id^='src']").css("font-family", "\'lohittamil\'");
	}

	if (lang2 == "guj") {
		//$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
		//alert("iam here");
		$("div[id^='tgt']").css("font-family", "\'lohitgujrati\'");
		$("div[id^='mttgt']").css("font-family", "\'lohitgujrati\'");
		$("#roughpad").css("font-family", "\'lohitgujrati\'");
		$("#tip").css("font-family", "\'lohitgujrati\'");
		$("#mttab").css("font-family", "\'lohitgujrati\'");
		$("#syndicttab").css("font-family", "\'lohitgujrati\'");
		$("#syndicttab").css("font-size", "20px");
		$("#transtab").css("font-family", "\'lohitgujrati\'");
	}
	if (lang2 == "tam") {
		//$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
		//alert("iam here");
		$("div[id^='tgt']").css("font-family", "\'lohittamil\'");
		$("div[id^='mttgt']").css("font-family", "\'lohittamil\'");
		$("#roughpad").css("font-family", "\'lohittamil\'");
		$("#tip").css("font-family", "\'lohittamil\'");
		$("#mttab").css("font-family", "\'lohittamil\'");
		$("#dicttab").css("font-family", "\'lohittamil\'");
		$("#ccttab").css("font-family", "\'lohittamil\'");
		$("#gsttab").css("font-family", "\'lohittamil\'");
		$("#tsttab").css("font-family", "\'lohittamil\'");
		$("#termttab").css("font-family", "\'lohittamil\'");
		$("#syndicttab").css("font-family", "\'lohittamil\'");
		$("#syndicttab").css("font-size", "20px");
		$("#transtab").css("font-family", "\'lohittamil\'");
	}
	if (lang1 == "pan") {
		$("div[id^='src']").css("font-family", "\'lohitpunjabi\'");
	}
	if (lang2 == "pan") {
		//$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
		//alert("iam here");
		$("div[id^='tgt']").css("font-family", "\'lohitpunjabi\'");
		$("div[id^='mttgt']").css("font-family", "\'lohitpunjabi\'");
		$("#roughpad").css("font-family", "\'lohitpunjabi\'");
		$("#tip").css("font-family", "\'lohitpunjabi\'");
		$("#mttab").css("font-family", "\'lohitpunjabi\'");
		$("#dicttab").css("font-family", "\'lohitpunjabi\'");
		$("#ccttab").css("font-family", "\'lohitpunjabi\'");
		$("#gsttab").css("font-family", "\'lohitpunjabi\'");
		$("#tsttab").css("font-family", "\'lohitpunjabi\'");
		$("#termttab").css("font-family", "\'lohitpunjabi\'");
		$("#syndicttab").css("font-family", "\'lohitpunjabi\'");
		$("#syndicttab").css("font-size", "20px");
		$("#transtab").css("font-family", "\'lohitpunjabi\'");
	}
	if (lang1 == "mal") {
		$("div[id^='src']").css("font-family", "\'lohitmalyalam\'");
	}
	if (lang2 == "mal") {
		//$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
		//alert("iam here");
		$("div[id^='tgt']").css("font-family", "\'lohitmalyalam\'");
		$("div[id^='mttgt']").css("font-family", "\'lohitmalyalam\'");
		$("#roughpad").css("font-family", "\'lohitmalyalam\'");
		$("#tip").css("font-family", "\'lohitmalyalam\'");
		$("#mttab").css("font-family", "\'lohitmalyalam\'");
		$("#syndicttab").css("font-family", "\'lohitmalyalam\'");
		$("#syndicttab").css("font-size", "20px");
		$("#transtab").css("font-family", "\'lohitmalyalam\'");
	}
	start();


	//alert(option);


	$("button[id^='refresh']").unbind('click').on('click', function() {
		//var tempjobid = $("#list").val();
		var tempjobid = job_id;
		//alert("iam here");
		loadpet(currentjob);
		$("#viewdoubt").html('<input type="checkbox">View Doubt').removeClass('active');
		$("#viewmtout").html('<input type="checkbox">View MT Output').removeClass('active');
		$('#viewmtout').prop('checked', false); // will uncheck the checkbox with specified id 
		$('#viewdoubt').prop('checked', false); // will uncheck the checkbox with specified id 
		//loaduserjob(currentjob);
	});
	$("div[id^='seg_']").bind("click", function(event) {
		var seg_class = $(this).parent().attr("class");
		if (/selected/.test(seg_class)) {
			$(this).parent().removeClass("selected");
		} else {
			$(this).parent().addClass("selected");
		}
	});

	$("div[id^='src'],div[id^='mttgt']").bind("click", function(event) {
		currid = this.id;

		var tgtid = currid.replace(/src/, "tgt");
		var segid = currid.replace(/src/, "seg");
		var saveid = currid.replace(/src/, "save");
		var trid = $(this).parent().parent().attr('id');

		$("#" + trid).css("border-left", "2px solid red");
		$("#" + trid).css("border", "2px solid #9ecaed");
		//$("#" + trid).css("border-bottom", "1px solid #9ecaed");
		$("#" + trid).css("box-shadow", "0 -10px 10px -10px #9ecaed,0 10px 10px -10px #9ecaed,-10px 0 10px -10px #9ecaed");
		$("#" + trid).css("box-shadow", "0 -10px 10px -10px #9ecaed,0 10px 10px -10px #9ecaed,10px 0 10px -10px #9ecaed");
		$("div.divrow").removeClass("selected");

		/*$("#" + tgtid).attr('readonly', true);
		$("#" + currid).attr('readonly', true);*/
		$("#" + currid).attr('readonly', false);
		$("#" + tgtid).attr('readonly', false);

		$(this).children("*").css("cursor", "text");
		$("span").removeClass('edit');
		$("#" + currid).attr('readonly', false);
		$("#" + tgtid).attr('readonly', false);
		$("#" + segid).attr('readonly', false);

		current_id = tgtid;

		$("#extratabtitleimage").hide();
		var extrasrc = currid.replace(/src/, "extrasrc");
		var extratgt = currid.replace(/src/, "extratgt");
		var extratab = currid.replace(/src/, "extratab");
		var extramt = currid.replace(/src/, "extramt");
		//$("#viewmtout").click();
		if (prevtrid != trid) { //to not call this functionality again and again
			$("#" + prevtrid).css("box-shadow", "none");
			$("#" + prevtrid).css("border", "1px solid #ddd");
			//$("#"+prevtrid).css("border-bottom","none");
			$("#" + prevtrid).css("border-left", "none");
			viewmtout();
			if (previd != "") {
				var s = previd.replace(/tgt/, "src");

				//to remove suggestions on previous worked div
				if (suggestions_flag == 1) {
					var nn = $("#" + previd + " div[id^='sentence']").text();
					nn = escapeHtml(nn);
					$("#" + previd + " div[id^='sentence']").html(nn);
				}

				//to handle reload button
				var t = $("#" + s + " div[id^='sentence']").text();
				t = escapeHtml(t);
				$("#" + s + " div[id^='sentence']").html(t);
			}
			if (suggestions_flag == 1) {
				var currtext = $("#" + current_id + " div[id^='sentence']").text();
				var rettext = identify_syn2(currtext);
				//	    $("#" + currid + " div[id^='sentence']").click();
				$("#" + current_id + " div[id^='sentence']").focus();
				window.document.execCommand('selectAll', false, null);
				window.document.execCommand('insertHtml', false, rettext);
			}
		}
		previd = tgtid;
		prevtrid = trid;
		prevsrcid = currid;
		//search_dictionary(srcid);
		//$("#bidict").click();
	});
	$("div[id^='tgt']").bind("click", function(event) {
		currid = this.id;
		//alert(currid);
		currid = currid.replace(/div/, "");
		//identify_syn(currid);
		//alert("s"+sjob+"end"+count);
		var height1 = 0;
		var height2 = 0;
		var height = 0;
		var srcid = currid.replace(/tgt/, "src");
		var segid = currid.replace(/tgt/, "seg");
		var saveid = currid.replace(/tgt/, "save");
		var trid = $(this).parent().parent().attr('id');
		var trpara = $(this).parent().parent().attr("data-paraid");

		//$("#" + trid).css("border-left", "2px solid red");
		$("#" + trid).css("border", "2px solid #9ecaed");
		$("#" + trid).css("box-shadow", "0 -10px 10px -10px #9ecaed,0 10px 10px -10px #9ecaed,10px 0 10px -10px #9ecaed");
		$("#" + trid).css("box-shadow", "0 -10px 10px -10px #9ecaed,0 10px 10px -10px #9ecaed,-10px 0 10px -10px #9ecaed");
		$("div.divrow").removeClass("selected");

		//$("div[data-paraid="+trpara+"]").css("border", "1px solid red");
		$("div[data-paraid="+trpara+"]").css("border", "0");
		$("div[data-paraid="+trpara+"]").last().css("border-bottom", "2px solid red");
		$("div[data-paraid="+trpara+"]").first().css("border-top", "2px solid red");
		$("div[data-paraid="+trpara+"]").css("border-left", "2px solid red");
		$("div[data-paraid="+trpara+"]").css("border-right", "2px solid red");
//		$("div[data-paraid="+trpara+"]").css("box-shadow", "0 -10px 10px -10px #9ecaed,0 10px 10px -10px #9ecaed,10px 0 10px -10px #9ecaed");

		//$("#"+currid).addClass('edit');
		//$("#"+currid+" div").eq(0).addClass('edit');
		$(this).children("*").css("cursor", "text");
		$("span").removeClass('edit');
		//$("textarea[id^='tgt']").addClass("right");
		$("#" + currid).attr('readonly', false);
		$("#" + srcid).attr('readonly', false);
		$("#" + segid).attr('readonly', false);
		//alert(previd);

		current_id = currid;
		if (prevtrid != trid) { //to not call this functionality again and again
			$("#" + prevtrid).css("box-shadow", "none");
			$("#" + prevtrid).css("border", "1px solid #ddd");
			$("#" + prevtrid).css("border-left", "none");

			if(prevtrpara != "" && prevtrpara != trpara) {
			$("div[data-paraid="+prevtrpara+"]").css("border", "1px solid #ddd");
			}
		$("div[data-paraid="+trpara+"]").css("border", "0");
		$("div[data-paraid="+trpara+"]").last().css("border-bottom", "1px solid red");
		$("div[data-paraid="+trpara+"]").first().css("border-top", "1px solid red");
		$("div[data-paraid="+trpara+"]").css("border-left", "2px solid red");
		$("div[data-paraid="+trpara+"]").css("border-right", "2px solid red");
			viewmtout();
			if (previd != "") {
				var s = previd.replace(/tgt/, "src");

				//to remove suggestions on previous worked div
				var nn = $("#" + previd + " div[id^='sentence']").text();
				nn = escapeHtml(nn);
				$("#" + previd + " div[id^='sentence']").html(nn);

				//to handle reload button
				var t = $("#" + s + " div[id^='sentence']").text();
				t = escapeHtml(t);
				$("#" + s + " div[id^='sentence']").html(t);
			}
			if (suggestions_flag == 1) {
				var currtext = $("#" + currid + " div[id^='sentence']").text();
				var rettext = identify_syn2(currtext);
				//	    $("#" + currid + " div[id^='sentence']").click();
				$("#" + currid + " div[id^='sentence']").focus();
				window.document.execCommand('selectAll', false, null);
				window.document.execCommand('insertHtml', false, rettext);
			}
		}

		prevtext = $("#" + currid).text();
		//$("#viewmtout").click();
		previd = currid;
		prevtrid = trid;
		prevtrpara = trpara;
		//search_dictionary(srcid);
		//$("#bidict").click();
		//document.getElementById(currid).contentEditable=true;
	});
	//on click of save/comments cell show comments box
	$("i[id^='petreqflag']").unbind("click").on("click", function() {
		var currid = this.id;
		var curclass = $(this).attr("class");
		//console.log(curclass);
		var tgtid = currid.replace(/petreqflag/, "tgt");
		var prf = currid.replace(/petreqflag/, "");
		var paraid = prf.split("sentence")[0];
		var sentid = prf.split("sentence")[1];
		cur_list = job_id;
		var arr1 = cur_list.split("____");
		var param = "user=" + arr1[0] + "&taskid=" + arr1[1] + "&domain=" + dom + "&lang_pair=" + lang_pair;
		if (/editsaved/.test(curclass)) {
			param += '&paraId=' + paraid + '&sentId=' + sentid + '&postedit_not_required=false';
		} else {
			param += '&paraId=' + paraid + '&sentId=' + sentid + '&postedit_not_required=true';
		}
		var resturl = config.petRequiredFlag;
		doAjax(resturl, param);
		if (ajax_flag == 1) {
			//console.log("success");
			if (/editsaved/.test(curclass)) {
				$("#" + currid).removeClass('editsaved');
				$("#" + currid).addClass('editsave');
			} else {
				$("#" + currid).addClass('editsaved');
				$("#" + currid).removeClass('editsave');
			}
			ajax_flag = 0;
		}

	});

	$("div[id^='tgt'],div[id^='src']").unbind("keydown").bind("keydown", function(e) {
		// e.preventDefault();
	});
	//on click of save/comments cell show comments box
	var firstevent = $("div[id^='tgt']").on("kup", function(e) {
		var targetid = this.id;
		var srcid = targetid.replace(/tgt/, "src");
		var mtid = targetid.replace(/tgt/, "mttgt");
		var colid = targetid.replace(/tgt/, "seg");
		var saveid = targetid.replace(/tgt/, "save");

		var sh = '';
		var th = '';
		setTimeout(function() {
			$("#" + targetid).children("*").css("min-height", "");
			$("#" + srcid).children("*").css("min-height", "");
			sh = $("#" + srcid).children("*").css('height');
			th = $("#" + targetid).children("*").css('height');
			///sh = parseInt(sh) + 8 + "px";
			//th = parseInt(th) + 8 + "px";
			sh = parseInt(sh);
			th = parseInt(th);

			//console.log(srcid+" "+sh+" "+targetid+" "+th);
			if (sh > th) {
				//	 console.log("if"+targetid+" "+sh+" "+th);
				/*$("#"+targetid).css("height",sh);
				  $("#"+srcid).css("height",sh);*/
				$("#" + targetid).children("*").css("min-height", sh);
				$("#" + srcid).children("*").css("min-height", sh);
				$("#" + mtid).children("*").css("min-height", sh);
				$("#" + colid).children("*").css("min-height", sh);
				$("#" + saveid).children("*").css("min-height", sh);
			} else {
				//	 console.log("else"+targetid+" "+sh+" "+th);
				/*$("#"+srcid).css("height",th);
				  $("#"+targetid).css("height",th);*/
				$("#" + srcid).children("*").css("min-height", th);
				$("#" + targetid).children("*").css("min-height", th);
				$("#" + mtid).children("*").css("min-height", th);
				$("#" + colid).children("*").css("min-height", th);
				$("#" + saveid).children("*").css("min-height", th);
			}
		}, 100);
	});
	$(document).on("click", "i[id^='syndict']", function(e) {
		//alert("iam here");
		var h = $(".bottomdiv").height();
		h = parseInt(h);
		if (h <= 10) {
			$(".bottomdiv").css("height", "250px");
		}

		$("#lisyndict").addClass('active');
		$("#lisyndict").siblings().removeClass('active');
		$("#syndicttab").show();
		$("#syndicttab").siblings().hide();
		triggerChange();

		//e.preventDefault();
		var currid = this.id;
		var tgtid = currid.replace(/syndict/, "tgt");
		var text = getselectedtext(current_id);
		if (typeof text == "undefined" || text == "" || current_id == "") {}
		$(this).html('<i class="fa fa-spinner"></i>');
		$("#syndictsrch").val(text);
		search_monodictionary(text);
		$(this).html('');
		//$(this).html('<i id="'+this.id+'" class="fa fa-book"></i>');
		//$("#" + tgtid).click();
		//current_id = tgtid;
		//$("#tfeedback").click();
	});

	//handle on paste events to avoid html and css codes
	//document.addEventListener("paste", function(event)
	$("div[id^='tgt']").on("paste", function(event) {

		var iid = event.target.id;
		var tgtregex = new RegExp("sentence");

		if (tgtregex.test(iid)) {
			//alert("iam here");
			//var pastedText = '';
			var pastedText = (event.originalEvent || event).clipboardData.getData('text/plain');
			/*if (window.clipboardData && window.clipboardData.getData) { // IE
							 pastedText = window.clipboardData.getData('Text');
						 } else if (event.clipboardData && event.clipboardData.getData) {
							 pastedText = event.clipboardData.getData('text/plain');
						 }*/
			//pastedText = identify_syn(pastedText)
			//$("#"+iid).text(pastedText);
			event.preventDefault();
			window.document.execCommand('insertText', false, pastedText);
			//alert("iam here in paste"+pastedText);
		}
	});

	$("button[id^='tpublish']").click(function() {
		$('.notify').remove();
		$.notify("Saving all sentences", {
			type: "success",
			"position": "top",
			background: "#31b0d5"
		});
		saveAll();
		publishStory();
	});

	$("button[id^='trework']").unbind("click").click(function() {
		if ($.inArray("5", permissions) == -1) {
			$('.notify').remove();
			$.notify("You don't have permission to do this operation", {
				"postion": "top",
				"type": "danger"
			});
			return;
		}
		$('#assignexpectedfinish').datepicker({
			autoclose: true,
			format: 'dd-M-yyyy',
			todayHighlight: true
		});
		//$('.notify').remove();
		//$.notify("Saving all sentences",{type:"success","position":"top", background: "#31b0d5" });
		if (confirm('Are you sure you want to reassign for postedit? This action cannot be reversed.')) {
			//alert(document.getElementById("time").innerHTML);
		} else {
			return false;
		}
		var arr = job_id.split("____");
		var editor_users = '';
		for (var n = 0; n < user_roles.users.length; n++) {
			var fuser = user_roles.users[n].user;
			var fname = user_roles.users[n].fname;
			var emailid = user_roles.users[n].EmailId;
			var lname = user_roles.users[n].lname;
			//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
			//    editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
			if (user_roles.users[n].role == "editor") {
				editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
			}
		}
		//console.log(editor_users);
		$("#assignuser").html(editor_users);
		$("#assignuser").chosen({
			'width': '85%',
			allow_single_deselect: true
		});
		$('#assignuser').trigger("chosen:updated");
		$("#myModal").modal();
		if ($('#sendCommittMail').is(":checked")) {
			$("#sendCommittMail").attr("checked", false); //uncheck if already checked
		} else {}
		$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Assign job " + arr[1] + " of " + arr[2] + " of " + arr[3]);
		$("#fdassigntext").show();
		//assignjob btn click for selected job
		$("#assignbtn").unbind("click").on("click", function(e) {
			//$('#myModal').modal('hide');
			//alert("iam here");
			var fdpettext = $("#fdassigntext").val();
			if (typeof fdpettext == "undefined" || fdpettext == "") {
				alert("Please provide some feedback");
				return false;
			}
			var selected_user = $("#assignuser").val();
			if (typeof selected_user == "undefined" || selected_user == "") {
				alert("Please select a user!!");
				return false;
			}
			var expected_finish = $("#assignexpectedfinish").val();

			if (typeof expected_finish != "undefined" && expected_finish != "") {
				expected_finish = expected_finish.toLowerCase();
				var tempdate = expected_finish.split("-");
				var map = {
					jan: "01",
					feb: "02",
					mar: "03",
					apr: "04",
					may: "05",
					june: "06",
					jun: "06",
					july: "07",
					jul: "07",
					aug: "08",
					sep: "09",
					oct: "10",
					nov: "11",
					dec: "12"
				};
				var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
				expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

			}
			var rest_url = config.reassignPetbyManager;
			var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + arr[1] + "&domain=" + arr[3] + "&lang_pair=" + arr[2] + "&reassign_comment=" + fdpettext;
			var mail_param = "user=" + selected_user + "&taskid=" + arr[1] + "&domain=" + arr[3] + "&lang_pair=" + arr[2] + "&type=postedit_assigned";
			var sms_param = selected_user + "\t" + details[1] + "\t" + details[3] + "\t" + details[2] + "\tpostedit_assign";
			if (expected_finish != "") {
				rest_param += '&expected_postedit_finish=' + expected_finish;
			}
			//$('#myModal').modal('hide');
			//alert(rest_param);
			e.preventDefault();
			var mN = $('#sendCommittMail').is(":checked");
			var sN = $('#sendAssignSMS').is(":checked");
			doAjax(rest_url, rest_param);
			if (ajax_flag == 1) {
				//$('#jtable').dataTable().fnUpdate("Assigned", $('tr#'+trow)[0], 3, false );
				ajax_flag = 0;
				var msg = 'EBS MANAGER INFO: Postedit Reassign Task assignedto=' + selected_user + ',lang_pair=' + arr[2] + ',id=' + arr[1] + ',domain=' + arr[3] + ';type=' + this.id;
				//if (impersonate_by != "") {
				insert_logs(crole, msg);
				if (mN) {
					sendNotification(mail_param);
				} else {}
				if (sN) {
					sendSMSNotification(sms_param);
				} else {}
				$(".goback").click();
				var trow = "tablerowtrow" + arr[0] + "____" + arr[1] + "____" + arr[2] + "____" + arr[3];
				$('tr[id^=' + trow + '] td:eq(4)').html('Assigned (' + selected_user + ' )');

			}

		});
	});
	//Review reassign in task open
	$("button[id^='revrework']").unbind("click").click(function() {
		if ($.inArray("5", permissions) == -1) {
			$('.notify').remove();
			$.notify("You don't have permission to do this operation", {
				"postion": "top",
				"type": "danger"
			});
			return;
		}
		$('#assignexpectedfinish').datepicker({
			autoclose: true,
			format: 'dd-M-yyyy',
			todayHighlight: true
		});
		//$('.notify').remove();
		//$.notify("Saving all sentences",{type:"success","position":"top", background: "#31b0d5" });
		if (confirm('Are you sure you want to reassign for review? This action cannot be reversed.')) {
			//alert(document.getElementById("time").innerHTML);
		} else {
			return false;
		}
		var arr = job_id.split("____");
		var editor_users = '';
		for (var n = 0; n < user_roles.users.length; n++) {
			var fuser = user_roles.users[n].user;
			var fname = user_roles.users[n].fname;
			var emailid = user_roles.users[n].EmailId;
			var lname = user_roles.users[n].lname;
			//editor_users += '<option value="' + fuser.toLowerCase() + '">' + fuser + '</option>';
			//    editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + '</option>';
			if (user_roles.users[n].role == "reviewer") {
				editor_users += '<option value="' + fuser.toLowerCase() + '">' + lname + " " + fname + " (" + emailid + ')</option>';
			}
		}
		//console.log(editor_users);
		$("#assignuser").html(editor_users);
		$("#assignuser").chosen({
			'width': '85%',
			allow_single_deselect: true
		});
		$('#assignuser').trigger("chosen:updated");
		$("#myModal").modal();
		$("#myModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("ReAssign Review job " + arr[1] + " of " + arr[2] + " of " + arr[3]);
		if ($('#sendCommittMail').is(":checked")) {
			$("#sendCommittMail").attr("checked", false); //uncheck if already checked
		} else {}
		$("#fdassigntext").show();
		//assignjob btn click for selected job
		$("#assignbtn").unbind("click").on("click", function(e) {
			//$('#myModal').modal('hide');
			//alert("iam here");
			var fdpettext = $("#fdassigntext").val();
			if (typeof fdpettext == "undefined" || fdpettext == "") {
				alert("Please provide some feedback");
				return false;
			}
			var selected_user = $("#assignuser").val();
			if (typeof selected_user == "undefined" || selected_user == "") {
				alert("Please select a user!!");
				return false;
			}
			var expected_finish = $("#assignexpectedfinish").val();

			if (typeof expected_finish != "undefined" && expected_finish != "") {
				expected_finish = expected_finish.toLowerCase();
				var tempdate = expected_finish.split("-");
				var map = {
					jan: "01",
					feb: "02",
					mar: "03",
					apr: "04",
					may: "05",
					june: "06",
					jun: "06",
					july: "07",
					jul: "07",
					aug: "08",
					sep: "09",
					oct: "10",
					nov: "11",
					dec: "12"
				};
				var d = new Date(tempdate[2], parseInt(map[tempdate[1]]) - 1, tempdate[0]);
				expected_finish = d.getFullYear() + '/' + ('0' + parseInt(d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

			}
			var rest_url = config.reassignRevByManager;
			var rest_param = "user=" + selected_user + "&admin=" + user + "&taskid=" + arr[1] + "&domain=" + arr[3] + "&lang_pair=" + arr[2] + "&review_reassign_comment=" + fdpettext;
			var mail_param = "user=" + selected_user + "&taskid=" + arr[1] + "&domain=" + arr[3] + "&lang_pair=" + arr[2] + "&type=review_assigned";
			var sms_param = selected_user + "\t" + details[1] + "\t" + details[3] + "\t" + details[2] + "\treview_assign";
			if (expected_finish != "") {
				rest_param += '&expected_review_finish=' + expected_finish;
			}
			//$('#myModal').modal('hide');
			//alert(rest_param);
			e.preventDefault();
			var mN = $('#sendCommittMail').is(":checked");
			var sN = $('#sendAssignSMS').is(":checked");
			doAjax(rest_url, rest_param);
			if (ajax_flag == 1) {
				//$('#jtable').dataTable().fnUpdate("Assigned", $('tr#'+trow)[0], 3, false );
				ajax_flag = 0;
				var msg = 'EBS MANAGER INFO: Review Reassign in Task open assigned_to=' + selected_user + ',lang_pair=' + arr[2] + ',id=' + arr[1] + ',domain=' + arr[3] + ';type=' + this.id;
				//if (impersonate_by != "") {
				insert_logs(crole, msg);
				if (mN) {
					sendNotification(mail_param);
				} else {}
				if (sN) {
					sendSMSNotification(sms_param);
				} else {}

				$(".goback").click();
				var trow = "tablerowtrow" + arr[0] + "____" + arr[1] + "____" + arr[2] + "____" + arr[3];
				$('tr[id^=' + trow + '] td:eq(4)').html('ReAssigned (' + selected_user + ' )');
			}

		});
	});

	function publishStory() {
		if (confirm('Are you sure you want to finish the review?')) {
			//alert(document.getElementById("time").innerHTML);
		} else {
			return false;
		}
		stop();
		duration = document.getElementById("time").innerHTML;
		var dur = duration.split(":");
		var minutes = parseInt(dur[0]) * 60 + parseInt(dur[1]) + parseInt(dur[2]) / 60;
		minutes = minutes.toString();
		//alert(minutes);

		//cur_list=$("#list").val();
		cur_list = job_id;
		//alert("srctext:"+srctext+"tgttext"+tgttext+"id:"+id+"cur_list:"+cur_list);
		var arr2 = cur_list.split("____");
		var temp_url = '';
		var param = '';
		//param ="user="+arr2[0]+"&taskid="+arr2[1]+"&time="+minutes+"&domain="+dom+"&lang_pair="+lang_pair;
		param = "user=" + arr2[0] + "&taskid=" + arr2[1] + "&domain=" + dom + "&lang_pair=" + lang_pair;
		if (type == "file") {
			temp_url = config.publishRevJob;
		} else {
			temp_url = config.publishJob1;
			if (type == "ht") {
				param += "&story_source=ht"
			} else if (type == "liveht") {
				param += "&story_source=liveht"
			} else if (type == "ndtvhindi") {
				param += "&story_source=ndtvhindi"
			}
		}
		$.ajax({
			//url:"http://10.2.8.78/Symfony-2.5/web/app.php/publishJob",
			//url:"http://10.2.8.78/Symfony-2.5/web/app.php/publishPETJob",
			//url:"http://10.2.8.78/postEditTool/0.4/web/app.php/publishPostEditJob",
			url: temp_url,
			type: 'POST',
			data: param,
			async: false,
			//data: "user="+arr2[0]+"&taskid="+arr2[1]+"&time="+minutes+"&domain="+dom+"&lang_pair="+lang_pair,
			header: "application/x-www-form-urlencoded",
			//to pass survey 
			success: function(data) {
				//alert("save succesful"+data);
				var status4 = "Publish status:" + data['status'] + ", Message:" + data['message'];
				//alert(status4+" "+data['id']);
				if (type == "web") {
					var ppid = data['id'];
					//generate_html(ppid,type);
				} else if (type == "ht" || type == "liveht") {
					var ppid = data['id'];
					//generate_html(ppid,type);
				}
				// $("#messages").html(status4);
				if (data["status"].toLowerCase() == "success") {
					$('.notify').remove();
					$.notify(status4, {
						type: "success",
						"position": "top",
						background: "#31b0d5"
					});
				} else {
					$('.notify').remove();
					$.notify(status4, {
						type: "warning",
						"position": "top"
					});
				}
				$("#demo").html("");
				$("#loadingDiv").modal('hide');
				//$("#messages").html("");
				$("#jobloadstatus").html("");
				$("#savestatus").html("");
				$("#finalstatus").html("");
				$("#final").html("");
				$('#list').prop('selectedIndex', 0);
				$('#listpub').prop('selectedIndex', 0);
				$('#language').prop('selectedIndex', 0);
				$('#langpair').prop('selectedIndex', 0);
				$('#domain').prop('selectedIndex', 0);
				$("#showhidedoubt").hide();
				//showpetjobs();
				if (type == "file") {
					location.reload();
				}
			},
			error: function(jqXHR, exception) {
				$("#loadingDiv").modal('hide');
				var msg = '';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				alert(msg);
			}

		});

	}

	function transliterate(useid, ttext, tbox_text) {
		useid = useid.replace(/src/i, "tdtgt");
		//alert(useid+ttext);
		var replace_text2 = "trans_text ";
		var tbox_text1 = $("#" + useid).val();
		$("span.placeholder").html("");
		//tbox_text1 = tbox_text1+replace_text2;
		var ptrans = $("<span class=\"placeholder\"></span>").text(replace_text2); //.css("display","inline");//.css("float","left");//.appendTo(useid);;
		$("#" + useid).append(ptrans);
		$("span.placeholder").draggable({
			helper: 'clone'
		});
		var useid2 = useid.replace(/tdtgt/i, "tgt");
		$("#" + useid2).droppable({
			accept: "span.placeholder",
			drop: function(ev, ui) {
				$(this).insertAtCaret(ui.draggable.text());
			}
		});
		/*var re1 = new RegExp(ttext,"g");
		  tbox_text = tbox_text.replace(re1, replace_text2);
		  $("#"+useid).val(tbox_text);*/
	}
	//function insertAtCaret(myValue) 
	$.fn.insertAtCaret = function(myValue) {
			return this.each(function() {
				//IE support
				if (document.selection) {
					this.focus();
					sel = document.selection.createRange();
					sel.text = myValue;
					this.focus();
				}
				//MOZILLA / NETSCAPE support
				else if (this.selectionStart || this.selectionStart == '0') {
					var startPos = this.selectionStart;
					var endPos = this.selectionEnd;
					var scrollTop = this.scrollTop;
					this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
					this.focus();
					this.selectionStart = startPos + myValue.length;
					this.selectionEnd = startPos + myValue.length;
					this.scrollTop = scrollTop;
				} else {
					this.value += myValue;
					this.focus();
				}
			});
		}
		//create a custom menu to perform other functionalities like synonyms,transliterate etc.

	$(document).unbind("keydown").on('keydown', function(e) {
			if (e.keyCode === 27) { // ESC
				//e.preventDefault();
				$("#menu").hide();
				$("#more").hide();
			}
			if (e.keyCode === 13 && e.ctrlKey) { // Ctrl+Enter
				e.preventDefault();
				$("#save").click();
				gotoNextSegment(current_id);
				$('html, body').animate({
					scrollTop: $("#" + current_id).offset().top - 150
						//scrollTop: y+ $(window).height()
				}, 1000);

				//$("#menu" ).hide();
			} else if (e.keyCode === 69 && e.ctrlKey) { // Ctrl+e to search in dictionary
				e.preventDefault();
				$("#bidict").click();
			} else if (e.keyCode === 82 && e.ctrlKey) { // Ctrl+r to search in dictionary
				e.preventDefault();
				$("#lisyndict").click();
			} else if (e.keyCode === 118) { // F7 to spellcheck on/off
				e.preventDefault();
				$("#tspellcheck").click();
			} else if (e.keyCode === 119) { // F8 to spellcheck on/off
				e.preventDefault();
				$("#lisuggestions").click();
			} else if (e.keyCode === 50 && e.ctrlKey) { // Ctrl+2 to bottm tab1
				e.preventDefault();
				$("#lidict").click();
			} else if (e.keyCode === 49 && e.ctrlKey) { // Ctrl+1 to bottm tab1
				e.preventDefault();
				$("#limt").click();
			} else if (e.keyCode === 51 && e.ctrlKey) { // Ctrl+3 to bottm tab1
				e.preventDefault();
				$("#lifb").click();
			} else if (e.keyCode === 52 && e.ctrlKey) { // Ctrl+4 to bottm tab1
				e.preventDefault();
				$("#licc").click();
			} else if (e.keyCode === 53 && e.ctrlKey) { // Ctrl+5 to bottm tab1
				e.preventDefault();
				$("#lisc").click();
			} else if (e.keyCode === 54 && e.ctrlKey) { // Ctrl+6 to bottm tab1
				e.preventDefault();
				$("#lits").click();
			} else if (e.keyCode === 55 && e.ctrlKey) { // Ctrl+7 to bottm tab1
				e.preventDefault();
				$("#lisyndict").click();
			} else if (e.keyCode === 56 && e.ctrlKey) { // Ctrl+8 to bottm tab1
				e.preventDefault();
				$("#litransliterate").click();
			}

		})
		//$("textarea[id^='src'],div[id^='tgt']").bind("dblclick", function (event) 
		//$("textarea[id^='src'],span[id^='sugges']").bind("dblclick", function (event) 
	$(document).on('dlclick', 'span[id^="sugges"]', function(event) {
		//$("textarea[id^='abcxyz']").bind("dblclick", function (event) 

		event.preventDefault();
		var myid = this.id;
		//var syn_text = getselectedtext(myid);	//get selected text
		// alert(caretPos);
		//spanify(myid);
		syn_text = $("#" + myid).text();
		var orig_text = syn_text;
		//syn_text = syn_text.replace(/ /,"");
		syn_text = syn_text.replace(/[\।\|\"\'.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		//alert("|iam"+syn_text+"|");
		//var syn_text = $("#"+myid).extractSelectedText();
		if (syn_text == "") {
			//$("#messages").html("<p>Select text for synonym suggestions</p>").slideUp('slow').delay(100).slideDown('slow');
			$('.notify').remove();
			$.notify("Select text for synonym suggestions", {
				type: "warning",
				"position": "top"
			});
			return false;
		}

		// Avoid the real one
		// Show custommenu
		//var temp ='<div style="padding:0;margin-0;overflow:auto;vertical-align:left;border:1px solid;background-color: #FFF; color: #000; width: auto; ">\
		//<ul>\
		var suggestions = [];
		var su = urdu_suggestions[syn_text];
		//suggestions = storealljobs.suggestions[syn_text];
		//alert("|"+su+"|");
		//alert(suggestions);
		if (typeof su != "undefined") {
			suggestions = su.split(",");
		}

		var flag = 0;
		if (typeof suggestions == "undefined" || suggestions == "") {
			flag = 1;
			//alert("No suggestions found");

			//return false;
		}
		$('#menu').show();
		var temp = $('<ol></ol>').attr("class", "synonyms custom-menu");
		$("#menu").html($('<img style="z-index:10000;position:absolute;" align=right></img>').attr("id", "close").attr("src", "images/x2.gif").attr("onclick", "$('#menu').hide();"));
		/*$('<li></li>').text(syn_text+"1").appendTo(temp);
		$('<li></li>').text(syn_text+"2").appendTo(temp);
		$('<li></li>').text(syn_text+"3").appendTo(temp);*/
		//$('<li></li>').text("Transliterate").attr("class","border").appendTo(temp);
		if (flag == 1) {
			$('<li></li>').text("No Suggestion").appendTo(temp);
		} else {
			var uniqueNames = [];
			//var names = storealljobs.suggestions[syn_text];
			var n = urdu_suggestions[syn_text];
			if (typeof n != "undefined") {
				var names = n.split(",");
			}
			$.each(names, function(i, el) {
				if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
			});
			suggestions = uniqueNames;
			if (suggestions.constructor === Array) {
				for (var i = 0; i < suggestions.length; i++) {
					$('<li></li>').text(suggestions[i]).appendTo(temp);
				}
			} else {
				$('<li></li>').text(suggestions).appendTo(temp);

			}
			var cl = $(this).attr('class');
			if (cl != "red") {
				$('<li></li>').text("Original").attr("class", "border").appendTo(temp);
			}
		}

		$('<li></li>').text("Ignore").attr("class", "border").appendTo(temp);
		//$('<input id= "custom" type="text"></input>').val(syn_text).attr("class", "border").appendTo(temp);
		//$('<button>Add</button>').appendTo(temp);
		/*$('<br><input id= "ck1" type="checkbox"></input>').text("D").attr("class","border").appendTo(temp);
		$('<label></label>').text("Desh").attr("class","label").appendTo(temp);
		$('<input id= "ck2" type="checkbox"></input>').text("V").attr("class","border").appendTo(temp);
		$('<label></label>').text("Videsh").attr("class","label").appendTo(temp);
		$('<br><input id= "ck3" type="checkbox"></input>').text("C").attr("class","border").appendTo(temp);
		$('<label></label>').text("Cricket").attr("class","label").appendTo(temp);
		$('<input id= "ck4" type="checkbox"></input>').text("E").attr("class","border").appendTo(temp);
		$('<label></label>').text("Entertain").attr("class","label").appendTo(temp);*/

		/*$('#custom-menu').html(temp);
		$(".custom-menu").finish().//toggle(100).*/
		$('#menu').append(temp);
		//var demoleft = $("#demo").offset().left;
		//alert(demoleft+" "+event.pageX);
		//var left = $(document).outerWidth() - $(window).width();
		//alert($(document).outerWidth()+"a" +$(window).width()+"x"+event.pageX);
		$("#menu").finish(). //toggle(100).

		// In the right position (the mouse)

		css({
			top: event.pageY + "px",
			left: (event.pageX - 150) + "px"
		});
		$(".custom-menu").show();

		//$('html,body').animate({scrollLeft:left},700);
		//$("#menu").draggable();
		$('.synonyms li').on('mouseover', function(e) {
			$(".synonyms li").removeClass('item-highlight');
			$(this).addClass("item-highlight");
		});
		$('.synonyms button').on('click', function(e) {
			addcustom();
			var getext = $("#custom").val();
			$("#" + myid).text(getext);
			$("#" + myid).addClass("blue");
			$("#" + myid).removeClass("red");
			$('#menu').hide();
		});
		$('.synonyms li').on('click', function(e) {
			e.preventDefault();
			//var get_text = $("#"+myid).val();
			var replace_text = $(this).text();
			//alert(replace_text);
			if (replace_text == "Transliterate") {
				$('#menu').hide();
				transliterate(myid, syn_text, get_text);
				return false;
			}
			if (replace_text == "Ignore" || replace_text == "No Suggestion") {
				$('#menu').hide();
				return false;
			}
			if (replace_text == "Original") {
				replace_text = originalobj[myid];
				$('span[id^="' + myid + '"]').removeClass("blue");
				$('span[id^="' + myid + '"]').addClass("red");
				$('#menu').hide();
				var newtext = '';
				newtext = orig_text.replace(syn_text, replace_text);
				$("#" + myid).text(newtext);
				return false;
			}


			var newtext = '';
			newtext = orig_text.replace(syn_text, replace_text);
			//alert(newtext);
			//$("#"+myid).text(replace_text);
			$("#" + myid).text(newtext);
			$("#" + myid).addClass("blue_sugg");
			$("#" + myid).removeClass("red_sugg");
			//addtext at cursor position

			/*var textAreaTxt = jQuery("#"+myid).text();
			var txtToAdd = replace_text;
			caretPos = caretPos - syn_text.length;
			jQuery("#"+myid).text(textAreaTxt.substring(0, caretPos) + txtToAdd+ textAreaTxt.substring(caretPos+syn_text.length) );*/
			//addtext at cursor position


			//var highlight_text = identify_syn($("#"+myid).text());
			//$("#"+myid).html(highlight_text);

			//highlight text
			//$("#myword").text(replace_text);
			/*var re = new RegExp(syn_text,"");

			get_text = get_text.replace(re, replace_text);
			$("#"+myid).val(get_text);*/
			//$("#"+myid).replaceSelectedText(replace_text);
			//$("#"+myid).selection('replace', {text: 'FOOBAR'});	//loaded from jquery.selection plugin (madapaja in github)

			//$("#"+myid).selection('replace', {text: replace_text});	//loaded from jquery.selection plugin (madapaja in github)
			//var sel, range, textNode;
			//alert($("#myword").text());
			//$("#myword").html(replace_text);
			$('#menu').hide();
			//$('#'+myid).val().replace(/syn_text/g,"$(this).text()");
		});
	});
	return count;
}

function hidefirst(c) {
	for (n = 4; n <= c; n++) {
		$("#tr" + n).hide();
	}
}

function loadmore() {
	var s = counter + 2;
	//alert("counter:"+counter+"s:"+s+"total:"+c);
	for (var j = counter; j <= s && j <= c; j++) {
		window.scrollTo(0, document.body.scrollHeight);
		//alert("j:"+j+"counter:"+counter);
		$("#tr" + j).show(); //(1000);
	}
	counter = j;
	if (s > c) {
		alert("no more records to show");
	}

}


//Called when a job is selected, creates table,textareas,buttons and the text is loaded
function addcustom() {
	var custom_text = $("#custom").val();
	custom_text = custom_text.replace(/[\"\'.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
	//syntext = $("#"+myid).text();
	//var suggest = storealljobs.suggestions[syn_text];//.push(custom_text);
	//alert(syn_text);
	var array = new Array();
	array[0] = custom_text;
	var array1 = new Array();
	array1[0] = syn_text;
	var existing = storealljobs.suggestions[syn_text];
	//alert(syn_text+" iam "+existing[0]);
	//alert(syn_text+" iam "+existing[1]);
	//alert(syn_text+" iam "+existing);
	var flag1 = 0;
	flag2 = 0;
	if (typeof existing === 'undefined' || existing == "") {
		flag1 = 0;
	} else {
		flag1 = 1;
	}
	if (flag1 == 1) {
		//alert("iam "+existing);
		if (typeof storealljobs.suggestions[custom_text] === 'undefined') {
			storealljobs.suggestions[custom_text] = array;
		} else {
			//storealljobs.suggestions[custom_text].push(array);
		}
		var ln = existing.length;
		for (var i = 0; i < ln; i++) {
			//console.log(storealljobs.suggestions[existing[i]])
			storealljobs.suggestions[custom_text].push(existing[i]);
			storealljobs.suggestions[existing[i]].push(custom_text);
		}
		//storealljobs.suggestions[custom_text]=syn_text;
		storealljobs.suggestions[custom_text].push(syn_text);
		storealljobs.suggestions[syn_text].push(custom_text);
	} else {
		if (typeof storealljobs.suggestions[custom_text] === 'undefined') {
			storealljobs.suggestions[custom_text] = array1;
			flag2 = 0;
		} else {
			existing = '';
			existing = storealljobs.suggestions[custom_text];
			flag2 = 1;
		}
		if (flag2 == 1) {
			//alert(existing.length);
			var ln = existing.length;
			for (var i = 0; i < ln; i++) {
				storealljobs.suggestions[custom_text].push(existing[i]);
				storealljobs.suggestions[existing[i]].push(custom_text);
			}
			//storealljobs.suggestions[custom_text].push(syn_text);
		}
		storealljobs.suggestions[syn_text] = array;
	}
	//var names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];
	var uniqueNames = [];
	var names = storealljobs.suggestions[syn_text];
	$.each(names, function(i, el) {
		if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	storealljobs.suggestions[syn_text] = uniqueNames;
	uniqueNames = [];
	names = storealljobs.suggestions[custom_text];
	$.each(names, function(i, el) {
		if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	storealljobs.suggestions[custom_text] = uniqueNames;
	syn_text = encodeURIComponent(syn_text);
	custom_text = encodeURIComponent(custom_text);
	//alert(syn_text+" "+custom_text);
	//storealljobs.suggestions[syn_text].push(custom_text);
	var ll = lang_pair.split("_");
	$.ajax({
		url: config.addToDictMono,
		type: 'POST',
		data: "&key=" + syn_text + "&value=" + custom_text + "&lang=" + ll[1] + "&user=" + user + "&dictType=user&domain=" + dom,
		header: "application/x-www-form-urlencoded",
		//to pass survey 
		success: function(data) {
			alert(data["status"] + data["message"]);
		}
	});
	return false;
}

function getretranslate(paratext) {
	alert("Your request has been submitted for translation.Once the translation is completed it will be reflected in the current para");
	var tran_id = '';
	//srtext = "टी20 विश्वकप-2016 पर है फोकस: रोहित शर्मा"
	//text =  encodeURIComponent(text);
	var arr = getlangpair.split("_");
	//console.log(arr[0]+" "+arr[1]+" "+paratext);
	if (lang_pair == "eng_hin") {
		$.ajax({
			//url:"http://sampark.iiit.ac.in/api/1.4/web/translate",
			url: config.anu_translate,
			type: 'POST',
			//data: "file1="+file1,//+"&file2="+file2,
			//data: "srcLang=hin&tgtLang=pan&text="+paratext,
			data: "srcLang=" + arr[0] + "&tgtLang=" + arr[1] + "&text=" + paratext,
			async: false,
			header: "application/x-www-form-urlencoded",
			success: function(data) {
				//alert(data);
				//alert("ID:"+data.translation.id);
				console.log("Got trans ID:" + data.transId);
				trans_id = data.transId;
				//alert("Got transid:"+trans_id);
				checkstatus(trans_id);
			}
		});
	} else {

		$.ajax({
			//url:"http://sampark.iiit.ac.in/api/1.4/web/translate",
			url: config.translate,
			type: 'POST',
			//data: "file1="+file1,//+"&file2="+file2,
			//data: "srcLang=hin&tgtLang=pan&text="+paratext,
			data: "srcLang=" + arr[0] + "&tgtLang=" + arr[1] + "&text=" + paratext,
			async: false,
			header: "application/x-www-form-urlencoded",
			success: function(data) {
				//alert(data);
				//alert("ID:"+data.translation.id);
				console.log("Got trans ID:" + data.translation.id);
				trans_id = data.translation.id;
				//alert("Got transid:"+trans_id);
				checkstatus(trans_id);
			}
		});
	}
} //);
function checkstatus(tid) {
	//alert("checking status:"+tid);
	var s = 0;
	var arr = getlangpair.split("_");
	if (lang_pair == "eng_hin") {
		var inter = window.setInterval(function() { //loop
			$.ajax({
				//url:"http://sampark.iiit.ac.in/api/1.4/web/status",
				url: config.anu_getstatus,
				type: 'GET',
				data: 'srcLang=' + arr[0] + '&tgtLang=' + arr[1] + '&transId=' + tid,
				//data: "user="+arr[0]+"&jobId="+arr[1],
				async: false,
				cache: false,
				contentType: false,
				//contentType: 'application/json',
				processData: false,
				//dataType: 'json', dont use when getting requested json parse failed

				success: function(data) {
					//alert("In checkstatus:"+data);
					console.log("Tid:" + tid + "status:" + data);
					if (data.translation_status == "finished") {
						showtranslation(tid);
						clearInterval(inter);
					}
					//else if(s==9) 
					else if (s == 15) { //timeout for 150 seconds==2.5mins
						////alert("timeout");
						//$("#out").html("Translation request timed out");
						//alert("Translation request timed out");
						console.log("Translation request timed out");
						clearInterval(inter);
						var out = "Translation not found due to some technical reason";
						inserttrans(out)
							//return out;
							//return false;
					}
				},
				//timeout:90000,
				error: function(jqXHR, exception) {
					clearTimeout(timeout);
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					alert("In getstatus of translation" + msg);

				},
			});
			s++;
		}, 10000); //10000 = 10 seconds

	} else {
		var inter = window.setInterval(function() { //loop
			$.ajax({
				//url:"http://sampark.iiit.ac.in/api/1.4/web/status",
				url: config.getstatus,
				type: 'GET',
				data: 'transId=' + tid,
				//data: "user="+arr[0]+"&jobId="+arr[1],
				async: false,
				cache: false,
				contentType: false,
				//contentType: 'application/json',
				processData: false,
				//dataType: 'json', dont use when getting requested json parse failed

				success: function(data) {
					//alert("In checkstatus:"+data);
					console.log("Tid:" + tid + "status:" + data);
					if (data == "finish") {
						showtranslation(tid);
						clearInterval(inter);
					}
					//else if(s==9) 
					else if (s == 15) { //timeout for 150 seconds==2.5mins
						////alert("timeout");
						//$("#out").html("Translation request timed out");
						//alert("Translation request timed out");
						console.log("Translation request timed out");
						clearInterval(inter);
						var out = "Translation not found due to some technical reason";
						inserttrans(out)
							//return out;
							//return false;
					}
				},
				//timeout:90000,
				error: function(jqXHR, exception) {
					clearTimeout(timeout);
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					alert("In getstatus of translation" + msg);

				},
			});
			s++;
		}, 10000); //10000 = 10 seconds
	}
}

function showtranslation(tid) {
	var arr = getlangpair.split("_");
	//alert("In show translation:"+tid);
	if (lang_pair == "eng_hin") {
		$.ajax({
			//url:"http://sampark.iiit.ac.in/api/1.4/web/showTranslation",
			url: config.anu_showtrans,
			type: 'GET',
			data: 'srcLang=' + arr[0] + '&tgtLang=' + arr[1] + '&transId=' + tid,
			//data: "user="+arr[0]+"&jobId="+arr[1],
			async: false,
			cache: false,
			contentType: false,
			//contentType: 'application/json',
			processData: false,
			header: "application/x-www-form-urlencoded",
			//dataType: 'json', dont use when getting requested json parse failed

			success: function(data) {
				//alert(translatedtext);
				//translatedtext = data.output[0];
				translatedtext = '';
				for (var tt = 0; tt < data.output.length; tt++) {
					translatedtext += data.output[tt];
				}
				console.log("Got translation calling inserttrans");
				if (translatedtext == null) {
					translatedtext = "Translation was not found due to some technical reason";
				}
				//alert(retranslateid);
				$("#" + retranslateid).text(translatedtext);
				clearTimeout(timeout);
				////alert(out);
				//$("#out").html(out);
				////alert(data.translation.id);
				//var statuss = data.translations[0]['status'];
				////alert(statuss);
			},
			error: function(jqXHR, exception) {
				clearTimeout(timeout);
				var msg = '';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				alert(msg);

			}
		});
	} else {
		$.ajax({
			//url:"http://sampark.iiit.ac.in/api/1.4/web/showTranslation",
			url: config.showtrans,
			type: 'GET',
			data: 'transId=' + tid,
			//data: "user="+arr[0]+"&jobId="+arr[1],
			async: false,
			cache: false,
			contentType: false,
			//contentType: 'application/json',
			processData: false,
			header: "application/x-www-form-urlencoded",
			//dataType: 'json', dont use when getting requested json parse failed

			success: function(data) {
				//alert(translatedtext);
				translatedtext = data.translation[0].output;
				console.log("Got translation calling inserttrans");
				clearTimeout(timeout);
				if (translatedtext == null) {
					translatedtext = "Translation was not found due to some technical reason";
				}
				//alert(retranslateid);
				$("#" + retranslateid).text(translatedtext);
				////alert(out);
				//$("#out").html(out);
				////alert(data.translation.id);
				//var statuss = data.translations[0]['status'];
				////alert(statuss);
			},
			error: function(jqXHR, exception) {
				clearTimeout(timeout);
				var msg = '';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				alert(msg);

			}
		});
	}
}
//Called when the post edited text is tobe saved
function savesurvey(saveid, savetype, pid, sid) {
	if ($.inArray("9", permissions) == -1) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}

	//alert(saveid);
	var svaurl = '';
	var param = '';
	tgtid = saveid;
	srcid = saveid.replace(/tgt/i, "src");
	//tgttext = $("#"+tgtid).val();
	var srctext = $("#" + srcid).text();
	tgttext = $("#" + saveid + "> #sentence" + sid).text();

	tgttext = tgttext.replace(/  /g, " ");
	tgttext = tgttext.trim()
		//console.log("|"+tgttext+"|");
	if (tgttext == "" || tgttext == " " || tgttext == "\n" || tgttext == "\t") {
		$.notify("Text cannot be empty", {
			type: "success",
			"position": "top",
			background: "yellow",
			delay: "5000"
		});

		return;
	}

	id = srcid.replace(/src/i, "");
	if (typeof text === 'undefined') {
		text = tgttext;
	}
	//cur_list=$("#list").val();
	cur_list = job_id;
	//alert("srctext:"+srctext+"tgttext"+tgttext+"id:"+id+"cur_list:"+cur_list);
	var arr1 = cur_list.split("____");
	tgttext = encodeURIComponent(tgttext);
	if (id == "0" || id == "titleimage") {
		var temp_url = '';
		if (id == "0") {
			var temp_url = config.updateTitle;
		} else if (id == "titleimage") {
			var temp_url = config.updateImageText;
		}

		var param = '';
		param = "user=" + arr1[0] + "&taskid=" + arr1[1] + "&text=" + tgttext + "&domain=" + dom + "&lang_pair=" + lang_pair;
		if (type == "ht") {
			param += "&story_source=ht"
		} else if (type == "liveht") {
			param += "&story_source=liveht"
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
		$.ajax({
			url: temp_url,
			type: 'POST',
			data: param,
			//data: "user="+arr1[0]+"&taskid="+arr1[1]+"&text="+tgttext+"&domain="+dom+"&lang_pair="+lang_pair,
			header: "application/x-www-form-urlencoded",
			//to pass survey 
			success: function(data) {
				$("#" + tgtid).addClass("saved");
				$("#" + tgtid).removeClass("save");
				//alert("save succesful"+data);
				//		 var status3 = "Save status:"+data['status']+" "+data['message']+"<br>";
				var status3 = "<p style=\"direction:ltr;\">Save Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
				//$("#messages").html(status3).hide(0).delay(1000).show(0);
				//$("#messages").html(status3).slideUp('slow').delay(100).slideDown('slow').delay(1000).fadeOut('slow');
				if (data["status"].toLowerCase() == "success") {
					$('.notify').remove();
					$.notify(status3, {
						type: "success",
						"position": "top",
						background: "#31b0d5"
					});
				} else {
					$('.notify').remove();
					$.notify(status3, {
						type: "warning",
						"position": "top"
					});
				}
				//$("#demo").append(data);
			}
		});
	} else {
		var temp_url = '';
		var param = "user=" + arr1[0] + "&taskid=" + arr1[1] + "&text=" + tgttext + "&paraId=" + pid + "&sentId=" + sid + "&domain=" + dom + "&lang_pair=" + lang_pair;
		if (type == "file") {
			if (savetype == "src") {
				temp_url = config.updatesrcStory;
			} else {
				temp_url = config.updatePetByAdmin;
			}
		} else {
			if (savetype == "src") {
				temp_url = config.updatesrcStory1;
			} else {
				temp_url = config.updatePara1;
			}
			if (type == "ht") {
				param += "&story_source=ht"
			} else if (type == "liveht") {
				param += "&story_source=liveht"
			} else if (type == "ndtvhindi") {
				param += "&story_source=ndtvhindi"
			}
		}
		$.ajax({
			//url:"http://10.2.8.78/Symfony-2.5/web/app.php/updatePostEditData",
			//url :"http://10.2.8.78/postEditTool/0.4/web/app.php/updatePostEditStory",
			url: temp_url,
			type: 'POST',
			data: param,
			//data: "user="+arr1[0]+"&taskid="+arr1[1]+"&text="+tgttext+"&paraId="+id+"&domain="+dom+"&lang_pair="+lang_pair,
			header: "application/x-www-form-urlencoded",
			//to pass survey 
			success: function(data) {
				$("#" + tgtid).addClass("saved");
				$("#" + tgtid).removeClass("save");
				var saveid = tgtid;
				saveid = saveid.replace(/tgt/i, "save");
				$("#" + saveid + " >.grid > i.fa-check").removeClass('edit');
				$("#" + saveid + " >.grid > i.fa-check").removeClass('editsave');
				$("#" + saveid + " >.grid > i.fa-check").children("*").removeClass('edit');
				$("#" + saveid + " >.grid > i.fa-check").children("*").removeClass('editsave');
				$("#" + srcid).removeClass('edit');
				$("#" + srcid).children("*").removeClass('edit');
				$("#" + saveid + " >.grid > i.fa-check").addClass('editsaved');
				$("#" + saveid + " >.grid > i.fa-check").children("*").addClass('save');
				$("#" + saveid + " >.grid > i.fa-check").children("*").addClass('saved');
				$("#" + srcid).children("*").addClass('save');
				$("#" + srcid).children("*").addClass('saved');
				$("#" + saveid + " >.grid > i.fa-check").unbind('focus');
				$("#" + saveid + " >.grid > i.fa-check").unbind('keypress');

				tgttext = decodeURIComponent(tgttext);

				var sclass = $("#" + tgtid).attr("class");
				sclass = sclass.replace(/[A-z ]/g, "");
				var msg = 'EBS MANAGER INFO: SAVE id=' + arr[1] + ', langpair=' + lang_pair + ', Dom=' + dom + ', Saved sentence no=' + sclass + ', text=' + tgttext;
				//var msg = 'EBS MANAGER INFO: Save by manager user=' + arr1[0] + '&taskid=' + arr1[1] + '&text=' + tgttext + '&paraId=' + pid + '&sentId=' + sid + '&domain=' + dom + '&lang_pair=' + lang_pair;
				//if (impersonate_by != "") {
				insert_logs("admin", msg);
				//}

				//alert("save succesful"+data);
				//		 var status3 = "Save status:"+data['status']+" "+data['message']+"<br>";
				var status3 = "<p style=\"direction:ltr;\">Save Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
				//$("#messages").html(status3).hide(0).delay(1000).show(0);
				//$("#messages").html(status3).slideUp('slow').delay(500).slideDown('slow').delay(1000).fadeOut('slow');
				if (data["status"].toLowerCase() == "success") {
					$('.notify').remove();
					$.notify(status3, {
						type: "success",
						"position": "top",
						background: "#31b0d5"
					});
				} else {
					$('.notify').remove();
					$.notify(status3, {
						type: "warning",
						"position": "top"
					});
				}
				//$("#demo").append(data);
			}
		});
	}


	//alert(document.getElementById('tgt1').style.font);
}

//function for scrolling div along with the page
var fixmeTop = $('#messages').offset().top; // get initial position of the element

$(window).scroll(function() { //assign scroll event listener

	var currentScroll = $(window).scrollTop(); // get current position

	if (currentScroll >= fixmeTop) { // apply position: fixed if you
		$('#messages').css({ //scroll to that element or below it
			position: 'fixed',
			background: '#fff',
			border: '1px solid #000',
			top: '0',
			right: '0'
		});
	} else { // apply position: static
		$('#messages').css({ // if you scroll above it
			position: 'static'
		});
	}

});

//function to get selected text
function getselectedtext(currid) {
	//event.preventDefault();
	var textareaid = '';
	if (/searchsrc/i.test(currid)) {
		textareaid = currid.replace(/searchsrc/i, "src");
	} else if (/search0/i.test(currid)) {
		textareaid = currid.replace(/search0/i, "src0");
	} else {
		textareaid = currid.replace(/searchtgt/i, "tgt");
	}
	//alert("You selected: " + textareaid);
	var textComponent = document.getElementById(textareaid);
	var selectedText;
	var range;
	//IE version
	if (document.selection != undefined) {
		//textComponent.focus();
		var sel = document.selection.createRange();
		selectedText = sel.text;
		//saving cursor position
		var textRange = document.selection.createRange();
		var preCaretTextRange = document.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretPos = preCaretTextRange.text.length;
		//saving cursor position
		//document.selection.empty();

	}
	// Mozilla version
	else if (textComponent.selectionStart != undefined) {
		var startPos = textComponent.selectionStart;
		var endPos = textComponent.selectionEnd;
		//textComponent.selectionStart='';
	} else if (window.getSelection) {
		sel = window.getSelection();
		range = sel.getRangeAt(0);
		sel1 = window.getSelection();
		selectedText = sel1.toString();
		//saving cursor position
		var preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(textComponent);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretPos = preCaretRange.toString().length;
		//caretPos = range.endOffset;
		//alert("You selected:3 " + selectedText);
	}
	//get_context_word(textComponent);
	//alert("caller is " +getselectedtext.caller);
	/*if(selectedText == "") {
		var node = document.getSelection().anchorNode;
		sentenceElem = node.nodeType == 3 ? node.parentNode : node;
		var selection;
		selection = window.getSelection();
		//selection.extend(sentenceElem);
		var range = document.createRange();
		range.selectNodeContents(sentenceElem);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
		selectedText = sentenceElem.textContent;
		//selection.modify('extend', 'forward', sentenceElem.textContent);
		//console.log(sentenceElem.textContent);
	}*/
	//alert("You selected: " + selectedText);
	return selectedText;
}

/*function translate_google(currid) {
	var text = getselectedtext(currid);
	if (/src/i.test(currid)) {
		currid = currid.replace(/src/i, "src");
	} else if (/search0/i.test(currid)) {
		currid = currid.replace(/search0/i, "src0");
	} else if (/searchtitleimage/i.test(currid)) {
		currid = currid.replace(/searchtitleimage/i, "srctitleimage");
	} else {
		currid = currid.replace(/tgt/i, "src");
	}
	if (typeof text == "undefined" || text.length == 0) {
		text = $("#" + currid + " div[id^='sentence']").text();
	}
	if (lang_pair == "hin_pan" && typeof text !== "undefined") {
		//window.open("https://translate.google.co.in/#hi/pa/" + text, "_blank");
		var viewportwidth = document.documentElement.clientWidth;
		var viewportheight = document.documentElement.clientHeight;
		window.resizeBy(-300, 0);
		window.moveTo(0, 0);
		var nwindow = window.open("https://translate.google.co.in/#hi/pa/" + text, "windowname", "width=800,height=600,scrollbars=yes,left=" + (viewportwidth - 300) + ",top=0");
		if (window.focus) {
			nwindow.focus()
		}
	}
	if (lang_pair == "hin_urd" && typeof text !== "undefined") {
		//  window.open("https://translate.google.co.in/#hi/ur/" + text, "_blank");
		var viewportwidth = document.documentElement.clientWidth;
		var viewportheight = document.documentElement.clientHeight;
		window.resizeBy(-300, 0);
		window.moveTo(0, 0);
		var nwindow = window.open("https://translate.google.co.in/#hi/ur/" + text, "windowname", "width=800,height=600,scrollbars=yes,left=" + (viewportwidth - 300) + ",top=0");
		if (window.focus) {
			nwindow.focus()
		}
	}
	if (lang_pair == "eng_hin" && typeof text !== "undefined") {
		var viewportwidth = document.documentElement.clientWidth;
		var viewportheight = document.documentElement.clientHeight;
		window.resizeBy(-300, 0);
		window.moveTo(0, 0);
		//window.open("https://translate.google.co.in/#en/hi/" + text, "_blank");
		var nwindow = window.open("https://translate.google.co.in/#en/hi/" + text, "windowname", "width=800,height=600,scrollbars=yes,left=" + (viewportwidth - 300) + ",top=0");
		if (window.focus) {
			nwindow.focus()
		}
		return false;
	}
	if (lang_pair == "hin_tel" && typeof text !== "undefined") {
		window.open("https://translate.google.co.in/#hi/te/" + text, "_blank");
	}
	if (lang_pair == "pan_hin" && typeof text !== "undefined") {
		window.open("https://translate.google.com/#pa/hi/" + text, "_blank");
	}
	if (lang_pair == "urd_hin" && typeof text !== "undefined") {
		window.open("https://translate.google.com/#ur/hi/" + text, "_blank");
	}
	//window.open("http://www.cfilt.iitb.ac.in/wordnet/webhwn/wn.php?hwd="+text,"_blank");
}*/

//search dictionary
function search_dictionary(currid) {
	$("#dictview").html("");
	$("#dictionaryHelp").each(function() {
		$(this).remove();
	});
	//var text = getselectedtext(currid);
	var text = currid;
	/*if(/searchsrc/i.test(currid)){
		currid  = currid.replace(/searchsrc/i,"src");
	}
	else if(/search0/i.test(currid)){
		currid  = currid.replace(/search0/i,"src0");
	}
	else if(/searchtitleimage/i.test(currid)){
		currid  = currid.replace(/searchtitleimage/i,"srctitleimage");
	}
	else{
		currid  = currid.replace(/searchtgt/i,"tgt");
	}*/
	//alert("|"+text+"|");
	searchflag = 0;
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	if (typeof text == "undefined" || text.length == 0) {
		//alert("Please select some text!!!");
		return false;
		//alert(currid);
		text = $("#" + currid + " div[id^='sentence']").text();
		var tt = currid.replace(/sentence.*$/, "");
		var num;
		//alert(tt);
		var patt = new RegExp("src");
		if (patt.test(tt)) {
			num = tt.replace(/src/, "");
		} else {
			num = tt.replace(/tgt/, "");
		}
		text = text.toLowerCase();
		text = text.replace(/[\।\|\"\'.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		text = text.replace(/^ /g, "");
		text = text.replace(/ $/g, "");
		//alert(text);
		//$("#dictionaryHelp").after("title"+num);
		var dhelp = $('<div>Shabdanjali:</div>').attr("class", "").attr("id", "dictionaryHelp");
		var top_div = $('<div></div>').attr("class", "topdiv").appendTo(dhelp);
		$('<input type="radio" id="checkfound" name="found"></input><label style="font-size:14px;" for="checkfound">&nbsp;Found&nbsp;</label>').appendTo(top_div);
		$('<input type="radio" id="checknotfound" name="found"></input><label style="font-size:14px;" for="checknotfound">&nbsp;Not Found&nbsp;</label>').appendTo(top_div);
		$('<input type="radio" id="alldict" name="found" checked></input><label style="font-size:14px;" for="alldict">&nbsp;Show All</label>').appendTo(top_div);
		dictable = $('<table></table>').attr("id", "ddtable");
		var stext = text.split(" ");
		//stext = text ;//stext.filter( onlyUnique ); // returns ['a', 1, 2, '1']
		//console.log(stext);
		//return false;
		for (var m = 0; m < stext.length; m++) {
			searchflag = 0;
			getparallel(stext[m], "system");
			getparallel(stext[m], "user");
			getparallel(stext[m], "cstt");
		}
		//var close = $('<img></img>').attr("id","close").attr("src","images/x2.gif").attr("onclick","$('#dictionaryHelp').hide();$('.petcontent').css('margin-bottom','0');").appendTo(top_div);
		//console.log(dictable);
		$("#dictionaryHelp").show();
		$("#title" + num).after(dhelp);
		$("#dictionaryHelp").append(dictable);
		$('.w3-table-all').DataTable({
			destroy: true
		});

		$("#checkfound").click(function() {
			//alert("iam here");
			$(".found").show();
			$(".notfound").hide();
		});
		$("#checknotfound").click(function() {
			//alert("iam here");
			$(".found").hide();
			$(".notfound").show();
		});
		$("#alldict").click(function() {
			//alert("iam here");
			$(".found").show();
			$(".notfound").show();
		});

		//$("#dictionaryHelp").append('<button id="addDict" class="btn btn-warning">Add</button>');
	} else {
		//$("#title"+num).after(dhelp);
		var tt = current_id.replace(/sentence.*$/, "");
		//var tt = currid.replace(/src/,"");
		var num;
		//alert(tt);
		var patt = new RegExp("src");
		if (patt.test(tt)) {
			num = tt.replace(/src/, "");
		} else {
			num = tt.replace(/tgt/, "");
		}
		text = text.replace(/[\।\|\"\'.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		text = text.replace(/^ /g, "");
		text = text.replace(/ $/g, "");
		text = text.toLowerCase();
		//$("#dictionaryHelp").after("title"+num);
		var dhelp = $('<div><b>Shabdanjali:</b></div>').attr("class", "").attr("id", "dictionaryHelp");
		dictable = $('<table></table>');
		var slang = $("#srcdict").val();
		var tlang = $("#tgtdict").val();
		//var slang = lang_pair.split("_")[0];
		//var tlang = lang_pair.split("_")[1];
		if (slang == tlang) {
			getmono(text, "system");
			getmono(text, "user");
		} else {

			getparallel(text, "system");
			getparallel(text, "user");
			getparallel(text, "cstt");
		}
		//	var close = $('<img align=right></img>').attr("id","close").attr("src","images/x2.gif").attr("onclick","$('#dictionaryHelp').hide();").appendTo(dhelp);
		$("#dictionaryHelp").show();
		$("#dictview").after(dhelp);
		$("#dictionaryHelp").append(dictable);
		//$("#dictionaryHelp").append('<button id="addDict____" class="btn"><i class="fa fa-plus" aria-hidden="true"></i></button>');

	}
	$("#dictview").html(dhelp);
	search_glosbe(text);
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	$("#lidict").addClass('active');
	$("#limt").removeClass('active');
	$("#lifb").removeClass('active');
	$("#licc").removeClass('active');
	$("#dicttab").show();
	$("#mttab").hide();
	$("#cctab").hide();
	//alert("aim here"+text);
}

function getparallel(srch, dtype) {
	//console.log($.inArray("14____search_shabdanjali", permissions));
	if (($.inArray("14", permissions) == -1)) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	var param = '';
	var lpair = $("#srcdict").val() + "_" + $("#tgtdict").val();
	var sdom = $("#domdict").val();
	if (dtype == "system") {
		//param = "user=" + user + "&domain=" + sdom + "&dictType=system&lang_pair=" + lpair + "&searchvar=" + srch;
		if (sdom == 'all') {
			param = "user=" + user + "&dictType=system&lang_pair=" + lpair + "&inputString=" + srch;
		} else {
			param = "user=" + user + "&domain=" + sdom + "&dictType=system&lang_pair=" + lpair + "&inputString=" + srch;
		}
	} else if (dtype == "cstt") {
		//param = "user=" + user + "&domain=" + sdom + "&dictType=system&lang_pair=" + lpair + "&searchvar=" + srch;
		if (sdom == 'all') {
			param = "user=" + user + "&custom_dict_list=cstt&lang_pair=" + lpair + "&inputString=" + srch;
		} else {
			param = "user=" + user + "&custom_dict_list=cstt&lang_pair=" + lpair + "&inputString=" + srch;
		}
	} else {
		//param = "user=" + user + "&domain=" + sdom + "&dictType=user&lang_pair=" + lpair + "&searchvar=" + srch;
		if (sdom == 'all') {
			param = "user=" + user + "&dictType=user&lang_pair=" + lpair + "&inputString=" + srch;
		} else {
			param = "user=" + user + "&domain=" + sdom + "&dictType=user&lang_pair=" + lpair + "&inputString=" + srch;
		}
	}
	$.ajax({
		url: config.searchParallel,
		type: 'POST',
		data: param,
		async: false,
		//data: "user="+arr1[0]+"&taskid="+arr1[1]+"&paraId="+sid+"&domain="+dom+"&lang_pair="+lang_pair,
		header: "application/x-www-form-urlencoded",
		//to pass survey 
		success: function(data) {
			var status3 = "<p style=\"direction:ltr;\">Dict  Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			//console.log(data);
			if (data["status"].toLowerCase() == "success") {
				if (dtype == "system") {
					searchflag = 1;
				}
				$('.notify').remove();
				$.notify(status3, {
					type: "success",
					"position": "top",
					background: "#31b0d5"
				});
				/*for (var p = 0; p < data.records.length; p++) {
					//alert(data.records.length);
					var type = data.records[p].type;
					//var ptype= $('<tr><td style="border:0;"><span style="color:red;">'+type+' </span></td></tr>').appendTo(dictable);;
					//$("#dictionaryHelp").append(ptype);
					//console.log(type);
					//alert(data.records[p].records.length);
					for (var q = 0; q < data.records[p].records.length; q++) {
						var currecord = data.records[p].records[q];
						//console.log(currecord);
						for (var key in currecord) {
							//var skey = key.replace(RegExp(key + "____", "g"), "-");
							var skey = key.replace("____", "&nbsp;&nbsp;");
							skey = skey.replace("UNDEFINED", "UNDEF");
							var val = currecord[key];
							val = val.join(", ");

							var res = $('<tr class="found"><td style="width:3%;border:0;"><span>' + skey + '<b><i></td><td style="width:25%;border:0;">' + val + '</i></b></span><span style="color:red;"> (' + type + ') (' + dtype + ')</span></td></tr><br>').appendTo(dictable);
							//$("#dictionaryHelp").append(res);
							//console.log(key+currecord[key]);
						}
					}
				}*/
				for (var p = 0; p < data.records.length; p++) {
					//var type = data.records[p].type;
					var type = data.records[p].dictType;
					if (dtype == "cstt") {
						$('<tr colspan="3"><td title="Commission for Scientific Technical Terminology"><b>CSTT Dictionary:</b></td></tr>').appendTo(dictable);
					}
					if (type == "rbiproject") {
						$('<tr colspan="3"><td title="Reserve Bank of India Terminology"><b>RBI Dictionary:</b></td></tr>').appendTo(dictable);
					}
					var tgt = data.records[p].target;
					var skey = data.records[p].sourceWithCat.replace(RegExp(data.records[p].sourceWithCat + "____", "g"), "-");
					skey = skey.replace("____", "&nbsp;&nbsp;");
					//skey = skey.replace("UNDEFINED", "UNDEF");
					skey = skey.replace("UNDEFINED", "");
					var val = tgt;
					val = val.join(", ");
					type = '';
					var res = $('<tr class="found"><td style="width:5%;border:0;"><span>' + skey + '<b><i></td><td style="width:25%;border:0;">' + val + '</i></b></span><!--<span style="color:red;"> </span>--></td></tr><br>').appendTo(dictable);
					//console.log(key+currecord[key]);
				}
				//$("#dictionaryHelp").html("");
				//loadpet(currentjob);
			} else {
				if (dtype == "user" && searchflag == 0) {
					//alert("iam here");
					//console.log("iam here");
					//$("#dictionaryHelp").append('<tr><td>srch></td><tr><td><button id="addDict" class="btn btn-warning">Add</button></td></tr>');
					//$('<tr class="notfound"><td style="border:0;">' + srch + '</td><td style="border:0;"><button id="addDict____' + srch + '" class="btn btn-warning">Add</button></td></tr>').appendTo(dictable);
					$('<tr class="notfound"><td style="border:0;"></td><td style="border:0;">No Records found</td></tr>').appendTo(dictable);
					searchflag = 0;

				}
				//$.notify(status3,{type:"warning","position":"top"});
			}
			if (dtype == "user") {
				//$("#dictionaryHelp").append('<button id="addDict" class="btn btn-warning">Add</button>');
			}
			$(document).on("click", "button[id^='addDict']", function() {
				var buttid = this.id;
				var arr = buttid.split("____");
				if (arr[1] == "") {} else {
					srch = arr[1];
				}
				//alert("aim here");
				var gettype = config.type;
				var getlcat = config.lexcat;
				var getnercat = config.nercat;
				var getmwecat = config.mwecat;
				var select_type = '<option value="">choose type</option>';
				var select_lcat = '<option value="">choose cat</option>';
				var select_nercat = '<option value="">choose ner</option>';
				var select_mwecat = '<option value="">choose mwe</option>';
				for (var i = 0; i < gettype.length; i++) {
					select_type += '<option value="' + gettype[i] + '">' + gettype[i] + '</option>';
				}
				for (var i = 0; i < getlcat.length; i++) {
					select_lcat += '<option value="' + getlcat[i] + '">' + getlcat[i] + '</option>';
				}
				for (var i = 0; i < getnercat.length; i++) {
					select_nercat += '<option value="' + getnercat[i] + '">' + getnercat[i] + '</option>';
				}
				for (var i = 0; i < getmwecat.length; i++) {
					select_mwecat += '<option value="' + getmwecat[i] + '">' + getmwecat[i] + '</option>';
				}

				$("#addDialog").dialog({
					open: function(event, ui) {
						$(event.target).parent().css('position', 'fixed');
						$(event.target).parent().css('top', '30%');
						$(event.target).parent().css('left', '30%px');
					}
				});
				$("#srcbdict").val(srch);
				$("#stype").html(select_type);
				$("#sner").html(select_nercat);
				$("#smwe").html(select_mwecat);
				$("#slexical").hide();
				$("#sner").hide();
				$("#smwe").hide();
				$("#sub_cat1").hide();
				$("#stype").change(function() {
					var tt = $("#stype").val();
					if (tt == "lexical") {
						$("#slexical").show();
						$("#smwe").hide();
						$("#sner").hide();
						$("#slexical").html(select_lcat);
						$("#sub_cat1").hide();
					} else if (tt == "ner") {
						//alert(tt);
						$("#sner").show();
						$("#slexical").hide();
						$("#smwe").hide();
						$("#sner").html(select_nercat);
						$("#sub_cat1").hide();
					} else if (tt == "mwe") {
						$("#smwe").show();
						$("#sub_cat1").show();
						$("#slexical").hide();
						$("#sner").hide();
						$("#smwe").html(select_smwecat);
					} else {
						$("#slexical").hide();
						$("#sner").hide();
						$("#smwe").hide();
						$("#sub_cat1").hide();
					}
				});


			});
			//$("#demo").append(data);
			if (dtype == "suser") {
				var divform = $('<div align="center"></div>').attr("class", "form-group required row");
				$('<input type="text"></input>').attr("id", "bdict").css("width", "25%").attr("class", "").appendTo(divform);
				$('<select><option val="ner">NER</option><option val="mew">Multiword</option></select>').attr("id", "bdictcat").css("width", "10%").attr("class", "form-control").appendTo(divform);
				$('<button>Add</button>').attr("id", "addToBdict").css("width", "10%").attr("class", "btn-yellow").appendTo(divform);
				$("#dictionaryHelp").append(divform);
			}
		}
	});
}

$("#addParallel").click(function(e) {
	e.preventDefault();
	//alert("iam ehere");
	var addkey = $("#srcbdict").val();
	var addval = $("#tbdict").val();
	var addtype = $("#stype").val();
	var tt = addtype;
	var cat = '';
	if (tt == "lexical") {
		cat = $("#slexical").val();
	} else if (tt == "ner") {
		cat = $("#sner").val();
	} else if (tt == "mwe") {
		cat = $("#smwe").val();
	} else {
		cat = "noun"; //for terminology
	}

	if (typeof addkey == "undefined" || addkey == "" || typeof addval == "undefined" || addval == "" || typeof addtype == "undefined" || addtype == "" || typeof cat == "undefined" || cat == "") {
		alert("Please fill all the required fields");
		return false;
	}

	addkey = addkey.toLowerCase();
	addval = addval.toLowerCase();
	var param = "lang_pair=" + lang_pair + "&domain=" + dom + "&user=" + user + "&key=" + addkey + "&value=" + addval + "&type=" + addtype + "&cat=" + cat + "&dictType=user";
	if (tt == "mwe") {
		var sc1 = $("#sub_cat1").val();
		if (typeof sc1 == "undefined" || sc1 == "") {
			alert("Select subcategory");
			return false;
		}
		param += "&subcat1=" + sc1;
	}
	//alert(param);
	$.ajax({
		url: config.addToParallel,
		type: 'POST',
		data: param,
		cache: false,
		processData: false,
		dataType: 'json',
		//data: "user="+arr1[0]+"&taskid="+arr1[1]+"&paraId="+sid+"&domain="+dom+"&lang_pair="+lang_pair,
		//header:"application/x-www-form-urlencoded",
		//to pass survey 
		success: function(data) {
			var status3 = "<p style=\"direction:ltr;\">Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			if (data["status"].toLowerCase() == "success") {
				$('.notify').remove();
				$.notify(status3, {
					type: "success",
					"position": "top",
					background: "#31b0d5"
				});
				//loadpet(currentjob);
			} else {
				$('.notify').remove();
				$.notify(status3, {
					type: "warning",
					"position": "top"
				});
			}
			$("#addDialog").dialog('close');
			//$("#demo").append(data);
		}
	});
	return false;
});
//split div functionality
function split_div(sid) {
	//alert("iam jere");
	if (confirm('Are you sure you want to split?This action cannot be undone!!!')) {
		//alert(document.getElementById("time").innerHTML);
	} else {
		return false;
	}

	//sid = sid.replace(/searchsrc/g,"");
	sid = sid.replace(/moresrc/g, "");
	//alert(sid);
	//var cur_list=$("#list").val();
	var cur_list = job_id;

	var arr1 = cur_list.split("_");
	var param = "user=" + arr1[0] + "&taskid=" + arr1[1] + "&paraId=" + sid + "&domain=" + dom + "&lang_pair=" + lang_pair;
	var temp_url = '';
	if (type == "file") {
		temp_url = config.splitPara;
	} else {
		temp_url = config.splitPara1;

		if (type == "ht") {
			param = param + "&story_source=ht";
		} else if (type == "liveht") {
			param = param + "&story_source=liveht";
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
	}
	$.ajax({
		url: temp_url,
		type: 'POST',
		data: param,
		//data: "user="+arr1[0]+"&taskid="+arr1[1]+"&paraId="+sid+"&domain="+dom+"&lang_pair="+lang_pair,
		header: "application/x-www-form-urlencoded",
		//to pass survey 
		success: function(data) {
			var status3 = "<p style=\"direction:ltr;\">Insert Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			if (data["status"].toLowerCase() == "success") {
				$('.notify').remove();
				$.notify(status3, {
					type: "success",
					"position": "top",
					background: "#31b0d5"
				});
				loadpet(currentjob);
			} else {
				$('.notify').remove();
				$.notify(status3, {
					type: "warning",
					"position": "top"
				});
			}
			//$("#demo").append(data);
		}
	});
}

//merge div functionality
function merge_div(mid) {
	if (confirm('Are you sure you want to merge?This action cannot be undone!!!')) {
		//alert(document.getElementById("time").innerHTML);
	} else {
		return false;
	}

	//mid = mid.replace(/searchsrc/g,"");
	mid = mid.replace(/moresrc/g, "");
	//mid = "#"+mid ;
	//alert(mid);
	//var cur_list=$("#list").val();
	var cur_list = job_id;

	var arr1 = cur_list.split("_");
	var param = "user=" + arr1[0] + "&taskid=" + arr1[1] + "&paraId=" + mid + "&domain=" + dom + "&lang_pair=" + lang_pair;
	var temp_url = '';
	if (type == "file") {
		temp_url = config.deletePara;
	} else {
		temp_url = config.deletePara1;

		if (type == "ht") {
			param = param + "&story_source=ht";
		} else if (type == "liveht") {
			param = param + "&story_source=liveht";
		} else if (type == "ndtvhindi") {
			param += "&story_source=ndtvhindi"
		}
	}
	$.ajax({
		url: temp_url,
		type: 'POST',
		data: param,
		//data: "user="+arr1[0]+"&taskid="+arr1[1]+"&paraId="+sid+"&domain="+dom+"&lang_pair="+lang_pair,
		header: "application/x-www-form-urlencoded",
		//to pass survey 
		success: function(data) {
			var status3 = "<p style=\"direction:ltr;\">Merge Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
			if (data["status"].toLowerCase() == "success") {
				$('.notify').remove();
				$.notify(status3, {
					type: "success",
					"position": "top",
					background: "#31b0d5"
				});
				loadpet(currentjob);
			} else {
				$('.notify').remove();
				$.notify(status3, {
					type: "warning",
					"position": "top"
				});
			}
			//$("#demo").append(data);
		}
	});
	/*var t = document.createElement('textarea');
	  t.id = 't';
	// Optional step to make less noise in the page, if any!
	t.style.height = 0;
	// You have to append it to your page somewhere, I chose <body>
	document.body.appendChild(t);
	// Copy whatever is in your div to our new textarea
	t.value = document.getElementById(mid).innerText;
	var selector = document.querySelector('#t');
	selector.select();
	//$("#"+mid).hide();
	document.execCommand('copy');
	loadpet(currentjob);
		// Remove the textarea
		document.body.removeChild(t);*/

}

function search_anu(getid) {
	//alert(getid);
	//currid = currid.replace(/anu/,"tgt");
	$("#tabdialog").html("Some anusaaraka text");
	$("#tabdialog").dialog({
		position: {
			my: 'left',
			at: 'top'
		},
		title: "Anusaaraka"
	});
}
//getword function for word level tab click 
function get_word(getid) {
	$("#tabdialog").html('W1 <span id="w1">W1</span>');
	$("#tabdialog").dialog({
		position: {
			my: 'left',
			at: 'top'
		},
		title: "Word to Word translation"
	});
	$("#w1").click(function() {
		var wordtext = $(this).text();
		//	alert(wordtext);
		insertTextAtCursor(wordtext);
	});
}

//search in glosbe
/*function search_glosbe(currid) {
	var text = getselectedtext(currid);
	text = text.toLowerCase();
	//window.open("http://www.cfilt.iitb.ac.in/wordnet/webhwn/wn.php?hwd="+text,"_blank");
	window.open("https://glosbe.com/en/hi/" + text, "_blank");
}*/

function search_urduengdict(currid) {
	var text = getselectedtext(currid);
	//text = text.toLowerCase();
	//window.open("http://www.cfilt.iitb.ac.in/wordnet/webhwn/wn.php?hwd="+text,"_blank");
	window.open("http://www.urduenglishdictionary.org/Urdu-To-English-Translation/" + text + "/Page-1.htm?SearchType=1", "_blank");
}

function change_fonts(txtid, font2) {
	var val = font2.value;
	val = val.replace(/.TTF/i, "");
	var txt = $("div[id^='src']").css("font-family", val);
	if (val == 'Source Font') {
		//$("div[id^='src']").css("font-family", "\'Lohit Devanagari\'");
		$("div[id^='src']").css("font-family", "\'sans-serif\'");
	}
}

function change_fonts1(txtid, font2) {
	var val = font2.value;
	val = val.replace(/.TTF/i, "");
	var txt = $("div[id^='tgt']").css("font-family", val);
	if (val == 'Target Font') {
		$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
	} else if (val == 'Noto Nastaliq') {
		$("div[id^='tgt']").css("font-family", "\'Noto Nastaliq Urdu\'");
	}
}

function identify_syn(words) {
	//alert(words);
	//var words = $("#"+id).text().split(" ");
	var origwords = words;
	words = words.replace(/<div id="grid">/g, "<divid=\"grid\"> ");
	words = words.replace(/\।/g, "। ");
	words = words.replace(/ +/g, " ");
	words = words.replace(/، /g, "،");
	words = words.replace(/ ،/g, "،");
	words = words.replace(/۔ /g, "۔");
	words = words.replace(/ ۔/g, "۔");
	//Punjabi danda and other symbols
	words = words.replace(/ ।/g, "।");
	words = words.replace(/ ,/g, ",");
	//words = words.replace(/ \(/g,"(");
	words = words.replace(/ \)/g, ")");
	words = words.replace(/\( /g, "(");
	words = words.replace(/\) /g, ")");
	words = words.replace(/ - /g, "-");
	words = words.split(" ");
	var wor = '';
	var patt = new RegExp("<divid=\"grid\">");
	var res = patt.test(words);
	var c = 0;
	if (res) {
		wor += '<div id=\"grid\">';
		c = 1;
	} else {
		c = 0;
	}
	for (var b = c; b < words.length; b++) {
		words[b] = words[b].replace(/\n/, "");
		var ptext = words[b].replace(/[\|\"\'.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		if (typeof storealljobs == "undefined") {
			return origwords;
		}
		var suggestions = storealljobs.suggestions[ptext];
		var suggid = "sugges" + sugg_count;
		if (typeof suggestions == "undefined" || suggestions == "") {
			wor += '<span id="' + suggid + '">' + words[b] + '</span>';
			originalobj[suggid] = words[b];
			sugg_count++;
		} else {
			wor += '<span id="' + suggid + '" class="red">' + words[b] + '</span>';
			originalobj[suggid] = words[b];
			sugg_count++;
		}
		if ((words.length) - 1 == b) {
			wor += '<span>&nbsp;</span>';
		} else {
			wor += ' ';
		}
	}
	wor = wor.replace(/<divid="grid">/g, "<div id=\"grid\">");
	//alert(wor);
	return wor;
	//$("#"+id).html(wor);
}

function savefeedback(prm, url) {

	$.ajax({
		url: url,
		type: 'POST',
		//data: "user="+user+"&lang_pair="+lang_pair+"&taskid="+arr[1]+"&paraId="+paraid+"&domain="+dom+"&flag=true",
		data: prm,
		header: "application/x-www-form-urlencoded",
		cache: false,
		//contentType: 'application/json',
		processData: false,
		dataType: "json",
		//to pass survey 
		success: function(data) {
			alert(data["message"]);
			//console.log(data);
			//alert(data);
		}
	});
	return false;
}

function alignhor() {

	$("#ver").show();
	$("#hor").hide();
	$("div#title").each(function() {
		$(this).removeClass("col-lg-6 col-xs-6 col-sm-6 col-md-6");
		$(this).addClass("col-lg-12 col-xs-12 col-sm-12 col-md-12");
	});
}

function alignver() {
	$("#ver").hide();
	$("#hor").show();
	$("div#title").each(function() {
		$(this).removeClass("col-lg-12 col-xs-12 col-sm-12 col-md-12");
		$(this).addClass("col-lg-6 col-xs-6 col-sm-6 col-md-6");
	});
}

function spanify(id) {
	/*var words = $("#"+id).text().split(" ");
	//alert(words);
	$("#"+id).html();
	var wor='';
	$("#"+id).html("");*/
	//document.getElementById( id ).innerHTML = document.getElementById( id ).innerHTML.replace(     /([\d\w']+)/g, '<span>$&</span>' );
	document.getElementById(id).innerHTML = document.getElementById(id).textContent.replace(/([\S]+)/g, '<span>$&</span>');
	/*for(var i=0; i<words.length;i++) {

		wor = words[i].replace(/./i, "<span>"+words[i]+" </span>");
		$("#"+id).append(wor);
		//alert(wor);
	}*/
}
/*$(document).bind('keydown',function(e){
	if(e.ctrlKey && e.keyCode==90)
	 {
		 e.preventDefault();
		 //document.execCommand('undo', false, null);
		 doUndo(e);
	 }
});*/
//document.getElementsByClassName('edit').onmousemove = function( event ) {
function insertTextAtCursor(text) {
	var sel, range, html;
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			range.insertNode(document.createTextNode(text));
		}
	} else if (document.selection && document.selection.createRange) {
		document.selection.createRange().text = text;
	}
}

function saveSelection() {
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			return sel.getRangeAt(0);
		}
	} else if (document.selection && document.selection.createRange) {
		return document.selection.createRange();
	}
	return null;
}

function restoreSelection(range) {
	if (range) {
		if (window.getSelection) {
			sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (document.selection && range.select) {
			range.select();
		}
	}
}


function subcat1(id) {
	//var category = document.form.category.value;
	//var category = $("#category").val();
	var mwecategory = $("#" + id).val();

	alert(mwecategory);
	switch (mwecategory) {
		case "reduplication":
			var elements = ["Choose Subcat1", "Onomatopoeic", "Full Reduplication", "Partial Reduplication"];
			addOptions(elements);
			break;

		case "compound":
			//var elements = ["Choose Paradigm", "jA","KA","kara","le","ho","pI","CU", "uTa", "so","se"];
			var elements = ["Choose Subcat1", "X1", "X2", "X3"];
			addOptions(elements);
			break;

		case "complex predicate":
			var elements = ["Choose Subcat1", "N-V", "Adv-V", "Adv-V"];
			addOptions(elements);
			break;

		case "idioms":
			var elements = ["Choose Subcat1", "X1", "X2", "X3"];
			addOptions(elements);
			break;

		default:
			var elements = ["Choose Subcat1"];
			addOptions(elements);
	}

	return false;
}

function addOptions(arrayElements) {
	var i = 0;
	var t = "false";
	//document.form.paradigm.options.length=0;
	var addid = '';
	if (arrayElements[0] == "Choose Subcat1") {
		addid = "sub_cat1";
	} else if (arrayElements[0] == "Choose Subcat2") {
		addid = "sub_cat2";
	}

	$('#' + addid)
		.find('option')
		.remove();

	for (i = 0; i < arrayElements.length; i++) {
		if (i == 0) {
			t = "true";
		}
		var opt = document.createElement('option');
		opt.value = arrayElements[i];
		opt.text = arrayElements[i];
		document.getElementById(addid).options.add(opt);

		//            document.form.paradigm.options[i] = new Option(arrayElements[i], arrayElements[i], t, false);
	}
}
$("#viewdoubt").unbind("click").on("click", function() {
	if (document.getElementById("viewdoubt").checked) {
		$(".nodoubt").hide();
		$(".row doubt").show();
	} else {
		$(".nodoubt").show();
	}
});

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

$("#jobsrefresh").click(function() {
	showpetjobs(activepage);
	$("#jumpdiv").show();
	$('#pagination').twbsPagination('destroy');
	$("#upload").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$("#jobstable").show();
	$("#filterbar").show();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
});

var res = '';

function viewmtout() {

	//var r2 = saveSelection();
	//if(document.getElementById("viewmtout").checked) 
	/*	$(this).html(function(i,old){
			return old=='<input type="checkbox">Hide MT Output' ?  '<input type="checkbox">View MT Output' : '<input type="checkbox">Hide MT Output';
		});*/
	var srcid = current_id.replace(/tgt/, "src");
	var para_sent = current_id.replace(/tgt/, "");
	para_sent = para_sent.replace(/src/i, "____");
	para_sent = para_sent.replace(/sentence/i, "____");
	var pn = para_sent.split("____")[0] - 1;
	var sn = para_sent.split("____")[1] - 1;
	//console.log(pn+" "+sn);
	//console.log(story["para"][pn]["sent"][sn]);
	//console.log(mtstory);
	var mttext = mtstory["tgt"]["para"][pn]["sent"][sn];
	var mttext2 = mtstory["tgt2"]["para"][pn]["sent"][sn];
	var srctext = mtstory["src"]["para"][pn]["sent"][sn];
	var pettext = mtstory["pet"]["para"][pn]["sent"][sn];
	mttext = escapeHtml(mttext);
	mttext2 = escapeHtml(mttext2);
	srctext = escapeHtml(srctext);
	var srctext2 = res = srctext;
	pettext = escapeHtml(pettext);
	var revtext = '';
	if (typeof review_sjob.story.review_story != "undefined") {
		revtext = review_sjob.story.review_story[pn].para[sn].sentence;
		revtext = escapeHtml(revtext);
	}
	var mt_pe = mtstory["tgt2"]["para"][pn]["mt_pe"][sn];
	mt_pe = escapeHtml(mt_pe);
	//var term_text = term_search(srctext2);
    var term_text = resources_search(srctext2);
	if (res != term_text) {
		$("#" + srcid + " div[id^='sentence']").html(res);
		//$("#" + srcid + " div[id^='sentence']").html(gloss_text);
	}
	/*var gloss_text = gloss_search(srctext2);
	if (srctext != gloss_text) {
		$("#" + srcid + " div[id^='sentence']").html(res);
		//$("#" + srcid + " div[id^='sentence']").html(gloss_text);
	}*/

	var sent_text = sent_split(srctext2);
	//var sent_text = sent_split(term_text);
	$("#" + srcid + " div[id^='sentence']").html(res);
	//$("#" + srcid + " div[id^='sentence']").html(sent_text);
	//restoreSelection(r2);

	//$("#" + srcid + " div[id^='sentence']").html("<sentence>" + sent_text + "</sentence>");
	var tmtext = '';
	srctext2 = encodeURIComponent(srctext);
	var tm_flag = 0;
	var tm_result = '';
	//console.log(lang_pair);
	//This will match in TM uploaded by user in that project with exact match
	/*var tm_ajax = $.ajax({
		//url: config.getTmxView,
		url: config.getTM,
		type: 'POST',
		//data: "input_string=" + srctext + "&threshold=99&action=tm",
		//data: "user=" + user + "&search_src=" + srctext2 + "&search_project=" + current_project,
		//data: "inputstring=" + srctext2 + "&threshold=99&user=" + user + ",system&project=" + current_project,
		data: "inputstring=" + srctext2 + "&threshold=99&user=" + user + ",system&project=" + current_project + "&langpair=" + lang_pair,
		//async: false,
		cache: false,
		processData: false,
		dataType: 'json',
		success: function(data) {
			if (data.status.toLowerCase() != "failure") {
				for (var i = 0; i < data.result.length; i++) {
					tm_flag = 1;
					tm_result = data.result;
					if(i<5) {
						tmtext += '<span title="'+data.result[i].tmx_name+'">' + escapeHtml(data.result[i].tgt)+'</span><br>';
					}
				}
				$('.notify').remove();
				   $.notify("Translation Memory Found, View it in CAT tab(bottom)", {
					   type: "success",
					   "position": "top",
					   background: "#EBA560",
					   color: "#fff",
					   "delay": 5000
				   });
			} else {
				//tmtext = '';
			}
		}
	});*/
	var tm_found_tgt_text = '';
	var tm_found_src_text = '';
	var tm_found_score = '';
	var tm_alternates = [];

	if (typeof tm_batch_story.tm_story != "undefined") {
		if (typeof tm_batch_story.tm_story[pn] != "undefined") {
			if (typeof tm_batch_story.tm_story[pn].para != "undefined") {
				if (typeof tm_batch_story.tm_story[pn].para[sn] != "undefined") {
					if (typeof tm_batch_story.tm_story[pn].para[sn].Score != "undefined" && typeof tm_batch_story.tm_story[pn].para[sn].sentence != "undefined") {
						tm_found_tgt_text = tm_batch_story.tm_story[pn].para[sn].sentence;
						tm_found_src_text = tm_batch_story.tm_story[pn].para[sn].src;
						tm_found_score = tm_batch_story.tm_story[pn].para[sn].Score;
						tm_alternates = tm_batch_story.tm_story[pn].para[sn].alternatives;
					}
				}
			}
		}
	}

	if (tm_found_tgt_text != "") {
		tmtext += '<span title="Score:' + tm_found_score + '-' + escapeHtml(tm_found_src_text) + '">' + escapeHtml(tm_found_tgt_text) + '</span><br>';
	}
	/*$.ajax({
		url: config.getTM,
		type: 'POST',
		//data: "user=pk&lang_pair=eng_hin&inputString=Manisha Shejwal",
		//data: "user=pk&lang_pair=eng_hin&inputString=" + srctext,
		data: "input_string=" + srctext + "&threshold=100&action=tm",
		async: false,
		cache: false,
		processData: false,
		dataType: 'json',
		success: function(data) {
			if (data.output.status != "FAILURE") {
				for (var i = 0; i < data.output.result.length; i++) {
					tmtext = data.output.result[i].tgt;
					tmtext = escapeHtml(tmtext);
				}
				$('.notify').remove();
				$.notify("Translation Memory Found, View it in CAT tab(bottom)", {
					type: "success",
					"position": "top",
					background: "#EBA560",
					color: "#fff",
					"delay": 5000
				});
			} else {
				tmtext = '';
			}
		}
	});*/

	var fbtext = mtstory["pet"]["para"][pn]["fb"][sn];
	var review_fbtext = mtstory["pet"]["para"][pn]["fb1"][sn];

	var font_size = $("div[id='tgt1sentence1']").css("fontSize");
	font_size = parseInt(font_size) + 1 + "px";
	font_size = "16px";

	var divct = $('<div></div>').attr("class", "container"); //.appendTo(div);
	var table = $("<table></table>").attr("class", "mttable table").attr("style", "font-size:" + font_size+";margin-bottom:0;").appendTo(divct);
	var tm_table = $("<table></table>").attr("class", "mttable tmtable table").attr("style", "font-size:" + font_size).appendTo(divct);
	var tr = '';

	tr = $('<tr></tr>').attr("id", "catcttr").appendTo(table);
	$('<td title="Character Transliteration"><span style="">Char... Trans</span></td>').appendTo(tr);
	$('<td></td>').attr("id", "catcttd").appendTo(tr);

	tr = $('<tr></tr>').appendTo(table);
	if (typeof mtstory.mt2type != "undefined") {
		$('<td title="Machine Translated"><span style="color:blue;">MT1</span></td>').appendTo(tr);
	} else {
		$('<td title="Machine Translated"><span style="color:blue;">MT</span></td>').appendTo(tr);
	}
	//$('<td>'+srctext+'</td>').appendTo(tr);
	$('<td class="mt">' + mttext + '</td>').appendTo(tr);
	tr = $('<tr></tr>').appendTo(table);
	if (typeof mtstory.mt2type == "undefined") {
		//$('<td><span style="color:blue;">MT2</span></td>').appendTo(tr);
	} else {
		$('<td><span style="text-transform:capitalize;color:blue;">MT2 (' + mtstory.mt2type + ')</span></td>').appendTo(tr);
		$('<td class="mt">' + mttext2 + '</td>').appendTo(tr);
	}

	//For MT2 ..... MT8
	//console.log(complete_story.story.mt3_type);
	for (var mt = 3; mt <= 8; mt++) {
		var mtsno = 'mt' + mt + '_type';
		var mtsno_story = 'mt' + mt + '_story';
		var tgtsno = "tgt" + mt;
		var tr = $('<tr></tr>').appendTo(table);
		if (typeof complete_story.story[mtsno] == "undefined" || complete_story.story[mtsno_story] == "undefined") {
			//$('<td><span style="color:blue;">MT2</span></td>').appendTo(tr);
		} else {
			$('<td><span style="text-transform:capitalize;color:blue;">MT' + mt + ' (' + complete_story.story[mtsno] + ')</span></td>').appendTo(tr);
			$('<td class="mt" style="widht:70%;" id="mttext' + mt + '">' + complete_story.story[mtsno_story][pn]["para"][0]["sentence"] + '</td>').appendTo(tr);
			var td_buttons = $('<td></td>').appendTo(tr);
			$('<button data-clipboard-text="' + complete_story.story[mtsno_story][pn]["para"][0]["sentence"] + '" id="mttext' + mt + 'copybtn" class="btn btn-default mttext' + mt + 'copybtn clipboard">Copy&nbsp;&nbsp;</button>').appendTo(td_buttons);
			$('<button class="btn btn-default" id="mtinsertbtn' + mt + '">Insert</button>').appendTo(td_buttons);
			$('<button class="btn btn-default" id="mtbtn' + mt + '">Replace</button>').appendTo(td_buttons);
			//$('<td><button class="btn btn-default" id="mtinsertbtn2">Insert</button></td>').appendTo(tr);
		}
	}

	if (rework_flag == "off" || rework_flag == "on") {
		tr = $('<tr></tr>').appendTo(table);
		var pettext1 = review_sjob.story.postedited_targetstory1[pn].para[sn].sentence;
		$('<td title="postedit before rework"><span style="color:#000;">Post edit</span></td>').appendTo(tr);
		$('<td class="mt" id="postedit before rework">' + pettext1 + '</td>').appendTo(tr);
		tr = $('<tr></tr>').appendTo(table);
		if (typeof review_sjob.story.review_story1 != "undefined") {
			var revtext1 = review_sjob.story.review_story1[pn].para[sn].sentence;
			$('<td title="review before rework"><span style="color:#000;">Review</span></td>').appendTo(tr);
			$('<td class="mt" id="review before rework">' + revtext1 + '</td>').appendTo(tr);
		}
	}
	if (reassign_flag == false) {
		for (var i = 1; i < postedit_iteration; i++) {
			var petstory = "postedited_targetstory_" + i;
			if (typeof jobdata.story[petstory] != "undefined") {
				var ptext = jobdata.story[petstory][pn].para[sn].sentence;
				tr = $('<tr></tr>').appendTo(table);
				$('<td title="postedit before reassign"><span style="color:#000;">Post edit' + i + '</span></td>').appendTo(tr);
				$('<td class="mt" id="postedit before reassign">' + ptext + '</td>').appendTo(tr);
			}
		}
		for (var i = 1; i < postedit_iteration; i++) {
			var revstory = "review_story_" + i;
			if (typeof jobdata.story[revstory] != "undefined") {
				var rtext = jobdata.story[revstory][pn].para[sn].sentence;
				tr = $('<tr></tr>').appendTo(table);
				$('<td title="review before reassign"><span style="color:#000;">Review' + i + '</span></td>').appendTo(tr);
				$('<td class="mt" id="review before reassign">' + rtext + '</td>').appendTo(tr);
			}
		}

	}


	tr = $('<tr></tr>').appendTo(table);
	if (rework_flag == "off" || rework_flag == "on") {
		$('<td>Post edit (Rework)</td>').appendTo(tr);
	} else {
		if (postedit_iteration > 1) {
			$('<td>Post edit' + postedit_iteration + '</td>').attr("title", posteditor).attr("data-toggle", "tooltip").appendTo(tr);
		} else {
			if(postedit_status != "unassigned") {
			$('<td>Post edit</td>').attr("class", "mt").attr("title", posteditor).attr("data-toggle", "tooltip").appendTo(tr);
			}
		}
	}
	//$('<td>'+srctext+'</td>').appendTo(tr);
	if(postedit_status != "unassigned") {
		$('<td class="mt">' + pettext + '</td>').appendTo(tr);
	}
	if (review_reassign_flag == false) {
		for (var i = 1; i < review_iteration; i++) {
			var revstory = "review_story_reviewiteration_" + i;
			if (typeof jobdata.story[revstory] != "undefined") {
				var rtext = jobdata.story[revstory][pn].para[sn].sentence;
				tr = $('<tr></tr>').appendTo(table);
				$('<td title="review before reassign"><span style="color:#000;">Review' + i + '</span></td>').appendTo(tr);
				$('<td class="mt" id="review before reassign">' + rtext + '</td>').appendTo(tr);
			}
		}
	}
	if (revtext != "") {
		tr = $('<tr></tr>').appendTo(table);
		if (rework_flag == "off" || rework_flag == "on") {
			$('<td title="postedit before rework"><span style="">Review (Rework)</span></td>').appendTo(tr);
		} else {
			if (review_iteration > 1) {
				$('<td>Review' + review_iteration + '</td>').attr("title", reviewer).appendTo(tr);
			} else {
				$('<td title="review"><span style="">Review</span></td>').attr("data-toggle", "tooltip").attr("title", reviewer).appendTo(tr);
			}
		}
		$('<td class="mt" id="postedit before rework">' + revtext + '</td>').appendTo(tr);
	}

	//$('<td><button class="btn btn-default copymttext2">Copy</button></td>').appendTo(tr);

	tr = $('<tr></tr>').appendTo(table);
	if (typeof mt_pe != "undefined") {
		if (mt_pe == true) {
			$("#mttab").html("MT EQUALS Postedit!");
		} else {
			$("#mttab").html("");
		}
		$("#mttab").append(divct);
	} else {
		$("#mttab").html(divct);
	}
	$("#catcttr").hide();
	//$(".mttable").append(gloss_words);
	//$("#limt").click();
	fbtext = fbtext.replace(/\n$/g, "");
	fbtext = fbtext.replace(/\n/g, "<br>");
	fbtext = fbtext.replace(/<p>/g, "");
	fbtext = fbtext.replace(/<\/p>/g, "<br>");
	//fbtext = fbtext.replace(/</g,"&lt;");
	//fbtext = fbtext.replace(/>/g,"&gt;");
	review_fbtext = review_fbtext.replace(/\n/g, "<br>");
	review_fbtext = review_fbtext.replace(/<p>/g, "");
	review_fbtext = review_fbtext.replace(/<\/p>/g, "<br>");
	//review_fbtext = review_fbtext.replace(/</g,"&lt;");
	//review_fbtext = review_fbtext.replace(/>/g,"&gt;");

	//$("#fbtab").html("");
	$(".fpet").html("");
	$(".frev").html("");
	if (fbtext != "" && fbtext != " ") {
		$(".fpet").html("<b>Posteditor : </b>" + fbtext);
	}
	if (review_fbtext != "" && review_fbtext != " ") {
		$(".frev").append("<b>Reviewer : </b>" + review_fbtext);
	}
	//tm_ajax.done(function(){
	if (tmtext != "") {
		$('.notify').remove();
		$.notify("Translation Memory Found, View it in CAT tab(bottom)", {
			type: "success",
			"position": "top",
			background: "#EBA560",
			color: "#fff",
			"delay": 5000
		});
		tr = $('<tr></tr>').appendTo(tm_table);
		$('<td title="Translation Memory Fuzzy Match"><span style="color:green;">TM (' + tm_found_score + '%)</span></td>').appendTo(tr);
		$('<td class="mt" style="width:35%;">' + tm_found_src_text + '</td>').appendTo(tr);
		$('<td class="mt" style="width:35%;" id="mttext3">' + tmtext + '</td>').appendTo(tr);
		var td_buttons = $('<td></td>').appendTo(tr);
		$('<button data-clipboard-text="' + tm_found_tgt_text + '" id="mttext3copybtn" class="btn btn-default mttext3copybtn clipboard">Copy&nbsp;&nbsp;</button>').appendTo(td_buttons);
		$('<button class="btn btn-default" id="mtbtn3">Replace</button>').appendTo(td_buttons);
		if (tm_alternates.length > 0) {
			for (var n = 0; n < tm_alternates.length; n++) {
				var r = n + 4;
				tr = $('<tr></tr>').appendTo(tm_table);
				$('<td title="Translation Memory Fuzzy Match"><span style="color:green;">TM (' + tm_alternates[n].Score + '%)</span></td>').appendTo(tr);
				$('<td class="mt" style="width:35%;">' + tm_alternates[n].src + '</td>').appendTo(tr);
				$('<td class="mt" style="width:35%;" id="mttext' + r + '">' + tm_alternates[n].sentence + '</td>').appendTo(tr);
				var td_buttons = $('<td></td>').appendTo(tr);
				$('<button data-clipboard-text="' + tm_alternates[n].sentence + '" class="btn btn-default mttext' + r + 'copybtn clipboard">Copy&nbsp;  &nbsp;</button>').appendTo(td_buttons);
				$('<button class="btn btn-default" id="mtbtn' + r + '">Replace</button>').appendTo(td_buttons);
			}
		}
	} else {
		//console.log(tm_batch_story);
		tr = $('<tr></tr>').appendTo(tm_table);
		$('<td title="Translation Memory Status"><span style="color:green;">TM Status</span></td>').appendTo(tr);
		//console.log("|"+tm_found_score+"|");
		if (typeof tm_batch_story == "undefined" || typeof tm_batch_story.tm_status == "undefined") {
			$('<td class="mt" style="width:35%;">TM Batch Failed - File not created</td>').appendTo(tr);
		} else if (typeof tm_batch_story.tm_status != "undefined" && tm_batch_story.tm_status.toLowerCase() == "failure") {
			$('<td class="mt" style="width:35%;">TM Batch Failure - Status from server:' + tm_batch_story.tm_status + '</td>').appendTo(tr);
		} else {
			$('<td class="mt" style="width:35%;">No records matched - Status from server:' + tm_batch_story.tm_status + '</td>').appendTo(tr);
		}
		$('<td class="mt" style="width:35%;"></td>').appendTo(tr);
	}
	//});

	//$(".mtdiv").show();
	triggerChange();


	/* if($(this).attr("class")=="btn btn-default") {
		 $(".col-num").hide();
	//alert(align_flag);
		$(".mttitle").show();
		$(".title").each(function(){
			$(this).removeClass();
			if(align_flag == 1) {
				$(this).addClass("col-lg-12 col-xs-12 col-sm-12 col-md-12 title");
			}
			else {
				$(this).addClass("col-lg-4 col-xs-4 col-sm-4 col-md-4 title");
			}
		});
	}
	else {
		$(".col-num").show();
		$(".mttitle").hide();
		$(".title").each(function(){
			$(this).removeClass();
			if(align_flag == 1) {
				$(this).addClass("col-lg-12 col-xs-12 col-sm-12 col-md-12 title");
			}
			else {
				$(this).addClass("col-lg-6 col-xs-6 col-sm-6 col-md-6 title");
			}
		});
	}*/
	/*	 $('td').tooltip({
			trigger: "click",
			container: 'body'
		});
		$('td').tooltip('open');*/

}
$("#jtog").click(function() {
	get_clients();
	$("#advSearchProjects").trigger('chosen:updated');
	$("#toptitle").html("&nbsp;&#9776;eBhashaLSP/Manager");
	admin_flag = 0;
	$("#advSearchManagersContainer").hide();
	$("#searchmanagertext").val("");
	search_param = '';
	showpetjobs(1);
	$(document).attr("title", "eBhashaLSP | Manager");
	$("#taskname").html("");
	$("#jumpdiv").show();
	$("#jobstable").show();
	$('#pagination').twbsPagination('destroy');
	$('#pajination').show();;
	$("#upload").hide();
	$("#createuser").hide();
	$("#searchuser").hide();
	$("#jobstable").show();
	$("#jobpanel").show();
	$("#filterbar").show();
	$("#storytoolbar").hide();
	$("#reworkfilterdiv").show();
	$("#sar").hide();
	$("#hidesrc").html('<i class="fa fa-square-o" aria-hidden="true"></i><i class="fa fa-square-o" aria-hidden="true"></i>&nbsp;');
	$(".bottomdiv").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$(".goback").hide();
	$("#storyWC").hide();
	triggerChange();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$(".managed_by").hide();
	$(this).html(function(i, old) {
		//	return old=='View Jobs <i class="fa fa-caret-down" aria-hidden="true"></i>' ?  'Hide Jobs <i class="fa fa-caret-up" aria-hidden="true"></i>' : 'View Jobs <i class="fa fa-caret-down" aria-hidden="true"></i>';
	});
});

//admin view
$("#ajtog").click(function() {
	get_projects();
	get_allClients();
	if (($.inArray("19", permissions) == -1)) {
		$('.notify').remove();
		$.notify("You don't have permission to do this operation", {
			"postion": "top",
			"type": "danger"
		});
		return;
	}
	$("#toptitle").html("&nbsp;&#9776;eBhashaLSP/Admin");
	admin_flag = 1;
	$("#searchmanagertext").val("");
	search_param = '';
	$("#advSearchManagersContainer").show();
	showpetjobs(1);
	$(document).attr("title", "eBhashaLSP | Admin");
	$("#taskname").html("");
	$("#jumpdiv").show();
	$("#jobstable").show();
	$('#pagination').twbsPagination('destroy');
	$('#pajination').show();;
	$("#upload").hide();
	$("#createuser").hide();
	$("#searchuser").hide();
	$("#jobstable").show();
	$("#jobpanel").show();
	$("#filterbar").show();
	$("#storytoolbar").hide();
	$("#reworkfilterdiv").show();
	$("#sar").hide();
	$("#hidesrc").html('<i class="fa fa-square-o" aria-hidden="true"></i><i class="fa fa-square-o" aria-hidden="true"></i>&nbsp;');
	$(".bottomdiv").hide();
	$("#statsdiv").hide();
	$("#userjobstatsdiv").hide();
	$("#usermanager").hide();
	$("#userroles").hide();
	$("#rolesperms").hide();
	$(".goback").hide();
	$("#storyWC").hide();
	triggerChange();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$(this).html(function(i, old) {
		//	return old=='View Jobs <i class="fa fa-caret-down" aria-hidden="true"></i>' ?  'Hide Jobs <i class="fa fa-caret-up" aria-hidden="true"></i>' : 'View Jobs <i class="fa fa-caret-down" aria-hidden="true"></i>';
	});
});


function view_pet() {
	//alert("aim jer");
	$("#download-box").modal();
	$(".srcmtpet").show();
	$(".srcpet").show();
	$(".pet").show();
	$(".srcmtrev").hide();
	$(".srcrev").hide();
	$(".srcmt").hide();
	$(".rev").hide();
	$(".mt").hide();
	$(".src").hide();
}

function view_rev() {
	//alert("aim jer");
	$("#download-box").modal();
	$(".srcmtrev").show();
	$(".srcrev").show();
	$(".rev").show();
	$(".srcmtpet").hide();
	$(".srcpet").hide();
	$(".srcmt").hide();
	$(".pet").hide();
	$(".mt").hide();
	$(".src").hide();
}

function toggleExtrarows() {
	$(".minus").toggle();
	$(".plus").toggle();
	$(".extrarows").toggle();
}

function userCreate() {
	var fname = $("#fn").val();
	var lname = $("#ln").val();
	var uname = $("#un").val();
	var email = $("#email").val();
	var password = $("#upassword").val();
	var city = $("#city").val();
	var mobile = $("#phone").val();
	var role = $("#selectrole option:selected").text();
	var roleid = $("#selectrole").val();
	var managedby = $("#selectmanager").val();

	if (typeof fname == "undefined" || fname == "") {
		alert("Please fill First name!!");
		return false;
	}
	if (typeof lname == "undefined" || lname == "") {
		alert("Please fill Last name!!");
		return false;
	}
	if (typeof uname == "undefined" || uname == "") {
		alert("Please fill user name!!");
		return false;
	}
	if (typeof email == "undefined" || email == "") {
		alert("Please fill email!!");
		return false;
	}
	if (typeof password == "undefined" || password == "") {
		alert("Please fill password!!");
		return false;
	}
	if (typeof city == "undefined" || city == "") {
		alert("Please fill city!!");
		return false;
	}
	if (typeof mobile == "undefined" || mobile == "") {
		alert("Please fill mobile!!");
		return false;
	}
	if (typeof roleid == "undefined" || roleid == "") {
		alert("Please select a role!!");
		return false;
	}
	if (typeof role == "undefined" || role == "") {
		alert("Please select a role!!");
		return false;
	}
	if (typeof managedby == "undefined" || managedby == "") {
		alert("Please select a manager!!");
		return false;
	}

	//alert("fn=" + fname + "&ln=" + lname + "&un=" +uname + "&role=" + role + "&mobile=" + mobile + "&city=" + city + "&email=" + email);
	$.ajax({
		url: "scripts/insert-sql.php",
		type: 'POST',
		data: "fn=" + fname + "&ln=" + lname + "&un=" + uname + "&roleid=" + roleid + "&role=" + role + "&mobile=" + mobile + "&city=" + city + "&email=" + email + "&password=" + password + "&managedby=" + managedby,
		header: "application/x-www-form-urlencoded",
		async: false,
		success: function(data) {
			$('.notify').remove();
			if (data.status == "success") {
				$('form#userCreationForm')[0].reset();
				$('#unamemsg').html();
				$('#emailmsg').html();
				$.notify("User " + lname + " " + fname + " with email " + email + "created succesfully", {
					type: "success",
					"position": "top",
					background: "#31b0d5",
					"delay": 7000,
				});
			} else {
				$.notify("User creation failure", {
					type: "warning",
					"position": "top",
					"delay": 7000,
				});
			}
		},
		error: function(jqXHR, exception) {
			$("#loading").hide();
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("Error in Creating user " + msg);
		}
	});
	return false;
}

function searchUser() {

	$("#searchresult").html("");
	var email = $("#searchmailid").val();
	if (typeof email == "undefined" || email == "") {
		alert("Please fill email!!");
		return false;
	}
	$("#searchresult").html("");
	$.ajax({
		url: "scripts/search-user.php",
		type: 'POST',
		data: "&email=" + email,
		header: "application/x-www-form-urlencoded",
		async: false,
		success: function(data) {
			$('.notify').remove();
			if (data.status == "success") {
				$.notify("Search succesfull", {
					type: "success",
					"position": "top",
					background: "#31b0d5",
					"delay": 5000,
				});
				var sresult = '<table class="table table-striped table-bordered dt-responsive nowrap">';
				sresult += '<thead style="font-weight:600;">';
				sresult += '<tr><td>UserId</td><td>LastName</td><td>FirstName</td><td>Username</td><td>Role</td><td>Mobile</td><td>Email</td><td>City</td><td>Team MT Limits</td><td>Actions</td></tr>';
				sresult += '</tr></thead>';
				for (var i = 0; i < data.records.length; i++) {
					sresult += '<tr id="' + i + '"><td>' + data.records[i].userid + '</td>';
					sresult += '<td>' + data.records[i].lname + '</td>';
					sresult += '<td>' + data.records[i].fname + '</td>';
					sresult += '<td>' + data.records[i].username + '</td>';
					sresult += '<td>' + data.records[i].role + '</td>';
					sresult += '<td>' + data.records[i].mobile + '</td>';
					sresult += '<td>' + data.records[i].email + '</td>';
					sresult += '<td>' + data.records[i].city + '</td>';
					sresult += '<td><table class="table table-borderless"><tr><td>Anusaaraka</td><td>' + data.records[i].team_anusaaraka_limit + '<span data-sno="' + i + '" class="limitsToggle lhide"><i class="fa fa-chevron-circle-down"></i></span></td></tr>';
					sresult += '<tr style="display:none;" class="morelimits' + i + '"><td>Samapark</td><td>' + data.records[i].team_sampark_limit + '</td></tr>';
					sresult += '<tr style="display:none;" class="morelimits' + i + '"><td>Google</td><td>' + data.records[i].team_google_limit + '</td></tr>';
					sresult += '<tr style="display:none;" class="morelimits' + i + '"><td>Yandex</td><td>' + data.records[i].team_yandex_limit + '</td></tr>';
					sresult += '<tr style="display:none;" class="morelimits' + i + '"><td>Bing</td><td>' + data.records[i].team_bing_limit + '</td></tr></table></td>';
					sresult += '<td><button id="edituser____' + i + '" type="button" class="btn btn-default">Edit</button>&nbsp;&nbsp;<button id="resetpassword____' + i + '" type="button" class="btn btn-default">Reset Password</button></td></tr>';
				}
				sresult += '</table>';
				//console.log(sresult);
				//sresult+= '<button class="btn btn-primary" type="button">Edit</button>';
				$("#searchresult").html(sresult);
			} else {
				$.notify("No results found", {
					type: "warning",
					"position": "top",
					"delay": 5000,
				});
				$("#searchresult").html('<p align="center">No records found</p>');
			}
		},
		error: function(jqXHR, exception) {
			$("#loading").hide();
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("Error in Creating user " + msg);
		}
	});
}

$(document).on("click", ".limitsToggle", function() {
	var sno = $(this).attr("data-sno");
	if (/lhide/.test($(this).attr("class"))) {
		$(this).removeClass("lhide");
		$(this).html('<i class="fa fa-chevron-circle-up"></i>');
		$(".morelimits" + sno).show();
	} else {
		$(".morelimits" + sno).hide();
		$(this).html('<i class="fa fa-chevron-circle-down"></i>');
		$(this).addClass("lhide");
	}
});

//edit user
$(document).on("click", "button[id^='edituser']", function() {
	//alert(this.id);
	var rowid = this.id;
	rowid = rowid.replace(/edituser____/, "");
	var edit_userid = $("tr#" + rowid + " td:eq(0)").text();
	var edit_lname = $("tr#" + rowid + " td:eq(1)").text();
	var edit_fname = $("tr#" + rowid + " td:eq(2)").text();
	var edit_mobile = $("tr#" + rowid + " td:eq(5)").text();
	var edit_city = $("tr#" + rowid + " td:eq(7)").text();
	var edit_anusaaraka = $("tr#" + rowid + " td:eq(8) > table tr:nth-child(1) td:eq(1)").text();
	var edit_sampark = $("tr#" + rowid + " td:eq(8) > table tr:nth-child(2) td:eq(1)").text();
	var edit_google = $("tr#" + rowid + " td:eq(8) > table tr:nth-child(3) td:eq(1)").text();
	var edit_yandex = $("tr#" + rowid + " td:eq(8) > table tr:nth-child(4) td:eq(1)").text();
	var edit_bing = $("tr#" + rowid + " td:eq(8) > table tr:nth-child(5) td:eq(1)").text();

	/*console.log(edit_anusaaraka);
	console.log(edit_sampark);
	console.log(edit_google);
	console.log(edit_yandex);
	console.log(edit_bing);*/

	$("#updateUserModal").modal();
	$(".modal-title").html("Update User details of " + edit_userid);

	$("#eln").val(edit_lname);
	$("#efn").val(edit_fname);
	$("#ephone").val(edit_mobile);
	$("#ecity").val(edit_city);
	$("#eanusaaraka").val(edit_anusaaraka);
	$("#esampark").val(edit_sampark);
	$("#egoogle").val(edit_google);
	$("#eyandex").val(edit_yandex);
	$("#ebing").val(edit_bing);

	$("#updateuserbtn").unbind("click").click(function() {

		var updated_lname = $("#eln").val();
		var updated_fname = $("#efn").val();
		var updated_city = $("#ecity").val();
		var updated_mobile = $("#ephone").val();
		var updated_anusaaraka = $("#eanusaaraka").val();
		var updated_sampark = $("#esampark").val();
		var updated_google = $("#egoogle").val();
		var updated_yandex = $("#eyandex").val();
		var updated_bing = $("#ebing").val();

		if (typeof updated_lname == "undefined" || typeof updated_fname == "undefined" || typeof updated_mobile == "undefined" || updated_city == "undefined") {
			alert("Please fill all the fields..");
			return;
		}

		if (typeof updated_anusaaraka == "undefined" || typeof updated_sampark == "undefined" || typeof updated_google == "undefined" || typeof updated_yandex == "undefined" || typeof updated_bing == "undefined") {
			alert("Please fill limits of MT engines..");
			return;
		}

		$.ajax({
			url: "scripts/updateUserinfo.php",
			type: 'POST',
			data: "&userid=" + edit_userid + "&fname=" + updated_fname + "&lname=" + updated_lname + "&city=" + updated_city + "&mobile=" + updated_mobile + "&anusaaraka=" + updated_anusaaraka + "&sampark=" + updated_sampark + "&google=" + updated_google + "&yandex=" + updated_yandex + "&bing=" + updated_bing,
			header: "application/x-www-form-urlencoded",
			async: false,
			success: function(data) {
				$('.notify').remove();
				if (data.status == "success") {

					$("tr#" + rowid + " td:eq(1)").text(updated_lname);
					$("tr#" + rowid + " td:eq(2)").text(updated_fname);
					$("tr#" + rowid + " td:eq(5)").text(updated_mobile);
					$("tr#" + rowid + " td:eq(7)").text(updated_city);
					$("tr#" + rowid + " td:eq(8) > table tr:nth-child(1) td:eq(1)").html(updated_anusaaraka + '<span data-sno="' + rowid + '" class="limitsToggle lhide"><i class="fa fa-chevron-circle-down"></i></span>');
					$("tr#" + rowid + " td:eq(8) > table tr:nth-child(2) td:eq(1)").text(updated_sampark);
					$("tr#" + rowid + " td:eq(8) > table tr:nth-child(3) td:eq(1)").text(updated_google);
					$("tr#" + rowid + " td:eq(8) > table tr:nth-child(4) td:eq(1)").text(updated_yandex);
					$("tr#" + rowid + " td:eq(8) > table tr:nth-child(5) td:eq(1)").text(updated_bing);

					$.notify("User details updated succesfully", {
						type: "success",
						"position": "top",
						background: "#31b0d5",
						"delay": 5000,
					});
				} else {
					$.notify("User details could not be updated!!", {
						type: "warning",
						"position": "top",
						"delay": 5000,
					});
				}
			},
			error: function(jqXHR, exception) {
				$.notify("Server Error!!", {
					type: "warning",
					"position": "top",
					"delay": 5000,
				});
				var msg = '';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				alert("Error in updating user details!!" + msg);
			}
		});

	});
});

//reset password of a user
$(document).on("click", "button[id^='resetpassword']", function() {
	//alert(this.id);
	var rowid = this.id;
	rowid = rowid.replace(/resetpassword____/, "");
	var edit_userid = $("tr#" + rowid + " td:eq(0)").text();
	$("#resetPwdModal").modal();
	$("#resetPwdModal > .modal-dialog > .modal-content > .modal-header > .modal-title").html("Reset password of " + edit_userid);

	$("#resetpwduid").val(edit_userid);
	$("#resetpwdtext").val("");

	$("#resetpwdbtn").unbind("click").click(function() {
		var ruid = $("#resetpwduid").val().trim();
		var rpwd = $("#resetpwdtext").val().trim();
		if (typeof ruid == "undefined" || typeof rpwd == "undefined") {
			alert("Please fill all the fields..");
			return false;
		}
		$.ajax({
			url: "scripts/resetPwd.php",
			type: 'POST',
			data: "&userid=" + ruid + "&resetpwd=" + rpwd,
			header: "application/x-www-form-urlencoded",
			async: false,
			success: function(data) {
				$('.notify').remove();
				if (data.status == "success") {
					var msg = "RESET pAsavarda [" + ruid + "UNICODE" + rpwd + "]";
					//if (impersonate_by != "") {
					insert_logs("admin", msg);

					$.notify("Password has been reset succesfully", {
						type: "success",
						"position": "top",
						background: "#31b0d5",
						"delay": 5000,
					});
				} else {
					$.notify("Password reset failure, userid doesn't exist", {
						type: "warning",
						"position": "top",
						"delay": 5000,
					});
				}
			},
			error: function(jqXHR, exception) {
				$.notify("Server Error!!", {
					type: "warning",
					"position": "top",
					"delay": 8000,
				});
				var msg = '';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				//alert("Error in resetting password!!" + msg);
			}
		});

	});
});

$("#un").on("keyup", function() {
	var uname = $("#un").val();
	$("#unamemsg").html("");
	searchUser2(uname, "uname");
});
$("#email").on("keyup", function() {
	var uname = $("#email").val();
	$("#emailmsg").html("");
	searchUser2(uname, "email");
});

function searchUser2(un, type) {

	var param = '';
	$("#searchresult").html("");
	if (typeof type == "undefined" || type == "") {
		$("#unamemsg").html("");
		return false;
	}
	if (typeof un == "undefined" || un == "") {
		return false;
	}
	if (type == "uname") {
		param = "&username=" + un;
	} else {
		param = "&email=" + un;
	}
	$.ajax({
		url: "scripts/search-user.php",
		type: 'POST',
		//data: "&email=" + email,
		data: param,
		header: "application/x-www-form-urlencoded",
		async: false,
		success: function(data) {
			$('.notify').remove();
			if (data.status == "success") {
				if (type == "uname") {
					var msg = "username already exists";
					$("#unamemsg").html(msg);
				} else {
					var msg = "email already exists";
					$("#emailmsg").html(msg);
				}
				/*    $.notify("User exists", {
						type: "success",
						"position": "top",
						background: "#31b0d5",
						"delay": 5000,
					});*/
			} else {
				if (type == "uname") {
					var msg = 'Available <i class="fa fa-check"></i>';
					$("#unamemsg").html(msg);
				} else {
					var msg = 'Available <i class="fa fa-check"></i>';
					$("#emailmsg").html(msg);
				}
				/*$.notify("No results found", {
				type: "warning",
				"position": "top",
				"delay": 5000,
			});*/
			}
		},
		error: function(jqXHR, exception) {
			$("#loading").hide();
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("Error in Creating user " + msg);
		}
	});
}


$(document).on("click", "button[id='bidict']", function() {
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	$("#lidict").addClass('active');
	$("#lidict").siblings().removeClass('active');
	$("#dicttab").show();
	$("#mttab").hide();
	$("#fbtab").hide();
	$("#cctab").hide();
	$("#sctab").hide();
	$("#gstab").hide();
	var h = $(".bottomdiv").height();
	h = parseInt(h);
	if (h <= 10) {
		$(".bottomdiv").css("height", "250px");
	}

	triggerChange();
	var text = getselectedtext(current_id);

	if (typeof text == "undefined" || text == "" || current_id == "") {
		get_context_word();
		var rtext = getselectedtext(current_id);
		if (/ /.test(rtext)) {
			text = rtext.split(" ")[0];
		} else {
			text = rtext;
		}
		text = text.replace(/[,\.]$/g, "");
	}

	if (typeof text == "undefined" || text == "" || current_id == "") {
		alert("Select some text!!");

		//return false;
	}
	var idtodict = current_id.replace(/tgt/, "src");
	$("#bidict").html('<i class="fa fa-book"></i><i class="fa fa-spinner"></i>');
	$("#dictsrch").val(text);
	search_dictionary(text);
	$("#bidict").html('&nbsp;<i class="fa fa-book"></i>');
	$(".petcontent").css("margin-bottom", "250px");
	$(".bottomdiv").show();
	/*$("html,body").animate({
		scrollTop: $("#"+idtodict).offset().top-70+"px"
	}, 100);*/
});

$(document).on("click", "button[id^='sdkosh']", function() {
	current_id = current_id.replace(/tgt/, "src");
	var sl = $(this).attr("data-slang");
	var tl = $(this).attr("data-tlang");
	if (current_id != "") {
		search_shabdkosh(current_id, sl, tl);
	} else {
		alert("Select a segment");
	}
});

function toggleSearch() {
	$("#sar").toggle();
	triggerChange();
}

function triggerChange() {
	//alert(topheader_height);
	var topheader_height = $(".topheader").css('height');
	//topheader_height = parseInt(topheader_height) - 40;
	var bottom_height = $(".bottomdiv").css('height');
	$(".petcontent").css("margin-top", topheader_height);
	$(".petcontent").css("margin-bottom", bottom_height);

	var bottombar_height = $(".stmenu").css("height");
	bottombar_height = parseInt(bottombar_height) - 10;

	var bottombar_height = $(".stmenu").css("height");
	bottombar_height = parseInt(bottombar_height) - 10;
	$("#tabcontent").css("margin-top", bottombar_height + 5 + "px");
}

function gotoNextSegment(id) {
	var s = $("#" + id).siblings().andSelf();
	var t = s.length - 1;
	var cs = 0;
	var i = 0;
	//console.log(s.length);
	var ids = [];
	s.each(function() {
		//console.log(this.id);
		if (this.id == id) {
			cs = i;
		}
		ids.push(this.id);
		i++;
	});
	cs = cs + 1;
	//console.log(cs);
	if (ids[t] == id || s.length == 0) {
		var nextid = id.replace(/sentence.*$/i, "");
		var para = nextid.replace(/tgt/, "");
		para = parseInt(para) + 1;
		nextid = "tgt" + para + "sentence1";
		$("#" + nextid).click();
		$("#" + nextid).children("*").attr('contenteditable', 'true').focus();
	} else {
		var nextid = ids[cs];
		$("#" + nextid).click();
		$("#" + nextid).children("*").attr('contenteditable', 'true').focus();
		$("#" + nextid).focus();
	}
	document.removeEventListener('keypress', wxImeEventCaptured, false);
	document.removeEventListener('keypress', inImeEventCaptured, false);
}

function togglebottom() {
	var cur_class = $(".bottomdiv").attr("class");
	//console.log(cur_class);
	if (/toggledbottom/.test(cur_class)) {
		$(".bottomdiv").removeClass("toggledbottom");
		$(".bottomdiv").css("height", "30%");
		$("#liclose a").html('<i class="fa fa-angle-double-down"></i>');
	} else {
		$(".bottomdiv").addClass("toggledbottom");
		$(".bottomdiv").css("height", "10px");
		$("#liclose a").html('<i class="fa fa-angle-double-up"></i>');
	}
	triggerChange();
	/*var h = $(".bottomdiv").css('height');
	h = parseInt(h);
	if (h != 250) {
		$(".bottomdiv").css("height", "250px");
		$("#liclose a").html('<i class="fa fa-angle-double-down"></i>');
	} else {
		$(".bottomdiv").css("height", "10px");
		$("#liclose a").html('<i class="fa fa-angle-double-up"></i>');
	}
	triggerChange();*/
}

//get clients
var client_data = '';

function get_allClients() {
	var client_select = '';
	client_select = '<option value="">Select Client</option>';
	$.ajax({
		url: config.getClients,
		//url: getClientsOfManager,
		type: 'POST',
		data: 'user=' + user,
		async: false,
		success: function(data) {
			if (data.status.toLowerCase() == "success") {
				client_data = data;
				for (var i = 0; i < data.records.length; i++) {
					var client = data.records[i].client;
					//		    var cli_managed_by = data.records[i].managed_by;
					//if (typeof client != "undefined" && client != "" && client != " " && data.records[i].added_by == user) 
					if (typeof client != "undefined" && client != "" && client != " ") {
						//if(crole == 'admin') {
						client_select += '<option value="' + client + '">' + client + '</option>';
						/* } else if($.inArray("user",cli_managed_by) >=0) {
					client_select += '<option value="' + client + '">' + client + '</option>';
				}*/
					}
				}
				//console.log(client_select);
				$("#advSearchClients").html(client_select);
				$("#advSearchClients").chosen({
					'width': '20%',
					allow_single_deselect: true
				});
				$('#advSearchClients').trigger("chosen:updated");
			}
			//$.notify("You are connected to Internet!!",{type:"warning","position":"top"});
		},
		//timeout:90000,
		error: function(jqXHR, exception) {
			$('.notify').remove();
			$.notify("Unable to get clients information", {
				type: "warning",
				"position": "top",
				"delay": "10000"
			});
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			//alert(msg);

		},
	});
}

function get_clients() {
	var client_select = '';
	client_select = '<option value="">Select Client</option>';
	$.ajax({
		//url: config.getClients,
		url: config.getClientsofManager,
		type: 'POST',
		data: 'manager=' + user,
		//data: 'user=' + user,
		async: false,
		success: function(data) {
			if (data.status.toLowerCase() == "success") {
				client_data = data;
				for (var i = 0; i < data.records.length; i++) {
					var client = data.records[i].client;
					//		    var cli_managed_by = data.records[i].managed_by;
					//if (typeof client != "undefined" && client != "" && client != " " && data.records[i].added_by == user) 
					if (typeof client != "undefined" && client != "" && client != " ") {
						//if(crole == 'admin') {
						client_select += '<option value="' + client + '">' + client + '</option>';
						/* } else if($.inArray("user",cli_managed_by) >=0) {
					client_select += '<option value="' + client + '">' + client + '</option>';
				}*/
					}
				}
				//console.log(client_select);
				$("#uclient").html(client_select);
				$("#childTaskuclient").html(client_select);
				$("#terminologyclient").html(client_select);
				//$('#uclient').selectpicker('refresh');
				$("#uclient").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#uclient').trigger("chosen:updated");
				$("#childTaskuclient").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#childTaskuclient').trigger("chosen:updated");
				$("#terminologyclient").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#terminologyclient').trigger("chosen:updated");
				$("#c1clients").html(client_select);
				//$('#c1clients').selectpicker('refresh');
				$("#c2clients").html(client_select);
				$("#c3clients").html(client_select);
				$("#advSearchClients").html(client_select);
				$("#c1clients").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#c1clients').trigger("chosen:updated");
				$("#c2clients").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#c2clients').trigger("chosen:updated");
				$("#c3clients").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#c3clients').trigger("chosen:updated");
				$("#advSearchClients").chosen({
					'width': '20%',
					allow_single_deselect: true
				});
				$('#advSearchClients').trigger("chosen:updated");
			}
			//$.notify("You are connected to Internet!!",{type:"warning","position":"top"});
		},
		//timeout:90000,
		error: function(jqXHR, exception) {
			$('.notify').remove();
			$.notify("Unable to get clients information", {
				type: "warning",
				"position": "top",
				"delay": "10000"
			});
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			//alert(msg);

		},
	});
}

//get projects
function get_projects(uclient) {
	//var uclient = $("#uclient").val();
	var param = '';
	if (typeof uclient != "undefined" && uclient != '') {
		param = 'client=' + uclient;
	}
	param += '&user=' + user;
	var project_select = '';
	project_select = '<option value="">Select Project</option>';
	$.ajax({
		url: config.getProjects,
		type: 'POST',
		//data:'user='+user+'&client='+uclient,
		data: param,
		async: false,
		success: function(data) {
			//$.notify("You are connected to Internet!!",{type:"warning","position":"top"});
			if (data.status.toLowerCase() == "success") {
				project_data = data;
				for (var i = 0; i < data.records.length; i++) {
					var project = data.records[i].project;
					//if(data.records[i].project != "" && data.records[i].added_by == user ) 
					if (data.records[i].project != "") {
						project_select += '<option value="' + project + '">' + project + '</option>';
					}
				}
				//console.log(client_select);
				if (typeof uclient != "undefined" && uclient != '') {
					$("#uproject").html(project_select);
					$("#childTaskuproject").html(project_select);
					$("#terminologyproject").html(project_select);
					//$('#uproject').selectpicker('refresh');
					$("#c2projects").html(project_select);
				}
			} else {
				$("#uproject").html(project_select);
				$("#childTaskuproject").html(project_select);
				$("#terminologyproject").html(project_select);
				//$('#uproject').selectpicker('refresh');
				$("#c2projects").html("");
			}
			$("#uproject").chosen({
				'width': '100%',
				allow_single_deselect: true
			});
			$('#uproject').trigger("chosen:updated");
			$("#childTaskuproject").chosen({
				'width': '100%',
				allow_single_deselect: true
			});
			$('#childTaskuproject').trigger("chosen:updated");
			$("#terminologyproject").chosen({
				'width': '100%',
				allow_single_deselect: true
			});
			$('#terminologyproject').trigger("chosen:updated");
			$("#c2projects").chosen({
				'width': '100%',
				allow_single_deselect: true
			});
			$('#c2projects').trigger("chosen:updated");

			$("#advSearchProjects").html(project_select);
			$("#advSearchProjects").chosen({
				'width': '25%',
				allow_single_deselect: true
			});
			$('#advSearchProjects').trigger("chosen:updated");
			if (typeof uclient == "undefined" || uclient == '') {
				$("#advSearchProjects").html(project_select);
				$("#advSearchProjects").chosen({
					'width': '25%',
					allow_single_deselect: true
				});
				$('#advSearchProjects').trigger("chosen:updated");
			}
		},
		//timeout:90000,
		error: function(jqXHR, exception) {
			$('.notify').remove();
			$.notify("Unable to get Projects information", {
				type: "warning",
				"position": "top",
				"delay": "10000"
			});
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			//alert(msg);

		},
	});
}

//get domainss
function get_domains() {
	var param = '';
	if (typeof uclient != "undefined" && uclient != '') {
		param = 'client=' + uclient;
	}
	param += '&user=' + user;
	var domain_select = '';
	domain_select = '<option value="">Choose Domain</option>';
	$.ajax({
		url: config.getDomains,
		type: 'POST',
		//data:'user='+user+'&client='+uclient,
		data: param,
		async: false,
		success: function(data) {
			//$.notify("You are connected to Internet!!",{type:"warning","position":"top"});
			if (data.status.toLowerCase() == "success") {
				domain_data = data;
				for (var i = 0; i < data.records.length; i++) {
					var name = data.records[i].name;
					if (data.records[i].name != "") {
						domain_select += '<option value="' + name + '">' + capitalizeFirstLetter(name) + '</option>';
					}
				}
				$("#udomain").html(domain_select);
				//    $('#udomain').selectpicker('refresh');
				$("#udomain").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#domain').trigger("chosen:updated");
				$("#childTaskudomain").html(domain_select);
				$("#childTaskudomain").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#childTaskudomain').trigger("chosen:updated");
				$("#terdomain").html(domain_select);
				$("#terdomain").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#terdomain').trigger("chosen:updated");
				$("#updateDomainList").html(domain_select);
				$("#updateDomainList").chosen({
					'width': '100%',
					allow_single_deselect: true
				});
				$('#updateDomainList').trigger("chosen:updated");
			} else {}
		},
		//timeout:90000,
		error: function(jqXHR, exception) {
			$('.notify').remove();
			$.notify("Unable to get Projects information", {
				type: "warning",
				"position": "top",
				"delay": "10000"
			});
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			//alert(msg);

		},
	});
	$("#advSearchLangpair").chosen({
		'width': '30%',
		allow_single_deselect: true
	});

}


//open dropdown on click
function myDropdown() {
	var x = document.getElementById("adminMenu");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}


//check online users
var tmp = '';

function checkOnlineUsers() {
	var today = new Date();
	$("#onlineusers").html('Checking for current active users with last activity under less than 15 minutes...<i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw margin-bottom"></i>');
	//("#userloadres").append('<tr><td>user</td><td>diff</td></tr>');
	var table2 = $('<table><th><tr><td>User</td><td>Last Activity at</td></tr></th>').addClass('table');
	var online_flag = 0;
	/*    for (var n = 0; n < user_roles.users.length; n++) {
			var fuser = user_roles.users[n].user; //username
			fuser = fuser.toLowerCase();
			var fname = user_roles.users[n].fname; //firstname
			var lname = user_roles.users[n].lname; //lasttname
		//fuser = 'nagaraju';
			lastLog(fuser);
			//console.log(fuser +"     "+tmp.logged_at);
			var last_activity = new Date(tmp.logged_at);
			//console.log(today+" "+last_activity);
			var diff = Math.abs(new Date() - last_activity);
			var diffm = Math.floor((diff / 1000) / 60);
			//console.log('user: '+fuser+' diffm: '+diffm + "mins");
			if (diffm <= 15) {
				//console.log('user: '+fuser+' diffm: '+diffm + "mins");
				var tr = $('<tr></tr>').appendTo(table2);
				$('<td style="text-transform:capitalize;">' + fuser + '</td><td title="online"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i></span> ' + diffm + ' mins (' + last_activity + ')</td> ago').appendTo(tr);
				online_flag = 1;
			} else if (diffm >= 15 && diffm <= 30) {
				//console.log('user: '+fuser+' diffm: '+diffm + "mins");
				var tr = $('<tr></tr>').appendTo(table2);
				$('<td style="text-transform:capitalize;">' + fuser + '</td><td title="idle"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i></span> ' + diffm + ' mins (' + last_activity + ')</td> ago').appendTo(tr);
				online_flag = 1;
			} else if (diffm >= 30 && diffm <= 60) {
				//console.log('user: '+fuser+' diffm: '+diffm + "mins");
				var tr = $('<tr></tr>').appendTo(table2);
				$('<td style="text-transform:capitalize;">' + fuser + '</td><td title="Away"><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i></span> ' + diffm + ' mins (' + last_activity + ')</td> ago').appendTo(tr);
				online_flag = 1;
			}
			//return;
			tmp = '';
		}*/
	$.ajax({
		type: "POST",
		url: 'scripts/getOnlineUsers.php',
		data: 'managerid=' + userid + '&role=admin',
		header: "application/x-www-form-urlencoded",
		async: false,
		success: function(msg) {
			if (msg.status == "success") {
				for (var n = 0; n < msg.users.length; n++) {
					online_flag = 1;
					var fuser = msg.users[n].user; //username
					var fname = msg.users[n].fname; //firstname
					var emailid = msg.users[n].EmailId;
					var lname = msg.users[n].lname;
					var last_activity = new Date(msg.users[n].Lastlogin);
					//last_activity = last_activity.toDateString();
					var user_minutes = parseInt(last_activity.getMinutes());
					last_activity = last_activity.toTimeString();
					var date = new Date();
					var cur_minutes = parseInt(date.getMinutes());
					var diff_m = cur_minutes - user_minutes;
					//console.log(user_minutes+" "+cur_minutes);
					//console.log(last_activity);
					last_activity = last_activity.replace(/ GMT\+0530 \(IST\)/g, "");
					var tr = $('<tr></tr>').appendTo(table2);
					if (diff_m <= 10) {
						$('<td style="text-transform:capitalize;">' + fuser + '</td><td title="online"><span class="finished"><i class="fa fa-circle" aria-hidden="true"></i></span> ' + emailid + '(' + last_activity + ')</td> ago').appendTo(tr);
					} else if (diff_m <= 15) {
						$('<td style="text-transform:capitalize;">' + fuser + '</td><td title="Idle for more than 10 minutes"><span class="under_edit"><i class="fa fa-circle" aria-hidden="true"></i></span> ' + emailid + '(' + last_activity + ')</td> ago').appendTo(tr);
					} else {
						$('<td style="text-transform:capitalize;">' + fuser + '</td><td title="Idle for more than 15 minutes"><span class="available_for_edit"><i class="fa fa-circle" aria-hidden="true"></i></span> ' + emailid + '(' + last_activity + ')</td> ago').appendTo(tr);
					}
				}
			} else {
				online_flag = 0;
			}
		},
	});
	if (online_flag == 0) {
		var tr = $('<tr></tr>').appendTo(table2);
		$('<td colspan="2">No active users found.</td> ago').appendTo(tr);
	}
	$("#onlineusers").html(table2);
}

//monitor queries check
function queries_check() {
	$('#servicesStatusTable tr#trqueries td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		url: config.getMyQueries,
		type: 'POST',
		data: "user=" + user,
		header: "application/x-www-form-urlencoded",
		//async: false,
		success: function(data) {
			if (data["status"].toLowerCase() == "success") {
				//console.log("Queries Running");
				$('#servicesStatusTable tr#trqueries td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trqueries td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trqueries td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}


//monitor concordance check
function concordance_check() {
	$('#servicesStatusTable tr#trconcordance td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		url: config.getConcordance,
		type: 'POST',
		data: "lang_pair=eng_hin&user=" + user + "&type=source&inputString=the&start=1&end=1",
		header: "application/x-www-form-urlencoded",
		//async: false,
		success: function(data) {
			if (data["status"].toLowerCase() == "success") {
				//console.log(" Concordance Running");
				$('#servicesStatusTable tr#trconcordance td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trconcordance td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trconcordance td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//eng_hin ml based transliteration
function en_hi_mlbased_check() {
	$('#servicesStatusTable tr#trenhiml td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		type: 'GET',
		url: config.enghinML + '?src=eng&tar=hin&q=CBI',
		//async: true,
		success: function(data) {
			if (data.status.toLowerCase() == 'success') {
				$('#servicesStatusTable tr#trenhiml td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trenhiml td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trenhiml td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//hin_urd rule based transliteration
function hi_ur_rulebased_check() {
	$('#servicesStatusTable tr#trhiurrl td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		type: 'POST',
		url: config.ruleTransliteration,
		data: 'user=pk&fromTo=hin2urd&mode=prod&text=नागराजु',
		//async: false,
		header: "application/x-www-form-urlencoded",
		success: function(data) {
			if (data.status.toLowerCase() == 'success') {
				$('#servicesStatusTable tr#trhiurrl td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trhiurrl td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trhiurrl td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//hin_urd ml based transliteration
function hi_ur_mlbased_check() {
	$('#servicesStatusTable tr#trhiurml td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		type: 'POST',
		url: config.hinurdMLTransliteration,
		data: "src=hindi&tar=urdu&q=नागराजु",
		//async: false,
		header: "application/x-www-form-urlencoded",
		success: function(data) {
			if (data.status.toLowerCase() == 'success') {
				$('#servicesStatusTable tr#trhiurml td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trhiurml td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trhiurml td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//ebs dict / shabdanajali dict check
function ebsDict_check() {
	$('#servicesStatusTable tr#trebsdict td:eq(8)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		url: config.searchParallel,
		type: 'POST',
		data: "user=guest&domain=general&custom_dict_list=system,rbiproject,cstt&lang_pair=eng_hin&inputString=zenith",
		//async: false,
		header: "application/x-www-form-urlencoded",
		success: function(data) {
			if (data["status"].toLowerCase() == "success") {
				$('#servicesStatusTable tr#trebsdict td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trebsdict td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trebsdict td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//hindi spellchecker check
function hinSpell_check() {
	$('#servicesStatusTable tr#trhinspell td:eq(2)').html('<span style="color:red"> Checking</span>');
	var etext = encodeURIComponent('राजु');
	$.ajax({
		url: config.spellCheck,
		type: 'POST',
		data: "user=" + user + "&lang=hin&inputString=" + etext,
		//async: false,
		cache: false,
		processData: false,
		dataType: 'json',
		success: function(data) {
			if (data["status"].toLowerCase() == "success") {
				$('#servicesStatusTable tr#trhinspell td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trhinspell td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trhinspell td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//check tm
function transMem_check() {
	$('#servicesStatusTable tr#trtm td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		url: config.getTMNoida,
		type: 'POST',
		data: "user=system&srctext=Hello&threshold=55&lpair=en_hi",
		header: "application/x-www-form-urlencoded",
		//async: false,
		success: function(data) {
			if (data.status.toLowerCase() == "success") {
				$('#servicesStatusTable tr#trtm td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trtm td:eq(2)').html('<span style="color:red"> Failed<span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trtm td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});

}
//check term
function term_check() {
	$('#servicesStatusTable tr#trterm td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		type: 'POST',
		url: config.getTerminology,
		data: 'lang_pair=eng_hin&client=PHP&user=user&terminology=general&inputString=AJAX stands for Asynchronous javascript and XML. AJAX is a new technique for creating better, faster, and more interactive web applications with the help of XML, HTML, css and Java Script.',
		//async: false,
		header: "application/x-www-form-urlencoded",
		success: function(data) {
			if (data.status.toLowerCase() == 'success') {
				$('#servicesStatusTable tr#trterm td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trterm td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trterm td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}
//check mark for training
function training_check() {
	$('#servicesStatusTable tr#trtraining td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		type: 'POST',
		url: config.getMarks,
		data: 'start=1&end=10',
		//async: false,
		header: "application/x-www-form-urlencoded",
		success: function(data) {
			if (data.status.toLowerCase() == 'success') {
				$('#servicesStatusTable tr#trtraining td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trtraining td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trtraining td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}

//check gloss
function gloss_check() {
	$('#servicesStatusTable tr#trglossary td:eq(2)').html('<span style="color:red"> Checking</span>');
	$.ajax({
		type: 'POST',
		url: config.getGlossary,
		//data: 'lang_pair=eng_hin&client=testing&user=user&domain=general&inputString=Cures',
		data: 'lang_pair=hin_urd&client=default&user=user&domain=general&inputString=सोमवार',
		//async: false,
		header: "application/x-www-form-urlencoded",
		success: function(data) {
			if (data.status.toLowerCase() == 'success') {
				$('#servicesStatusTable tr#trglossary td:eq(2)').html('<span style="color:green"> Running</span>');
			} else {
				$('#servicesStatusTable tr#trglossary td:eq(2)').html('<span style="color:red"> Failed</span>');
			}
		},
		error: function(jqXHR, exception) {
			$('#servicesStatusTable tr#trglossary td:eq(2)').html('<span style="color:red"> Server Error</span>');
		}
	});
}
//ebs MT check
function ebsMT_check() {
	var viewportwidth = document.documentElement.clientWidth;
	var viewportheight = document.documentElement.clientHeight;
	window.resizeBy(-300, 0);
	window.moveTo(0, 0);
	var nwindow = window.open("http://183.82.119.160/translate", "windowname", "width=800,height=600,scrollbars=yes,left=" + (viewportwidth - 300) + ",top=0");
	if (window.focus) {
		nwindow.focus()
	}

}

//check all services
function checkAllServices() {
	$("#ssl").html('Checking Status <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw margin-bottom"></i>');
	$('#servicesStatusTable tr#trqueries td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trconcordance td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trenhiml td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trhiurml td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trhiurrl td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#hinspell td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trtm td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trglossary td:eq(2)').html('<span style="color:red"> Checking</span>');
	$('#servicesStatusTable tr#trterm td:eq(2)').html('<span style="color:red"> Checking</span>');
	queries_check();
	concordance_check();
	en_hi_mlbased_check();
	hi_ur_mlbased_check();
	hi_ur_rulebased_check();
	ebsDict_check();
	hinSpell_check();
	transMem_check();
	term_check();
	gloss_check();
	training_check();
	$("#ssl").html('');
}



//admin menu item active
$("#adminMenu a").click(function() {
	$(this).siblings().removeClass('active');
	$("#mySidenav a").removeClass('active');
	$(this).addClass('active');
});

//sidenav on click close adminMenu
$("#mySidenav > a").click(function() {
	$("#adminMenu a").removeClass('active');
	var x = document.getElementById("adminMenu");
	if (x.className.indexOf("w3-show") == -1) {
		//	x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}

});

/*
 $('#btnRight').click(function(e) {
			 var selectedOpts = $('#lstBox1 option:selected');
		 if (selectedOpts.length == 0) {
			 alert("Nothing to move.");
			 e.preventDefault();
		 }

		 $('#lstBox2').append($(selectedOpts).clone());
		 $(selectedOpts).remove();
		 e.preventDefault();
 });

$('#btnLeft').click(function(e) {
	var selectedOpts = $('#lstBox2 option:selected');
	if (selectedOpts.length == 0) {
		alert("Nothing to move.");
		e.preventDefault();
	}

	$('#lstBox1').append($(selectedOpts).clone());
	$(selectedOpts).remove();
	e.preventDefault();
});
*/
function checkLangPair() {
	var sel_mt = $("#umtengine").val();
	var sel_lp = $("#flang").val() + "_" + $("#tlang").val();
	if (sel_lp == "eng_hin" && sel_mt == "sampark") {
		alert("select valid MT engine!! Langpair eng_hin works only with Anusaaraka or Google");
		$("#umtengine").val("none");
		$("#umtengine").selectpicker("refresh");
	} else if ((sel_lp == "hin_pan" || sel_lp == "hin_urd") && (sel_mt == "anusaaraka")) {
		alert("select valid MT engine!!This langpair works only with Sampark or Google");
		$("#umtengine").val("none");
		$("#umtengine").selectpicker("refresh");
	}
}
