import React, { useState } from "react";
import "./App.css";

const adminLogin = "admin";
const adminPass = "adminPass";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-warning">
      <div className="container-fluid">
        <i className="navbar-brand fs-3">Sklep Szkolny "Buła"</i>
      </div>
    </nav>
  );
}

function Login({ setIsAddingItem, setIsAdmin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === adminLogin && password === adminPass) {
      setIsAuthenticated(true);
      setIsAdmin(true); // Ustawia użytkownika jako administratora
      alert("Logowanie udane!");
    } else {
      alert("Błędny login lub hasło!");
    }
  };

  return (
    <div id="right" className="border-start border-secondary">
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
          <button type="submit" className="btn btn-primary mt-0">
            Submit
          </button>
        </form>
        {isAuthenticated && (
          <p className = "text-success">Jesteś zalogowany!</p>
        )}
        {isAuthenticated && (
          <button
            className="btn btn-success mt-0 mb-2"
            onClick={() => setIsAddingItem(true)}
          >
            Dodaj element
          </button>
        )}
      </div>
    </div>
  );
}

function AddItemForm({ onAddItem, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    onAddItem({ name, price: parseFloat(price), description });
    onCancel();
  };

  return (
    <div id = "App" className="border border-dark rounded p-4">
      <h3>Dodaj nowy element</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nazwa produktu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Cena produktu (zł)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Opis produktu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Dodaj
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
          Anuluj
        </button>
      </form>
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
        <h4>{elem.name}</h4>
      </div>
      <div className="mt-3">
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

function Lista({ items, onSelect, onDelete, isAdmin }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={index} className="d-flex justify-content-between align-items-center mb-2">
          <button className="btn1 me-2" onClick={() => onSelect(item)}>
            <b>{index + 1}. {item.name}</b>
          </button>
          {isAdmin && (
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>
              Usuń
            </button>
          )}
        </li>
      ))}
    </ol>
  );
}

function Footer() {
  return (
    <p>Kontakt: +48 233 882 738; E-mail: bula_sklep@mail.com</p>
  );
}

function App() {
  const [items, setItems] = useState([
    { name: "Hot dog", price: 4, description: "Hot dog z wybranym sosem, klasyczna przekąska"},
    { name: "Bułka", price: 3, description: "Bułka z szynką, serem, lub obojgiem. Można dodać sos." },
    { name: "Napój", price: 2, description: "Orzeźwiający napój do wyboru." },
    { name: "Batonik", price: 1.5, description: "Słodka przekąska, iwiele rodzajów." },
    { name: "Zupa", price: 5, description: "Ciepła zupa z saszetki." },
  ]);

  const [selectedElem, setSelectedElem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setSelectedElem(null); // Resetuj zaznaczony element, jeśli został usunięty
  };

  return (
    <div className="container-fluid w-auto">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container text-center mb-0">
          <div id="left" className="border-end border-secondary">
            <h3>Lista elementów</h3>
            <Lista
              items={items}
              onSelect={setSelectedElem}
              onDelete={handleDeleteItem}
              isAdmin={isAdmin}
            />
          </div>
          <div id="mid" className="h-100 mb-0">
            {isAddingItem ? (
              <AddItemForm
                onAddItem={(newItem) => setItems((prevItems) => [...prevItems, newItem])}
                onCancel={() => setIsAddingItem(false)}
              />
            ) : (
              <Elem elem={selectedElem} />
            )}
          </div>
          <Login setIsAddingItem={setIsAddingItem} setIsAdmin={setIsAdmin} />
        </div>
      </main>
      <footer className="bg-warning text-start m-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
