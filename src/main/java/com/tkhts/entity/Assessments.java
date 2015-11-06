package com.tkhts.entity;

import java.util.ArrayList;
import java.util.List;

public class Assessments {
	private String kht;
	private List<Assessment> assessmentList;
	
	public Assessments(){
		assessmentList = new ArrayList<Assessment>();
	}
	
	public String getKht() {
		return kht;
	}
	public void setKht(String kht) {
		this.kht = kht;
	}
	public List<Assessment> getAssessmentList() {
		return assessmentList;
	}
	public void setAssessmentList(List<Assessment> assessmentList) {
		this.assessmentList = assessmentList;
	}
	@Override
	public String toString() {
		return "Assessments [kht=" + kht + ", assessmentList=" + assessmentList
				+ "]";
	}
	
	
}
