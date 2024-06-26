package com.diary.drawing.domain.user.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;

public class MemberDTO {

    @Getter
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor // 기본 생성자 추가
    @Builder
    public static class MemberUpdate{

        @Valid
        @Size(min = 1, max = 50, message = "닉네임은 1에서 50자 사이로 입력해주세요.")
        private String newName;

        private String oldPassword;

        @Size(min = 1, max = 50, message = "닉네임은 1에서 50자 사이로 입력해주세요.")
        private String newPassword;

        @Email(message = "이메일 형식이 아닙니다")
        private String newEmail;

        // 띄어쓰기 없이 010XXXXYYYY 형식으로 입력
        @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$", message = "휴대폰 번호 형식이 아닙니다")
        private String newPhoneNumber;

        private String newProfileImage;
    }

    @Jacksonized
    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class passwordCheck{
        private String oldPassword;
    }

    @Jacksonized
    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class resetPassword{
        private String email;
    }

    
    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class Statistic{
        private Lawn lawn;
        private Value value;
        private List<Emotion> emotions;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class Lawn{
        private int total;
        private List<Data> data;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class Data{
        private LocalDate date;
        private boolean iswritten;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class Value{
        private int month;
        private double average;
        private String style;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class Emotion{
        private int positive;
        private int neutral;
        private int negative;
    }


}
