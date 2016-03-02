package com.kfc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kfc.dao.UserDao;
import com.kfc.service.UserService;
import com.kfc.vo.User;
@Service("sm")
public class UserServiceImpl implements UserService {
	@Autowired(required=true)
	private UserDao ud;

	@Override
	public User login(String userName, String password) {
		return ud.queryUser(userName, password);
	}

	@Override
	@Transactional
	public int regist(User user) {
		return ud.addUser(user);
	}

}
/*		
TxType.REQUIRED;		如果事务存在，做为事务的一部分执行；如果事务不存在，则开启新事务，并在方法返回后提交。
TxType.REQUIRES_NEW; 	如果事务存在，做为事务的一部分执行；如果事务不存在，则开启新事务，并挂起原先的事务，新事务结束后，原事务继续执行。
TxType.MANDATORY;		如果事务存在，做为事务的一部分执行；如果事务不存在，则抛出事务不存在异常
TxType.NEVER;			如果事务存在，抛出异常；如果事务不存在，则正常执行
TxType.NOT_SUPPORTED;	如果事务存在，则挂起事务，其做为事务外代码执行，返回后事务恢复
TxType.SUPPORTS;		如果事务存在，做为事务的一部分执行；如果事务不存在，则做为非事务代码执行
*/
