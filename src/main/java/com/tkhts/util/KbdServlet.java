package com.tkhts.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/KbdServlet")
public class KbdServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		System.out.println(System.getProperty("user.home"));
		
//		boolean isCreated = new File("/TKHTS/kht/techknow/").mkdirs();
		boolean isCreated = new File("F:/Arun/TestEngine/TKHTS/kht/techknow/").mkdirs();
		if(isCreated){
			out.println("Directory has been created");
		}
		else{
			out.println("This directory already exists");
		}
		
		out.close();

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
