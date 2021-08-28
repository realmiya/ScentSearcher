package com.example.COMP9900.mappers;

import com.example.COMP9900.dtos.account.AccountBookmarkGetDto;
import com.example.COMP9900.dtos.account.AccountGetDto;
import com.example.COMP9900.dtos.account.AccountPostDto;
import com.example.COMP9900.dtos.account.AccountPutDto;
import com.example.COMP9900.entities.Account;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface AccountMapper {

    AccountGetDto fromEntity(Account account);

    AccountBookmarkGetDto fromEntity_2(Account account);

    Account toEntity(AccountPostDto accountPostDto);

    void copy(AccountPutDto accountPutDto, @MappingTarget Account account);
}
