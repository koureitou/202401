package com.mipha.api.controller;



import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mipha.api.dto.JsonResponse;

import com.mipha.api.entity.Employee;
import com.mipha.api.service.IEmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/mipha/api/register")
@RequiredArgsConstructor
public class RegisterController {

	private final IEmployeeService employeeService;

	// /mipha/api/getAll
	@RequestMapping(value = "/add")
	public JsonResponse<Integer> getMaxEmpId() {
		return new JsonResponse<>(200, employeeService.getEmpMaxId());
	}

	@RequestMapping(value = "/update")
	public JsonResponse<Employee> getOneEmp(Integer empId) {
		return new JsonResponse<>(200, employeeService.findByEmpId(empId));
	}

	// /mipha/api/buildinfo/add
	@RequestMapping(value = "/add/buildinfo")
	public JsonResponse<Void> insertInfo(Employee employee) {
		employeeService.addEmployeeInfo(employee);
		return new JsonResponse<>(200, "成功");
	}

	// /mipha/api/buildinfo/add
	@RequestMapping(value = "/update/buildinfo")
	public JsonResponse<Void> updateInfo(Employee employee) {
		employeeService.updateEmployeeInfo(employee);
		return new JsonResponse<>(200, "成功");
	}

	

}
