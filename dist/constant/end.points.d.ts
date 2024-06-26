export declare enum END_POINTS {
    BLANK = "/",
    AWS = "/aws",
    ENC_DEC = "/api/v1/enc-dec",
    MAIN = "/api/v1",
    AUTH = "/auth",
    CHECK_PHONE_EMAIL = "/signup-check-phone-email/:phone/:email",
    ALL = "*",
    USER = "/user",
    ADMIN = "/admin",
    CRAETE_USER = "/create-user",
    LOGIN = "/login",
    ADMIN_LOGIN = "/admin-login",
    SEND_OTP = "/send-otp/:email",
    VERIFY_OTP = "/verify-otp",
    CHANGE_PASSWORD = "/change-password",
    SIGN_UP = "/sign-up",
    ADMIN_SIGN_UP = "/admin-sign-up",
    UPDATE_USER = "/update-user/:id",
    DELETE_USER = "/delete/:id",
    DECRPTIONS = "/decryption",
    ENCRIPTIONS = "/encryption",
    COUNTRY_LIST = "/get-country-list",
    STATE_LIST = "/state-list/:country_id",
    CITY_LIST = "/city-list/:state_id",
    COUNTRY = "/country"
}
