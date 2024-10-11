import navData from "@/components/admin/Datas";
import Header from "@/components/admin/Header";
import React from "react";
import './admin.css'
import SaveToken from "@/components/admin/SaveToken";

export const runtime = 'edge';

const Admin = ({ params }: { params: { id: string } }) => {
  const currentPage = navData.find((item) => params.id === item.link);
  return (
    <main>
      <div className="main-background">
        {currentPage?.link == "login" ||
        currentPage?.link == "verification" ||
        currentPage?.link == "forget-password" ? (
          currentPage.page
        ) : (
          <SaveToken>
            <Header activeLink={params.id} />
            <div className="sm:ml-64  mt-14 py-2 sm:py-1">
              {currentPage ? currentPage.page : <p>Page not found</p>}
            </div>
          </SaveToken>
        )}
      </div>
    </main>
  );
};

export default Admin;
