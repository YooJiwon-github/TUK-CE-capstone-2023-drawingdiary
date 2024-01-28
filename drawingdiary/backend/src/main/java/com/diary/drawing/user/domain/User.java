package com.diary.drawing.user.domain;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;


@Entity
@Data     //보안 문제 있을 것 같음 나중에 수정
@Table(name = "User")
public class User {
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    @Column(length = 50)
    private String name;

    @Column(unique = true, length = 255)
    private String email;

    @Column(length = 255)
    private String password;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birth;

    private char gender;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 50)
    private String personality;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private UserRole role; //ROLE_USER, ROLE_ADMIN

    private String provider;
    private String providerID;

    public String getRole() {
        return this.role.name();
    }
    

    @Override
    public String toString(){
        return "UserID: " + this.userID + "Name: " +  this.name + "Email: " + this.email + "Password: " + this.password
                + "Birth: " + this.birth + "Gender: " + this.gender + "PhoneNumber: " + this.phoneNumber
                + "Personality: " + this.personality;
    }

    public User (){}

    @Builder // 나중에 보안성 높이고 일단 구현(access = AccessLevel=private)
    public User(String Name, String Email, Date Birth, char Gender, String Password, String PhoneNumber, String Personality, UserRole role, String provider, String providerID){
        this.name = Name;
        this.email = Email;
        this.birth = Birth;
        this.gender = Gender;
        this.password = Password;
        this.phoneNumber = PhoneNumber;
        this.personality = Personality;
        this.role = role;
        this.provider = provider;
        this.providerID = providerID;
    }








    
}