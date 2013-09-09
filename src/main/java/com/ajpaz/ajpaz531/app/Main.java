package com.ajpaz.ajpaz531.app;

import java.io.IOException;
import java.net.URI;

import javax.ws.rs.core.UriBuilder;

import org.glassfish.grizzly.http.server.HttpServer;

import com.sun.jersey.api.container.grizzly2.GrizzlyServerFactory;
import com.sun.jersey.api.core.PackagesResourceConfig;
import com.sun.jersey.api.core.ResourceConfig;

/**
 * Created by IntelliJ IDEA. User: pbu Date: 28.02.12 Time: 21:01 To change this template use File | Settings | File Templates.
 */
public class Main {
    private static URI getBaseURI(String hostname, int port) {
        return UriBuilder.fromUri("http://0.0.0.0/").port(port).build();
    }

    protected static HttpServer startServer(URI uri) throws IOException {
        System.out.println("Starting grizzly...");
        ResourceConfig rc = new PackagesResourceConfig("om.ajpaz.ajpaz531.app");
        return GrizzlyServerFactory.createHttpServer(uri, rc);
    }

    public static void main(String[] args) throws IOException {
        URI uri = getBaseURI(System.getenv("HOSTNAME"), Integer.valueOf(System.getenv("PORT")));
        HttpServer httpServer = startServer(uri);
        System.out.println(String.format("Jersey app started with WADL available at " + "%sapplication.wadl\nTry out %shelloworld\nHit enter to stop it...", uri, uri));
        while (true) {
            System.in.read();
        }
    }
}