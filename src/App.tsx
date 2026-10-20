import { FormEvent, ReactNode, useState } from "react";

type Role = "customer" | "farmer";
type Page = "home" | "dashboard" | "delivery" | "account";
type Profile = {
  role: Role;
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  address: string;
};
type Product = {
  id: number;
  name: string;
  farm: string;
  location: string;
  price: number;
  unit: string;
  stock: number;
  preorder: number;
  image: string;
  tag: string;
  sameDay: boolean;
  note?: string;
};

const photos = {
  hero: "https://images.unsplash.com/photo-1567306295427-94503f8300d7?auto=format&fit=crop&w=1600&q=85",
  carrots: "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?auto=format&fit=crop&w=900&q=85",
  basket: "https://images.unsplash.com/photo-1624668430039-0175a0fbf006?auto=format&fit=crop&w=900&q=85",
  tomatoes: "https://images.unsplash.com/photo-1631021967261-c57ee4dfa9bb?auto=format&fit=crop&w=900&q=85",
  vegetables: "https://images.unsplash.com/photo-1627989147125-a004d05946d3?auto=format&fit=crop&w=900&q=85",
};

const products: Product[] = [
  {
    id: 1,
    name: "Highland Carrots",
    farm: "Lola Nena's Garden",
    location: "Purok 3, Strawberry Farm Road, La Trinidad",
    price: 85,
    unit: "kg",
    stock: 18,
    preorder: 30,
    image: photos.carrots,
    tag: "Fresh today",
    sameDay: true,
  },
  {
    id: 2,
    name: "Salad Greens Basket",
    farm: "Annie's Place",
    location: "5 New Lucban Private Road, Baguio City",
    price: 140,
    unit: "basket",
    stock: 0,
    preorder: 12,
    image: photos.basket,
    tag: "Pre-order",
    sameDay: false,
    note: "Out of stock for same-day orders. The next harvest is available for pre-order.",
  },
  {
    id: 3,
    name: "Vine-Ripe Tomatoes",
    farm: "Sablan Sunrise Farm",
    location: "House 12, Purok 2, Bayabas, Sablan",
    price: 95,
    unit: "kg",
    stock: 7,
    preorder: 16,
    image: photos.tomatoes,
    tag: "Popular nearby",
    sameDay: false,
    note: "Same-day delivery isn't available because this farm is too far from your address.",
  },
  {
    id: 4,
    name: "Harvest Vegetable Box",
    farm: "Tuba Hills Growers",
    location: "Green Gate, Purok 6, Poblacion, Tuba",
    price: 380,
    unit: "box",
    stock: 4,
    preorder: 0,
    image: photos.vegetables,
    tag: "Limited",
    sameDay: false,
    note: "This seller isn't accepting same-day orders. Pre-order slots are also full.",
  },
];

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, ReactNode> = {
    leaf: <><path d="M20 4c-7 0-12 3-12 9 0 2 1 4 3 5" /><path d="M4 21c3-6 8-10 14-13" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></>,
    truck: <><path d="M3 5h11v12H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-5 4-7 8-7s7 2 8 7" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    heart: <path d="M20.8 5.8c-2-2-5.3-2-7.3 0L12 7.3l-1.5-1.5a5.2 5.2 0 0 0-7.3 7.4L12 22l8.8-8.8c2-2 2-5.3 0-7.4Z" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h11" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1A8 8 0 0 0 15 6l-.3-2.5h-4L10.4 6a8 8 0 0 0-1.7 1L6.5 6 4.4 9.5 6.5 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.2-1a8 8 0 0 0 1.7 1l.3 2.5h4L15 18a8 8 0 0 0 1.6-1l2.3 1 2-3.5-2-1.4a7 7 0 0 0 .1-1Z" /></>,
    store: <><path d="M4 10v10h16V10M3 4h18l-2 6H5L3 4Z" /><path d="M9 20v-6h6v6" /></>,
    logout: <><path d="M10 5H4v14h6M14 8l4 4-4 4M8 12h10" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 20h4" /></>,
    seed: <><path d="M12 21v-9" /><path d="M12 14c-5 0-7-3-7-7 5 0 7 3 7 7ZM12 11c0-5 3-7 7-7 0 5-3 7-7 7Z" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    phone: <path d="M6 3h4l1 5-3 2c2 4 4 6 8 8l2-3 5 1v4c0 2-2 3-4 3C10 21 3 14 3 5c0-2 1-2 3-2Z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

function Logo({ light = false, welcomeBrand = false, label = "ani" }: { light?: boolean; welcomeBrand?: boolean; label?: "ani" | "ApiTech" }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`}>
      <span className="logo-mark"><Icon name="leaf" size={22} /></span>
      <span className={welcomeBrand ? "welcome-brand-name" : ""}>{label === "ApiTech" || welcomeBrand ? "ApiTech" : <>ani<span className="logo-dot">.</span></>}</span>
    </div>
  );
}

const demoProfile = (role: Role, name: string): Profile => ({
  role,
  name,
  username: role === "farmer" ? "ramon.grows" : "maria.s",
  email: role === "farmer" ? "ramon@delacruzfarm.ph" : "maria@example.com",
  phone: "+63 917 123 4567",
  city: role === "farmer" ? "La Trinidad" : "Baguio",
  address: role === "farmer" ? "Farm House 14, Purok 3, Wangal" : "Annie's Place, 5 New Lucban Private Road",
});

function Welcome({ onEnter }: { onEnter: (profile: Profile) => void }) {
  const [mode, setMode] = useState<"intro" | "form" | "login">("intro");
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>("customer");
  const [name, setName] = useState("Maria Santos");
  const [username, setUsername] = useState("maria.s");
  const [email, setEmail] = useState("maria@example.com");
  const [phone, setPhone] = useState("+63 917 123 4567");
  const [city, setCity] = useState("Baguio");
  const [address, setAddress] = useState("Annie's Place, 5 New Lucban Private Road");
  const [loginEmail, setLoginEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else onEnter({ role, name: name || "Maria Santos", username, email, phone, city, address });
  };

  return (
    <main className="welcome">
      <section className="welcome-photo" style={{ backgroundImage: `linear-gradient(180deg, rgba(5,71,33,.05), rgba(5,71,33,.72)), url(${photos.hero})` }}>
        <div className="welcome-brand"><Logo light welcomeBrand /></div>
        <div className="welcome-quote">
          <span className="eyebrow light">WELCOME!</span>
          <h1>Good food begins with knowing who grew it.</h1>
          <p>{""}</p>
        </div>
        <div className="photo-credit">Photo by Shelley Pauls on Unsplash</div>
      </section>
      <section className="welcome-panel">
        <div className="welcome-mobile-logo"><Logo label="ApiTech" /></div>
        {mode === "intro" ? (
          <div className="intro-card">
            <span className="eyebrow">{""}</span>
            <h2>{""}</h2>
            <p>{""}</p>
            <button className="btn primary wide" onClick={() => setMode("form")}>Create your account <span>→</span></button>
            <div className="divider"><span>or explore the demo</span></div>
            <div className="demo-buttons">
              <button className="btn soft" onClick={() => onEnter(demoProfile("customer", "Maria Santos"))}>Enter as customer</button>
              <button className="btn soft" onClick={() => onEnter(demoProfile("farmer", "Ramon Dela Cruz"))}>Enter as farmer</button>
            </div>
            <p className="signin">Already have an account? <button onClick={() => setMode("login")}>Log in</button></p>
          </div>
        ) : mode === "form" ? (
          <form className="signup-card" onSubmit={submit}>
            <button type="button" className="back-link" onClick={() => step === 1 ? setMode("intro") : setStep(1)}><Icon name="back" /> Back</button>
            <div className="step-row"><span>STEP {step} OF 2</span><div><i className="active" /><i className={step === 2 ? "active" : ""} /></div></div>
            {step === 1 ? (
              <>
                <h2>Tell us about you</h2>
                <p className="form-lead">A few details will help us make your local market feel personal.</p>
                <div className="field-grid">
                  <label className="field"><span>Full name</span><input onChange={(e) => setName(e.target.value)} required /></label>
                  <label className="field"><span>Username</span><input onChange={(e) => setUsername(e.target.value)} required /></label>
                  <label className="field full"><span>Email address</span><input type="email" onChange={(e) => setEmail(e.target.value)} required /></label>
                  <label className="field"><span>Contact number</span><input onChange={(e) => setPhone(e.target.value)} required /></label>
                  <label className="field"><span>Location</span><select defaultValue="" onChange={(e) => setCity(e.target.value)} required><option value="" disabled>Select location</option><option>Baguio</option><option>La Trinidad</option><option>Itogon</option><option>Sablan</option><option>Tuba</option><option>Tublay</option></select></label>
                  <label className="field full"><span>Complete address</span><input onChange={(e) => setAddress(e.target.value)} required /></label>
                  <label className="field full"><span>Password</span><input type="password" required /></label>
                </div>
              </>
            ) : (
              <>
                <h2>How will you use ApiTech?</h2>
                <p className="form-lead">Choose what feels right. You can always update this later.</p>
                <div className="role-options">
                  <button type="button" className={`role-card ${role === "customer" ? "selected" : ""}`} onClick={() => setRole("customer")}>
                    <span className="role-icon"><Icon name="bag" size={26} /></span><span><b>I'm here to shop</b><small>Find fresh crops from nearby growers</small></span><i />
                  </button>
                  <button type="button" className={`role-card ${role === "farmer" ? "selected" : ""}`} onClick={() => setRole("farmer")}>
                    <span className="role-icon"><Icon name="seed" size={28} /></span><span><b>I grow or sell produce</b><small>Share my harvest and manage my business</small></span><i />
                  </button>
                </div>
                {role === "farmer" && (
                  <div className="farmer-question">
                    <span>Tell us about your farm</span>
                    <p>What do you grow or sell?</p>
                    <textarea />
                  </div>
                )}
              </>
            )}
            <button className="btn primary wide" type="submit">{step === 1 ? "Continue" : "Finish registration"} <span>→</span></button>
            <p className="privacy">By continuing, you agree to ApiTech Terms and Privacy Policy.</p>
          </form>
        ) : (
          <form className="login-card" onSubmit={(event) => { event.preventDefault(); onEnter({ ...demoProfile("customer", "User"), email: loginEmail, username: loginEmail.split("@")[0] || "user" }); }}>
            <button type="button" className="back-link" onClick={() => setMode("intro")}><Icon name="back" /> Back</button>
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Log in to ApiTech</h2>
            <p className="form-lead">Enter your account details to continue to your local marketplace.</p>
            <div className="login-fields">
              <label className="field">
                <span>Email address</span>
                <input type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} autoComplete="email" required />
              </label>
              <label className="field">
                <span>Password</span>
                <input type="password" autoComplete="current-password" required />
              </label>
            </div>
            <div className="login-help">
              <label><input type="checkbox" /> <span>Remember me</span></label>
              <button type="button">Forgot password?</button>
            </div>
            <button className="btn primary wide" type="submit">Log in <span>→</span></button>
            <p className="signin">New to ApiTech? <button type="button" onClick={() => setMode("form")}>Create an account</button></p>
          </form>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <article className="product-card" onClick={onOpen}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="product-tag">{product.tag}</span>
        <button className="heart-btn" aria-label={`Save ${product.name}`} onClick={(e) => e.stopPropagation()}><Icon name="heart" size={18} /></button>
      </div>
      <div className="product-info">
        <div className="product-heading"><h3>{product.name}</h3><strong>₱{product.price}<small>/{product.unit}</small></strong></div>
        <p>{product.farm}</p>
        <div className="meta"><span><Icon name="pin" size={14} /> {product.location.split(",").at(-1)}</span><span className={product.stock ? "in-stock" : "out-stock"}>{product.stock ? `${product.stock} available` : "Same-day sold out"}</span></div>
      </div>
    </article>
  );
}

function Home({ role, name, onProduct }: { role: Role; name: string; onProduct: (p: Product) => void }) {
  return (
    <div className="page home-page">
      <section className="hero-banner">
        <div className="hero-content">
          <span className="eyebrow light">FRESH FROM BENGUET</span>
          <h1>Good morning, {name.split(" ")[0]}.</h1>
          <p>{role === "farmer" ? "See what's fresh nearby and keep an eye on today's harvest." : "What would you like to bring home today?"}</p>
          <div className="search-box"><Icon name="search" /><input aria-label="Search crops" placeholder="Search carrots, lettuce, seeds..." /><button>Search</button></div>
        </div>
        <div className="hero-stamp"><Icon name="leaf" size={25} /><span>LOCAL<br />& FRESH</span></div>
      </section>

      <section className="content-section">
        <div className="section-title">
          <div><span className="eyebrow">NEAR YOUR ADDRESS</span><h2>Picked for you</h2></div>
          <button className="text-link">See all <span>→</span></button>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} onOpen={() => onProduct(product)} />)}
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <div className="section-title compact"><div><span className="eyebrow">SHOP BY PLACE</span><h2>Harvests around you</h2></div></div>
          <div className="locations">
            {["Baguio", "La Trinidad", "Itogon", "Sablan", "Tuba", "Tublay"].map((place, i) => (
              <button key={place} className={i === 0 ? "active" : ""}><span>{place}</span><small>{[24, 31, 12, 18, 9, 14][i]} crops</small></button>
            ))}
          </div>
        </div>
        <aside className="market-note">
          <span className="note-art"><Icon name="seed" size={38} /></span>
          <div><span className="eyebrow">GENTLE REMINDER</span><h3>Order before 5 PM</h3><p>Same-day orders close at 5 PM so our farmers have enough time to pack your harvest with care.</p></div>
        </aside>
      </section>
    </div>
  );
}

function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const [orderType, setOrderType] = useState<"today" | "preorder">(product.sameDay ? "today" : "preorder");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showNotice, setShowNotice] = useState(product.stock === 0 && product.preorder > 0);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="product-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        <div className="detail-image"><img src={product.image} alt={product.name} /><span>{product.tag}</span></div>
        <div className="detail-content">
          <button className="back-link" onClick={onClose}><Icon name="back" /> Back to harvests</button>
          <div className="detail-title"><div><span className="eyebrow">FRESH PRODUCE</span><h2>{product.name}</h2><p>Grown by {product.farm}</p></div><strong>₱{product.price}<small> / {product.unit}</small></strong></div>
          <div className="farm-address"><Icon name="pin" /><div><b>Pickup and delivery origin</b><span>{product.location}</span></div></div>
          <p className="description">Carefully picked and packed by local growers. Natural sizes and colors may vary with each harvest. Orders for same-day delivery must be placed before 5 PM.</p>

          {product.note && <div className="stock-message"><Icon name="bell" /><div><b>Availability update</b><span>{product.note}</span></div></div>}
          <div className="order-options">
            <span className="input-label">How would you like to order?</span>
            <div className="option-row">
              {product.sameDay && product.stock > 0 && <button className={orderType === "today" ? "selected" : ""} onClick={() => setOrderType("today")}><b>Same-day</b><span>{product.stock} in stock</span></button>}
              {product.preorder > 0 && <button className={orderType === "preorder" ? "selected" : ""} onClick={() => setOrderType("preorder")}><b>Pre-order</b><span>{product.preorder} slots left</span></button>}
              {!product.preorder && <div className="unavailable-option"><b>Pre-order full</b><span>Next batch to be announced</span></div>}
            </div>
          </div>
          {orderType === "preorder" && product.preorder > 0 && (
            <div className="schedule">
              <div className="schedule-head"><span><Icon name="seed" /> Choose your delivery schedule</span><small>Swipe or scroll each column</small></div>
              <div className="wheel">
                <label><span>MONTH</span><select defaultValue="June"><option>May</option><option>June</option><option>July</option></select></label>
                <label><span>DATE</span><select defaultValue="18"><option>17</option><option>18</option><option>19</option></select></label>
                <label><span>TIME</span><select defaultValue="10–11 AM"><option>9–10 AM</option><option>10–11 AM</option><option>2–3 PM</option></select></label>
              </div>
            </div>
          )}
          <div className="purchase-row">
            <div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div>
            <button className="btn primary grow" disabled={!product.stock && !product.preorder} onClick={() => setAdded(true)}>{added ? <><Icon name="check" /> Added to basket</> : `Add to basket · ₱${product.price * quantity}`}</button>
          </div>
        </div>
      </div>
      {showNotice && (
        <div className="notice-pop">
          <button onClick={() => setShowNotice(false)}><Icon name="close" size={18} /></button>
          <span className="notice-icon"><Icon name="seed" size={27} /></span>
          <h3>Today's harvest is sold out</h3>
          <p>Good news—the next harvest has {product.preorder} pre-order slots available. Would you like to reserve one?</p>
          <div><button className="btn soft" onClick={onClose}>Cancel</button><button className="btn primary" onClick={() => { setOrderType("preorder"); setShowNotice(false); }}>Pre-order instead</button></div>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const cropForecasts = [
    { name: "Carrot", price: "₱87.50", change: "+₱4.20" },
    { name: "Cabbage", price: "₱54.25", change: "+₱2.10" },
    { name: "Lettuce", price: "₱112.00", change: "+₱6.40" },
    { name: "Tomato", price: "₱96.75", change: "−₱1.80" },
    { name: "Potato", price: "₱78.50", change: "+₱3.25" },
    { name: "Sayote", price: "₱42.00", change: "−₱0.75" },
  ];
  const [cropSearch, setCropSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("Carrot");
  const currentForecast = cropForecasts.find((crop) => crop.name === selectedCrop) ?? cropForecasts[0];
  const cropOptions = cropForecasts.filter((crop) => crop.name.toLowerCase().includes(cropSearch.toLowerCase()));
  const searchCrops = (value: string) => {
    setCropSearch(value);
    const firstMatch = cropForecasts.find((crop) => crop.name.toLowerCase().includes(value.toLowerCase()));
    if (value && firstMatch) setSelectedCrop(firstMatch.name);
  };
  const locations = [
    ["La Trinidad", 82], ["Baguio", 68], ["Tublay", 54], ["Sablan", 42], ["Tuba", 34], ["Itogon", 27],
  ] as const;
  return (
    <div className="page dashboard-page">
      <div className="page-heading"><div><span className="eyebrow">YOUR FARM AT A GLANCE</span></div></div>
      <div className="summary-grid">
        <article><span className="summary-icon"><Icon name="bag" /></span><div><small>TODAY'S ORDERS</small><strong>12</strong><p><b>+3</b> since yesterday</p></div></article>
        <article><span className="summary-icon pink"><Icon name="seed" /></span><div><small>ITEMS IN STOCK</small><strong>86</strong><p>Across 8 active listings</p></div></article>
        <article><span className="summary-icon mauve"><Icon name="chart" /></span><div><small>TODAY'S SALES</small><strong>₱4,280</strong><p><b>+12%</b> this week</p></div></article>
      </div>
      <div className="dashboard-grid">
        <article className="panel price-panel">
          <div className="panel-head"><div><span className="eyebrow">LIVE CROP FORECAST</span><h2>{currentForecast.name} market price</h2></div><select aria-label="Forecast period"><option>Last 7 days</option><option>Last 30 days</option></select></div>
          <div className="crop-forecast-tools">
            <label className="crop-search"><Icon name="search" size={17} /><input value={cropSearch} onChange={(event) => searchCrops(event.target.value)} placeholder="Search vegetables..." aria-label="Search vegetables" /></label>
            <label className="crop-picker"><span>View crop</span><select value={selectedCrop} onChange={(event) => setSelectedCrop(event.target.value)} aria-label="Choose a vegetable forecast">
              {cropOptions.length ? cropOptions.map((crop) => <option key={crop.name}>{crop.name}</option>) : <><option>{selectedCrop}</option><option disabled>No crops found</option></>}
            </select></label>
          </div>
          <div className="price-highlight"><strong>{currentForecast.price}</strong><span>per kg</span><i className={currentForecast.change.startsWith("−") ? "falling" : ""}>{currentForecast.change.startsWith("−") ? "↓" : "↑"} {currentForecast.change} this week</i></div>
          <div className="chart-wrap">
            <div className="y-labels"><span>₱100</span><span>₱90</span><span>₱80</span><span>₱70</span></div>
            <svg viewBox="0 0 700 180" preserveAspectRatio="none" aria-label="Carrot prices increased throughout the week">
              <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9caf88" stopOpacity=".45" /><stop offset="1" stopColor="#9caf88" stopOpacity=".02" /></linearGradient></defs>
              <path className="area" d="M0 150 C80 132 95 142 165 115 S250 125 320 90 S405 101 470 66 S565 85 700 30 L700 180 L0 180Z" />
              <path className="line" d="M0 150 C80 132 95 142 165 115 S250 125 320 90 S405 101 470 66 S565 85 700 30" />
              <circle cx="700" cy="30" r="5" />
            </svg>
            <div className="x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Today</span></div>
          </div>
          <p className="insight"><Icon name="leaf" /> <span><b>{currentForecast.change.startsWith("−") ? "Prices are easing slightly." : "Prices are gently rising."}</b> Review the latest trend before listing your {currentForecast.name.toLowerCase()} harvest.</span></p>
        </article>
        <article className="panel stock-panel">
          <div className="panel-head"><div><span className="eyebrow">MY INVENTORY</span><h2>Today's stock</h2></div><button className="text-link">Manage →</button></div>
          {[["Highland Carrots", "34 kg", 68, photos.carrots], ["Green Lettuce", "18 heads", 42, photos.basket], ["Red Tomatoes", "7 kg", 18, photos.tomatoes]].map(([name, amount, width, image]) => (
            <div className="stock-row" key={name as string}><img src={image as string} alt="" /><div><b>{name}</b><span>{amount} available</span><i><em style={{ width: `${width}%` }} /></i></div></div>
          ))}
          <div className="low-stock"><Icon name="bell" /><span><b>Tomatoes are running low.</b><br />Update stock after today's harvest.</span></div>
        </article>
      </div>
      <div className="dashboard-grid lower">
        <article className="panel source-panel">
          <div className="panel-head"><div><span className="eyebrow">LOCAL NETWORK</span><h2>Supply sources</h2></div><span className="map-pill">Benguet only</span></div>
          <p>Where this week's marketplace supply is coming from.</p>
          <div className="bar-list">{locations.map(([name, value]) => <div key={name}><span>{name}</span><i><em style={{ width: `${value}%` }} /></i><b>{value}%</b></div>)}</div>
        </article>
        <article className="panel bulk-panel">
          <div className="panel-head"><div><span className="eyebrow">FARMER SEED MARKETPLACE</span><h2>Buy or sell quality seeds</h2></div><span className="map-pill">Seller tools</span></div>
          <p className="seed-intro">Offer extra seeds to nearby farmers or find trusted varieties for your next season.</p>
          <details className="seed-seller">
            <summary><Icon name="plus" size={17} /> Sell your seeds</summary>
            <form onSubmit={(event) => event.preventDefault()}>
              <label><span>Seed or variety name</span><input required /></label>
              <label><span>Pack size</span><input placeholder="e.g. 250g" required /></label>
              <label><span>Price per pack</span><input type="number" min="1" required /></label>
              <label><span>Available packs</span><input type="number" min="1" required /></label>
              <label className="seed-form-full"><span>Pickup location</span><select defaultValue="" required><option value="" disabled>Select location</option><option>Baguio</option><option>La Trinidad</option><option>Itogon</option><option>Sablan</option><option>Tuba</option><option>Tublay</option></select></label>
              <button className="btn primary seed-form-full" type="submit">Post seeds for sale</button>
            </form>
          </details>
          <div className="seed-section-label"><b>Seeds listed by farmers</b><small>2 available nearby</small></div>
          <div className="seed-list">
            <div><span className="seed-bag"><Icon name="seed" /></span><p><b>Baguio Wonder Bean Seeds</b><small>500g pack · Tublay Seed Co. · 8 packs</small></p><span className="seed-price"><strong>₱620</strong><small>Active</small></span></div>
            <div><span className="seed-bag pink"><Icon name="seed" /></span><p><b>Highland Carrot Seeds</b><small>250g pack · La Trinidad · 14 packs</small></p><span className="seed-price"><strong>₱450</strong><small>Active</small></span></div>
          </div>
          <button className="btn soft wide">Browse all seed listings</button>
        </article>
      </div>
    </div>
  );
}

function Delivery({ role }: { role: Role }) {
  const [review, setReview] = useState(false);
  return (
    <div className="page deliveries-page">
      <div className="page-heading"><div><span className="eyebrow">FROM FARM TO DOOR</span><h1>Your deliveries</h1><p>Follow every harvest on its way to you.</p></div></div>
      {role === "farmer" && <div className="seller-mode"><span><Icon name="store" /></span><div><b>Seller delivery view</b><p>You're viewing orders that you're preparing for customers.</p></div><button className="btn soft">View buyer orders</button></div>}
      <div className="tabs"><button className="active">In progress <span>2</span></button><button>Delivered <span>3</span></button></div>
      <div className="delivery-list">
        <article className="delivery-card">
          <img src={photos.carrots} alt="Highland carrots" />
          <div className="delivery-main">
            <div className="delivery-head"><div><span className="status-badge">ON THE WAY</span><h2>Highland Carrots & Salad Greens</h2><p>Order #ANI-240618 · 3 items</p></div><strong>₱535</strong></div>
            <div className="route"><div className="route-line"><i className="done"><Icon name="check" size={13} /></i><span /><i className="done"><Icon name="check" size={13} /></i><span /><i className="current"><Icon name="truck" size={14} /></i><span /><i /></div><div className="route-labels"><span>Confirmed<small>8:10 AM</small></span><span>Packed<small>9:25 AM</small></span><span>On the way<small>10:40 AM</small></span><span>Delivered<small>By 12:00 PM</small></span></div></div>
            <div className="address-row"><Icon name="pin" /><div><small>DELIVERING TO</small><b>Annie's Place, 5 New Lucban Private Road, Baguio City</b></div></div>
            <div className="card-actions"><span>Expected today, 11:30 AM–12:00 PM</span><button className="btn soft"><Icon name="phone" /> Contact {role === "farmer" ? "customer" : "seller"}</button></div>
          </div>
        </article>
        <article className="delivery-card delivered">
          <img src={photos.tomatoes} alt="Tomatoes" />
          <div className="delivery-main">
            <div className="delivery-head"><div><span className="status-badge complete">DELIVERED</span><h2>Vine-Ripe Tomatoes</h2><p>Order #ANI-240612 · Delivered June 12</p></div><strong>₱190</strong></div>
            <div className="address-row"><Icon name="pin" /><div><small>DELIVERED TO</small><b>House 8, Purok 4, Gibraltar Road, Baguio City</b></div></div>
            <div className="card-actions"><span>Handed to Maria at 2:18 PM</span><div><button className="btn soft" onClick={() => setReview(true)}><Icon name="star" /> {review ? "Review sent" : "Write review"}</button><button className="btn primary">Order again</button></div></div>
          </div>
        </article>
      </div>
    </div>
  );
}

function Account({ profile, onSwitch, onLogout }: { profile: Profile; onSwitch: () => void; onLogout: () => void }) {
  const { role, name } = profile;
  const menu = role === "farmer"
    ? [["store", "Manage my business", "Edit farm details, schedule, and policies"], ["bag", "My products", "8 active listings"], ["heart", "Saved crops", "12 saved items"], ["settings", "Settings", "Notifications, privacy, and payments"]]
    : [["seed", "Saved crops", "12 crops to revisit"], ["heart", "Favorites", "8 favorite harvests"], ["bag", "My listings", "Items you've shared"], ["store", "Saved farms", "6 local growers"], ["settings", "Settings", "Notifications, privacy, and payments"]];
  return (
    <div className="page account-page">
      <div className="profile-hero">
        <div className="profile-avatar">{name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
        <div><span className="role-label">{role === "farmer" ? "FARMER & SELLER" : "CUSTOMER"}</span><h1>{name}</h1><p><Icon name="pin" size={15} /> {profile.city}, Benguet · Member since June 2024</p></div>
        <button className="btn soft">Edit profile</button>
      </div>
      <div className="account-grid">
        <section className="account-panel">
          <span className="eyebrow">PERSONAL INFORMATION</span><h2>Your details</h2>
          <div className="detail-list">
            <div><span>Full name</span><b>{name}</b></div>
            <div><span>Username</span><b>@{profile.username}</b></div>
            <div><span>Email address</span><b>{profile.email}</b></div>
            <div><span>Contact number</span><b>{profile.phone}</b></div>
            <div><span>Home address</span><b>{profile.address},<br />{profile.city}</b></div>
          </div>
        </section>
        <section className="account-panel menu-panel">
          <span className="eyebrow">YOUR ANI ACCOUNT</span><h2>{role === "farmer" ? "Farm & account" : "Shopping & account"}</h2>
          {menu.map(([icon, title, subtitle]) => <button key={title}><span className="menu-icon"><Icon name={icon} /></span><span><b>{title}</b><small>{subtitle}</small></span><Icon name="arrow" /></button>)}
        </section>
        {role === "farmer" && (
          <section className="account-panel business-panel">
            <div className="business-cover" style={{ backgroundImage: `url(${photos.hero})` }} />
            <div className="business-body">
              <span className="eyebrow">MY FARM BUSINESS</span>
              <h2>Dela Cruz Highland Farm</h2>
              <p>Seasonal carrots, lettuce, and fresh highland vegetables grown in La Trinidad.</p>
              <div className="business-stats"><span><b>8</b><small>Products</small></span><span><b>4.9</b><small>Rating</small></span><span><b>124</b><small>Orders</small></span></div>
              <details className="business-manager">
                <summary className="btn primary wide">Manage my business</summary>
                <div className="manager-workspace">
                  <div className="manager-heading">
                    <div><span className="eyebrow">CROP LISTINGS</span><h3>Sell and update crops</h3></div>
                    <span className="listing-count">8 listings</span>
                  </div>
                  <details className="new-listing">
                    <summary><Icon name="plus" /> Post a crop for sale</summary>
                    <form onSubmit={(event) => event.preventDefault()}>
                      <label><span>Crop name</span><input required /></label>
                      <label><span>Price per kg</span><input type="number" min="1" required /></label>
                      <label><span>Available stock</span><input type="number" min="0" required /></label>
                      <label><span>Harvest location</span><select defaultValue=""><option value="" disabled>Select location</option><option>Baguio</option><option>La Trinidad</option><option>Itogon</option><option>Sablan</option><option>Tuba</option><option>Tublay</option></select></label>
                      <label className="manager-full"><span>Crop description</span><textarea /></label>
                      <button className="btn primary manager-full" type="submit">Publish crop listing</button>
                    </form>
                  </details>
                  <div className="older-listings">
                    <div className="older-title"><b>Older crop posts</b><small>Review information that may be out of date</small></div>
                    <details className="listing-editor">
                      <summary>
                        <img src={photos.carrots} alt="Highland carrots" />
                        <span><b>Highland Carrots</b><small>Last updated 4 months ago</small></span>
                        <span className="listing-warning">Needs update</span>
                        <Icon name="arrow" size={17} />
                      </summary>
                      <form onSubmit={(event) => event.preventDefault()}>
                        <label><span>Price per kg</span><input type="number" defaultValue="85" /></label>
                        <label><span>Stock available</span><input type="number" defaultValue="34" /></label>
                        <label><span>Listing status</span><select defaultValue="Active"><option>Active</option><option>Paused</option><option>Sold out</option></select></label>
                        <button className="btn primary" type="submit">Save changes</button>
                      </form>
                    </details>
                    <details className="listing-editor">
                      <summary>
                        <img src={photos.basket} alt="Green lettuce" />
                        <span><b>Green Lettuce</b><small>Last updated 2 months ago</small></span>
                        <span className="listing-active">Active</span>
                        <Icon name="arrow" size={17} />
                      </summary>
                      <form onSubmit={(event) => event.preventDefault()}>
                        <label><span>Price per head</span><input type="number" defaultValue="55" /></label>
                        <label><span>Stock available</span><input type="number" defaultValue="18" /></label>
                        <label><span>Listing status</span><select defaultValue="Active"><option>Active</option><option>Paused</option><option>Sold out</option></select></label>
                        <button className="btn primary" type="submit">Save changes</button>
                      </form>
                    </details>
                  </div>
                </div>
              </details>
            </div>
          </section>
        )}
      </div>
      <div className="account-footer-actions"><button onClick={onSwitch}>Switch to {role === "farmer" ? "customer" : "farmer"} view</button><button className="logout" onClick={onLogout}><Icon name="logout" /> Log out</button></div>
    </div>
  );
}

function Shell({ profile, onLogout, onSwitch }: { profile: Profile; onLogout: () => void; onSwitch: () => void }) {
  const { role, name } = profile;
  const [page, setPage] = useState<Page>("home");
  const [product, setProduct] = useState<Product | null>(null);
  const nav: [Page, string, string][] = [["home", "home", "Home"], ...(role === "farmer" ? [["dashboard", "chart", "Dashboard"] as [Page, string, string]] : []), ["delivery", "truck", "Delivery"], ["account", "user", "Account"]];
  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo label="ApiTech" />
        <nav>{nav.map(([id, icon, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}><Icon name={icon} />{label}</button>)}</nav>
        <div className="header-actions"><button className="circle-btn"><Icon name="search" /></button><button className="circle-btn"><Icon name="bell" /><i /></button><button className="cart-button"><Icon name="bag" /><span>2</span></button><button className="avatar" onClick={() => setPage("account")}>{name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</button></div>
      </header>
      <main>
        {page === "home" && <Home role={role} name={name} onProduct={setProduct} />}
        {page === "dashboard" && role === "farmer" && <Dashboard />}
        {page === "delivery" && <Delivery role={role} />}
        {page === "account" && <Account profile={profile} onSwitch={onSwitch} onLogout={onLogout} />}
      </main>
      <nav className="mobile-nav">{nav.map(([id, icon, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}><Icon name={icon} /><span>{label}</span></button>)}</nav>
      {product && <ProductDetail product={product} onClose={() => setProduct(null)} />}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<Profile | null>(null);
  if (!session) return <Welcome onEnter={setSession} />;
  return <Shell profile={session} onLogout={() => setSession(null)} onSwitch={() => setSession({ ...session, role: session.role === "farmer" ? "customer" : "farmer" })} />;
}
