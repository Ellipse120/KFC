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
	public String login(String userName,String password,
			HttpServletRequest request) throws Exception {
		System.out.println(userName);
		System.out.println(password);
		User user = us.login(userName, password);
		if (user != null) {
			request.getSession().setAttribute("userName", userName);
			return "redirect:/common/left_main_cart.html";
		} else {
			return "redirect:/common/login.html";
		}
	}

	@RequestMapping("common/userRegist")
	public String regist(User user) {
		System.out.println(user.getUserName());
		int flag = us.regist(user);
		if (flag > 0) {
			return "redirect:/common/login.html";
		} else {
			return "redirect:/common/error.html";
		}
	}
}
