import { apiConfig } from "../../config/apiConfig";
import { ICredentials } from "../../data/credentials";
import { IRequestOptions } from "../../data/types/api.types"

class SignInController {
    async login(credentials: ICredentials) {
        const url = apiConfig.baseUrl + apiConfig.endpoints.login;
        const options: IRequestOptions = {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(credentials)
        };
        return await fetch(url, options)
    }
}

export default new SignInController();
