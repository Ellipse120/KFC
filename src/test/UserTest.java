package test;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.kfc.service.UserService;
import com.kfc.vo.Address;
import com.kfc.vo.User;

public class UserTest {
	private static UserService us;
	@BeforeClass
	public static void beforeClass(){
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		us = (UserService) context.getBean("sm");
	}
	@Test
	public void testQueryUser(){
		User u = us.login("Lucy", "124");
		Assert.assertTrue(u!=null);
	}
	@Test
	public void testAddUser(){
		User user = new User();
		//Address addr = new Address();
		//addr.setCity("Shanghai");
		//addr.setStreet("yangpudonglu");
		//addr.setUnit("1L1");
		
		user.setUserName("Lucy");
		user.setPassword("124");
		user.setPhoneNum("15922565456");
		user.setAddress("Shanghai");
		//user.setAddr(addr);
		us.regist(user);
	}
}
