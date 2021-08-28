package com.example.COMP9900.auth;

import java.util.Optional;

public interface ApplicationUserDao {
    Optional<ApplicationUserDetails> fetchAccountByUsername(String username);
}
