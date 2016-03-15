package com.kfc.controller;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kfc.vo.Item;
@Controller
public class ItemMgrController {
	@RequestMapping("/itemShow")
	public void showItem(Item item,
			HttpServletResponse response)throws Exception{
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		ConnectionFactory factory = (ConnectionFactory) context.getBean("pooledConnectionFactory");
		Connection conn = factory.createConnection();
		conn.start();
		
		Destination queue = (Destination) context.getBean("queueItem");
		Session sen = conn.createSession(false, Session.CLIENT_ACKNOWLEDGE);
		MessageConsumer consumer = sen.createConsumer(queue);
		consumer.setMessageListener(new MessageListener() {

			@Override
			public void onMessage(Message msg) {

				TextMessage tm = (TextMessage) msg;
		
					try {
						String s = tm.getText();
						JSONObject json = new JSONObject(s);
						response.getWriter().print(json.toString());
						//Double unitPrice = (Double) json.get("unitPrice");
						//int amount = (int) json.get("amount");
						String itemName = (String) json.get("itemName");
						System.out.println(itemName);
					} catch (Exception e) {
						e.printStackTrace();
					}
					
			}
		});

	}
	
	/*public static void main(String[] args) throws Exception {
		queryItem();
	}*/
	
}
