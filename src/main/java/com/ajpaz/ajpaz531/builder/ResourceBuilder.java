package com.ajpaz.ajpaz531.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.stereotype.Component;

@Component
public abstract class ResourceBuilder<NGDB, DTO> {

    public abstract DTO build(NGDB ngdb);

    public List<DTO> list(Iterable<NGDB> ngdbList) {

        List<DTO> dtoList = new ArrayList<DTO>();

        for (NGDB ngdb : ngdbList) {
            dtoList.add(build(ngdb));
        }

        return dtoList;
    }

    public Map<Object, DTO> map(Iterable<NGDB> ngdbList, String key) {

        Map<Object, DTO> map = new HashMap<Object, DTO>();

        for (NGDB ngdb : ngdbList) {
            BeanWrapper wrapper = PropertyAccessorFactory.forBeanPropertyAccess(ngdb);
            Object keyValue = wrapper.getPropertyValue(key);
            map.put(keyValue, build(ngdb));
        }

        return map;

    }

    public Map<Object, DTO> map(Iterable<NGDB> ngdbList, Enum<?> enumKey) {
        return map(ngdbList, enumKey.toString().toLowerCase());
    }

    public ResourceMap<DTO> map(Iterable<NGDB> ngdbList, Class<? extends ResourceMap<DTO>> clazz) {

        ResourceMap<DTO> map = null;
        try {
            map = clazz.newInstance();
        } catch (InstantiationException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        for (NGDB ngdb : ngdbList) {
            map.put(build(ngdb));
        }

        return map;
    }

    public interface NgaResourceKey {

    }

}
