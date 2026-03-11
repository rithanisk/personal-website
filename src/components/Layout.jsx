import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen border-x border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[var(--background)]">
      <Sidebar />
      <main className="w-full pl-0 pr-6 pt-28 pb-10 sm:pt-32 sm:pb-14 md:pl-16 md:pt-28 md:pb-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}
