package com.besyeasy.cmoa.test;


import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import com.besteasy.cmoa.entity.File;
import com.besteasy.cmoa.file.service.FileService;
@Controller
public class TestDataSource {
	/*private static ApplicationContext ioc = null;
	@Before
	public static ApplicationContext getIoc(){
		if(ioc == null){
			ioc = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		}
		return ioc;
	}*/
	private  ApplicationContext ioc = null;
	{
		ioc = new ClassPathXmlApplicationContext("applicationContext.xml");
	}
	@Test
	public void testDataSource() throws SQLException{
		DataSource dataSource = ioc.getBean(DataSource.class);
		Connection conn = dataSource.getConnection();
		System.out.println(conn);
	}
	@Test
	public void test01() {
		
		FileService fileService = ioc.getBean(FileService.class);
		
		List<File> fileList = fileService.getFileList();
		
		for (File file : fileList) {
			System.out.println(file);
		}
	}
	
	@Test
	public void test02(){
		FileService fileService = ioc.getBean(FileService.class);
	}
	
	@Test
	public void test03(){
		FileService fileService = ioc.getBean(FileService.class);
		List<File>  params  = new ArrayList<File>();
		params.add(new File(null,"文件1","地址1"));
		params.add(new File(null,"文件2","地址2"));
		params.add(new File(null,"文件3","地址3"));
		params.add(new File(null,"文件4","地址4"));
		
		fileService.batchInsertFile(params);
		
	}
	
}
