package com.kfc.service;

import com.kfc.vo.Order;

public interface OrderService {
	public boolean orderIsValid(Boolean orderStatus);
	public int createOrder(Order order);
	public Order showOrder(Integer orderId);
}
