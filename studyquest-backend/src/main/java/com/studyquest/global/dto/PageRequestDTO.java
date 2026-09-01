package com.studyquest.global.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class PageRequestDTO {
    private String searchType = "";
    private String keyword = "";

    private int page = 1;
    private int size = 10;

    public PageRequestDTO(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public Pageable getPageable(String sortField) {
        return PageRequest.of(page - 1, size, Sort.Direction.DESC, sortField);
    }
}
