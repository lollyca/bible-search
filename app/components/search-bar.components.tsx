export default function SearchBar() {
    return (
        <div>
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Key Word" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </div>
    )
}