var search_param = '';
var file_add_text = '';
var noOfrows = '10';
var activepage = 1;
var allTasks = [];
//var start = 0;
//var end =10;
function showjobs(pgno) {
	$("#newtaskdiv").hide();
	$("#jobsdiv").show();
    activepage = pgno;
    var temp_url = '';
    var param = '';
    if (search_param != "") {
        param += search_param;
    }

    temp_url = config.apiCall;
    $.ajax({
        url: temp_url,
        type: 'GET',
		cache: false,
		dataType: 'json',
		success: function(data) {
			var status1 = "Tasks status:" + " " + data['status'] + ", Message:" + data['message'];
			if (typeof data[0] != "undefined") {
			} else {
				$("#jobstable").html('<h3 style="text-transform:none;" align="center">There are no tasks to show </h3>');
				$("#jumpdiv").hide();
				$("#pajination").hide();
				return;
			}
			create_list(data, pgno);
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

function create_list(data, pgno) {
    $("#demo").html("");
    $("#jobstable").html("");
    $("#final").html("");
    $("#jobclose").hide();

    var search = $('<input type="text" id="search" onkeyup="findMyText(event)"></input>');
    var table = $('<table></table>').addClass('table table-striped table-bordered dt-responsive nowrap').attr('id', "jtable").css("width", "100%").css("margin-bottom", "0");
    var th = $('<thead><tr>' +
		'<td><input type="checkbox" id="allch" onclick="allCheck(this.id)" name="allch"></input></td>' +
		'<td>Id</td>' +
		'<td>>Title</td>' +
		'<td>Body</td></tr></thead>').css("font-weight", "600").appendTo(table);
	var p = 0;
    var end = parseInt(pgno) * noOfrows;
    var start = end - noOfrows + 1;
	var total_tasks = data.length;
	allTasks = data;
	//for (var i = data.length - 1; i >= 0; i--) 
	for (var i = start-1;i<end; i++) {

		var id = data[i].id;
		var title = data[i].title;
		var body = data[i].body;
		tr = $('<tr><td id="jobdetails' + i + '">' + id + '</td>' +
			'<td>' + title + '</td>' +
			'<td>' + body + '</td></tr>'
			).attr('id', "tablerow"+i).appendTo(table);
		var tcheck = $('<td title="select" id="' + id + '"><input type="checkbox" id="check' + p + '" name="checktask"></input></td>').prependTo(tr);
			p = p + 1;
		}
	$("#jobstable").html(table);

	var tp = Math.ceil(total_tasks / noOfrows);
    $("#totpages").html(tp);
    $("#totjobs").html(total_tasks);
    activepage = parseInt(activepage);
    //alert(activepage);
    $('#pagination').twbsPagination({
        totalPages: tp,
        visiblePages: 4,
        startPage: activepage,
        onPageClick: function(event, page) {
            $('#page-content').text('Page ' + page);
            showjobs(page);
        }
    });

}

$(document).on("click", "button[id^='editUser']", function() {
//alert(this.id);
	var taskid = this.id;
	taskid = taskid.replace(/editTranscription/g, "");
	//openForEditing(taskid);
    
	var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST";
    mapForm.action = "edit.php";
    mapForm.id = "newform";
    
	// Create an input
    var mapInput = document.createElement("input");
    mapInput.type = "text";
    mapInput.id = "taskid";
    mapInput.name = "taskid";
    mapInput.value = taskid;
    mapForm.appendChild(mapInput);

    document.body.appendChild(mapForm);

    mapForm.submit();
    $("#taskid").hide();
    $("#newform").remove();
});

var selected_items = {};
var count =0;
$(document).unbind("click").on('click', 'input[id^="check"]', function(event) {
	var checkid = this.id;
	checkid = checkid.replace(/check/, "");
	var tr = $(this).closest('tr');
	 selected_items[checkid] = tr.attr('id');
	if ($('#' + this.id).is(':checked')) {
		count = count + 1;
	} else {
		delete selected_items[checkid];
		count = count - 1;
	}
	//	console.log("here");
	if(count == 1) {
		console.log("here");
		$("#edittask").removeClass("disabled");
		$("#edittask").attr("disabled",false);
	} else {
		console.log("here2");
		$("#edittask").addClass("disabled");
		$("#edittask").attr("disabled",true);
	}
	if(count >=1) {
		$("#deletetask").removeClass("disabled");
		$("#deletetask").attr("disabled",false);
	} else {
		$("#deletetask").addClass("disabled");
		$("#deletetask").attr("disabled",true);
	}
	$("#allch").prop("checked",false);
});

//select/unselect all checkboxes
function allCheck(id) {
	//sj = 0;
	if ($('#' + id).is(':checked')) {
		$("input[id^='check']").each(function() {
			if (!$('#' + this.id).is(':checked')) {
				$("#" + this.id).click();
			}
		});
		$("#" + id).prop("checked", true);
	} else {
		$("input[id^='check']").each(function() {
			if ($('#' + this.id).is(':checked')) {
				$("#" + this.id).click();
			}
		});
		$("#" + id).prop("checked", false);
	}
}
function createResource() {
	var utitle = $("#utitle").val();
	if(typeof utitle == "undefined" || utitle == "") {
		alert("Title is empty");
		return;
	}
	var ubody = $("#ubody").val();
	if(typeof ubody == "undefined" || ubody == "") {
		alert("Body is empty");
		return;
	}
	$.ajax({
		url: config.apiCall,
		type: 'POST',
		data: { 'userId':1, 'body':ubody,'title':utitle},
		cache: false,
		success: function(data) {
			if (typeof data.id != "undefined") {
				alert("Resource Created successfully!!");
				showjobs(1);
			} else {
				alert("Resource Creation failure!!");
				return;
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
	file_add_text = '';
    return false;
}
$(document).on("click", "button[id^='edittask']", function() {
	$("#editmetaModal").modal();
	
	var id = '';
	
	for (var key in selected_items) {
		id = selected_items[key];
		id=id.replace(/tablerow/g,"");
		console.log(allTasks);
		$("#edittitle").val(allTasks[id].title);
		$("#editbody").val(allTasks[id].body);
	}

	$("#updatetaskmetabtn").click(function() {

		
		var edit_title = $("#edittitle").val();
		var edit_body = $("#editbody").val();
		
		if(typeof edit_title == "undefined" || edit_title == "") {
			alert("Title cannot be empty");
			return false;
		}
		
		if(typeof edit_body == "undefined" || edit_body == "") {
			alert("Body is empty");
			return false;
		}
		
		/*console.log(edit_videolang);
		console.log(edit_videolink);
		console.log(edit_tasktype);
		console.log(edit_description);*/
		fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
				id :parseInt(allTasks[id].id) ,
					title :edit_title,
					body :edit_body,
					userId : parseInt(allTasks[id].userId) 
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json()
  )
  .then((json) => {
	  console.log(json); $('tr[id=tablerow' + id  + '] td:eq(2)').html(edit_title);
	  $('tr[id=tablerow' + id  + '] td:eq(3)').html(edit_body);
	  alert("updated successfully");})

	});
});

$(document).on("click", "button[id^='deletetask']", function() {
	
	var taskid = this.id;

	if (confirm("Are you sure you want to delete the selected records?")) {} else {
		return;
	}

	var id = '';
	
	for (var key in selected_items) {
		id = selected_items[key];
		id=id.replace(/tablerow/g,"");
		fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
			method: 'DELETE',
		})
		$("#tablerow"+id).remove();
	}
});

//showing noOfRows in table(10,20,30,40...)
function changeRows(norows) {
    noOfrows = norows;
    $('#pagination').twbsPagination('destroy');
    showjobs(1);
}
