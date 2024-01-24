package com.mipha.api.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Employee implements Serializable{
	private Long empId;
	private String empName;
	private String password;
	private Integer genderId;
	private Integer departmentId;
	private String genderName;
	private String departmentName;
	private String startDate;
	private String email;
	private Integer delFlg;
	private String createUser;
	private String createDate;
	private String updateUser;
	private String updateDate;
}
