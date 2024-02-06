package com.kollicon.utils;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;

@Converter(autoApply = true)
public class FloatArrayConverter implements AttributeConverter<Float[], String> {

    @Override
    public String convertToDatabaseColumn(Float[] attribute) {
        if (attribute == null) {
            return null;
        }
        return Arrays.toString(attribute);
    }

    @Override
    public Float[] convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        String[] parts = dbData.substring(1, dbData.length() - 1).split(", ");
        Float[] result = new Float[parts.length];
        for (int i = 0; i < parts.length; i++) {
            result[i] = Float.parseFloat(parts[i]);
        }
        return result;
    }
}