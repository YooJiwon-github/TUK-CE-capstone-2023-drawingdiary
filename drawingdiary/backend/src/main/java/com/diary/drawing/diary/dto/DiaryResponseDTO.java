package com.diary.drawing.diary.dto;

import com.diary.drawing.diary.domain.Diary;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class DiaryResponseDTO {
    private String text;
    private String weather;
    private String month;
    private String day;
    private Long albumID;
    private String albumName;
    private Long styleID;
    private String styleName;
    private String imageURL;
    private String sentiment;
    private String comment;

    public static DiaryResponseDTO from(Diary diary) {
        return DiaryResponseDTO.builder()
                .text(diary.getText())
                .weather(diary.getWeather())
                .month(diary.getDate().getMonth())
                .day(diary.getDate().getDay())
                .albumID(diary.getAlbum().getAlbumID())
                .albumName(diary.getAlbum().getAlbumName())
                .styleID(diary.getImageStyle().getStyleID())
                .styleName(diary.getImageStyle().getStyleName())
                .imageURL(diary.getImage().getImageFile())
                .sentiment(diary.getSentiment().getSentiment())
                .comment(diary.getComment().getComment())
                .build();
    }
}

