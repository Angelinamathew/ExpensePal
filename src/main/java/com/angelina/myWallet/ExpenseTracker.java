package com.angelina.myWallet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.angelina.myWallet.repository")
@EntityScan(basePackages = "com.angelina.myWallet.model")
public class ExpenseTracker {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTracker.class, args);
	}

}
