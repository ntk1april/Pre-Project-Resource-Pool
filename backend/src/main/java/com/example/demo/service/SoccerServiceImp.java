package com.example.demo.service;

import com.example.demo.model.Soccer;
import com.example.demo.repository.SoccerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SoccerServiceImp implements SoccerService{

    @Autowired
    private SoccerRepository soccerRepository;

    @Override
    public Soccer addSoccer(Soccer soccer) {
        return soccerRepository.save(soccer);
    }

    @Override
    public List<Soccer> getSoccer() {
        return soccerRepository.findAll();
    }

    @Override
    public Soccer updateSoccer(int id, Soccer soccer) {
        Soccer soccer1 = soccerRepository.findById(id).get();
        soccer1.setName(soccer.getName());
        soccer1.setTeam(soccer.getTeam());
        soccer1.setNumber(soccer.getNumber());
        soccer1.setImage(soccer.getImage());
        return soccerRepository.save(soccer1);
    }

    @Override
    public Soccer deleteSoccer(int id) {
        Soccer soccer = soccerRepository.findById(id).get();
        soccerRepository.deleteById(id);
        return soccer;
    }
}
