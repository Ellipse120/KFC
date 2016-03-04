package com.kfc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kfc.dao.UserDao;
import com.kfc.service.OrderService;
import com.kfc.service.UserService;
import com.kfc.vo.User;
@Service("si")
public class OrderServiceImpl implements OrderService {

	@Override
	public boolean orderIsValid(Boolean orderStatus) {
		return orderStatus;
	}

}

