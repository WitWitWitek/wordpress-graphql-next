import Link from "next/link"

const Layout = ({children}) => {
  return (
    <>
        <nav className="navigation">
            <Link href='/'>strona główna</Link>
            <Link href='/aktualnosci'>aktualności</Link>
        </nav>
        <div className="container">
            {children}
        </div>
    </>
  )
}

export default Layout