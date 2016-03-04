package com.kfc.dao;

import com.kfc.vo.Item;

public interface ItemDao {
	public int addItem(Item item);
	public int deleteItem(Item item);
	public Item queryItem(String itemName);
}
