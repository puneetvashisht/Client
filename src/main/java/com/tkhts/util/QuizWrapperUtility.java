package com.tkhts.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import org.apache.log4j.Logger;

import com.tkhts.dao.JDBC;
import com.tkhts.entity.Quiz;
import com.tkhts.entity.QuizWrapper;
import com.tkhts.entity.User;

public class QuizWrapperUtility {
	static Logger logger = Logger.getLogger(QuizWrapperUtility.class);
	static StringWriter stack = new StringWriter();

	public static QuizWrapper getquizWrapper(User user){
		final String USER_ID = user.getId();
		user.setId(null);
		
		
		logger.debug("+++++");
		logger.debug(USER_ID);
		
		QuizWrapper quizWrapper = new QuizWrapper();
		quizWrapper.setUser(user);

		user.setPassword(null);
		List<Quiz> quizs = null;
		try {
			quizs = JDBC.getQuizs(USER_ID);
		} catch (ClassNotFoundException e) {
			logger.error(e);
			// e.printStackTrace();
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		if (quizs != null) {
			quizWrapper.setQuizs(quizs);
		}
		// logger.debug(USER_ID + " is id and " + quizs.get(USER_ID) +
		// "is question");
		logger.debug("Quiz Wrapper is : " + quizWrapper);

/*				String json = new Gson().toJson(quizWrapper);
//		QuizWrapper wrapper = new Gson().fromJson(json, QuizWrapper.class);
//		logger.debug("Back to Object : " + wrapper);
		logger.debug("Back to Client : " + json);
		response.getWriter().println(json);*/
		
		return quizWrapper;
	}
}
