package com.mipha.api.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonResponse<E> implements Serializable {
	
	private Integer status;
	
	private String message;
	
	private E data;

	public JsonResponse() {
	}

	public JsonResponse(Integer status, String messgae) {
		this.status = status;
		this.message = messgae;
	}

	public JsonResponse(Integer status, E data) {
		this.status = status;
		this.data = data;
	}

	public JsonResponse(Integer status) {
		this.status = status;
	}
	
	public JsonResponse(Throwable error) {
		this.message = error.getMessage();
	}

}
