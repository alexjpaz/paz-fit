package com.ajpaz.fit.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajpaz.fit.SimulatorProperties;
import com.ajpaz.fit.types.ResponseType;
import com.ajpaz.fit.types.WatcherMode;
import com.ajpaz.fit.types.WatcherStatus;

@RestController
@RequestMapping(value = "/system", produces = MediaType.APPLICATION_JSON_VALUE)
public class SystemController {

    @Autowired
    SimulatorProperties simulatorProperties;

    @RequestMapping(value="enum")
    public Object _enum() {
        HashMap<String, Object> enums = new HashMap<String, Object>();

        enums.put("SimulatorProperties", simulatorProperties);
        enums.put("WatcherStatus", WatcherStatus.values());
        enums.put("WatcherMode", WatcherMode.values());
        enums.put("ResponseType", ResponseType.values());

        return enums;
    }

}

