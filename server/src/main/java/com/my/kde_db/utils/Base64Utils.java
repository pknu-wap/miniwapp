package com.my.kde_db.utils;

import java.util.Base64;

public class Base64Utils {

    // 바이너리 데이터를 Base64 문자열로 인코딩
    public static String encode(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }

    // Base64 문자열을 바이너리 데이터로 디코딩
    public static byte[] decode(String base64String) {
        return Base64.getDecoder().decode(base64String);
    }
}
