package com.tkhts.entity;

import java.util.List;

public class Report {
	private String path;
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	private List<String> report;

	public List<String> getReport() {
		return report;
	}

	public void setReport(List<String> report) {
		this.report = report;
	}

	@Override
	public String toString() {
		return "Report [path=" + path + ", report=" + report + "]";
	}
	
}
