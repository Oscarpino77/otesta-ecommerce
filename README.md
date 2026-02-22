# O.TESTA E-Commerce Platform

Una piattaforma e-commerce luxury per il brand di moda maschile italiana **O.TESTA**. Un'applicazione web completa costruita con React, Vite, Tailwind CSS e TypeScript.

## 🎯 Caratteristiche Principali

### Per i Clienti
- **Home**: Hero section elegante con collezioni curate
- **Shop**: Sistema di filtri avanzati (categoria, prezzo, taglie)
- **Dettagli Prodotto**: Vista completa con selezione taglie e wishlist
- **Carrello**: Gestione carrello con riepilogo ordine
- **Account**: Profilo personale e storico ordini
- **Wishlist**: Salvataggio prodotti preferiti
- **Chat**: Widget di assistenza in tempo reale

### Per gli Admin
- **Dashboard Analytics**: Statistiche fatturato, ordini, conversioni
- **Gestione Prodotti**: CRUD completo e inventario
- **Chat Administration**: Gestione conversazioni clienti
- **Inventory Management**: Monitoraggio stock per categoria

## 📋 Entità Database

### Product
id, name, price, material, category, image_url, description, in_stock, stock_quantity, sizes, stock_by_size

### Order
id, order_number, customer_email, customer_name, items[], total, status, conversation_id, shipping_address, notes

## 🏗️ Struttura Progetto

```
src/
├── pages/              # Pagine principali
├── components/         # Componenti riutilizzabili
├── api/               # Integrazioni API
├── hooks/             # React hooks personalizzati
├── lib/               # Utility functions
├── types/             # TypeScript types
└── data/              # Dati mock e seed
```

## 🎨 Design System

- **Primary Color**: #2D2D2D (Nero elegante)
- **Accent Color**: #C9A227 (Oro lussuoso)
- **Background**: #FDFBF7 (Crema)
- **Typography**: Cormorant Garamond (Headings), Inter (Body)

## 🚀 Avvio Rapido

### Installazione
```bash
cd /Users/oscarsette/test
npm install --legacy-peer-deps
```

### Sviluppo
```bash
npm run dev
```

Visita `http://localhost:5173/` nel tuo browser.

### Build Produzione
```bash
npm run build
npm run preview
```

## 📦 Prodotti Sample

La piattaforma include 12 prodotti pre-caricati in diverse categorie:
- Completi (2 prodotti)
- Capispalla (2 prodotti)
- Camicie (2 prodotti)
- Pantaloni (2 prodotti)
- Accessori (4 prodotti)

## 🎭 Componenti Chiave

- **ProductCard**: Visualizzazione prodotto con immagine e wishlist
- **CartDrawer**: Sidebar animato per il carrello
- **ChatWidget**: Widget di chat floating
- **CategoryMenu**: Filtri avanzati prodotti
- **SizeSelector**: Selezione taglie con disponibilità

## 💾 Gestione Stato

- React Query per data fetching
- Context API per autenticazione
- Local state per UI locale
- LocalStorage per persistenza carrello

## 🔐 Features Implementate

✅ Layout responsivo mobile-first
✅ Navigazione con React Router
✅ Filtri prodotti avanzati
✅ Sistema wishlist
✅ Carrello con gestione quantità
✅ Admin dashboard 4 tab
✅ Chat widget in tempo reale
✅ Animazioni Framer Motion
✅ Tailwind CSS styling luxury
✅ 12 prodotti sample con immagini

## 🛠️ Tecnologie Stack

- React 19 + TypeScript
- Vite 7 (Build tool)
- Tailwind CSS 3
- Framer Motion 10
- React Query 5
- React Router DOM 6
- Lucide React (Icons)
- date-fns (Date utilities)
- Recharts (Charts)

## 📱 Responsive Design

- Mobile: 1 colonna, menu hamburger
- Tablet: 2 colonne
- Desktop: fino a 4 colonne

## 🚀 Prossimi Passi

- Integrare backend API reale
- Sistema di pagamento Stripe/PayPal
- Autenticazione OAuth
- Email transazionali
- SEO optimization
- Google Analytics

---

**O.TESTA** - Eleganza Senza Tempo © 2026
