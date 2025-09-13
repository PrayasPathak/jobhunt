package com.jobportal.entity;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.UserDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    private AccountType accountType;
    private String profileId;

    public UserDto toDto() {
        return UserDto.builder()
                .id(this.id)
                .name(this.name)
                .email(this.email)
                .password(this.password)
                .accountType(this.accountType)
                .profileId(this.profileId)
                .build();
    }
}
