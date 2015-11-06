package com.tkhts.dao;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.log4j.Logger;

import com.tkhts.entity.Assessment;
import com.tkhts.entity.Assessments;
import com.tkhts.entity.User;
//import com.tkhts.entity.UserDTO;
import com.tkhts.util.CryptUtil;

public class UserDAO {

	static Logger logger = Logger.getLogger(UserDAO.class);
	static StringWriter stack = null;

	public static void authenticateUser(User user) throws InvalidKeyException,
			InvalidKeySpecException, NoSuchPaddingException,
			InvalidAlgorithmParameterException, UnsupportedEncodingException,
			IllegalBlockSizeException, BadPaddingException,
			NoSuchAlgorithmException {

		Connection con = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;

		try {
			/*
			 * DataSource ds = DAOUtil.getDS(); con = ds.getConnection();
			 */

			con = DAOUtil.getCon();
			logger.debug(con);

			stmt = con
					.prepareStatement("SELECT id, password, isSocialUser, email, phone1 FROM mdl_user where username=?");
			stmt.setString(1, user.getUserName());
			String pwd = null;
			rs = stmt.executeQuery();
			while (rs.next()) {
				pwd = rs.getString("password");

				user.setId(rs.getInt("id") + "");
				user.setIsSocialUser(rs.getString("isSocialUser"));
				user.setEmail(rs.getString("email"));
				user.setContact(rs.getString("phone1"));

				logger.debug("db password : " + pwd);
				logger.debug("submitted password : " + user.getPassword());
				logger.debug("User is : " + user);

				if (pwd.equals(user.getPassword())
						&& user.getIsSocialUser().equals("N")) {
					user.setAuthenticated(true);
					user.setKht(CryptUtil.encrypt(user.getId()));
					// user.setId(CryptUtil.encrypt("" + id));
					// user.setId(null);
				} else {
					user.setAuthenticated(false);
//					user.setId(null);
				}
				user.setPassword(null);
			}

			if (user.getAuthenticated()) {
				logger.debug("User Authenticated");
			} else {
				logger.debug("User is not Authenticated");
			}
			logger.debug("User : " + user);

		} catch (ClassNotFoundException e1) {
			stack = new StringWriter();
			logger.error("Caught ClassNotFoundException : " + stack.toString());
			e1.printStackTrace(new PrintWriter(stack));
		} catch (SQLException e) {
			stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught SQLException : " + stack.toString());
		}
	}

	// public static int registerUser(UserDTO userDTO)
	public static int registerUser(User user) throws ClassNotFoundException,
			SQLException {
		Connection con = null;
		PreparedStatement pstmt = null;
		int result = 0;

		/*
		 * DataSource ds = DAOUtil.getDS(); con = ds.getConnection();
		 */
		con = DAOUtil.getCon();
		logger.debug(con);
		logger.debug(user);
		pstmt = con
				.prepareStatement("INSERT INTO mdl_user (`username`,`email`, `password`,`phone1`,`alternatename`,`lastnamephonetic`,`firstnamephonetic`,`isSocialUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		pstmt.setString(1, user.getUserName());
		pstmt.setString(2, user.getEmail());
		pstmt.setString(3, user.getPassword());
		pstmt.setString(4, user.getContact());
		pstmt.setString(5, user.getGender());
		// pstmt.setString(6, userDTO.getDob());
		pstmt.setString(6, new Date().toString());
		pstmt.setString(7, user.getExperience());
		pstmt.setString(8, user.getIsSocialUser());

		result = pstmt.executeUpdate();
		logger.debug("result is " + result);

		return result;
	}

	public static User getUser(String userId) {

		Connection con = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		User user = null;
		try {
			/*
			 * DataSource ds = DAOUtil.getDS(); con = ds.getConnection();
			 */
			con = DAOUtil.getCon();
			stmt = con
					.prepareStatement("SELECT username, email, phone1 FROM mdl_user where id=?");

			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				user = new User();
				user.setContact(rs.getString("phone1"));
				user.setEmail(rs.getString("email"));
				user.setUserName(rs.getString("username"));

				logger.debug(user);
			}

		} catch (SQLException | ClassNotFoundException e) {
			stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught SQLException : " + stack.toString());
		}

		/*
		 * finally { try { if(rs!=null){ rs.close(); } if(stmt!=null){
		 * stmt.close(); } if(con!=null){ con.close(); }
		 * 
		 * } catch (NullPointerException e){ e.printStackTrace(new
		 * PrintWriter(stack));
		 * logger.error("Caught SQLException in closing DB resources : " +
		 * stack.toString()); } catch (SQLException e) { e.printStackTrace(new
		 * PrintWriter(stack));
		 * logger.error("Caught NullPointerException in closing DB resources : "
		 * + stack.toString()); } catch (Exception e) { e.printStackTrace(new
		 * PrintWriter(stack));
		 * logger.error("Caught Exception in closing DB resources : " +
		 * stack.toString()); }
		 * 
		 * }
		 */

		return user;

	}

	public static void assignQuizs(User user) throws ClassNotFoundException,
			SQLException {
//		int userId = getUserId(user);
		getUserId(user);
//		user.setId(getUserId(user)+"");
		for (int i = 1; i <= 6; i++) {
			assignQuiz(user, i);
		}
	}

