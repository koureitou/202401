package com.mipha.api.mapper;

import java.util.List;

import com.mipha.api.entity.Code;

public interface CodeMapper {

	List<Code> getByKBN(String codeKbn);
}
