package com.mipha.api.mapper;

import java.util.List;

import com.mipha.api.dto.SearchRequest;
import com.mipha.api.entity.Employee;

public interface EmployeeMapper {
	
	Integer insert(Employee employee);
	
	void update(Employee employee);
	
	void delete(List<Integer> empIds);
	
	void reset();
	
	Integer getMaxId();
		
	Employee findByEmpId(Integer empId);
	
	Employee findByName(String empName);
	
	List<Employee> getAll();
	
	List<Employee> search(SearchRequest searchRequest);

}
