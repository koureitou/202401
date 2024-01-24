package com.mipha.api.service;

import java.util.List;

import com.mipha.api.entity.Code;

public interface ICodeService {

	List<Code> getByKBN(String codeKbn);
}
