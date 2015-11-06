package com.tkhts.entity;

public class Quiz {
	int quizId;
	String quizName;
	int tl;
	String prefferedBehaviour;
	
	public int getQuizId() {
		return quizId;
	}

	public void setQuizId(int quizId) {
		this.quizId = quizId;
	}

	public String getQuizName() {
		return quizName;
	}

	public void setQuizName(String quizName) {
		this.quizName = quizName;
	}

	public int getTl() {
		return tl;
	}

	public void setTl(int tl) {
		this.tl = tl;
	}

	public String getPrefferedBehaviour() {
		return prefferedBehaviour;
	}

	public void setPrefferedBehaviour(String prefferedBehaviour) {
		this.prefferedBehaviour = prefferedBehaviour;
	}

	@Override
	public String toString() {
		return "Quiz [quizId=" + quizId + ", quizName=" + quizName + ", tl="
				+ tl + ", prefferedBehaviour=" + prefferedBehaviour + "]";
	}
	
}
