package com.les.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.les.mapper.PerfumeMapper;
import com.les.pojo.Perfume;
import com.les.service.PerfumeService;
import org.springframework.stereotype.Service;


@Service
public class PerfumeServiceImpl extends ServiceImpl<PerfumeMapper, Perfume> implements PerfumeService {
}
