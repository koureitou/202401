package com.mipha.api.advice;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.mipha.api.dto.JsonResponse;
import com.mipha.api.exception.CreateFaildException;
import com.mipha.api.exception.NameConflictException;
import com.mipha.api.exception.ServiceException;


@RestControllerAdvice
public class AppExceptionHandler {

	@ExceptionHandler(ServiceException.class)
	public JsonResponse<Void> handleServiceException(Throwable error){
		
		JsonResponse<Void> response = new JsonResponse<>(error);
		
		if(error instanceof CreateFaildException) {
			response.setStatus(-100);
			response.setMessage("ユーザー情報の作成は失敗しました。");
		}else if(error instanceof NameConflictException) {
			response.setStatus(-101);
			response.setMessage("名前は既に存在します。");
		}
		
		return response;
	}
}
