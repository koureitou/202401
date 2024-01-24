package com.mipha.api.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Code implements Serializable{
	
	private String codeKbn;
	private Integer codeId;
	private String codeName;
	private Integer delFlg;
	private String createUser;
	private String createDate;
	private String updateUser;
	private String updateDate;

}
