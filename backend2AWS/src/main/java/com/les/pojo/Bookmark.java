package com.les.pojo;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("bookmarks")
public class Bookmark {

    private int accountId;
    private int perfumeId;
}
