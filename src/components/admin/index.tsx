import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import navData from "./Datas";
import SaveToken from "./SaveToken";

export const UserHome = ({ page }: { page: string }) => {
  const currentPage = navData.find((item) => page === item.link);
  return (
    <div className="main-background">
      {currentPage?.link == "login" || currentPage?.link == "signup"|| currentPage?.link == "forget-password" ? (
        currentPage.page
      ) : (
        <SaveToken>
          <Header activeLink={page} />
          <div className="sm:ml-64  mt-14 py-2 sm:py-1">
              {currentPage ? currentPage.page : <p>Page not found</p>}
          </div>
          <Footer />
        </SaveToken>
      )}
    </div>
  );
};
