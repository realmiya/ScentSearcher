package com.example.COMP9900.controller;

import com.example.COMP9900.dtos.account.*;
import com.example.COMP9900.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<AccountGetDto>> getAll(){
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{username}")
    public ResponseEntity<AccountGetDto> getByUsername(@PathVariable String username){
        return ResponseEntity.ok(accountService.findAccountByUsername(username));
    }

    @GetMapping("/{username}/bookmark")
    public ResponseEntity<AccountBookmarkGetDto> getAccountAndBookmarksByUsername(@PathVariable String username){
        return ResponseEntity.ok(accountService.findAccountWithBookmarksByUsername(username));
    }

    @GetMapping("/notes/{username}")
    public ResponseEntity<AccountGetDto> getAccountWithNotesByUsername(@PathVariable String username){
        return ResponseEntity.ok(accountService.findAccountWithNotesByUsername(username));
    }

    @PostMapping
    public ResponseEntity<AccountGetDto> add(@RequestBody AccountPostDto accountPostDto) {
        AccountGetDto accountGetDto = new AccountGetDto();
        if(accountService.findAccountByUsername(accountPostDto.getUsername()) == null){
            accountGetDto = accountService.createPatientAccount(accountPostDto);
            return ResponseEntity.ok(accountGetDto);
        } else {
            return ResponseEntity.badRequest().body(accountGetDto);
        }

    }

    @PutMapping("/{username}")
    public ResponseEntity<AccountGetDto> changePassword(@PathVariable String username,
                                                        @RequestParam("encodedpassword") final String encodedPassoword){
        AccountGetDto accountGetDto = accountService.changePassword(username, encodedPassoword);
        return ResponseEntity.ok(accountGetDto);
    }

    @PutMapping("/notes/{username}")
    public ResponseEntity<AccountGetDto> changeNotes(@PathVariable String username, @RequestBody AccountPutNotesDto accountPutNotesDto){
        AccountGetDto accountGetDto = accountService.changeNotes(username, accountPutNotesDto);
        return ResponseEntity.ok(accountGetDto);
    }
}
