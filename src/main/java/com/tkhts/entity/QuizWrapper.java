package com.tkhts.entity;

import java.util.List;

public class QuizWrapper {
	private User user = null;
	private List<Quiz> quizs = null;
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public List<Quiz> getQuizs() {
		return quizs;
	}
	public void setQuizs(List<Quiz> quizs) {
		this.quizs = quizs;
	}
	
	@Override
	public String toString() {
		return "QuizWrapper [user=" + user + ", quizs=" + quizs + "]";
	}
	
	
}
