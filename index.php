<html>
	<head>
		<title>
		CRUD Web Interface 
		</title>
		<script src="js/jquery.js"></script>
		<script src="js/jquery.twbsPagination.js"></script>
		<script type="text/javascript" src="config.js?version=1.0"></script>
		<script type="text/javascript" src="js/myjs.js?version=1.0"></script>
		<script language="javascript" src="bootstrap-3.3.5-dist/js/bootstrap.js"></script>
		<link rel="stylesheet" type="text/css" href="jquery/jquery-ui.css">
		<link rel="stylesheet" type="text/css" href="bootstrap-3.3.5-dist/css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
		<link rel="stylesheet" type="text/css" href="css/styles.css?version=1.0">
		<meta charset='utf-8'>
		<script src="jquery/jquery-ui.js"></script>
	</head>
	<body onload="showjobs(1);">
    <h3 align="center"> A CRUD Interface implementing sample API</h3>
	<div id="jobpanel" style="width:100%;" class="container-fluid">
		<div id="jobsdiv" class="row">
			<div id="taskbuttons" class="col-sm-12 col-xs-12">
				<button id="newtask" class="btn btn-primary">Add new Row</button>
				<button id="edittask" disabled class="btn btn-primary disbaled">Edit a Row </button>
				<button id="deletetask" disabled class="btn btn-primary disbaled">Delete </button>
			</div>
			<div style="clear:both;position:relative;" class="col-sm-12 col-xs-12" id="jobstable">
			</div>
			<div class="col-sm-6 col-lg-6 col-md-6 col-xs-6" id="jumpdiv" style="height:10%; border:1px solid #ddd;border-right:0;background-color:#fff;color:#000;padding:1%;left:1.1%;">
				<select class="select" id="nrows" onchange="changeRows(this.value);">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
				</select>
				Jump to::&nbsp; <input style="width:10%;boder:1px solid #000;" type="text" id="jump">
				<button class="" onclick="jumpToPage(document.getElementById('jump').value);" >Go</button>
				<label ><b>Total Pages:: <i id="totpages" ></i></b></label>
				<label ><b> , Total Rows:: <i id="totjobs" ></i></b></label>
			</div>
			<div class="col-sm-6 col-lg-6 col-md-6" style="height:10%; border:1px solid #ddd;border-left: 0;background-color:#fff;color:#000;right:1.2%;padding: 1%;" id="pajination">
				<div aria-label="Page navigation"><ul class="pagination" id="pagination"></ul></div>
			</div>
		</div>
	</div>
</div>
<div align="center" style="margin-top:10%;" id="loadingDiv">
	<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom"></i>
	<span class="sr-only">Loading...</span>
</div>
<div style="display:none;margin-top: 70px;margin-bottom:250px;height:60%;overflow:auto;" id="ptcontent" class="petcontent">
	<div style="postion:relative;margin-left:1px;" id="demo">
	</div>
	<div id="loadmore">
	</div>
	<div class="btn btn-group" id="final">
	</div>
</div>
</body>
			<!--update langpair/domain dialog-->
			<div class="modal fade" id="editmetaModal" tabindex="-1" style="z-index:2000000;vertical-align:middle;font-size:18px;height:500px;" role="dialog">
				<div id="dialogdrag" class="modal-dialog dialogdrag">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title">Update Record</h4>
							</div>
							<div class="modal-body container">
							<div class="col-md-12">
								<input id="edittitle" type="text" class="form-control">
								</input>
							</div>
							<div class="col-md-12">
								<input id="editbody" type="text" class="form-control">
								</input>
							</div>
								<div class="form-group input-group row">
									<div class="col-sm-offset-3 col-sm-3">
										<button id="updatetaskmetabtn" class="btn btn-default" data-dismiss="modal">Submit</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade" id="newtaskmodal" tabindex="-1" style="z-index:2000000;vertical-align:middle;font-size:18px;height:500px;" role="dialog">
				<div id="dialogdrag" class="modal-dialog dialogdrag">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title">Add new Resource</h4>
							</div>
							<div class="modal-body container">
						<div class="col-md-12">
							<label class="col-md-4 control-label" for="ubody">Body</label>
							<div class="col-md-4">
								<input id="ubody" name="ubody" type="text" placeholder="Enter body" class="form-control input-md" required="">
							</div>
						</div>
						<!-- Text input-->
						<div class="col-md-12">
							<label class="col-md-4 control-label" for="utitle">Title</label>
							<div class="col-md-4">
								<input id="utitle" name="utitle" type="text" placeholder="Enter title" class="form-control input-md" required="">
							</div>
						</div>
								<div class="form-group input-group row">
									<div class="col-sm-offset-4 col-sm-12">
							<button type="button" style="" onclick="showjobs(1);" data-dismiss="modal" class="btn btn-default"><b>Cancel</b></button>
							<button type="submit" onclick="createResource();" data-dismiss="modal" class="btn btn-success theme-bgcolor"><b>Save</b></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</html>
