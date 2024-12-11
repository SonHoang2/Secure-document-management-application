export const checkRole = (user, role) => {
    if (!user) return false;

    console.log(user.role === role);
    
    return user.role === role;
}