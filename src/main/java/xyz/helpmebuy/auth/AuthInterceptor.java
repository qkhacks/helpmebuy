package xyz.helpmebuy.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import xyz.helpmebuy.exception.AuthenticationException;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final String adminSecret;

    @Autowired
    public AuthInterceptor(@Value("${admin.secret}") String adminSecret) {
        this.adminSecret = adminSecret;
    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (handler instanceof HandlerMethod) {
            Object handlerBean = ((HandlerMethod) handler).getBean();

            if (handlerBean instanceof RequiresAdminAuthentication) {
                String extractedAdminSecret = extractAdminSecret(request);

                if (!extractedAdminSecret.equals(adminSecret)) {
                    throw new AuthenticationException();
                }
            }
        }

        return true;
    }

    private String extractAdminSecret(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null) {
            throw new AuthenticationException();
        }

        String[] authorizationComponents = authorizationHeader.split("\\s+");

        if (authorizationComponents.length != 2) {
            throw new AuthenticationException();
        }

        if (!authorizationComponents[0].equals("AdminSecret")) {
            throw new AuthenticationException();
        }

        return authorizationComponents[1];
    }
}