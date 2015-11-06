package com.tkhts;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

public class JaxRSPatientServiceTest {
	
	private static final String PATIENT_SERVICE_URL = "http://localhost:8080/04Client/rest/patientservice";

	public static void main(String[] args) {

		System.setProperty(ClientBuilder.JAXRS_DEFAULT_CLIENT_BUILDER_PROPERTY, "org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder");
		Client client = ClientBuilder.newClient();

		WebTarget target = client.target(PATIENT_SERVICE_URL).path("/patients")
				.path("/{id}").resolveTemplate("id", 123);

		Patient patient = target.request().get(Patient.class);

		System.out.println(patient.getName());
		
		

	}
}
