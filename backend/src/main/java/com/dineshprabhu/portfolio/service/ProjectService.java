package com.dineshprabhu.portfolio.service;

import com.dineshprabhu.portfolio.entity.Project;
import com.dineshprabhu.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Project> getFeaturedProjects() {
        return repository.findByFeaturedTrueOrderByDisplayOrderAsc();
    }

    public Project getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project create(Project project) {
        return repository.save(project);
    }

    public Project update(Long id, Project updated) {
        Project existing = getById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setTechStack(updated.getTechStack());
        existing.setGithubUrl(updated.getGithubUrl());
        existing.setDemoUrl(updated.getDemoUrl());
        existing.setImage(updated.getImage());
        existing.setFeatured(updated.isFeatured());
        existing.setDisplayOrder(updated.getDisplayOrder());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
