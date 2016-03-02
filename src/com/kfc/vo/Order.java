package com.kfc.vo;

public class Order {
	private Integer orderId;
	private String orderName;
	private Double settlement;
	private User user;
	private Item item;
	
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public String getOrderName() {
		return orderName;
	}
	public void setOrderName(String orderName) {
		this.orderName = orderName;
	}
	public Double getSettlement() {
		return settlement;
	}
	public void setSettlement(Double settlement) {
		this.settlement = settlement;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
	
	
}
