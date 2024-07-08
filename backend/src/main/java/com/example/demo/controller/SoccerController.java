package com.example.demo.controller;

import com.example.demo.model.Soccer;
import com.example.demo.service.SoccerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/soccer")
public class SoccerController {
    @Autowired
    private SoccerService soccerService;

    @PostMapping("/add")
    public String add(@RequestBody Soccer soccer) {
        soccerService.addSoccer(soccer);
        return "Soccer added successfully";
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable int id, @RequestBody Soccer soccer) {
        soccerService.updateSoccer(id, soccer);
        return "Soccer updated successfully";
    }

    @GetMapping("/get")
    public List<Soccer> getSoccer() {
        return soccerService.getSoccer();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        soccerService.deleteSoccer(id);
        return "Soccer deleted successfully";
    }
}
