package com.kfc.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.servlet.http.HttpServletResponse;

import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.pool.PooledConnectionFactory;
import org.json.JSONObject;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kfc.vo.Item;
@Controller
public class ItemMgrController {

	@Resource(name="pooledConnectionFactory")
	private PooledConnectionFactory factory;
	@Resource(name="queueItem")
	private ActiveMQQueue queueItem;
	private Item it;
	List<Item> list = new ArrayList<Item>();
	
	@RequestMapping("/itemShow")
	@ResponseBody
	public Item showItem(HttpServletResponse request)throws Exception{
		Connection conn = factory.createConnection();
		conn.start();
		
		Session sen = conn.createSession(false, Session.CLIENT_ACKNOWLEDGE);
		MessageConsumer consumer = sen.createConsumer(queueItem);
		consumer.setMessageListener(new MessageListener() {

			@Override
			public void onMessage(Message msg) {

				TextMessage tm = (TextMessage) msg;
		
					try {
						String s = tm.getText();
						JSONObject json = new JSONObject(s);
						
						String itemName = (String) json.get("itemName");
						System.out.println(itemName);
					} catch (Exception e) {
						e.printStackTrace();
					}
					
			}
		});
		return it;

	}
	
	/*public static void main(String[] args) throws Exception {
		queryItem();
	}*/
	
}
