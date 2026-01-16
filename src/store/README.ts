/**
 * Example: How to use Redux user data in any screen
 * 
 * Import the hooks:
 * import { useAppSelector, useAppDispatch } from '../store/hooks';
 * import { setUser, clearUser } from '../store/userSlice';
 * 
 * In your component:
 * 
 * const user = useAppSelector((state) => state.user.user);
 * const dispatch = useAppDispatch();
 * 
 * // Access user data:
 * console.log(user?.username);
 * console.log(user?.walletAddress);
 * console.log(user?.firstname);
 * 
 * // Update user:
 * dispatch(setUser(updatedUserData));
 * 
 * // Clear user (logout):
 * dispatch(clearUser());
 */

export {};
