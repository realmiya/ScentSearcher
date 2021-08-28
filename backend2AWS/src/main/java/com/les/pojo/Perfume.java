package com.les.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;



@Data
@TableName("perfume")
public class Perfume {

    @TableId(value = "perfume_id",type = IdType.AUTO)
    private int perfumeId;
    private String perfumeName;
    private String brand;
    private int date;
    private String image;
    private String description;
    private int target;



}
