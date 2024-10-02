"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    localStorage.removeItem("accessToken");
    router.replace("/admin/login");
  }, [router]);
  
  return loading ? (
    <div className="h-1 w-full overflow-hidden">
      <div className="animate-progress w-full h-full bg-gray-400 origin-left-right"></div>
    </div>
  ) : (
    <></>
  );
};

export default Logout;
