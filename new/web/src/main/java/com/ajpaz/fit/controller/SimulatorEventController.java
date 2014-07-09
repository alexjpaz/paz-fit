package com.ajpaz.fit.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ajpaz.fit.entity.SimulatorEvent;
import com.ajpaz.fit.repository.SimulatorEventRepository;

@RestController
@RequestMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE)
public class SimulatorEventController {

    private static final Logger log = LoggerFactory.getLogger(SimulatorEventController.class);

    @Autowired
    SimulatorEventRepository simulatorEventRepository;


    @RequestMapping
    public @ResponseBody Iterable<SimulatorEvent> all() {
        return simulatorEventRepository.findAll();
    }
}
