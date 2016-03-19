package com.kfc.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.kfc.dao.OrderDao;
import com.kfc.vo.Order;
import com.kfc.vo.User;

@Repository("od")
public class OrderDaoImpl implements OrderDao{
	@PersistenceContext(name="unitName")
	private EntityManager em;
	
	@Override
	public int addOrder(Order order) {
		em.persist(order);
		return order.getOrderId();
	}

	@Override
	public Order queryOrder(Integer orderId) {
		String jpql = "select o from Order o where o.orderId=:id";
		@SuppressWarnings("unchecked")
		List<Order> list = em.createQuery(jpql)
				.setParameter("id", orderId)
				.getResultList();
		if(list.isEmpty())
			return null;
		else
		return list.get(0);
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public User queryPhoneNum(String uName) {
		String jpql = "select u from User u where u.userName=:name";
		List<User> list = em.createQuery(jpql)
				.setParameter("name", uName)
				.getResultList();
		if(list.isEmpty())
			return null;
		else
		return list.get(0);
		
	}
	
}
