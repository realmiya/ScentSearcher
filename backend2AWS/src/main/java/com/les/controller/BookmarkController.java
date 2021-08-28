package com.les.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.les.entity.JsonResult;
import com.les.pojo.Bookmark;

import com.les.service.impl.BookmarkServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController(value = "/bookmark")
public class BookmarkController {

    @Resource
    BookmarkServiceImpl bookmarkService;


    @PostMapping("/addBookmark")
    public JsonResult addBookmark(Bookmark bookmark) throws Exception {
        boolean save = bookmarkService.save(bookmark);
        System.out.println(save);
        if(save){
            return new JsonResult();
        }else{
            return new JsonResult("0","新增失败！");
        }
    }

    @GetMapping("/getBookmark/{accountId}")
    public JsonResult getBookmark(@PathVariable(value = "accountId", name = "accountId") int accountId) throws Exception{
        QueryWrapper<Bookmark> queryWrapper = new QueryWrapper();
        queryWrapper.eq("account_id", accountId);
        List<Bookmark> bookmarkList = bookmarkService.getBaseMapper().selectList(queryWrapper);
        List list = new ArrayList();
        for (Bookmark bookmark:bookmarkList) {
            list.add(bookmark.getPerfumeId());
        }
        return new JsonResult(list);
    }

    @DeleteMapping("/deleteBookmark")
    public JsonResult deleteBookmark(Bookmark bookmark) throws Exception{
        QueryWrapper<Bookmark> queryWrapper = new QueryWrapper();
        queryWrapper.eq("account_id", bookmark.getAccountId());
        queryWrapper.eq("perfume_id", bookmark.getPerfumeId());
        int delete = bookmarkService.getBaseMapper().delete(queryWrapper);
        if(delete > 0) {
            return new JsonResult();
        } else {
            return new JsonResult("0","删除失败！");
        }
    }
}
