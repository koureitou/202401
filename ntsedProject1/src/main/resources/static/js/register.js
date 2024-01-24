

import * as common from "./common.js";

$(document).ready(function() {

	let mode = sessionStorage.getItem('mode');
	let empId = sessionStorage.getItem('empId');

	let defaultOption = "<option value='-100'>---未選択---</option>";

	common.showSelectOption("A02", "deptList");
	$("#deptList").append(defaultOption);

	//初期表示処理
	init(mode, empId);

	singleCheck();

	$("#registBtn").click(function() {
		
		if(finalCheck()) buidEmpInfo(mode);


	});

	$("#goBackBtn").click(function() {
		window.location.href = "/view/info.html";

	});


});

function init(mode, id) {
	$.ajax({
		type: "GET",
		url: `/mipha/api/register/${mode}`,
		data: `empId=${id}`,
		dataType: "JSON",
		success: function(json) {
			if (json.status == 200) {

				if (mode == 'add') {
					$("#empId").val(json.data); //自動採番ID 社員情報テーブル MAX(empId)+1
					$("#genderM").prop("checked", true);
					$("#registBtn").val("登録");
				}

				if (mode == 'update') {
					let emp = json.data;
					$("#empId").val(emp.empId);
					$("#empName").val(emp.empName);
					$("#startDate").val(emp.startDate);
					$("#email").val(emp.email);
					$("#deptList").val(emp.departmentId);
					if (emp.genderId == 0) $("#genderM").prop("checked", true);
					if (emp.genderId == 1) $("#genderW").prop("checked", true);
					$("#registBtn").val("更新");
				}
			}
		},
		error: function(xhr) {
			alert("失敗" + xhr.status);
		}
	});
}

function buidEmpInfo(mode) {

	$.ajax({
		type: "POST",
		url: `/mipha/api/register/${mode}/buildinfo`,
		data: $("#form-register").serialize(),
		dataType: "JSON",
		success: function(json) {
			if (json.status == 200) {
				alert("成功");

				setTimeout(function() {
					window.location.href = "/view/info.html";
				}, 500);

			} else if (json.status == -101) {
				alert(json.message);
			}
		},
		error: function(xhr) {
			alert("失敗" + xhr.status);

		}
	});

}

function finalCheck(){
	return(
		checkEmpName()&&
		checkStartDate()&&
		checkEmail()&&
		checkDept()
	);
}

function singleCheck(){
	
	$("#empName").blur(function() {
		checkEmpName();
	});

	$("#startDate").blur(function() {
		checkStartDate();
	});

	$("#email").blur(function() {
		checkEmail();
	});

	$("#deptList").blur(function() {
		checkDept();
	});
	
}

function checkEmpName() {
	return (
		common.blankCheck("empName", "名前", "empNameError") &&
		common.maxLengthCheck("empName", "名前", "empNameError", 20)
	);
}

function checkStartDate() {
	return (
		common.blankCheck("startDate", "入社年月日", "dateError") &&
		common.dateCheck("startDate", "入社年月日", "dateError", "2000-01-01", "2024-12-31")
	);
}

function checkEmail() {
	if ($("#email").val().trim() !== "") {
		return (
			common.emailFormatCheck("email", "emailError") &&
			common.maxLengthCheck("email", "メールアドレス", "emailError", 20)
		);
	} else{
		$("#emailError").text("");
		return true;
	}

}

function checkDept() {
	if ($("#deptList").val() == -100) {
		$("#deptError").text("選択してください");
		return false;
	} else {
		$("#deptError").text("");
		return true;
	}

}

