package com.example.COMP9900.jwt;

import io.jsonwebtoken.security.Keys;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import javax.crypto.SecretKey;

@Data
@Configuration
@ConfigurationProperties(prefix = "application.jwt")
public class JwtConfig {

    private String tokenPrefix;
    private Integer tokenExpirationAfterDays;
    private String secretKey;

    public String getAuthorizationHeader() {return HttpHeaders.AUTHORIZATION;}

    @Bean
    public SecretKey secretKey() {return Keys.hmacShaKeyFor(secretKey.getBytes());}
}
