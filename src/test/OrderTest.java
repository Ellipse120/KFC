package test;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.kfc.controller.ItemMgrController;
import com.kfc.service.OrderService;
import com.kfc.service.UserService;
import com.kfc.vo.User;

public class OrderTest {
	private static OrderService os;
	@BeforeClass
	public static void beforeClass(){
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		os = (OrderService) context.getBean("si");
	}
	@Test
	public void testProducerItem(){
		boolean b = os.orderIsValid(true);
	}
	
}
