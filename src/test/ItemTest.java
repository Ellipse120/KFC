package test;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.kfc.controller.ItemMgrController;
import com.kfc.service.UserService;
import com.kfc.vo.User;

public class ItemTest {
	@BeforeClass
	public static void beforeClass(){
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
	}
	@Test
	public void testProducerItem(){
		
	}
	@Test
	public void testConsumerItem(){
		
	}
}
