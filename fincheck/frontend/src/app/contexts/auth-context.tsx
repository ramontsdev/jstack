import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LaunchScreen } from "../../view/components/launch-screen";
import { localStorageKeys } from "../config/local-storage-keys";
import { User } from "../entities/user";
import { usersService } from "../services/users-service";

interface AuthContextValue {
  signedIn: boolean;
  user?: User
  signIn(accessToken: string): void;
  signOut(): void;
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, data, remove } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  })

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();

    setSignedIn(false)
  }, [remove])

  useEffect(() => {
    if (isError) {

      toast.error('Sua sessão expirou!')
      signOut()
    }
  }, [isError, signOut])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signIn,
        signOut
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}
