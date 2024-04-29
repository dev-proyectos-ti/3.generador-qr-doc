package pe.gob.minjus.generaqrdocumentos.utils;

import java.io.UnsupportedEncodingException;

public class Functions {
    public static String stringToUtf8(String value) throws UnsupportedEncodingException{
        return new String(value.getBytes("ISO-8859-1"), "UTF-8");
    }
}
