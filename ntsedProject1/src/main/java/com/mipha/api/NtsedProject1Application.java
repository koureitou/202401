package com.mipha.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.mipha.api.mapper")
public class NtsedProject1Application {

	public static void main(String[] args) {
		SpringApplication.run(NtsedProject1Application.class, args);
	
	}

}
