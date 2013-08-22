package com.ajpaz.ajpaz531.builder;

import org.springframework.stereotype.Component;

import com.ajpaz.ajpaz531.dto.DerpDto;

@Component
public class DerpDtoBuilder extends ResourceBuilder<Object, DerpDto> {

    @Override
    public DerpDto build(Object a) {
        DerpDto dto = new DerpDto();
        dto.derp = a.getClass().toString();
        return dto;
    }
}
