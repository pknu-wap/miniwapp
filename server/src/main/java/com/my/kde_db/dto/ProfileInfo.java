package com.my.kde_db.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProfileInfo {
    private int sessionNumber;
    private int wNumber;

    // Constructors, Getters, Setters
    public ProfileInfo(int sessionNumber, int wNumber) {
        this.sessionNumber = sessionNumber;
        this.wNumber = wNumber;
    }


}
