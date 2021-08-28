package com.example.COMP9900.mappers;

import com.example.COMP9900.dtos.perfume.PerfumeGetDto;
import com.example.COMP9900.entities.Perfume;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface PerfumeMapper {
    @Mapping(target = "target", source = "targetCustomer.customer")
    PerfumeGetDto fromEntity(Perfume perfume);

    @Mapping(target = "target", source = "targetCustomer.customer")
    List<PerfumeGetDto> fromEntities(List<Perfume> perfumes);
}
