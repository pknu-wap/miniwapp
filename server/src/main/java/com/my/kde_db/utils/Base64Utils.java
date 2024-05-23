package com.my.kde_db.utils;

import java.util.Base64;

public class Base64Utils {
    public static String encode(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }

    public static byte[] decode(String base64String) {
        return Base64.getDecoder().decode(base64String);
    }
}