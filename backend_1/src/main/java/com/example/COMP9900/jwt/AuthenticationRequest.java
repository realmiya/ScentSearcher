package com.example.COMP9900.jwt;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String username;
    private String password;
}
