package com.kfc.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.kfc.dao.ItemDao;
import com.kfc.vo.Item;

@Repository("id")
public class ItemDaoImpl implements ItemDao{
	@PersistenceContext(name="unitName")
	private EntityManager em;
	@Override
	public int addItem(Item item) {
		em.persist(item);
		return item.getItemId();
	}

	@Override
	public int deleteItem(Item item) {
		em.persist(item);
		return item.getItemId();
	}

	@Override
	public Item queryItem(String itemName) {
		String jpql = "select i from Item i where i.itemName=:name";
		@SuppressWarnings("unchecked")
		List<Item> list = em.createQuery(jpql)
				.setParameter("id", itemName)
				.getResultList();
		if(list.isEmpty())
			return null;
		else
		return list.get(0);
		
	}

}
