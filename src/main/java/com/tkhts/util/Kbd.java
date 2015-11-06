package com.tkhts.util;

import java.io.File;


public class Kbd {
	public static void main(String[] args) {
		System.out.println(System.getProperty("user.home"));
		
//		int n = new File("F://Arun//TestEngine//TKHTS//kht//DZSJC4hgjmI=//assessments").listFiles().length;
		File file = new File("F://Arun//TestEngine//TKHTS//kht//DZSJC4hgjmI=//assessments");
		String list[] = file.list();
		for(String str : list)
			if(str.endsWith(".pdf"))
		System.out.println(str);
	
	}
}
