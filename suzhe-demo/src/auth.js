import Oidc from "oidc-client";

const setting = JSON.parse(process.env.VUE_APP_SSO);
const oidc = new Oidc.UserManager(setting);

export { setting };
export default oidc;
