package com.ajpaz.fit.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ajpaz.fit.SimulatorProperties;
import com.ajpaz.fit.repository.RequestRepository;
import com.ajpaz.fit.repository.SimulatorEventRepository;

@Controller
@RequestMapping(value = "/simulator")
public class SimulatorController {

    private static final Logger log = LoggerFactory.getLogger(SimulatorController.class);


    @Autowired
    RequestRepository requestRepository;

    @Autowired
    SimulatorEventRepository simulatorEventRepository;

    @Autowired
    SimulatorProperties simulatorProperties;

    @RequestMapping(value = "/request", method = RequestMethod.GET)
    public @ResponseBody Object requestList() {
        return requestRepository.findAll();
    }

    //    @RequestMapping(value = "/request", method = RequestMethod.POST)
    //    public @ResponseBody Object request(@RequestParam("correlationId") String correlationId, @RequestParam String sourceEndpointName, @RequestParam String destinationEndpointName,
    //            @RequestParam("file") MultipartFile file) throws IOException {

    // File tempFile = File.createTempFile(correlationId, "temp");
    //
    // if (!file.isEmpty()) {
    // try {
    // byte[] bytes = file.getBytes();
    //
    // BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(tempFile));
    // stream.write(bytes);
    // stream.close();
    // log.debug("You successfully uploaded " + correlationId + " into " + correlationId + "-uploaded !");
    // } catch (Exception e) {
    //
    // log.debug("You failed to upload " + correlationId + " => " + e.getMessage());
    // }
    // } else {
    // log.debug("You failed to upload " + correlationId + " because the file was empty.");
    // }
    // return sendPersonDataRequest;
}

