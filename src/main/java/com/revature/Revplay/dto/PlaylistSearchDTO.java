package com.revature.Revplay.dto;

public class PlaylistSearchDTO {

    private Long playlistId;
    private String name;
//    private String coverImage;

    public PlaylistSearchDTO(Long playlistId, String name) {
        this.playlistId = playlistId;
        this.name = name;
//        this.coverImage = coverImage;
    }

    public Long getPlaylistId() { return playlistId; }
    public String getName() { return name; }
//    public String getCoverImage() { return coverImage; }
}