package com.kfc.dao;

import com.kfc.vo.Item;

public interface ItemDao {
	public int addItem(Item item);
	public int deleteItem(Integer id);
	public void queryItem(String itemName);
}
