package com.tkhts.entity;

public class Attempt {
	boolean isReduced = false;

	public boolean isReduced() {
		return isReduced;
	}

	public void setReduced(boolean isReduced) {
		this.isReduced = isReduced;
	}

	@Override
	public String toString() {
		return "Attempt [isReduced=" + isReduced + "]";
	}
	
	
}
