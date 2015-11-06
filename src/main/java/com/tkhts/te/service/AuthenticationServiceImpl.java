package com.tkhts.te.service;


import java.io.PrintWriter;
import java.io.StringWriter;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

import com.tkhts.dao.JDBC;
import com.tkhts.dao.UserDAO;
import com.tkhts.entity.Quiz;
import com.tkhts.entity.QuizWrapper;
import com.tkhts.entity.User;
import com.tkhts.util.QuizWrapperUtility;

public class AuthenticationServiceImpl implements AuthenticationService{
	Logger logger = Logger.getLogger(this.getClass());
	StringWriter stack = new StringWriter();

	public Response authenticateUser(User user) {
		System.out.println(user);
		logger.debug("Something to log 1");
		logger.warn("Something to log 2 ");
		logger.error("Something to log 3");
		logger.fatal("Something to log 4");
		QuizWrapper quizWrapper = null;
		try {
			UserDAO.authenticateUser(user);
			
			
			// if user is valid than fill in quiz wrapper
			if (user.getAuthenticated()) {
				quizWrapper = QuizWrapperUtility.getquizWrapper(user);
			} else {
				user.setAuthenticated(false);
			}
		}
		catch (NoSuchAlgorithmException e){
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught SQLException : " + stack.toString());
		}
		catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}

		return Response.ok(user).build();
	}
	

}
