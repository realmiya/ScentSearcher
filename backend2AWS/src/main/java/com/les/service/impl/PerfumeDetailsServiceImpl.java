package com.les.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.les.mapper.PerfumeDetailsMapper;
import com.les.pojo.PerfumeDetails;
import com.les.service.PerfumeDetailsService;
import org.springframework.stereotype.Service;

@Service
public class PerfumeDetailsServiceImpl extends ServiceImpl<PerfumeDetailsMapper, PerfumeDetails> implements PerfumeDetailsService {
}
