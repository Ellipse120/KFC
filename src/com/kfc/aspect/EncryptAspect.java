package com.kfc.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.kfc.util.MD5Util;
import com.kfc.vo.User;
@Aspect
@Component
public class EncryptAspect {
	private final String regMd = "execution(* com.kfc.service.UserService.regist(..))";
	private final String logMd = "execution(* com.kfc.service.UserService.login(..))";
	@Around(regMd)
	public Object encryptRegist(ProceedingJoinPoint point) {
		Object o = null;
		User user = (User) point.getArgs()[0];
		String mdReg = MD5Util.GetMD5Code(user.getPassword());
		user.setPassword(mdReg);
		try {
			o = point.proceed();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return o;
	}
	@Around(logMd)
	public Object encryptLogin(ProceedingJoinPoint point) {
		Object o = null;
		String logPsd = (String) point.getArgs()[1];
		String mdLog = MD5Util.GetMD5Code(logPsd);

		try {
			o = point.proceed(new Object[] {point.getArgs()[0], mdLog});
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return o;
	}
}
