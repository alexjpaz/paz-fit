package com.ajpaz.fit.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

import com.ajpaz.fit.types.Lift;

@Entity
public class Log {

    @Id
    String name;

    public Date date;

    @Enumerated(EnumType.STRING)
    public Lift lift;

    public Long weight;
    public Long reps;
}
