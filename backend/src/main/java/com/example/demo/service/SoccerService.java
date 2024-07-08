package com.example.demo.service;

import com.example.demo.model.Soccer;
import java.util.List;

public interface SoccerService {
    public Soccer addSoccer(Soccer soccer);
    public List<Soccer> getSoccer();
    public Soccer deleteSoccer(int id);
    public Soccer updateSoccer(int id, Soccer soccer);
}
