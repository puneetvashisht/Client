package com.tkhts.entity;

import java.util.Map;

public class Question {
	int id;
	String text;
	Map<String,String> choices;
	Map<String,Boolean>  answers;
	Map<String,Float>  fractions;
	Float score;

	
	public Float getScore() {
		return score;
	}
	public void setScore(Float score) {
		this.score = score;
	}
	
	public Map<String, Float> getFractions() {
		return fractions;
	}
	public void setFractions(Map<String, Float> fractions) {
		this.fractions = fractions;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Map<String, String> getChoices() {
		return choices;
	}
	public void setChoices(Map<String, String> choices) {
		this.choices = choices;
	}
	public Map<String, Boolean> getAnswers() {
		return answers;
	}
	public void setAnswers(Map<String, Boolean> answers) {
		this.answers = answers;
	}
	
	@Override
	public String toString() {
		return "Question [id=" + id + ", text=" + text + ", choices=" + choices
				+ ", answers=" + answers + ", fractions=" + fractions
				+ ", score=" + score + "]";
	}

}
