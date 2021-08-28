package com.example.COMP9900.auth;

import com.example.COMP9900.entities.Account;
import com.example.COMP9900.entities.Authority;
import com.example.COMP9900.repositories.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ApplicationUserDaoImpl implements ApplicationUserDao {
    private final AccountRepository accountRepository;

    @Override
    public Optional<ApplicationUserDetails> fetchAccountByUsername(String username) {
        Account account = accountRepository.findByUsername(username);

        ApplicationUserDetails applicationUserDetails = new ApplicationUserDetails(
                account.getUsername(),
                account.getEncodedPassword(),
                getGrantedAuthorities(account.getAuthorities()),
                true,
                true,
                true,
                true
        );
        return Optional.of(applicationUserDetails);
    }

    private Set<SimpleGrantedAuthority> getGrantedAuthorities(Set<Authority> authorities) {
        Set<SimpleGrantedAuthority> permissions = authorities.stream()
                .map(authority -> new SimpleGrantedAuthority((authority.getPermission())))
                .collect(Collectors.toSet());
        return permissions;
    }
}
