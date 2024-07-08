package com.example.demo.repository;

import com.example.demo.model.Soccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoccerRepository extends JpaRepository<Soccer, Integer>{
}
