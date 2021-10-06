export interface IAuthAccessService {
    /**
     * Obtener el Token oAuth de ADFS
     */
    getAccessToken(): string;

    /**
     * Obtener el Nombre del Usuario Autenticado
     */
    getUser(): string;

    /**
     * Obtener el Nombre de Red del Usuario Autenticado
     */
    getUserId(): any;

    /**
     * Valida si la sesión esta activa
     */
    validAccessToken(): boolean;

    /**
     * Cierra la session activa de ADFS
     */
    logOut(): void;

    /**
     * Inicializa el Componente de oauth2-oidc para la autenticacion con ADFS
     */
    initializeOAuthService(): void;
}
