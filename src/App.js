import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [dark, setDark] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({ title: '', location: '', price: '', desc: '' });
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (dark) {
      document.body.style.background = '#1f2430';
      document.body.style.color = '#e5e9ff';
      document.documentElement.style.setProperty('--card', '#1f2a44');
      document.documentElement.style.setProperty('--text', '#e5e9ff');
      document.documentElement.style.setProperty('--muted', '#b0b8d9');
      document.documentElement.style.setProperty('--accent', '#ffb07c');
    } else {
      document.body.style.background = 'var(--bg)';
      document.body.style.color = 'var(--text)';
      document.documentElement.style.setProperty('--card', '#ffffff');
      document.documentElement.style.setProperty('--text', '#1f2d3a');
      document.documentElement.style.setProperty('--muted', '#6e7a94');
      document.documentElement.style.setProperty('--accent', '#ff8c66');
    }
  }, [dark]);

  const addProperty = (e) => {
    e.preventDefault();
    setProperties([
      ...properties,
      { id: Date.now(), ...form }
    ]);
    setForm({ title: '', location: '', price: '', desc: '' });
  };

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <div className="space-between" style={{ marginBottom: 10 }}>
        <h2>Property Listing</h2>
        <div className="filter-dark-toggle">
          <input
            placeholder="Filter by title or location"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="filter-input"
          />
          <button
            className="button toggle-button"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle dark mode"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <form className="card form-card" onSubmit={addProperty}>
        <div className="form-row">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            required
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            required
          />
          <button className="button add-btn" type="submit">
            Add Property
          </button>
        </div>
      </form>

      {filtered.length === 0 ? (
        <div className="no-data">
          <div className="no-data-title">No properties found</div>
          <div className="small">Try adding one or adjust your filter.</div>
        </div>
      ) : (
        <div className="property-grid">
          {filtered.map(p => (
            <div
              key={p.id}
              className="card property-card"
              onClick={() => setSelected(p)}
              tabIndex={0}
              role="button"
              onKeyDown={e => (e.key === 'Enter' ? setSelected(p) : null)}
              aria-label={`View details for ${p.title}`}
            >
              <div className="property-header">
                <div>
                  <div className="property-title">{p.title}</div>
                  <div className="small">{p.location}</div>
                </div>
                <div className="price-badge">₹{p.price}</div>
              </div>
              <div className="small property-desc">{p.desc}</div>
              <div className="tag-wrapper">
                <div className="tag">New</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="close-btn"
              onClick={() => setSelected(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 id="modal-title" style={{ marginTop: 0 }}>{selected.title}</h2>
            <div className="small" style={{ marginBottom: 10 }}>{selected.location}</div>
            <div className="modal-content">
              <div className="modal-info">
                <p><strong>Price:</strong> ₹{selected.price}</p>
                <p><strong>Description:</strong> {selected.desc}</p>
              </div>
              <div className="modal-badge">
                <div className="price-badge" style={{ marginBottom: 10 }}>₹{selected.price}</div>
                <div className="tag">Featured</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
