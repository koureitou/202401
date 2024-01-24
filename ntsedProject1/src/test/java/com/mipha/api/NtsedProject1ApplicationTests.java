package com.mipha.api;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class NtsedProject1ApplicationTests {

	@Autowired
	private DataSource dataSource;
	
	@Test
	void contextLoads() {
	}
	
	@Test
	void getCon() throws SQLException {
		System.out.println(dataSource.getConnection());
	}

}
