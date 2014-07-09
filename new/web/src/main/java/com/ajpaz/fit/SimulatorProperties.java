package com.ajpaz.fit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "simulator")
public class SimulatorProperties {
    private String sourceEndpointName = "NONAME";
    private String watchDirectory = "/tmp/" + sourceEndpointName;
    private String destinationEndpointName = "NONAME";

    private final String biobrokerUrl = "http://localhost:8080";

    public String getBiobrokerUrl() {
        return biobrokerUrl;
    }

    public String getSourceEndpointName() {
        return sourceEndpointName;
    }

    public void setSourceEndpointName(String sourceEndpointName) {
        this.sourceEndpointName = sourceEndpointName;
    }

    public String getWatchDirectory() {
        return watchDirectory;
    }

    public void setWatchDirectory(String watchDirectory) {
        this.watchDirectory = watchDirectory;
    }

    public String getDestinationEndpointName() {
        return destinationEndpointName;
    }

    public void setDestinationEndpointName(String destinationEndpointName) {
        this.destinationEndpointName = destinationEndpointName;
    }
}