	public static boolean assignQuiz(User user, int quizId)
			throws ClassNotFoundException, SQLException {
		Connection con = null;
		PreparedStatement pstmt = null;
		boolean isQuizAssigned = false;
		int resultCount = 0;

		try {
			/*
			 * DataSource ds = DAOUtil.getDS(); con = ds.getConnection();
			 */
			con = DAOUtil.getCon();
			logger.debug(con);
			logger.debug("userid is " + user.getId());
			logger.debug("quizid is " + quizId);
			// pstmt =
			// con.prepareStatement("INSERT INTO `moodle`.`mdl_quiz_attempts`(`quiz`,`userid`,`attempt`,`layout`,`currentpage`,`preview`,`state`,`timestart`,`timefinish`,`timemodified`,`timecheckstate`,`sumgrades`)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			// pstmt =
			// con.prepareStatement("INSERT INTO mdl_quiz_attempts(quiz, userid, attempt, layout, currentpage, preview, state, timestart, timefinish, timemodified, timecheckstate, sumgrades)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			/*
			 * pstmt = con.prepareStatement(
			 * "INSERT INTO moodle.mdl_quiz_attempts(quiz, userid, attempt, uniqueid, layout, currentpage, preview, state, timestart, timefinish, timemodified, timecheckstate, sumgrades)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
			 * ); pstmt.setInt(1, quizId);// default quizid pstmt.setInt(2,
			 * userId);// userid pstmt.setInt(3, 9999);// done pstmt.setInt(4,
			 * 0);// done pstmt.setString(5, "1.0"); pstmt.setInt(6, 0);
			 * pstmt.setInt(7, 0); pstmt.setString(8, "finished");
			 * pstmt.setInt(9, 0); pstmt.setInt(10, 0); pstmt.setInt(11, 0);
			 * pstmt.setInt(12, 0); pstmt.setFloat(13, -1.0f);
			 */
			pstmt = con
					.prepareStatement("INSERT INTO mdl_quiz_attempts(quiz, userid, attempt, layout, sumgrades)VALUES(?, ?, ?, ?, ?)");
			pstmt.setInt(1, quizId);// default quizid
			pstmt.setString(2, user.getId());// userid
			pstmt.setInt(3, 9999);// done
			pstmt.setString(4, "1.0");
			pstmt.setFloat(5, -1.0f);

			resultCount = pstmt.executeUpdate();
			logger.debug("result is " + resultCount);

		} catch (Exception e) {
			logger.debug("Exception in assingning quiz to new user");
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		if (resultCount > 0) {
			isQuizAssigned = true;
		}
		return isQuizAssigned;

	}

	private static void getUserId(User user) throws ClassNotFoundException,
			SQLException {

		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
//		int userId = 0;

		/*
		 * DataSource ds = DAOUtil.getDS(); con = ds.getConnection();
		 */
		con = DAOUtil.getCon();
		logger.debug(con);
		logger.debug(user);
		pstmt = con.prepareStatement("select id from mdl_user where username=? and password=?");
		pstmt.setString(1, user.getUserName());
		pstmt.setString(2, user.getPassword());

		rs = pstmt.executeQuery();
		while (rs.next()) {
//			userId = rs.getInt("id");
			user.setId(rs.getInt("id")+"");
			logger.debug("result is " + rs);
			logger.debug("userid is " + user.getId());
		}
//		return userId;
	}

	public static Assessments getUserAssessmentDetails(User user) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Assessments assessments= new Assessments();

		/*
		 * DataSource ds = DAOUtil.getDS(); con = ds.getConnection();
		 */
		try {
			con = DAOUtil.getCon();
			logger.debug(con);
			logger.debug(user);
			pstmt = con.prepareStatement("SELECT quiz, grade, timemodified FROM mdl_quiz_grades where userid=?");

			pstmt.setString(1, CryptUtil.decrypt(user.getKht()));
			assessments.setKht(user.getKht());

			rs = pstmt.executeQuery();
			
			
			Assessment assessment = null;
			while (rs.next()) {
				assessment = new Assessment();
				assessment.setGrades(rs.getFloat("grade"));
				assessment.setQuizid(rs.getLong("quiz")+"");
				assessment.setTimemodified(rs.getLong("timemodified"));
				
				assessments.getAssessmentList().add(assessment);
				assessment = null;
			}
		} catch (InvalidKeyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BadPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return assessments;

	}

	/*
	 * public static String md5(String input) throws NoSuchAlgorithmException {
	 * String result = input; if(input != null) { MessageDigest md =
	 * MessageDigest.getInstance("MD5"); //or "SHA-1"
	 * md.update(input.getBytes()); BigInteger hash = new BigInteger(1,
	 * md.digest()); result = hash.toString(16); while(result.length() < 32) {
	 * //40 for SHA-1 result = "0" + result; } } return result; }
	 */
	
	public static void main(String[] args) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException {
		User user = new User();
		user.setKht(CryptUtil.encrypt("1"));
		Assessments assessments = getUserAssessmentDetails(user);
		System.out.println(assessments);
	}

}
