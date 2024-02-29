package com.diary.drawing.diary.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.diary.domain.Image;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageService {
    private final ImageRepository imageRepository;


    /* 이미지 생성한것 저장 */
    //TODO: 완전히 구현 완료한 이후에 ImageRequestDTO로 넣기, 예외처리
    @Transactional
    public Image createImage(String imageFile, Album album, LocalDate date){
        try {
            Image image = Image.builder()
                .imageFile(imageFile)
                .album(album)
                .date(date)
                .build();
            return imageRepository.save(image);
        } catch (Exception e) {
            // 예외 처리 코드
            System.out.println("이미지 생성 중 오류가 발생했습니다: " + e.getMessage());
            return null;
        }
    }

    /* 이미지 수정하는 메서드 */
    @Transactional // 오류나면 롤백
    public Image updateImage(String imageFile, Album album, Long imageID){


        /* 다이어리에 연결된 이미지 찾기, 없으면 404 에러 */
        Image image = imageRepository.findByImageID(imageID);
        if(image == null){
            throw new DiaryResponseException(DiaryExceptionType.NOT_FOUND_IMAGE);
        }

        /* 이미지 수정하기 */
        image.update(imageFile, album);
        return imageRepository.save(image);

    }
}
