package com.tkhts;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@WebServlet("/dsdemo")
public class DataSourceServlet extends HttpServlet {
	 @Resource(lookup = "java:/jdbc/mysql")
	    private DataSource dataSource;

	    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	        response.setContentType("text/html");
	
	        PrintWriter out = response.getWriter();
	        
	        String user = request.getParameter("username");
	        String pwd = request.getParameter("pwd");
	        
	        Connection connection;
            PreparedStatement preparedStatement;
            ResultSet resultSet;
			try {
				connection = dataSource.getConnection();
				preparedStatement = connection.prepareStatement("SELECT name FROM users where password='"+pwd+"'");
				resultSet = preparedStatement.executeQuery();
	        	if(resultSet.next() && resultSet.getString("name").equals(user)){
	    	        out.println("<h1>Welcome "+user+"!</h1>");

	                preparedStatement = connection.prepareStatement("SELECT COUNT(*) FROM books");
	                resultSet = preparedStatement.executeQuery();

	    	        try {

	    	            if(resultSet.next()) {
	    	                out.println("You have " + resultSet.getInt(1) + " record(s) in your table.");
	    	                out.println("And here is the complete list of books:");
	    	                preparedStatement = connection.prepareStatement("SELECT * FROM books");
	    	                resultSet = preparedStatement.executeQuery();
	    	                out.println("<ol>");
	    	                while(resultSet.next()){
	    	                	out.println("<li>"+resultSet.getString(2)+"</li>");
	    	                }
	    	                out.println("</ol>");
	    	                out.close();
	    	            }
	    	        } catch (SQLException e) {
	                    out.close();
	    	            throw new IllegalStateException("Failed to fetch number of books", e);
	    	        }
	        		
	        	}
	        	else{
	        		doGet(request, response);
	        	}
	        	

			} catch (SQLException e1) {
				e1.printStackTrace();
			}
	        
	    }	

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		out.println("<h1>Go to login page to login</h1>");
		out.close();
	}

}
