package com.library.api.book;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data                   // getter + setter + toString iyilk ivarsın lan Lombok efendi heehehe
@Builder                // builder pattern
@NoArgsConstructor      // boş constructor
@AllArgsConstructor     // tüm alanlar constructor
@Document("books")
public class Book {

    @Id
    private String id;

    private String title;
    private String description;
    private String coverUrl;
    private List<String> authors;
    private List<String> tags;
    private String isbn;
    private Integer publicationYear;
}
