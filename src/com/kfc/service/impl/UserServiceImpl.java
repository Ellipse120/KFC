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
	public User login(User user) {
			return ud.queryUser(user);
	}

	@Override
	@Transactional
	public int regist(User user) {
			return ud.addUser(user);
	}

}
/*		
TxType.REQUIRED;		���������ڣ���Ϊ�����һ����ִ�У�������񲻴��ڣ����������񣬲��ڷ������غ��ύ��
TxType.REQUIRES_NEW; 	���������ڣ���Ϊ�����һ����ִ�У�������񲻴��ڣ����������񣬲�����ԭ�ȵ����������������ԭ�������ִ�С�
TxType.MANDATORY;		���������ڣ���Ϊ�����һ����ִ�У�������񲻴��ڣ����׳����񲻴����쳣
TxType.NEVER;			���������ڣ��׳��쳣��������񲻴��ڣ�������ִ��
TxType.NOT_SUPPORTED;	���������ڣ��������������Ϊ���������ִ�У����غ�����ָ�
TxType.SUPPORTS;		���������ڣ���Ϊ�����һ����ִ�У�������񲻴��ڣ�����Ϊ���������ִ��
*/
