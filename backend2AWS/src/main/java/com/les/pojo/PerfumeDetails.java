package com.les.pojo;

import lombok.Data;

import java.util.List;

@Data
public class PerfumeDetails {

    private int perfumeId;
    private String perfumeName;
    private String brand;
    private int date;
    private String image;
    private String description;
    private int target;
    private List<Integer> notes;
}
