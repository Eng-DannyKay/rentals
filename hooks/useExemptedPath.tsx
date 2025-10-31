import { usePathname } from "next/navigation";

export const useExemptedPath = () => {
  const pathName = usePathname();

  const exemptedPath = ["/sign-in", "/verify" ,'/sign-up'];
    const isPathExempted = exemptedPath.includes(pathName);
    
    
  return { pathName, isPathExempted };
};
