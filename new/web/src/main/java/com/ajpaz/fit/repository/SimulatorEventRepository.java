package com.ajpaz.fit.repository;

import org.springframework.data.repository.CrudRepository;

import com.ajpaz.fit.entity.SimulatorEvent;

public interface SimulatorEventRepository extends CrudRepository<SimulatorEvent, String> {

}
