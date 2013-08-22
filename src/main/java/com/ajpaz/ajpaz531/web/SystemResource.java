package com.ajpaz.ajpaz531.web;

import java.util.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import com.ajpaz.ajpaz531.builder.SecurityDtoBuilder;

@Path("/system")
@Transactional
public class SystemResource {

    @Autowired
    SecurityDtoBuilder securityDtoBuilder;

    @Context
    private SecurityContext security;

    @GET
    @Path("/security")
    @Produces(MediaType.APPLICATION_JSON)
    public Object getUserPrincipal() {
        Collection<GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        return securityDtoBuilder.build(authorities);
    }

}
