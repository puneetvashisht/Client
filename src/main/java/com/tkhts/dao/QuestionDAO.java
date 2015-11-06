package com.tkhts.dao;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.tkhts.entity.Question;

public class QuestionDAO {

	static Logger logger = Logger.getLogger(QuestionDAO.class);
	static StringWriter stack = new StringWriter();

	public static List<Question> getQuestions(boolean fractionFlag, String quizId) {

		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		ResultSet rs1 = null;
		PreparedStatement stmt1 = null;
		List<Question> questions = null;
		try {
			/*DataSource ds = DAOUtil.getDS();
			logger.debug("**************************** " + ds);
			con = ds.getConnection();*/
			
				con = DAOUtil.getCon();
			
			stmt = con.createStatement();

			questions = new ArrayList<Question>();
			rs = stmt.executeQuery("select mq.id, mq.questiontext from mdl_question mq where mq.id in (select questionid from mdl_quiz_slots mqs where mqs.quizid="+ quizId + ")");
			while (rs.next()) {
				Question question = new Question();
				int questionId = rs.getInt("mq.id");
				logger.debug("Question Id" + questionId);
				question.setId(questionId);
				question.setText(rs.getString("mq.questiontext"));

				stmt1 = con
						.prepareStatement("select mqa.answer, mqa.fraction from mdl_question_answers mqa where mqa.question = ? order by mqa.id");
				stmt1.setInt(1, questionId);
				rs1 = stmt1.executeQuery();
				Map<String, String> choiceMap = new LinkedHashMap<String, String>();
				Map<String, Float> fractionMap = new LinkedHashMap<String, Float>();
				int counter = 1;
				while (rs1.next()) {
					choiceMap.put("" + counter, rs1.getString("mqa.answer"));
					if (fractionFlag) {
						fractionMap.put("" + counter,
								rs1.getFloat("mqa.fraction"));
					}
					counter++;
				}

				if (choiceMap.size() != 0) {
					question.setChoices(choiceMap);
					if (fractionFlag) {
						question.setFractions(fractionMap);
					}

					question.setAnswers(new LinkedHashMap<String, Boolean>());
					questions.add(question);
				}
			}

		}
		catch (ClassNotFoundException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		catch (SQLException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		} finally {
			try {
				rs.close();
				stmt.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace(new PrintWriter(stack));
				logger.error("Caught exception in closing DB resources: " + stack.toString());
			}
		}
		return questions;
	}
}
