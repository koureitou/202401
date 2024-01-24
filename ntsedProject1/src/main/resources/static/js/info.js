
import { showSelectOption } from "./common.js";





$(document).ready(async function() {

	try {
		let empList = await getEmpList();
		console.log(empList);
		let defaultOption = "<option value='100'>-- ALL --</option>";

		showSelectOption("A01", "genderList");
		showSelectOption("A02", "deptList");

		$("#genderList").append(defaultOption);
		$("#deptList").append(defaultOption);


		tablePagination(empList);


		$("#deleteButton").click(function() {
			deleteEmp();
		});

		$("#searchButton").click(async function() {
			let searchedEmpList = await getEmpList();
			tablePagination(searchedEmpList);
		});

		$("#addButton").click(function() {
			toRighster('add');
		});
		$("#resetButton").click(function() {
			resetTable();
		});

	} catch (error) {
		alert(error.message);
	}
});

function toRighster(state, id = undefined) {
	let mode = sessionStorage.getItem('mode');
	let empid = sessionStorage.getItem('empId');

	if (mode != null) sessionStorage.removeItem('mode');
	if (empid != null) sessionStorage.removeItem('empId');

	sessionStorage.setItem('mode', state);
	if (id !== undefined) sessionStorage.setItem('empId', id);

	window.location.href = "/view/register.html";

}

async function getEmpList() {

	try {
		const response = await $.ajax({
			type: "GET",
			url: "/mipha/api/info/search",
			data: $("#form-info").serialize(),
			dataType: "JSON",
		});

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("error: " + response.status);
		}
	} catch (error) {
		throw new Error("失敗： " + error.status);
	}

}


function deleteEmp() {
	var empIdList = [];
	$(":checkbox:checked").each(function(i) {

		//parseInt:　バックエンド側はList<Integer>で受取るため、10進数のInteger型に変換
		empIdList[i] = parseInt($(this).val(), 10);

	})
	if (empIdList.length == 0) {
		alert("社員情報を選択してください。")
	} else {
		if (confirm("選択した状態を削除してもいいですか")) {
			$.ajax({
				type: "POST",
				url: "/mipha/api/info/delete",
				data: JSON.stringify(empIdList),
				contentType: "application/json",
				dataType: "JSON",
				success: function(json) {
					if (json.status == 200) {
						alert(json.message);
						location.reload();
					} else {
						alert("削除失敗");
					}
				},
				error: function(xhr) {
					alert("失敗" + xhr.status);
				}
			});
		}
		else {
			return false;
		}
	}
}

function tablePagination(dataList) {
	var currentIndex = 1;
	var rowSize = 7;
	var maxIndex = Math.floor(dataList.length / rowSize);
	if ((dataList.length % rowSize) > 0) maxIndex++;

	$("#indexButtons button").remove();
	$("#indexButtons").append('<button type="button" id="prevBtn"><<</button>');

	for (var i = 1; i <= maxIndex; i++) {
		$("#indexButtons").append(`<button type="button" index=${i}>${i}</button>`);
	}

	$("#indexButtons").append('<button type="button" id="nextBtn">>></button>');

	$("#nextBtn").click(function() {
		if (currentIndex < maxIndex) {
			currentIndex++;
			setActiveButton(dataList, currentIndex, rowSize);
		}
	});

	$("#prevBtn").click(function() {
		if (currentIndex > 1) {
			currentIndex--;
			setActiveButton(dataList, currentIndex, rowSize);
		}
	});

	$("#indexButtons").on('click', '[index]', function() {
		// クリックされたボタンの親要素（ボックス）のindexを取得
		currentIndex = $(this).index();
		setActiveButton(dataList, currentIndex, rowSize);

		// インデックスをコンソールに出力
		console.log('Box Index:', currentIndex);
	});

	setActiveButton(dataList, currentIndex, rowSize);

}



function setActiveButton(dataList, currentIndex, rowSize) {

	var startIndex = ((currentIndex - 1) * rowSize) + 1;
	var endIndex = (startIndex + rowSize) - 1;
	if (endIndex > dataList.length) endIndex = dataList.length;

	$("#indexButtons button").removeAttr("id");
	$(`#indexButtons button[index=${currentIndex}]`).attr("id", "active");
	console.log(startIndex);
	displayTable(dataList, startIndex, endIndex);

}

function displayTable(empList, startIndex, endIndex) {
	$("#info-list").empty();
	let start = startIndex - 1;
	let end = endIndex;

	for (let i = start; i < end; i++) {

		let tr = "<tr>"
			+ `<td><input type='checkbox' id='check' value='${empList[i].empId}'/></td>`
			+ `<td><a href='#' class='empLink' data-id='${empList[i].empId}'>${empList[i].empId}</a></td>`
			+ `<td>${empList[i].empName}</td>`
			+ `<td>${empList[i].genderName}</td>`
			+ `<td>${empList[i].departmentName}</td>`
			+ `<td>${empList[i].startDate}</td>`
			+ `<td>${empList[i].email}</td>`
			+ "</tr>";

		$("#info-list").append(tr);

		$(`.empLink[data-id='${empList[i].empId}']`).on('click', function() {
			//console.log(empList[i].empId)
			toRighster('update', empList[i].empId);
		});
	}

}

function resetTable() {
	$.ajax({
		type: "GET",
		url: "/mipha/api/info/reset",
		dataType: "JSON",
		success: function(json) {
			if (json.status == 200) {
				alert(json.message);
				location.reload();
			} else {
				alert("失敗");
			}
		},
		error: function(xhr) {
			alert("失敗" + xhr.status);
		}
	});
}

