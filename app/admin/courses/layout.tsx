import NavbarLayout from "./Navbar";
//@ts-ignore
export default function AdminLayout({ children }) {
  return (
    <div>
      <NavbarLayout /> 
      {children}
    </div>
  );
}
