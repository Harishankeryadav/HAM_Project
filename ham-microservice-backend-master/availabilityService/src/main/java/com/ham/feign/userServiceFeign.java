package com.ham.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="USERSERVICE")
public interface userServiceFeign {
    @GetMapping("users/{id}")
    boolean userExistsById(@PathVariable("id") Integer id);

}
