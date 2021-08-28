package com.les.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.les.entity.JsonResult;
import com.les.pojo.NoteInPerfume;
import com.les.pojo.Perfume;
import com.les.pojo.Profile;
import com.les.service.NoteInPerfumeService;
import com.les.service.impl.NoteInPerfumeImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController(value = "/noteInPerfume")
public class NoteInPerfumeController {

    @Resource
    NoteInPerfumeImpl noteInPerfumeService;


    @GetMapping("PerfumeId/{noteInPerfumeId}/")
    public JsonResult getNotesByPerfumeId(@PathVariable(value = "noteInPerfumeId",name = "noteInPerfumeId") int id) throws Exception{
        QueryWrapper<NoteInPerfume> queryWrapper = new QueryWrapper();
        queryWrapper.eq("perfume_id", id);
        List<NoteInPerfume> noteInPerfumes = noteInPerfumeService.getBaseMapper().selectList(queryWrapper);
        return new JsonResult(noteInPerfumes);
    }

    @PostMapping("/addNotes")
    public JsonResult addNotes(NoteInPerfume noteInPerfume) throws Exception {
        boolean save = noteInPerfumeService.save(noteInPerfume);
        System.out.println(save);
        if(save){
            return new JsonResult();
        }else{
            return new JsonResult("0","新增失败！");
        }
    }
}
