package com.revature.Revplay.dto;

public class AlbumSearchDTO {

    private Long albumId;
    private String title;
//    private String coverImage;

    public AlbumSearchDTO(Long albumId, String title) {
        this.albumId = albumId;
        this.title = title;
//        this.coverImage = coverImage;
    }

    public Long getAlbumId() { return albumId; }
    public String getTitle() { return title; }
//    public String getCoverImage() { return coverImage; }
}