package com.les.controller;

import com.les.entity.JsonResult;
import com.les.pojo.Perfume;
import com.les.service.impl.PerfumeServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.annotation.Resource;

@RestController(value = "/perfume")
public class PerfumeController {

    @Resource
    PerfumeServiceImpl perfumeService;

    @GetMapping("getPerfume/{perfumeId}/")
    public JsonResult getPerfumeById(@PathVariable(value = "perfumeId",name = "perfumeId") int perfumeId) throws Exception{
        Perfume perfume = perfumeService.getById(perfumeId);
        return new JsonResult(perfume);
    }

    @PostMapping("/addPerfume")
    public JsonResult addPerfume(Perfume perfume) throws Exception {
        boolean save = perfumeService.save(perfume);
        System.out.println(save);
        if(save){
            return new JsonResult();
        }else{
            return new JsonResult("0","新增失败！");
        }
    }
}
