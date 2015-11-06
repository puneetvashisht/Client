package com.tkhts.util;

import java.io.StringWriter;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;

import com.tkhts.entity.User;

public class MailSystem {
	static Logger logger = Logger.getLogger(MailSystem.class);
	static StringWriter stack = new StringWriter();

	public static void sendMail(User user) throws Exception{
/*		
        String to = "arun@tkhts.com";
*/
		logger.debug("Coming user is : "+user);
		String from = "support@tkhts.com";
		Properties props = System.getProperties();
		props.setProperty("mail.smtp.host", "localhost");
		javax.mail.Session mailSession = javax.mail.Session.getDefaultInstance(props, null);
		mailSession.setDebug(false);

		if(user.getAuthenticated()){
		// Compose the message
			MimeMessage message = new MimeMessage(mailSession);
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
			message.setSubject("TKHTS welcomes you");
			
			StringBuffer text = new StringBuffer("Welcome "+user.getUserName()+", we welcome you to the tkhts family.");
			text.append("\n");
			text.append("Username : "+user.getUserName());
			text.append("\n");
			text.append("Password : "+user.getNewPassword());
			
			message.setText(text.toString());
			Transport.send(message);
			user.setMailSent(true);			
//			result = "Sent message successfully to "+user.getUserName();
			logger.debug("Final user is : "+user);
		}
	}

}
