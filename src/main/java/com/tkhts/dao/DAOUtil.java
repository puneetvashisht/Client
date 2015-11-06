package com.tkhts.dao;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.log4j.Logger;


public class DAOUtil {
	
	static Logger logger = Logger.getLogger(DAOUtil.class);
	static StringWriter stack = new StringWriter();
/*
	public static DataSource getDS() {
		Context ctx = null;
		DataSource ds = null;
		try {
			ctx = new InitialContext();
			ds = (DataSource) ctx.lookup("java:/comp/env/jdbc/moodle");
		} catch (NamingException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		}
		logger.debug("******************************" + ds);
		return ds;
	}
	*/
	public static Connection getCon() throws ClassNotFoundException, SQLException{
		Connection con = null;
		
		Class.forName("com.mysql.jdbc.Driver");
		
//		con = DriverManager.getConnection("jdbc:mysql://localhost/tkhts_moodle","tkhts_server","tk@123");
		con = DriverManager.getConnection("jdbc:mysql://192.168.5.2:3306/moodle","root","root");
		
		if(con!= null){
			logger.debug("connection created");
		}
		return con;
	}
	
	public static void main(String[] args) {
		try {

			Connection con = DAOUtil.getCon();

			logger.debug(con);
		} catch (ClassNotFoundException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught ClassNotFoundException : " + stack.toString());
		} catch (SQLException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught SQLException : " + stack.toString());
		}
	}
}
