package com.tkhts.entity;

public class FeedbackDTO {
	String name;
	String email;
	String contact;
	String experience;
	String feedback;
	String rate;

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public FeedbackDTO() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getfeedback() {
		return feedback;
	}

	public void setfeedback(String feedback) {
		this.feedback = feedback;
	}

	@Override
	public String toString() {
		return "FeedbackDTO [name=" + name + ", email=" + email + ", contact="
				+ contact + ", experience=" + experience + ", message="
				+ feedback + ", rate=" + rate + "]";
	}

	
}
