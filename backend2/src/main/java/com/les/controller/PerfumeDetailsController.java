package com.les.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.les.entity.JsonResult;
import com.les.pojo.Note;
import com.les.pojo.NoteInPerfume;
import com.les.pojo.Perfume;
import com.les.pojo.PerfumeDetails;
import com.les.service.impl.NoteInPerfumeImpl;
import com.les.service.impl.PerfumeServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController(value = "/PerfumeDetails")
public class PerfumeDetailsController {

    @Resource
    PerfumeServiceImpl perfumeService;

    @Resource
    NoteInPerfumeImpl noteInPerfumeService;

    @PostMapping("/addPerfumeDetails")
    public JsonResult addPerfumeDetails(@RequestBody PerfumeDetails perfumeDetails) throws Exception {
        System.out.println(perfumeDetails);
        Perfume perfume = new Perfume();
        perfume.setPerfumeName(perfumeDetails.getPerfumeName());
        perfume.setBrand(perfumeDetails.getBrand());
        perfume.setDate(perfumeDetails.getDate());
        perfume.setImage(perfumeDetails.getImage());
        perfume.setDescription(perfumeDetails.getDescription());
        perfumeService.save(perfume);
        int id = perfume.getPerfumeId();


        List<Integer> notes = perfumeDetails.getNotes();
        for (Integer note: notes) {
            NoteInPerfume noteInPerfume = new NoteInPerfume();
            noteInPerfume.setNoteId(note);
            noteInPerfume.setPerfumeId(id);
            noteInPerfumeService.save(noteInPerfume);
        }
        return new JsonResult();
    }
}
