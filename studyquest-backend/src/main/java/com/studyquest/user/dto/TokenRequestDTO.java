package com.studyquest.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRequestDTO {
    private String accessToken;
    private String refreshToken;
}
