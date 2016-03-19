package com.kfc.dao;

import com.kfc.vo.Order;
import com.kfc.vo.User;

public interface OrderDao {
	public int addOrder(Order order);
	public Order queryOrder(Integer orderId);
	public User queryPhoneNum(String uName);
}
