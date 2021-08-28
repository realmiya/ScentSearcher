package com.example.COMP9900.services;

import com.example.COMP9900.dtos.account.*;
import com.example.COMP9900.entities.Account;
import com.example.COMP9900.entities.Authority;
import com.example.COMP9900.entities.Notes;
import com.example.COMP9900.mappers.AccountMapper;
import com.example.COMP9900.mappers.NoteMapper;
import com.example.COMP9900.repositories.AccountRepository;
import com.example.COMP9900.repositories.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final AuthorityRepository authorityRepository;
    private final NoteMapper noteMapper;

    public AccountGetDto createPatientAccount(AccountPostDto accountPostDto){
        Account account = accountMapper.toEntity(accountPostDto);
        account.setAuthorities(getPatientAuthority());
        Account dbAccount = accountRepository.save(account);
        return accountMapper.fromEntity(dbAccount);
    }

    public AccountGetDto findAccountByUsername(String username){
        Account account = accountRepository.findByUsername(username);
        return accountMapper.fromEntity(account);
    }

    public AccountBookmarkGetDto findAccountWithBookmarksByUsername(String username){
        Account account = accountRepository.findByUsername(username);
        return accountMapper.fromEntity_2(account);
    }

    public AccountGetDto findAccountWithNotesByUsername(String username){
        Account account = accountRepository.findAccountWithNotesByUsername(username);
        return accountMapper.fromEntity(account);
    }

    public List<AccountGetDto> getAllAccounts(){
        return accountRepository.findAll().stream()
                .map(accountMapper::fromEntity)
                .collect(Collectors.toList());
    }

    public String findUsernameById(Long accountId){
        Account account = accountRepository.getById(accountId);
        return account.getUsername();
    }

    public AccountGetDto changePassword(String userName, String encodedPassowrd) {
//        Account account = new Account();
//        accountMapper.copy(accountPutDto, account);
//        account.setId(accountId);
//        account.setUsername(findUsernameById(accountId));
//        account.setAuthorities(findAuthoritiesByAccountId(accountId));
//        account.setNotes(findNotesByAccountId(accountId));
//        return accountMapper.fromEntity(accountRepository.save(account));
        Account account = new Account();
        AccountGetDto previousAccount = findAccountWithNotesByUsername(userName);
        account.setId(previousAccount.getId());
        account.setUsername(previousAccount.getUsername());
        account.setEncodedPassword(encodedPassowrd);
        account.setFirstName(previousAccount.getFirstName());
        account.setLastName(previousAccount.getLastName());
        account.setGender(previousAccount.getGender());
        account.setAuthorities(findAuthoritiesByAccountId(previousAccount.getId()));
        account.setNotes(previousAccount.getNotes().stream()
                .map(noteMapper::toEntity)
                .collect(Collectors.toSet()));
        return accountMapper.fromEntity(accountRepository.save(account));
    }

    public AccountGetDto changeNotes(String userName, AccountPutNotesDto accountPutNotesDto) {
        Account account = new Account();
        AccountGetDto previousAccount = findAccountByUsername(userName);
        account.setId(previousAccount.getId());
        account.setUsername(previousAccount.getUsername());
        account.setEncodedPassword(previousAccount.getEncodedPassword());
        account.setFirstName(previousAccount.getFirstName());
        account.setLastName(previousAccount.getLastName());
        account.setGender(previousAccount.getGender());
        account.setAuthorities(findAuthoritiesByAccountId(previousAccount.getId()));
        account.setNotes(accountPutNotesDto.getNotes().stream()
                .map(noteMapper::toEntity)
                .collect(Collectors.toSet()));
        return accountMapper.fromEntity(accountRepository.save(account));
    }

    public Set<Authority> findAuthoritiesByAccountId(Long accountId){
        Account account = accountRepository.getById(accountId);
        return account.getAuthorities();
    }

    public Set<Notes> findNotesByAccountId(Long accountId){
        Account account = accountRepository.getById(accountId);
        return account.getNotes();
    }

    public Set<Authority> getPatientAuthority(){
        return Stream.of(authorityRepository.getById(2L)).collect(Collectors.toSet());
    }

    public void deleteAccount(Long accountId){
        accountRepository.deleteById(accountId);
    }
}
