package com.kfc.dao;

import com.kfc.vo.User;

public interface UserDao {
	public int addUser(User user);

	public User queryUser(User user);
}
