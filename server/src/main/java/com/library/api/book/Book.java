package com.library.api.book;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.List;

@Entity
public class Book {
    @Id
    private String id;
    private String title;
    private String description;
    private String coverUrl;
    private List<String> authors;
    private List<String> tags;

    // ✅ Getter'lar (Lombok yoksa elle ekle)
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCoverUrl() { return coverUrl; }
    public List<String> getAuthors() { return authors; }
    public List<String> getTags() { return tags; }
}
