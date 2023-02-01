package xyz.helpmebuy.exception;

public class AuthenticationException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Authentication error";
    }
}
