/*package com.tkhts.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.log4j.Logger;
import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.edit.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.tkhts.entity.QuestionWrapper;

public class PdfGenerator {
	static Logger logger = Logger.getLogger(PdfGenerator.class.getName());
	static StringWriter stack = new StringWriter();

	public static boolean generatePdf(QuestionWrapper questionsWrapper)
			throws COSVisitorException, IOException {
		logger.debug("pdf factory for " + questionsWrapper);
		
		PDDocument document = new PDDocument();
		PDPage page = new PDPage();

		try{
		
		document.addPage(page);

		PDFont font = PDType1Font.HELVETICA_BOLD;

		PDPageContentStream contentStream = new PDPageContentStream(document,
				page);

		// Define a text content stream using the selected font, moving the
		// cursor and drawing the text "Hello World"
		contentStream.beginText();
		contentStream.setFont(font, 12);
		contentStream.moveTextPositionByAmount(100, 700);
		contentStream.drawString("Hello TKHTS");
		contentStream.endText();

		
		contentStream.beginText();
		contentStream.setFont(font, 12);
		contentStream.moveTextPositionByAmount(200, 700);
		contentStream.drawString("new Hello TKHTS");
		contentStream.endText();

		
		// Make sure that the content stream is closed:
		contentStream.close();

		// userId_username_quizid_date_time
		String userId = null;
		try {
			// auth via kht and id
			userId = CryptUtil.decrypt(questionsWrapper.getUser().getKht());
		} catch (InvalidKeyException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught InvalidKeyException : " + stack.toString());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught NoSuchAlgorithmException : " + stack.toString());
		} catch (InvalidKeySpecException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught InvalidKeySpecException : " + stack.toString());
		} catch (NoSuchPaddingException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught exception : " + stack.toString());
		} catch (InvalidAlgorithmParameterException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught InvalidAlgorithmParameterException : " + stack.toString());
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught IllegalBlockSizeException : " + stack.toString());
		} catch (BadPaddingException e) {
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught BadPaddingException : " + stack.toString());
		}
		
		String userName = questionsWrapper.getUser().getUserName();
//		int quizId = questionsWrapper.getQuestions().get(0).getId();
		int quizId = 0;

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MMM-dd hh-mm-ss");
		Date date = new Date();
		String dateAndTime = dateFormat.format(date);
		
		String pdfPath = "F:/Arun/TestEngine/TKHTS/pdfs/";
		String pdfName = userName + "_" + userId + "_" + quizId + "_" +dateAndTime;

		logger.debug(pdfPath + pdfName + ".pdf");
		
		document.save(pdfPath + pdfName + ".pdf");
		}
		catch(Exception e){
			e.printStackTrace(new PrintWriter(stack));
			logger.error("Caught BadPaddingException : " + stack.toString());
		}
		finally{
			document.close();
		}

		logger.debug("pdf generated");
		return true;
	}

	
}
*/