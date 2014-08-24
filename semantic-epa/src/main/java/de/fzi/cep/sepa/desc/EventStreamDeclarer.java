package de.fzi.cep.sepa.desc;

import de.fzi.cep.sepa.model.impl.graph.SEP;


public interface EventStreamDeclarer {

	public de.fzi.cep.sepa.model.impl.EventStream declareModel(SEP sep);
	
	public void executeStream();
	
	public boolean isExecutable();
}
