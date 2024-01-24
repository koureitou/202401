package com.mipha.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mipha.api.dto.JsonResponse;
import com.mipha.api.entity.Code;

import com.mipha.api.service.ICodeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/code")
@RequiredArgsConstructor
public class CodeController {
	
	private final ICodeService codeService;
	
	@RequestMapping({"/",""})
	public JsonResponse<List<Code>> getCodeList(String codeKbn) {
		List<Code> genderList = codeService.getByKBN(codeKbn);
		return new JsonResponse<>(200, genderList);
	}

}
