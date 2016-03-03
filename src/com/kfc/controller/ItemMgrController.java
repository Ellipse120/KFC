package com.kfc.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.json.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;

@Controller
public class ItemMgrController {
	
	public void queryItem()throws Exception{
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		ConnectionFactory factory = (ConnectionFactory) context.getBean("targetConnectionFactory");
		Connection conn = factory.createConnection();
		conn.start();
		
		Destination queue = (Destination) context.getBean("queueDestination");
		Session sen = conn.createSession(false, Session.CLIENT_ACKNOWLEDGE);
		MessageConsumer consumer = sen.createConsumer(queue);
		consumer.setMessageListener(new MessageListener() {

			@Override
			public void onMessage(Message arg0) {

				TextMessage msg = (TextMessage) arg0;
				try {
					String s = msg.getText();
					//JSONObject json = new JSONObject(s);
					//System.out.println(json.get("ip"));
					msg.acknowledge();
					// for testing write log
					FileWriter fw = null;
					File f = new File("consumer.log");

					try {
						if (!f.exists()) {
							f.createNewFile();
						}
						fw = new FileWriter(f,true);
						BufferedWriter out = new BufferedWriter(fw);
						out.write("\r\n" + s, 0, s.length() - 1);
						out.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
					System.out.println("end");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});

	}
	
}
