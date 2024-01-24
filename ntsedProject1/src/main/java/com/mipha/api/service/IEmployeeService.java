package com.mipha.api.service;

import java.util.List;

import com.mipha.api.dto.SearchRequest;
import com.mipha.api.entity.Employee;

public interface IEmployeeService {

	void addEmployeeInfo(Employee employee);
	
	void updateEmployeeInfo(Employee employee);
	
	void deleteEmployeeByIdList(List<Integer> empIds);
	
	void resetData();
	
	Integer getEmpMaxId();
	
	Employee findByEmpId(Integer empId);
	
	List<Employee> getAllEmployee();
	
	List<Employee> getSearchList(SearchRequest searchRequest);
}
