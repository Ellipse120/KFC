package com.kfc.dao;

import com.kfc.vo.Order;

public interface OrderDao {
	public int addOrder(Order order);
	public Order queryOrder(Integer orderId);
}
