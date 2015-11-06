package com.tkhts.entity;

public class Assessment {

	private String quizid;
	private long timemodified;
	private float grades;
	public String getQuizid() {
		return quizid;
	}
	public void setQuizid(String quizid) {
		this.quizid = quizid;
	}
	public long getTimemodified() {
		return timemodified;
	}
	public void setTimemodified(long timemodified) {
		this.timemodified = timemodified;
	}
	public float getGrades() {
		return grades;
	}
	public void setGrades(float grades) {
		this.grades = grades;
	}
	@Override
	public String toString() {
		return "Assessment [quizid=" + quizid + ", timemodified="
				+ timemodified + ", grades=" + grades + "]";
	}
	
}
