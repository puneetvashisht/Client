package com.tkhts.dao;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.log4j.Logger;

public class QuizDAO {

	Logger logger = Logger.getLogger(this.getClass());
	StringWriter stack = new StringWriter();

	
/*
	public static Map<Integer, List<Quiz>> getQuizs(int userId) {

		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		List<Quiz> quizs = null;
		Map<Integer, List<Quiz>> quizMap = new HashMap<Integer, List<Quiz>>();
		try {
			DataSource ds = DAOUtil.getDS();
			System.out.println("**************************** " + ds);
			ResultSet rs1 = null;
			Statement stmt1 = null;
			con = ds.getConnection();
			stmt = con.createStatement();

			// selecting quiz id from the attempted table
			rs = stmt
					.executeQuery("select quiz from moodle.mdl_quiz_attempts where userid="
							+ userId);

			while (rs.next()) {

				int quizId = rs.getInt("quiz");

				try {

					stmt1 = con.createStatement();

					// selecting quiz name from the quiz id
					rs1 = stmt1
							.executeQuery("select name from moodle.mdl_quiz where id="
									+ quizId);
					Quiz quiz = null;
					while (rs1.next()) {
						quiz = new Quiz();
						quiz.setQuizId(quizId);
						quiz.setQuizName(rs1.getString("name"));
						quizs.add(quiz);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					try {
						rs1.close();
						stmt1.close();
					} catch (SQLException e) {
						System.out.println("Exception in closing DB resources");
					}
				}

			}
			quizMap.put(userId, quizs);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				rs.close();
				stmt.close();
				con.close();

			} catch (SQLException e) {
				System.out.println("Exception in closing DB resources");
			}

		}
		return quizMap;
	}

	
	*/
	
	public void checkDB() {
		try{

		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			/*DataSource ds = DAOUtil.getDS();
			logger.debug("**************************** " + ds);
			con = ds.getConnection();*/
			con = DAOUtil.getCon();
			pstmt = con.prepareStatement("SELECT * FROM moodle.mdl_user");

			// selecting quiz id from the attempted table
			rs = pstmt.executeQuery();
			
			while(rs.next()){
				logger.debug(rs.getString("username"));
			}
			
		}
		catch (ClassNotFoundException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		catch(Exception e){
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		finally{
			try {
				rs.close();
				pstmt.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace(new PrintWriter(stack));
				logger.error("Caught exception : " + stack.toString());
			}
		}
			
		}catch(Exception e){
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
	}

/*	
	public static void main(String[] args) {
		QuizDAO dao = new QuizDAO();
		Map<Integer, List<Quiz>> quizMap = dao.getQuizs(2);
		for (Integer quizKey : quizMap.keySet()) {
			System.out.println(quizKey + "is id and " + quizMap.get(quizKey)
					+ "is question");
		}
	
		
		QuizDAO dao  = new QuizDAO();
		dao.checkDB();
		}
*/	
	
}
