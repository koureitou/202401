package com.mipha.api.mapper;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mipha.api.entity.Employee;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeMapperTests {

	@Autowired
	private EmployeeMapper employeeMapper;

	// @Test
	public void insertTest() {
		Employee emp = new Employee();
		emp.setEmpName("ts33");
		emp.setPassword("testPWD");

		System.out.println(employeeMapper.insert(emp));

	}

	// @Test
	public void search() {
		Employee employee = employeeMapper.findByName("testUser2");
		System.out.println(employee);
	}

	@Test
	public void delete() {
		employeeMapper.delete(Arrays.asList(1,10000,10001));
		
	}

}
