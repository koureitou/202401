package com.mipha.api.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mipha.api.entity.Code;
import com.mipha.api.mapper.CodeMapper;
import com.mipha.api.service.ICodeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CodeServiceImpl implements ICodeService{
	
	private final CodeMapper codeMapper;

	@Override
	public List<Code> getByKBN(String codeKbn) {
		
		return codeMapper.getByKBN(codeKbn);
	}

}
