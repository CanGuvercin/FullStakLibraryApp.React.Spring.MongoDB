package com.library.api.book;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

    public BookDetailDto getBookDetail(String id) {
        if (id.equals("1")) {
            return new BookDetailDto(
                    "1",
                    "Clean Code",
                    List.of("Robert C. Martin"),
                    List.of("Programming", "Clean Code"),
                    "A handbook of agile software craftsmanship.",
                    null,
                    "copy-001",
                    false,
                    false,
                    null,
                    null,
                    3
            );
        } else if (id.equals("2")) {
            return new BookDetailDto(
                    "2",
                    "The Pragmatic Programmer",
                    List.of("Andrew Hunt"),
                    List.of("Software Engineering", "Career"),
                    "Journey to mastery for modern developers.",
                    null,
                    null,
                    false,
                    false,
                    null,
                    null,
                    0
            );
        }
        throw new RuntimeException("Book not found");
    }
}
