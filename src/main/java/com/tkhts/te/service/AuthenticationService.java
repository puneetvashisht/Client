package com.tkhts.te.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.tkhts.entity.User;

@Path("/services")
@Produces({ "application/xml", "application/json" })
public interface AuthenticationService {
	
	@POST
	@Path("/authenticate/")
	public abstract Response authenticateUser(User user);
	
//	Add a new comment ABC
	
}
