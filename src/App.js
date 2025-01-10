import React, { useState } from "react";
import "./App.css";

const adminLogin = "admin";
const adminPass = "adminPass";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-warning">
      <div className="container-fluid">
        <i className="navbar-brand">Sklep Szkolny "Buła"</i>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="btn">Home</button>
          </li>
          <li className="nav-item">
            <button className="btn">Link</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  var isLoggedIn = false

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === adminLogin && password === adminPass) {
      setIsAuthenticated(true);
      alert("Logowanie udane!");
      isLoggedIn = true;
    } else {
      alert("Błędny login lub hasło!");
    }
  };

  return (
    <div className="border border-dark rounded">
      <form id="logowanie" className="p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <h3>Panel Logowania</h3>
          <input
            type="text"
            className="form-control bg-warning-subtle"
            id="login"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-warning-subtle"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {isAuthenticated && <p className="text-success">Jesteś zalogowany!</p>}
    </div>
  );
}

function Elem({ elem }) {
  if (!elem) {
    return <h4>Wybierz element z listy!</h4>;
  }

  return (
    <div className="border border-dark rounded p-3">
      <div id="box" className="d-flex flex-column align-items-center">
        <div id="img" className="border border-dark rounded mb-3">
          {/* Wstawienie obrazka z odpowiednim opisem, lub tekst zastępczy */}
          <img
            src={elem.image || ""}
            alt={elem.name ? `Zdjęcie dla: ${elem.name}` : "Brak zdjęcia"}
          />
        </div>
        {/* Wyświetlenie nazwy elementu */}
        <h4>{elem.name}</h4>
      </div>
      <div className="mt-3">
        {/* Wyświetlenie ceny i opisu elementu */}
        <p>
          <b>Cena:</b> {elem.price} zł
        </p>
        <p>
          <b>Opis:</b> {elem.description}
        </p>
      </div>
    </div>
  );
}


function Lista({ onSelect }) {
  const items = [
    { name: "Hot dog", price: 4, description: "Hot dog z wybranym sosem, klasyczna przekąska" },
    { name: "Bułka", price: 3, description: "Bułka z szynką, serem, lub obojgiem! Można dodać sos." },
    { name: "Napój", price: 2, description: "Orzeźwiający napój do wyboru." },
    { name: "Batonik", price: 1.5, description: "Słodka przekąska, iwiele rodzaji." },
    { name: "Zupa", price: 5, description: "Ciepła zupa z saszetki." }
  ];

  return (
    <ol>
      {items.map((item, index) => (
        <li key={index}>
          <button
            className="btn1"
            onClick={() => onSelect(item)} // Przekazanie całego obiektu `item`
          >
            <b>{item.name}</b>
          </button>
        </li>
      ))}
    </ol>
  );
}

function App() {
  const [selectedElem, setSelectedElem] = useState(null); // Stan dla wybranego elementu

  return (
    <div className="container-fluid">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container text-center">
          <div id="left" className="border-end border-secondary">
            <h3>Lista elementów</h3>
            <Lista onSelect={setSelectedElem} />
          </div>
          <div id="mid">
            <Elem elem={selectedElem} />
          </div>
          <div id="right" className="border-start border-secondary">
            <Login />
          </div>
        </div>
      </main>
      <footer className="bg-warning text-start">
        <Footer />
      </footer>
    </div>
  );
}


function Footer() {
  return (
    <p>Kontakt: +48 233 882 738; E-mail: bula_sklep@mail.com</p>
  );
}

export default App;
