package com.les.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("note_in_perfume")
public class NoteInPerfume {

    private int perfumeId;
    private int noteId;
}
