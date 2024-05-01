package com.my.kde_db.vo;

import jdk.jfr.DataAmount;
import lombok.Data;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;

@Data
public class User {
	private int number = 0;
	private String id = null;
	private String password = null;
	private String nickname = null;
	private String name = null;
	private Date birthday = null;
}
