package com.diary.drawing.global.jwt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtResponseDTO{
    private final String accessToken;
    private final String refreshToken;
    private final Long memberID;
}