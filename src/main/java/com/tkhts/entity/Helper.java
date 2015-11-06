package com.tkhts.entity;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

class Helper {
	static Logger logger = Logger.getLogger(Helper.class);
	static StringWriter stack = new StringWriter();

	static Question getInstance(int id, String text, String... choices) {

		Question question = new Question();
		try {
			question.setId(id);
			question.setText(text);
			Map<String, String> map = new HashMap<String, String>();
			int counter = 1;
			for (String choice : choices) {
				map.put("" + counter, choice);
				counter++;
			}
			question.setChoices(map);
			// Map<String,String> answers = new HashMap<String,String>();
			// question.setAnswers(answers);
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		return question;
	}

	public static void compare(Question userQuestion, Question actualQuestion) {
		try {
			Set<String> keySet = userQuestion.getAnswers().keySet();
			logger.debug("Number of selected answers" + keySet.size());
			float score = 0.0f;

			if (keySet.size() > 1) {
				userQuestion.setScore(score);
			}
			else{
				for (String key : keySet) {

					Float fraction = actualQuestion.getFractions().get(key);
					Boolean answer = userQuestion.getAnswers().get(key);

					logger.debug("Anse: " + answer);
					logger.debug("Fractions: " + fraction);
					score += fraction;
				}
				logger.debug("Final Score for question is " + score);
				userQuestion.setScore(score);
			}
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
	}

}
