/*package com.tkhts.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.edit.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.tkhts.entity.QuestionWrapper;
import com.tkhts.entity.Report;
import com.tkhts.entity.User;

public class UserHelper {
	static Logger logger = Logger.getLogger(UserHelper.class);
	static StringWriter stack = new StringWriter();

	public static void createUserDirectories(User user) {
		File file = null;
		// cteate userKht directory in kht
		file = new File("F://Arun//TestEngine//TKHTS/kht//" + user.getKht());
		boolean isCreatedKht = file.mkdirs();
		if (isCreatedKht) {
			logger.debug("Directory has been created");
			file = new File("F://Arun//TestEngine//TKHTS//kht//"
					+ user.getKht() + "//assessments//");
			boolean isCreatedAssessment = file.mkdirs();
			file = new File("F://Arun//TestEngine//TKHTS//kht//"
					+ user.getKht() + "//img//");
			boolean isCreatedImg = file.mkdirs();

			file = null;

		} else {
			logger.debug("This directory already exists");
		}

	}

	public static boolean generatePdf(QuestionWrapper questionsWrapper) throws COSVisitorException, IOException {
		logger.debug("pdf factory for " + questionsWrapper);
		logger.debug("quiz name : "+questionsWrapper.getQuizName());

		PDDocument document = new PDDocument();
		PDPage page = new PDPage();

		try {
			User user = questionsWrapper.getUser();
			logger.debug(user);

			document.addPage(page);

			PDFont pdfFont = PDType1Font.HELVETICA_BOLD;
			float fontSize = 20f;
		    //lineHeight
		    float leading = 1.2f * fontSize;
		    PDRectangle mediabox = page.findMediaBox();
		    float margin = 50;
		    System.out.println("mediabox : "+mediabox);

		    float width = mediabox.getWidth() - 2*margin;

		    float startX = mediabox.getLowerLeftX() + margin;

		    float startY = mediabox.getUpperRightY() - margin;

			PDPageContentStream contentStream = new PDPageContentStream(document, page);
			
//		    PDFont pdfFont = PDType1Font.COURIER;


			// Define a text content stream using the selected font, moving the
			// cursor and drawing the text "Hello World"
			contentStream.beginText();
			contentStream.setFont(pdfFont, 12);
			contentStream.moveTextPositionByAmount(100, 700);
			contentStream.drawString("Hello TKHTS");
			contentStream.endText();

			contentStream.beginText();
			contentStream.setFont(font, 12);
			contentStream.moveTextPositionByAmount(200, 700);
			contentStream.drawString("new Hello TKHTS");
			contentStream.endText();



			String dateAndTime = UserHelper.getCurrentDateTime();

			String pdfPath = "F://Arun//TestEngine//TKHTS/kht//" + user.getKht() + "//assessments//";
			String pdfName = questionsWrapper.getQuizName() + "_" + dateAndTime;
			
			String text = questionsWrapper.getQuestions().get(0).getText();
			
			List<String> lines = UserHelper.getLines(text, pdfFont, fontSize, width);
			contentStream.beginText();
		    contentStream.setFont(pdfFont, fontSize);
		    contentStream.moveTextPositionByAmount(startX, startY);            
		    for (String line: lines)
		    {
		        contentStream.drawString(line);
		        contentStream.moveTextPositionByAmount(0, -leading);
		    }
		    contentStream.endText();
		    contentStream.close();

			logger.debug(pdfPath + pdfName + ".pdf");

			document.save(pdfPath + pdfName + ".pdf");
			
			contentStream.close();
		} catch (Exception e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught BadPaddingException : " + stack.toString());
		} finally {
			document.close();
		}

		logger.debug("pdf generated for "+questionsWrapper.getUser().getUserName());
		return true;
	}
	
	private static List<String> getLines(String text, PDFont pdfFont, float fontSize, float width) throws IOException {
		List<String> lines = new ArrayList<String>();
	    int lastSpace = -1;
	    while (text.length() > 0)
	    {
	        int spaceIndex = text.indexOf(' ', lastSpace + 1);
	        if (spaceIndex < 0)
	        {
	            lines.add(text);
	            text = "";
	        }
	        else
	        {
	            String subString = text.substring(0, spaceIndex);
	            float size = fontSize * pdfFont.getStringWidth(subString) / 1000;

	            if (size > width)
	            {
	                if (lastSpace < 0) // So we have a word longer than the line... draw it anyways
	                    lastSpace = spaceIndex;
	                subString = text.substring(0, lastSpace);
	                lines.add(subString);
//	                text = text.substring(lastSpace).trim();
	                text = text.substring(lastSpace);
	                lastSpace = -1;
	            }
	            else
	            {
	                lastSpace = spaceIndex;
	            }
	        }
	    }
		return lines;
	}
	
	private static String getCurrentDateTime(){
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MMM-dd hh-mm-ss");
		Date date = new Date();
		return dateFormat.format(date);

	}

	public static Report getAssessmentReports(String kht) {
		String path = "F://Arun//TestEngine//TKHTS//kht//" + kht + "//assessments";
		// File file = new
		// File("F://Arun//TestEngine//TKHTS//kht//DZSJC4hgjmI=//assessments");
		File file = new File(path);
		String reports[] = file.list();
		List<String> assessmentReports = null;
		for (String report : reports) {
			if (report.endsWith(".pdf")) {
				if(assessmentReports == null){
					assessmentReports = new ArrayList<String>();
				}
				assessmentReports.add(report);
					logger.debug(report);
			}
		}
		Report report = new Report();
		report.setPath(path);
		report.setReport(assessmentReports);
		return report;
	}
}
*/