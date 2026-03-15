package com.revature.Revplay.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LandingPageController {

    @GetMapping("/")
    public String home(Model model) {
        // Adding a basic attribute to test Thymeleaf rend qering
		/*
		 * model.addAttribute("appName", "TEST"); model.addAttribute("currentDateTime",
		 * LocalDateTime.now()); model.addAttribute("currentDate", LocalDate.now());
		 * model.addAttribute("currentTime", LocalTime.now());
		 */

        
        // This exact string must match your HTML file name (without the .html extension)
        return "landing"; 
    }
}
