package com.ajpaz.fit.repository;

import org.springframework.data.repository.CrudRepository;

import com.ajpaz.fit.entity.Request;

public interface RequestRepository extends
		CrudRepository<Request, String> {
	
	public Request findByCorrelationId(String correlationId);

}
