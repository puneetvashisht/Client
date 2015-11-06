package com.tkhts.entity;

public class PasswordDTO {
	private String email;
	private String currentPassword;
	private String newPassword;
	private String confirmPassword;
	private String kht;
	private String userName;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCurrentPassword() {
		return currentPassword;
	}
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public String getKht() {
		return kht;
	}
	public void setKht(String kht) {
		this.kht = kht;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Override
	public String toString() {
		return "PasswordDTO [email=" + email + ", currentPassword="
				+ currentPassword + ", newPassword=" + newPassword
				+ ", confirmPassword=" + confirmPassword + ", kht=" + kht
				+ ", userName=" + userName + "]";
	}
	
}
