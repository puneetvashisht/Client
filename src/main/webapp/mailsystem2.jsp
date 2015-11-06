<%@ page import="java.io.IOException, java.util.Properties, javax.mail.Message, javax.mail.MessagingException, javax.mail.Session, javax.mail.Transport, javax.mail.internet.InternetAddress, javax.mail.internet.MimeMessage, javax.servlet.ServletException, javax.servlet.annotation.WebServlet, javax.servlet.http.HttpServlet, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse"%>
<%-- <%@ page import="java.io.IOException"%>
<%@ page import="java.util.Properties"%>
<%@ page import="javax.mail.Message"%>
<%@ page import="javax.mail.MessagingException"%>
<%@ page import="javax.mail.Session"%>
<%@ page import="javax.mail.Transport"%>
<%@ page import="javax.mail.internet.InternetAddress"%>
<%@ page import="javax.mail.internet.MimeMessage"%>
<%@ page import="javax.servlet.ServletException"%>
<%@ page import="javax.servlet.annotation.WebServlet"%>
<%@ page import="javax.servlet.http.HttpServlet"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javax.servlet.http.HttpServletResponse"%> --%>

<%
   String result = null;
   // Recipient's email ID needs to be mentioned.
   // String to = "support@tkhts.com";
   String to = "arun@tkhts.com";


   // Sender's email ID needs to be mentioned
//   String from = "arun@tkhts.com";
   String from = "support@tkhts.com";
   // Assuming you are sending email from localhost
  
   // Get system properties object
   
   Properties props= System.getProperties();

        props.setProperty("mail.smtp.host", "localhost");

        javax.mail.Session mailSession =javax.mail.Session.getDefaultInstance(props, null);
        
        mailSession.setDebug(false);

        //Compose the message  
        try{
MimeMessage message = new MimeMessage(mailSession);
/*
      // Create a default MimeMessage object.
      
      // Set From: header field of the header.
      message.setFrom(new InternetAddress(from));
      // Set To: header field of the header.
      message.addRecipient(Message.RecipientType.TO,
                               new InternetAddress(to));
      // Set Subject: header field
      message.setSubject("This is the Subject Line!");
      // Now set the actual message
      message.setText("This is actual message");
      // Send message
      Transport.send(message);
*/
message.setSubject("Test Notification");
    message.setRecipient(Message.RecipientType.TO, new InternetAddress(to, false));
    String msg = "<div style=\"color:red;\">BRIDGEYE</div>";
    
    message.setContent(msg, "text/html; charset=utf-8");
    message.setSentDate(new java.util.Date());
    Transport.send(message);
      result = "Sent message successfully....";
   }catch (MessagingException mex) {
      out.println("MEX");
      out.println(mex.getMessage());
      result = "Error: unable to send message....";
   }catch (Exception ex) {
      out.println("EX");
      out.println(ex.getMessage());
      result = "Error: unable to send message.... Exception";
   }
%>
<html>
<head>
<title>Send Email using JSP</title>
</head>
<body>
<center>
<h1>Send Email using JSP</h1>
</center>
<p align="center">
<% 
   out.println("Result: " + result + "\n");
%>
</p>
</body>
</html>