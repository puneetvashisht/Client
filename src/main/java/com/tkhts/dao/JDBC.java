package com.tkhts.dao;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

import com.tkhts.entity.Question;
import com.tkhts.entity.FeedbackDTO;
import com.tkhts.entity.Quiz;
import com.tkhts.entity.User;
import com.tkhts.util.CryptUtil;

public class JDBC {
	static Logger logger = Logger.getLogger(JDBC.class);
	static StringWriter stack = new StringWriter();

	public static List<Quiz> getQuizs(String userId) throws ClassNotFoundException {
		logger.debug("userId in jdbc is : " + userId);
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		List<Quiz> quizs = new ArrayList<Quiz>();
		try {
			try {
				ResultSet rs1 = null;
				Statement stmt1 = null;
				// con = JDBC.getConnection();
/*				
				DataSource ds = DAOUtil.getDS();
				logger.debug("**************************** " + ds);
				con = ds.getConnection();
*/				
				con = DAOUtil.getCon();
				stmt = con.createStatement();

				// selecting quiz id from the attempted table
				rs = stmt
						.executeQuery("select quiz from mdl_quiz_attempts where userid="
								+ userId + " and attempt>0");
				logger.debug(rs);

				while (rs.next()) {
					int quizId = rs.getInt("quiz");
					try {
						stmt1 = con.createStatement();
						// selecting quiz name from the quiz id
						rs1 = stmt1
								.executeQuery("select name, timelimit, preferredbehaviour from mdl_quiz where id="
										+ quizId);
						Quiz quiz = null;
						while (rs1.next()) {
							quiz = new Quiz();
							quiz.setQuizId(quizId);
							quiz.setQuizName(rs1.getString("name"));
							quiz.setTl(rs1.getInt("timelimit"));
							quiz.setPrefferedBehaviour(rs1.getString("preferredbehaviour"));
							logger.debug(quiz);
							quizs.add(quiz);
						}
					} catch (SQLException e) {
						e.printStackTrace(new PrintWriter(stack));
						logger.error("Caught exception : " + stack.toString());
					} finally {
						try {
							rs1.close();
							stmt1.close();
						} catch (SQLException e) {
							e.printStackTrace(new PrintWriter(stack));
							logger.error("Caught exception in closing DB resources : "
									+ stack.toString());
						}
					}

				}
				// quizMap.put(userId, quizs);
			} catch (SQLException e) {
				e.printStackTrace(new PrintWriter(stack));
				logger.error("Caught exception : " + stack.toString());
			} finally {
				try {
					if (rs != null) {
						rs.close();
					}
					if (stmt != null) {
						stmt.close();
					}
					if (con != null) {
						con.close();
					}

				} catch (SQLException e) {
					e.printStackTrace(new PrintWriter(stack));
					logger.error("Caught exception : " + stack.toString());
				}
			}

		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		return quizs;
	}

	public static int addFeedback(FeedbackDTO feedbackDTO)
			throws ClassNotFoundException, SQLException {
		Connection con = null;
		PreparedStatement pstmt = null;
		int result = 0;
		try {
			/*DataSource ds = DAOUtil.getDS();
			con = ds.getConnection();*/
			con = DAOUtil.getCon();

			// con = JDBC.getConnection();
			pstmt = con
					.prepareStatement("INSERT INTO mdl_user_feedback (`NAME`, `EMAIL` , `CONTACT` , `EXPERIENCE` , `FEEDBACK`, `RATE`) VALUES (?, ?, ?, ?, ?, ?)");
			pstmt.setString(1, feedbackDTO.getName());
			pstmt.setString(2, feedbackDTO.getEmail());
			pstmt.setString(3, feedbackDTO.getContact());
			pstmt.setString(4, feedbackDTO.getExperience());
			pstmt.setString(5, feedbackDTO.getfeedback());
			pstmt.setString(6, feedbackDTO.getRate());
			result = pstmt.executeUpdate();
		} finally {
			/*
			 pstmt.close(); con.close();
			 */
		}
		return result;
	}

	public static boolean decrementAttemptCount(String quizId, String kht) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean isReduced = false;

		try {
//			con = JDBC.getConnection();

			/*DataSource ds = DAOUtil.getDS(); 
			con = ds.getConnection();*/
			con = DAOUtil.getCon();

			logger.debug(quizId);
			logger.debug(kht);
			kht = CryptUtil.decrypt(kht);
			logger.debug(kht);

			pstmt = con
					.prepareStatement("select attempt, id from mdl_quiz_attempts where quiz=? and userid=?");
			pstmt.setString(1, quizId);
			pstmt.setString(2, kht);

			rs = pstmt.executeQuery();

			/*
			 * logger.debug(rs.next()); rs.previous();
			 */

			while (rs.next()) {
				int attempt = rs.getInt("attempt");
				
				logger.debug("attempt no is " + attempt);
				

				if (attempt > 0) {
					
					/*				pstmt = con.prepareStatement("UPDATE mdl_quiz_attempts SET attempt = ? WHERE userid = ? and quiz = ?");
					pstmt.setInt(1, (attempt-1));
					pstmt.setString(2, quizId);
					pstmt.setString(3, kht);
	*/
					/*
					pstmt.setInt(2, Integer.parseInt(quizId));
					pstmt.setInt(3, Integer.parseInt(kht));
	*/				

					int attemptId = rs.getInt("id");
					logger.debug("attempt id is " + attemptId);
					
					pstmt = con
							.prepareStatement("UPDATE mdl_quiz_attempts SET attempt = ? WHERE id = ?");
					pstmt.setInt(1, (attempt - 1));
					pstmt.setInt(2, attemptId);

					int count = pstmt.executeUpdate();
					logger.debug("quizId is " + quizId);
					logger.debug("kht is " + kht);
					logger.debug("count " + count);
					if (count > 0) {
						isReduced = true;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception in decreasing count : "
					+ stack.toString());
		}
		return isReduced;
	}

	/*
	public static Connection getConnection() throws ClassNotFoundException,
			SQLException {
		Connection con = null;

		try {
			Class.forName("com.mysql.jdbc.Driver");

			con = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/moodle", "root", "root");

			if (con != null) {
				logger.debug("connection created");
			}
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		return con;
	}
*/
	
	public static boolean uploadScore(String userId, String quizid, float score, List<Question> responseList) throws ClassNotFoundException, SQLException{
		long time = System.currentTimeMillis();
		boolean isUploaded = false;
		Connection con = null;
		PreparedStatement pstmt = null;
		int count = 0;
			con = DAOUtil.getCon();
			pstmt = con.prepareStatement("INSERT INTO mdl_quiz_grades (quiz, userid, grade, timemodified, result) VALUES (?,?,?,?,?)");
			pstmt.setString(1, quizid);
			pstmt.setString(2, userId);
			pstmt.setFloat(3, score);
			pstmt.setLong(4, time);
			pstmt.setString(5, responseList.toString());
			
			logger.debug(time);
			SimpleDateFormat sdf = new SimpleDateFormat("MMM dd,yyyy HH:mm:ss");

	        Date resultdate = new Date(time);
	        logger.debug(sdf.format(resultdate));
			

			count = pstmt.executeUpdate();
			if(count>0){
				isUploaded = true;
			}
		logger.debug("User id is : "+userId);
		logger.debug("Quiz id is : "+quizid);
		logger.debug("final score is : "+score);
		logger.debug("final result is : "+responseList);
		
		return isUploaded;
	}
	
	
	public static User getUser(String email){
		User user = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		
		try {
			con = DAOUtil.getCon();
			user = new User();
			
//			pstmt = con.prepareStatement("select username, password from moodle.mdl_user where email = ?");
			pstmt = con.prepareStatement("select username, password, id, isSocialUser from mdl_user where email = ?");
//			pstmt.setString(1, "root@localhost");
			logger.debug("email is "+email);
			pstmt.setString(1, email);
			rs = pstmt.executeQuery();
			
			while(rs.next()){
				user.setUserName(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setIsSocialUser(rs.getString("isSocialUser"));
				user.setKht(CryptUtil.encrypt(rs.getString("id")));
				user.setEmail(email);
				user.setAuthenticated(true);
				
				logger.debug("username is  : "+user.getUserName());
				logger.debug("password is  : "+user.getPassword());
				logger.debug("authenticated is  : "+user.getAuthenticated());
				logger.debug("Uesr is  : "+user);
			}

		} catch (ClassNotFoundException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		} catch (SQLException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}

		
		return user;
	}

	public static boolean changePassword(User user) {
		boolean isPwdChanged = false;
		Connection con = null;
		PreparedStatement pstmt = null;
		int count = 0;
		
		logger.debug("in jdbc.changePassword");
		
		try {
			user.setId(CryptUtil.decrypt(user.getKht()));
			logger.debug(user);
			
			con = DAOUtil.getCon();
			//UPDATE `moodle`.`mdl_user` SET email = 'root@localhost' WHERE email = 'root@localhost.com'
//			pstmt = con.prepareStatement("update moodle.mdl_user set password=? where email=?");
//			pstmt = con.prepareStatement("UPDATE mdl_user SET password = ? WHERE id=? & email=?");
			pstmt = con.prepareStatement("UPDATE mdl_user SET password = ? WHERE id=?");

			pstmt.setString(1, user.getNewPassword());
			pstmt.setString(2, user.getId());
//			pstmt.setString(3, user.getEmail());
			count = pstmt.executeUpdate();
			
			if(count > 0){
				logger.debug("updated");
				isPwdChanged = true;
				user.setPassword(user.getNewPassword());
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		} catch (SQLException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		return isPwdChanged;
	}
	
}
