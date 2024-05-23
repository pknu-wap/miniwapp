package com.my.kde_db.vo;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class Calendar {
    private int number=0;
    private String title = null;
    private Timestamp date=null;
}
