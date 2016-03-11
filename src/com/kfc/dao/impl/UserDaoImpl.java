package com.kfc.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kfc.dao.UserDao;
import com.kfc.vo.User;

@Repository("ud")//bean的id
public class UserDaoImpl implements UserDao {
	@PersistenceContext(name="unitName")
	private EntityManager em;
	@Override
	public int addUser(User user) {
		em.persist(user);
		return user.getUserId();
	}

	@Override
	public User queryUser(String userName, String password) {
		String jpql = "select u from User u where u.userName=:name and u.password=:pwd";
		@SuppressWarnings("unchecked")
		List<User> list = em.createQuery(jpql)
				.setParameter("name", userName)
				.setParameter("pwd", password)
				.getResultList();
		if(list.isEmpty())
			return null;
		else
		return list.get(0);
	}

}
