package com.skillswap.api.skill;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "skillswap-skills")
public class SkillDocument {

    @Id
    private String id;
    private String title;
    private String category;
    private String description;
    private String fullDescription;
    private SkillLevel level;
    private SkillModality modality;
    private String exchangeFor;
    private String availability;
    private String userName;
    private String userHeadline;
    private String location;
    private boolean featured;

    public SkillDocument() {
    }

    public SkillDocument(
            String id,
            String title,
            String category,
            String description,
            String fullDescription,
            SkillLevel level,
            SkillModality modality,
            String exchangeFor,
            String availability,
            String userName,
            String userHeadline,
            String location,
            boolean featured
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.fullDescription = fullDescription;
        this.level = level;
        this.modality = modality;
        this.exchangeFor = exchangeFor;
        this.availability = availability;
        this.userName = userName;
        this.userHeadline = userHeadline;
        this.location = location;
        this.featured = featured;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public SkillLevel getLevel() {
        return level;
    }

    public void setLevel(SkillLevel level) {
        this.level = level;
    }

    public SkillModality getModality() {
        return modality;
    }

    public void setModality(SkillModality modality) {
        this.modality = modality;
    }

    public String getExchangeFor() {
        return exchangeFor;
    }

    public void setExchangeFor(String exchangeFor) {
        this.exchangeFor = exchangeFor;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserHeadline() {
        return userHeadline;
    }

    public void setUserHeadline(String userHeadline) {
        this.userHeadline = userHeadline;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
