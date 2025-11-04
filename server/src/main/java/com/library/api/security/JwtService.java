package com.library.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret:supersecretkeysupersecretkeysupersecretkey}")
    private String secret;

    @Value("${app.jwt.expiration-ms:86400000}") // default: 1 gün
    private long expirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String userEmail) {
        return generateToken(userEmail, Map.of());
    }

    public String generateToken(String userEmail, Map<String, Object> extraClaims) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setClaims(extraClaims == null ? Map.of() : extraClaims)
                .setSubject(userEmail)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = parseClaims(token);
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, String userEmail) {
        try {
            String subject = extractUsername(token);
            return subject != null && subject.equals(userEmail) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            // imza/format/exp hatalarında güvenli şekilde geçersiz say
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date exp = extractClaim(token, Claims::getExpiration);
        return exp.before(new Date());
    }

    private Claims parseClaims(String token) {
        // Küçük saat kaymaları için 60 sn tolerans
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .setAllowedClockSkewSeconds(60)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
