import { user } from "../db/schema";
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./auth/lucia").Auth;
    type DatabaseUserAttributes = {
        username: string;
    };
    type DatabaseSessionAttributes = {
        username?: string;
    };
}
