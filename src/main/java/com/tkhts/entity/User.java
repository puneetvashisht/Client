package com.tkhts.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "User")
public class User {
	
	private String userName;
	private String password;
	private String id;
	private String kht;
	private Boolean authenticated = false;
	
	private String email;
	private String newPassword;
	private boolean isMailSent = false;
	private String isSocialUser = "N";
	
	private String contact;
	private String gender;
	private String dob;
	private String experience;
	private String code;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getKht() {
		return kht;
	}
	public void setKht(String kht) {
		this.kht = kht;
	}
	public Boolean getAuthenticated() {
		return authenticated;
	}
	public void setAuthenticated(Boolean authenticated) {
		this.authenticated = authenticated;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public boolean isMailSent() {
		return isMailSent;
	}
	public void setMailSent(boolean isMailSent) {
		this.isMailSent = isMailSent;
	}
	public String getIsSocialUser() {
		return isSocialUser;
	}
	public void setIsSocialUser(String isSocialUser) {
		this.isSocialUser = isSocialUser;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password
				+ ", id=" + id + ", kht=" + kht + ", authenticated="
				+ authenticated + ", email=" + email + ", newPassword="
				+ newPassword + ", isMailSent=" + isMailSent
				+ ", isSocialUser=" + isSocialUser + ", contact=" + contact
				+ ", gender=" + gender + ", dob=" + dob + ", experience="
				+ experience + ", code=" + code + "]";
	}
}
