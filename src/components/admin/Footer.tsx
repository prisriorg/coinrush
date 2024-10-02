
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="main-background border-toper p-4 sm:ml-64">
      <div className="container mx-auto text-center">
        <p>
          &copy; 2024 <Link href="/admin">admin</Link>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
