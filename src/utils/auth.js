export const isUserAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Converte a presença do token em um booleano verdadeiro ou falso.
};
