package com.kfc.controller;

import javax.annotation.Resource;
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.pool.PooledConnectionFactory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kfc.service.OrderService;
import com.kfc.vo.Order;
import com.kfc.vo.User;
@Controller
public class OrderMgrController {
	
	@Autowired(required=true)
	private OrderService os;
	@Resource(name="pooledConnectionFactory")
	private PooledConnectionFactory factory;
	@Resource(name="queueOrder")
	private ActiveMQQueue queueOrder;
	
	@RequestMapping("/common/orderSubmit")
	@ResponseBody
	public void orderSubmit(String orderNum,String orderInfo,String settle,
			String orderId,String amount,String address,String uName)throws Exception{
		Connection conn = factory.createConnection();
		conn.start();
		
		Session sen = conn.createSession(false, Session.CLIENT_ACKNOWLEDGE);
		MessageProducer producer = sen.createProducer(queueOrder);
		Boolean flag = os.orderIsValid(true);
		if(flag==true){
			//System.out.println(uName);
			System.out.println(orderNum);
			User user = new User();
			user.setUserName(uName);
			Order order = new Order();
			order.setOrderNum(orderNum);
			order.setOrderInfo(orderInfo);
			order.setAmount(Integer.parseInt(amount));
			order.setSettle(Double.parseDouble(settle));
			order.setAddress(address);
			order.setOrderStatus(true);
			order.setUser(user);
			os.createOrder(order);
			
			JSONObject json = new JSONObject();
			json.put("orderNum", orderNum);
			json.put("orderInfo",orderInfo);
			json.put("amount", amount);
			json.put("settle",settle);
			json.put("orderStatus",true);
			json.put("address", address);
			json.put("uName", uName);
			System.out.println(json.toString());
			TextMessage msg = sen.createTextMessage(json.toString());
			producer.send(msg);
			//System.out.println("clikck......"+msg);
		}
		
		producer.close();
		sen.close();
		conn.close();
			

	}
	
}
