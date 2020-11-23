var noOflogrows = 10;
var lrole = '';
var activelogspage = 1;
var search_logparam = '';
var availableLogOptions = {
    data: [
        "date:yyyy/mm/dd",
        "message:",
    ],
    list: {
        match: {
            enabled: true
        },
        sort: {
            enabled: false
        },
        onChooseEvent: function() {
            searchLogs();
            return;
        }
    },
    theme: "bootstrap"
};


$(document).on('click', "a[id='logslink']", function() {
    $("#jobpanel").hide();
    $("#statsdiv").hide();
    $("#logspanel").show();
    $("#demo").html("");
    $("#storytoolbar").hide();
    $(".bottomdiv").hide();
    lrole = $(this).attr('class');
    if (/postedit/.test(lrole)) {
        lrole = 'postedit';
        show_logs('postedit', 1);
    } else if (/review/.test(lrole)) {
        lrole = 'review';
        show_logs('review', 1);
    }

    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $("#searchlogtext").easyAutocomplete(availableLogOptions);

});

//show logs based on role
function show_logs(rl, pg) {
    activelogspage = pg;
    //alert(rl);
    //var logfetchurl = config.fetchLogs;
    var logfetchurl = 'scripts/logs/get_logs.php';
    var param = "&user=" + user + "&role=" + rl;
    var end = parseInt(pg) * noOflogrows;
    var start = end - noOflogrows + 1;
    param += "&start=" + start + "&end=" + end;
    if (search_logparam != "") {
        param += search_logparam;
    }
    $.ajax({
        url: logfetchurl,
        type: 'POST',
        data: param,
        header: "application/x-www-form-urlencoded",
        async: false,
        success: function(data) {
            var status1 = "<p style=\"direction:ltr;\">Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
            if (data["status"].toLowerCase() == "success") {
                $('.notify').remove();
                $.notify(status1, {
                    type: "success",
                    "position": "top",
                    background: "#31b0d5"
                });
                create_logs(data, rl);
            } else {
                $('.notify').remove();
                $.notify(status1, {
                    type: "warning",
                    "position": "top"
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
            //alert(msg);
        }
    });
    return false;
}

//show logs based on user for admin/manager
function getUserLogs(pg) {
    $("#userlogres").html("");
    //alert(rl);
    //var logfetchurl = config.fetchLogs;
    var logfetchurl = 'scripts/logs/get_logs.php';
    var suser = $("#loguser").val();
	var param = '';
	if (suser != "" && suser != null) {
		param = "&user=" + suser;
	}

    if($("input#impersonateOn").is(":checked")) {
	    param += "&search_impersonate=true";
    }
    var end = parseInt(pg) * 30;
    var start = end - 30 + 1;
    param += "&start=" + start + "&end=" + end;
    if (search_logparam != "") {
	param += search_logparam;
    }
    $.ajax({
	url: logfetchurl,
	type: 'POST',
	data: param,
	header: "application/x-www-form-urlencoded",
	async: false,
	success: function(data) {
	    var status1 = "<p style=\"direction:ltr;\">Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
	    if (data["status"].toLowerCase() == "success") {
		$('.notify').remove();
		$.notify(status1, {
		    type: "success",
		    "position": "top",
		    background: "#31b0d5"
		});
		var table = $('<table></table>').addClass('table table-striped table-bordered dt-responsive nowrap').attr('id', "jtable").css("width", "100%");
		var th = $('<thead><tr><td>SNO</td><td>Date/Time</td><td>Logged Message</td><td>User</td></tr></thead>').css("font-weight", "600").appendTo(table);

		var count=start;
		//activelogspage = parseInt(activelogspage);
		//for (var k = data.records.length - 1; k >= 0; k--) 
		for (var k = 0; k <= data.records.length - 1; k++) {
			var impersonated_by = '';
			if(typeof data.records[k].impersonated_by != "undefined") {
				impersonated_by = data.records[k].impersonated_by;
			} 
			var disdatetime = formatDate_ddmonyyyy(data.records[k].logged_at);
			disdatetime += ' ' + formatDateToTime(data.records[k].logged_at);
			$('<tr><td>' + count + '</td>'
					//+'<td>'+data.records[k].logged_at+'</td>'
					+
					'<td>' + disdatetime + '</td>' +
					'<td title="'+impersonated_by+'">' + escapeHtml(data.records[k].message) + '</td>' +
					'<td>' + getUserId(data.records[k].user) + '</td>' +
					'</tr>').attr('id', '').appendTo(table);
			count++;
		}
		var next = pg+1;
		var prev = pg -1;
		$("#userlogres").html(table);
		if(prev >= 1) {
			$("#userlogres").append('<button onclick=\"getUserLogs('+prev+')\">Prev</button>');
		}
		$("#userlogres").append('<button onclick=\"getUserLogs('+next+')\">Next</button>');
	    } else {
		$("#userlogres").html("");
		    $('.notify').remove();
		    $.notify(status1, {
			    type: "warning",
			    "position": "top"
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
	    //alert(msg);
	}
    });
    return false;
}

//show logs based on user for admin/manager
function getUserArchiveLogs(pg) {
    $("#userlogres").html("");
    //alert(rl);
    //var logfetchurl = config.fetchLogs;
    var logfetchurl = 'scripts/logs/get_archive_logs.php';
    var suser = $("#loguser").val();
	var param = '';
	if (suser != "" && suser != null) {
		param = "&user=" + suser;
	}

    if($("input#impersonateOn").is(":checked")) {
	    param += "&search_impersonate=true";
    }
    var end = parseInt(pg) * 30;
    var start = end - 30 + 1;
	//start=1,end=8000;
    param += "&start=" + start + "&end=" + end;
    if (search_logparam != "") {
	param += search_logparam;
    }
    $.ajax({
	url: logfetchurl,
	type: 'POST',
	data: param,
	header: "application/x-www-form-urlencoded",
	async: false,
	success: function(data) {
	    var status1 = "<p style=\"direction:ltr;\">Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
	    if (data["status"].toLowerCase() == "success") {
		$('.notify').remove();
		$.notify(status1, {
		    type: "success",
		    "position": "top",
		    background: "#31b0d5"
		});
		var table = $('<table></table>').addClass('table table-striped table-bordered dt-responsive nowrap').attr('id', "jtable").css("width", "100%");
		var th = $('<thead><tr><td>SNO</td><td>Date/Time</td><td>Logged Message</td><td>User</td></tr></thead>').css("font-weight", "600").appendTo(table);

		var count=start;
		//activelogspage = parseInt(activelogspage);
		//for (var k = data.records.length - 1; k >= 0; k--) 
		for (var k = 0; k <= data.records.length - 1; k++) {
			var impersonated_by = '';
			if(typeof data.records[k].impersonated_by != "undefined") {
				impersonated_by = data.records[k].impersonated_by;
			} 
			var disdatetime = formatDate_ddmonyyyy(data.records[k].logged_at);
			disdatetime += ' ' + formatDateToTime(data.records[k].logged_at);
			$('<tr><td>' + count + '</td>'
					//+'<td>'+data.records[k].logged_at+'</td>'
					+
					'<td>' + disdatetime + '</td>' +
					'<td title="'+impersonated_by+'">' + data.records[k].message + '</td>' +
					'<td>' + getUserId(data.records[k].user) + '</td>' +
					'</tr>').attr('id', '').appendTo(table);
			count++;
		}
		var next = pg+1;
		var prev = pg -1;
		$("#userlogres").html(table);
		if(prev >= 1) {
			$("#userlogres").append('<button onclick=\"getUserLogs('+prev+')\">Prev</button>');
		}
		$("#userlogres").append('<button onclick=\"getUserLogs('+next+')\">Next</button>');
	    } else {
		$("#userlogres").html("");
		    $('.notify').remove();
		    $.notify(status1, {
			    type: "warning",
			    "position": "top"
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
	    //alert(msg);
	}
    });
    return false;
}

//create table for logs
function create_logs(data, rl) {
    var table = $('<table></table>').addClass('table table-striped table-bordered dt-responsive nowrap').attr('id', "jtable").css("width", "100%");
    var th = $('<thead><tr><td>SNO</td><td>Date/Time</td><td>Logged Message</td></tr></thead>').css("font-weight", "600").appendTo(table);

    var count;
    //activelogspage = parseInt(activelogspage);
    if (activelogspage > 1) {
        count = ((activelogspage - 1) * noOflogrows) + 1;
    } else {
        count = 1;
    }
    for (var k = data.records.length - 1; k >= 0; k--) {
        var disdatetime = formatDate_ddmonyyyy(data.records[k].logged_at);
        disdatetime += ' ' + formatDateToTime(data.records[k].logged_at);
        $('<tr><td>' + count + '</td>'
            //+'<td>'+data.records[k].logged_at+'</td>'
            +
            '<td>' + disdatetime + '</td>' +
            '<td>' + data.records[k].message + '</td>' +
            '</tr>').attr('id', '').appendTo(table);
        count++;
    }
    $("#logstable").html(table);
    var tp = Math.ceil(data.noOfRecords / noOflogrows);
    $("#totlogspages").html(tp);
    activelogspage = parseInt(activelogspage);
    $('#logspagination').twbsPagination({
        totalPages: tp,
        visiblePages: 4,
        startPage: activelogspage,
        onPageClick: function(event, lpage) {
            $('#page-content').text('Page ' + lpage);
            show_logs(lrole, lpage);
        }
    });

}


//showing noOfRows in table(10,20,30,40...)
function changeLogsRows(norows) {
    noOflogrows = norows;
    $('#logspagination').twbsPagination('destroy');
    show_logs(lrole, 1);
}

//jump to specific page
function jumpToLogsPage(pno) {
    if (typeof pno == "undefined" || pno == "") {
        return false;
    }

    activelogspage = pno;
    $('#logspagination').twbsPagination('destroy');
    $('#page-content').text('Page ' + pno);
    show_logs(lrole, pno);
}

//make search string to search in logs
function searchLogs() {
    var search_text = $("#searchlogtext").val();
    search_text = search_text.replace(/^ +/g, "");
    search_text = search_text.replace(/ +$/g, "");
    search_text = search_text.replace(/ +/g, " ");
    search_logparam = '';
    if (/date/.test(search_text)) {
        var date = search_text.split(":")[1];
        search_logparam += "&search_date=" + date;
    } else if (/message/.test(search_text)) {
        var msg = search_text.split(":")[1];
        search_logparam += "&search_message=" + msg;
    }
    $('#logspagination').twbsPagination('destroy');
    show_logs(lrole, 1);

}

//fetch last log activity
function lastLog(luser) {
    //alert(rl);
    var logfetchurl = config.fetchLogs;
    var param = "&user=" + luser; //+ "&role=" + rl;
    param += "&start=1&end=1";
    $.ajax({
        url: logfetchurl,
        type: 'POST',
        data: param,
        header: "application/x-www-form-urlencoded",
        async: false,
        success: function(data) {
            var status1 = "<p style=\"direction:ltr;\">Status:" + " " + data['status'] + ", Message:" + data['message'] + "</p>";
            if (data["status"].toLowerCase() == "success") {
                tmp = data.records[0];
                $('.notify').remove();
                $.notify(status1, {
                    type: "success",
                    "position": "top",
                    background: "#31b0d5"
                });
            } else {
                tmp = 0;
                $('.notify').remove();
                $.notify(status1, {
                    type: "warning",
                    "position": "top"
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
            //alert(msg);
        }
    });
    return false;
}
