package com.les.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("accountsdyh")
public class Profile {

    @TableId(value = "account_id",type = IdType.AUTO)
    private int accountId;
    private String username;
    private String encodedPassword;
    private String firstName;
    private String lastName;
    private String gender;


}
