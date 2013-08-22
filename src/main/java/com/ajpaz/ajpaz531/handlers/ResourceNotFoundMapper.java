package com.ajpaz.ajpaz531.handlers;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.ajpaz.ajpaz531.exceptions.ResourceNotFoundException;

@Provider
public class ResourceNotFoundMapper implements ExceptionMapper<ResourceNotFoundException> {

    @Override
    public Response toResponse(ResourceNotFoundException e) {
        return Response.status(404).entity(e.getMessage()).type("text/plain").build();
    }

}