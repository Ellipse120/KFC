package com.kfc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kfc.service.OrderService;
import com.kfc.dao.OrderDao;
import com.kfc.vo.Order;
@Service("si")
public class OrderServiceImpl implements OrderService {
	@Autowired(required=true)
	private OrderDao odd;
	@Override
	public boolean orderIsValid(Boolean orderStatus) {
		return orderStatus;
	}
	@Override
	@Transactional
	public int createOrder(Order order) {
		
		return odd.addOrder(order);
	}

	@Override
	public Order showOrder(Integer orderId) {
		return odd.queryOrder(orderId);
	}
	@Override
	public String queryPhone(String uName) {
		return odd.queryPhoneNum(uName).getPhoneNum();
	}

}

