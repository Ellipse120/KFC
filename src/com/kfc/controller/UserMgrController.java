package com.kfc.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.kfc.service.UserService;
import com.kfc.vo.User;

@Controller
public class UserMgrController {
	@Autowired(required=true)
	private UserService us;

	@RequestMapping("common/userLogin")
	public String login(User user,HttpServletRequest request) throws Exception {
	
		User u = us.login(user);
		if (u != null) {
			request.getSession().setAttribute("userName", user.getUserName());
			return "redirect:/common/left_main_cart.html";
		} else {
			return "redirect:/common/login.html";
		}
	}

	@RequestMapping("common/userRegist")
	public String regist(User user) {
		int flag=0;
		if(user.getUserName()!="" && user.getPassword()!="")
		flag = us.regist(user);
		System.out.println(flag);
		if (flag > 0) {
			return "redirect:/common/login.html";
		} else {
			return "redirect:/common/error.html";
		}
	}
}
