package com.studyquest.global.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.IntStream;

@Getter
@Setter
public class PageResponseDTO<E> {

    private static final int NAVIGATE_SIZE = 10;

    private final List<E> dtoList;
    private final List<Integer> pageNumberList;
    private final PageRequestDTO pageRequestDTO;

    private final boolean prev;
    private final boolean next;

    private final long totalCount;
    private final int prevPage;
    private final int nextPage;
    private final int totalPage;
    private final int currentPage;

    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = totalCount;
        this.currentPage = pageRequestDTO.getPage();

        int size = pageRequestDTO.getSize();

        this.totalPage = (int) Math.ceil((double)totalCount / size);

        int tempEnd = (int) Math.ceil(currentPage / (double) NAVIGATE_SIZE) *  NAVIGATE_SIZE;
        int startPage = tempEnd - (NAVIGATE_SIZE - 1);
        int endPage = Math.min(tempEnd, totalPage);

        this.prev = startPage > 1;
        this.next = endPage < totalPage;

        this.prevPage = prev? startPage - 1 : startPage;
        this.nextPage = next? endPage + 1 : 0;

        this.pageNumberList = totalPage == 0
            ? List.of() : IntStream.rangeClosed(startPage, endPage).boxed().toList();
    }
}
