package com.mipha.api.dto;

import java.io.Serializable;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequest implements Serializable{
	
	private Long empId;
	private String empName;
	private Integer genderId;
	private Integer deptId;
	private String leftDate;
	private String rightDate;
	
	

}
