package com.kfc.service;

import com.kfc.vo.User;

public interface UserService {
	public User login(String userName, String password);

	public int regist(User user);
}
