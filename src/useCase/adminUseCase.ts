import Admin from "../domain/admin";
import IAdminRepository from "./interface/IAdminRepository";
import hashPassword from "../infrastructure/utils/hashPassword";
import JWTtoken from "../infrastructure/utils/JWTtoken";

class adminUseCase {
    private iAdminRepository: IAdminRepository;
    private hashPassword: hashPassword;
    private JWTtoken: JWTtoken;

    constructor(
        iAdminRepository: IAdminRepository,
        hashPassword: hashPassword,
        JWTtoken: JWTtoken
    ) {
        this.iAdminRepository = iAdminRepository;
        this.hashPassword = hashPassword;
        this.JWTtoken = JWTtoken;
    }

    async adminLogin(admin: any) {
        try {
            console.log("usecase");
            const adminFound: any = await this.iAdminRepository.findByEmail(
                admin.email
            );
            if (adminFound) {
                const passwordMatch = await this.hashPassword.compare(
                    admin.password,
                    adminFound.password
                );
                if (passwordMatch) {
                    const token = this.JWTtoken.createJwt(adminFound._id, "admin");
                    return {
                        status: 200,
                        data: {
                            success: true,
                            message: "Authenticated successfully",
                            buyerId: adminFound._id,
                            token: token,
                        },
                    };
                } else {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: "Incorrect password or email",
                        },
                    };
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default adminUseCase;
