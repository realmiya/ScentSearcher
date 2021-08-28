package com.les.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.les.entity.JsonResult;
import com.les.pojo.Profile;
import com.les.service.impl.ProfileServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController(value = "/profile")
public class ProfileController {

    @Resource
    ProfileServiceImpl profileService;

    @GetMapping("id/{accountId}/")
    public JsonResult getMyProfileById(@PathVariable(value = "accountId",name = "accountId") int accountId) throws Exception{
        Profile profile = profileService.getById(accountId);
        return new JsonResult(profile);
    }

    @GetMapping("name/{username}/")
    public JsonResult getMyProfileByName(@PathVariable(value = "username", name = "username") String username) throws Exception{
        QueryWrapper<Profile> queryWrapper = new QueryWrapper();
        queryWrapper.eq("username",username);
        List<Profile> profiles = profileService.getBaseMapper().selectList(queryWrapper);
        return new JsonResult(profiles);
    }

    @PutMapping("/updateProfile")
    public JsonResult updateProfile(Profile profile) throws Exception {
        boolean b = profileService.updateById(profile);
        if(b){
            return new JsonResult();
        }else{
            return new JsonResult("0","更新失败！");
        }
    }

    @PostMapping("/addProfile")
    public JsonResult addProfile(Profile profile) throws Exception {
        boolean save = profileService.save(profile);
        System.out.println(save);
        if(save){
            return new JsonResult();
        }else{
            return new JsonResult("0","注册失败！");
        }
    }



}
