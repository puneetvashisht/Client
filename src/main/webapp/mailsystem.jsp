<%@ page import="java.io.IOException, java.util.Properties, javax.mail.Message, javax.mail.MessagingException, javax.mail.Transport, javax.mail.internet.InternetAddress, javax.mail.internet.MimeMessage, javax.servlet.ServletException, javax.servlet.annotation.WebServlet, javax.servlet.http.HttpServlet, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse"%>

<%
String result = null;
String to = null;
String from = null;
String msg = null;

Properties props = System.getProperties();

props.setProperty("mail.smtp.host", "localhost");

javax.mail.Session mailSession = javax.mail.Session.getDefaultInstance(props, null);
mailSession.setDebug(false);

MimeMessage message = null;
%>

<%
	to = "arun@tkhts.com";

	from = "support@tkhts.com";

	try {
		message = new MimeMessage(mailSession);

		message.setSubject("Test Notification");
		message.setRecipient(Message.RecipientType.TO, new InternetAddress(to, false));
		msg = "<div style=\"color:red;\">BRIDGEYE</div>";

		message.setContent(msg, "text/html; charset=utf-8");
		message.setSentDate(new java.util.Date());
		Transport.send(message);
		result = "Sent message successfully....";
	} catch (MessagingException mex) {
		out.println("MEX");
		out.println(mex.getMessage());
		result = "Error: unable to send message....";
	} catch (Exception ex) {
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
	
	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script>
	$("button").click(function(){
	    $.ajax({
		    url: "demo_test.txt", 
		    success: function(result){
	        $("#div1").html(result);
	    }});
	});
	</script>

</body>
</html>