package com.kfc.controller;

import java.util.Date;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kfc.service.OrderService;
import com.kfc.service.UserService;
import com.kfc.vo.Order;
@Controller
public class OrderMgrController {
	
	@Autowired(required=true)
	private OrderService os;
	
	@RequestMapping("/common/orderSubmit")
	@ResponseBody
	public void orderSubmit(String orderNum,String orderName,String settle,
			String orderId,String amount,String address)throws Exception{
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		ConnectionFactory factory = (ConnectionFactory) context.getBean("targetConnectionFactory");
		Connection conn = factory.createConnection();
		conn.start();
		
		Destination queue = (Destination) context.getBean("queueOrder");
		Session sen = conn.createSession(false, Session.CLIENT_ACKNOWLEDGE);
		MessageProducer producer = sen.createProducer(queue);
		Boolean flag = os.orderIsValid(true);
		if(flag==true){
			JSONObject json = new JSONObject();
			json.put("orderNum", orderNum);
			//json.put("orderInfo",orderInfo);
			json.put("amount", amount);
			json.put("settle",settle);
			json.put("orderStatus",true);
			/*json.put("timestamp", new Date());
			json.put("itemName", "Õ¨¼¦³á");
			json.put("unitPrice", "5");
			json.put("amount", "20");*/
			TextMessage msg = sen.createTextMessage(json.toString());
			producer.send(msg);
			System.out.println("clikck......"+msg);
		}
		
		producer.close();
		sen.close();
		conn.close();
			

	}
	
	/*@RequestMapping("/common/orderSubmit")
	@ResponseBody
	public Order test3(String num,String name,String price,
			String id,String count,String address){
		System.out.println("clikck......"+num+","+name);
		
		//Order s = new Order();
		//s.setId(100);
		//s.setXh("123");
		//s.setUname("John");
		
		return null;
	}*/

	
	
}
