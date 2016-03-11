package com.kfc.service;

import com.kfc.vo.User;

public interface UserService {
	public User login(User user);

	public int regist(User user);
}
