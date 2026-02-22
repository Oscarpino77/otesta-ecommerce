# O.TESTA Codebase Guide

Complete documentation of every file, its purpose, composition, and how to modify it.

---

## 📁 Project Root Structure

```
src/
├── App.tsx                 # Root application component with routing
├── main.tsx               # Entry point, mounts React app
├── api/                   # API client and backend integrations
├── components/            # Reusable UI components
├── data/                  # Mock data and constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and helpers
├── pages/                 # Full-page components (routes)
├── types/                 # TypeScript type definitions
├── assets/                # Images, fonts, static files
└── styles/                # Global CSS (if needed)
```

---

## 🎯 Core Files

### `src/App.tsx`

**Purpose**: Root routing component that sets up the entire application structure.

**Composition**:

```
- QueryClientProvider: Wraps app with React Query (data fetching state management)
- AuthProvider: Provides authentication context to all child components
- Router: React Router setup with all route paths
- Routes: Defines path → component mappings
```

**Key Routes**:

- `/` → Home page
- `/shop` → Products listing with filters
- `/product/:id` → Individual product detail
- `/cart` → Shopping cart
- `/account` → User profile & orders
- `/wishlist` → Saved products
- `/admin` → Admin dashboard
- `*` → 404 Not Found

**How to modify**:

- Add new route: `<Route path="/new-path" element={<NewComponent />} />`
- Wrap with new provider: Add outside `<Router>` tags
- Change default layout: Modify `<Layout />` wrapper

---

### `src/main.tsx`

**Purpose**: Application entry point. Initializes React and mounts to DOM.

**Composition**:

- Imports App component
- Mounts to `#root` div in HTML
- Applies global CSS

**How to modify**:

- Import new global CSS: Add to imports
- Add global providers: Wrap App inside new providers here first
- Change mount target: Modify `#root` selector

---

## 📦 API Module (`src/api/`)

### `src/api/index.ts`

**Purpose**: Centralized API client with all backend integration functions.

**Composition**: 8 API modules:

1. **productAPI**
   - `getProducts()` - Fetch all products
   - `getProductById(id)` - Fetch single product
   - `searchProducts(query)` - Filter by search term
   - `getProductsByCategory(category)` - Filter by category

2. **orderAPI**
   - `createOrder(orderData)` - Submit new order
   - `getOrders(userId)` - Fetch user's orders
   - `getOrderById(id)` - Fetch order details
   - `updateOrderStatus(id, status)` - Admin: change order status

3. **cartAPI**
   - `getCart(userId)` - Fetch cart items
   - `addToCart(userId, product)` - Add/update item
   - `removeFromCart(userId, productId)` - Remove item
   - `clearCart(userId)` - Empty cart

4. **chatAPI**
   - `getConversations()` - Fetch all conversations
   - `getMessages(conversationId)` - Fetch messages
   - `sendMessage(conversationId, message)` - Send message
   - `createConversation(user, topic)` - Start new chat

5. **wishlistAPI**
   - `addToWishlist(userId, productId)` - Save product
   - `removeFromWishlist(userId, productId)` - Unsave product
   - `getWishlist(userId)` - Fetch all saved items

6. **userAPI**
   - `getUserProfile(userId)` - Fetch user data
   - `updateUserProfile(userId, data)` - Update profile
   - `updatePassword(userId, password)` - Change password

7. **analyticsAPI**
   - `getRevenue(period)` - Revenue stats
   - `getOrderStats()` - Order metrics
   - `getTopProducts()` - Best sellers
   - `getConversionRate()` - Conversion metrics

8. **inventoryAPI**
   - `getInventory()` - Fetch stock levels
   - `updateStock(productId, quantity)` - Adjust stock
   - `getLowStockAlerts()` - Products below threshold

**Structure**: Each function returns:

```typescript
Promise<ResponseType>; // Async, handles errors internally
```

**How to modify**:

- To add new API call:

```typescript
exports.newFunction = async (params: Type): Promise<ResponseType> => {
  try {
    const response = await fetch(`${BASE_URL}/endpoint`, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
```

- To change API endpoints: Modify URL in each function
- To add authentication: Add `Authorization: Bearer ${token}` to headers

---

## 🎨 Components (`src/components/`)

### Layout Components

#### `src/components/Layout.tsx`

**Purpose**: Wrapper component for all pages. Contains header and footer.

**Composition**:

- Header: Navigation bar with links, search, cart, account icons
- Main content area: `<Outlet />` renders current page
- Footer: 4-column footer info

**Key Elements**:

- Navigation links: Home, Shop, Account
- Search icon: Opens SearchBar modal
- Cart icon: Shows item count, opens CartDrawer
- Account icon: Links to user account

**Props**: None (uses context for state)

**How to modify**:

- Add header item: Insert in `<nav>` section
- Change footer links: Edit column content
- Add global notification/alert: Insert after `<Header />`

---

### Product Components

#### `src/components/ProductCard.tsx`

**Purpose**: Reusable card displaying single product with image, name, price, and wishlist toggle.

**Composition**:

```
- Image container (4:3 aspect ratio)
- Product name (truncated to 2 lines)
- Material info (small text)
- Price (left aligned, accent color)
- Wishlist button (heart icon, top-right)
- Hover effect (slight zoom, shadow)
- Animation: Fade-in on mount
```

**Props**:

```typescript
interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist?: boolean;
}
```

**How to modify**:

- Add rating stars: Insert after price
- Show stock status: Add badge above image
- Add quick-buy button: Insert before wishlist button
- Change image aspect ratio: Modify `aspect-video` class to desired ratio

---

#### `src/components/SizeSelector.tsx`

**Purpose**: Size selection interface for product detail page.

**Composition**:

```
- Size buttons grid (S, M, L, XL, XXL)
- Stock indicator per size
- Visual feedback on selection
- Disabled state for out-of-stock sizes
```

**Props**:

```typescript
interface SizeSelectorProps {
  sizes: string[];
  stockBySize: Record<string, number>;
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
}
```

**How to modify**:

- Add size: Add to `sizes` array prop
- Change visual style: Modify button classes
- Add size guide link: Insert below buttons
- Show stock number: Replace with `Stock: ${stock}`

---

### Cart & Shopping

#### `src/components/CartDrawer.tsx`

**Purpose**: Slide-out sidebar showing cart contents with quantity controls.

**Composition**:

```
- Overlay (clickable to close)
- Drawer container (springs from right)
- Header with close button
- Item list:
  - Product image + name + size
  - Price per item
  - Quantity ±/- buttons
  - Remove button
- Subtotal
- Checkout button
```

**Props**:

```typescript
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}
```

**How to modify**:

- Add discount code input: Insert before subtotal
- Show estimated shipping: Add after subtotal
- Add coupon section: Insert below total
- Change animation style: Modify Framer Motion config

---

#### `src/components/CategoryMenu.tsx`

**Purpose**: Dropdown filter menu for Shop page with category, price range, and size filters.

**Composition**:

```
- Category checkboxes (Completi, Capispalla, Camicie, etc.)
- Price range slider (€0-€5000)
- Size checkboxes (S-XXL)
- Apply/Clear filter buttons
- Accordion sections (expandable)
```

**Props**:

```typescript
interface CategoryMenuProps {
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
}
```

**How to modify**:

- Add color filter: Create new section with color checkboxes
- Change price range: Update slider max value
- Add material filter: Insert new accordion section
- Change layout: Wrap in grid instead of column

---

### Search & Discovery

#### `src/components/SearchBar.tsx`

**Purpose**: Full-page search modal showing filtered product results with autocomplete.

**Composition**:

```
- Full-screen overlay
- Top sticky search input
- Live product results grid
- No results message
- Close button
```

**Props**:

```typescript
interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}
```

**How to modify**:

- Add search history: Store previous queries in object
- Add filters in search: Insert category/price controls above
- Add recent searches: Show list when input empty
- Change grid columns: Modify `grid-cols-` classes

---

### Communication

#### `src/components/ChatWidget.tsx`

**Purpose**: Floating chat button (bottom-right) with expandable chat window for customer support.

**Composition**:

```
- Floating button (always visible)
- Unread count badge
- Expandable chat window:
  - Header with title
  - Messages list (scrollable)
  - Input textarea
  - Send button
```

**Props**: None (uses context)

**Features**:

- Auto-scroll to newest message
- Distinguishes admin/client messages
- Spring animations

**How to modify**:

- Change button position: Modify `bottom-4 right-4` classes
- Add typing indicator: Insert before last message
- Show agent status: Add "Online/Offline" to header
- Add emoji picker: Insert before send button
- Change colors: Update `bg-primary`, `text-white` classes

---

## 📄 Pages (`src/pages/`)

### `src/pages/Home.tsx`

**Purpose**: Landing page with hero section and product collections.

**Composition**:

```
- Hero section: Large banner with CTA button
- Collections grid: 3 featured collections (Completi, Capispalla, Camicie)
- Philosophy section: Brand story in dark background
- Footer section: Links and contact
```

**Structure**:

```
<Hero />
<Collections />
<Philosophy />
<FollowUs />
```

**How to modify**:

- Change hero image: Replace `src` in image tag
- Add testimonials section: Insert before `</main>`
- Add featured products: Insert after Collections
- Change CTA text: Edit button text and link href
- Add newsletter signup: Insert at bottom before footer

---

### `src/pages/Shop.tsx`

**Purpose**: Products listing page with filters and grid layout.

**Composition**:

```
- Page header "Collezione Completa"
- Sidebar: CategoryMenu for filters
- Main area:
  - Product count display
  - Products grid (responsive 1-4 cols)
  - Empty state message
```

**Features**:

- URL parameters: `?category=&priceMin=&priceMax=`
- Real-time filtering
- Responsive layout

**How to modify**:

- Add sort dropdown: Insert above product grid
- Add pagination: Replace infinite scroll
- Add view toggle (grid/list): Insert with grid
- Show no-results state: Already implemented
- Add breadcrumbs: Insert above header

---

### `src/pages/ProductDetail.tsx`

**Purpose**: Individual product page with full details, images, and purchase options.

**Composition**:

```
- 2-column layout:
  Left:
    - Large image display
    - Image thumbnails
  Right:
    - Product name, price, rating
    - Material/Category info
    - SizeSelector component
    - Quantity spinner (±)
    - Add to cart button
    - Wishlist toggle
    - Additional details section
```

**Props**:

- Gets `productId` from URL params

**How to modify**:

- Add image gallery: Replace single image with swiper/carousel
- Add reviews section: Insert below additional details
- Add related products: Insert after details section
- Add product description tabs: Wrap description in tabs
- Add share buttons: Insert with wishlist button

---

### `src/pages/Cart.tsx`

**Purpose**: Shopping cart page with checkout form.

**Composition**:

```
- Left (2/3):
  - Cart items list (image, name, size, price, qty)
  - Item removal buttons
  - Empty cart state

- Right (1/3) Sticky:
  - Order summary
  - Subtotal, tax, shipping
  - Total
  - Checkout button
```

**Form Fields**:

- Full Name
- Email
- Shipping Address
- Order Notes (optional)

**How to modify**:

- Add promo code field: Insert before order total
- Add shipping options: Insert dropdown before shipping cost
- Add address validation: Validate on blur
- Add guest checkout: Add toggle before form
- Change form layout: Use grid instead of stacked

---

### `src/pages/Account.tsx`

**Purpose**: User profile, order history, and account settings.

**Composition**:

```
- Profile section:
  - Full name input (read-only email)
  - Save/Logout buttons

- Order history section:
  - Expandable orders list
  - Order number, date, total
  - Order status badge (color-coded)
  - Order items with images
```

**Features**:

- Status colors: Processing (yellow), Shipped (blue), Delivered (green)
- Expandable order details

**How to modify**:

- Add edit password: Add password input with validation
- Add preferences: Add notification/privacy checkboxes
- Add address book: Add section with multiple addresses
- Add return requests: Add link per order item
- Add profile picture: Add upload image section

---

### `src/pages/Wishlist.tsx`

**Purpose**: Saved products page with wishlist management.

**Composition**:

```
- Page header
- Wishlist items grid (ProductCard components)
- Remove buttons (heart toggle)
- Empty state message
- Quick add-to-cart buttons
```

**Features**:

- Displays saved products using ProductCard
- Remove items by clicking heart
- Shows empty state if no wishlist

**How to modify**:

- Add wishlist sharing: Add share button section
- Add move to cart: Add button to add item and remove from wishlist
- Add price tracking: Show price change indicator
- Add sort options: Add dropdown (by date, price, name)
- Add categories: Group wishlist by category

---

### `src/pages/NotFound.tsx`

**Purpose**: 404 error page shown for invalid routes.

**Composition**:

```
- Large "404" heading
- Error message
- Link back to home
- Fun illustration (optional)
```

**How to modify**:

- Add search box: Insert before home link
- Add suggestions: Show popular pages
- Change message: Edit error text
- Add image: Add illustration or animation

---

### Admin Dashboard

#### `src/pages/AdminDashboard.tsx`

**Purpose**: Admin control center with 4 main tabs (Analytics, Products, Chat, Inventory).

**Composition**:

```
- Tab navigation (custom Tabs component)
- Content area (switches between tabs)
- Each tab is separate component
```

**Tabs Structure**:

```typescript
const tabs = [
  { id: 'analytics', label: 'Analytics', component: <AnalyticsTab /> },
  { id: 'products', label: 'Prodotti', component: <ProductsTab /> },
  { id: 'chat', label: 'Chat', component: <ChatTab /> },
  { id: 'inventory', label: 'Inventario', component: <InventoryTab /> },
]
```

**How to modify**:

- Add new tab: Insert object in tabs array with component
- Change tab styling: Modify active/inactive button classes
- Add breadcrumbs: Insert above tabs
- Add export button: Insert in header

---

#### `src/components/admin/AnalyticsTab.tsx`

**Purpose**: Dashboard analytics with stats cards, revenue chart, top products, recent orders.

**Composition**:

```
- 5 stat cards (animated):
  - Revenue (total, trend)
  - Orders (total count)
  - Completed orders
  - Average order value
  - Chat conversations

- 6-month revenue bar chart (Recharts)

- Top 5 products table

- Recent 5 orders table
```

**Data**: Uses mock data from `mockProducts` and generated stats

**How to modify**:

- Add new metric card: Insert motion.div in stats grid
- Change chart type: Replace `<BarChart />` with `<LineChart />`
- Add date range picker: Insert above chart
- Add export report button: Insert in header
- Add comparison metrics: Show month-over-month change

---

#### `src/components/admin/ProductsTab.tsx`

**Purpose**: Product Management - CRUD operations, inventory overview.

**Composition**:

```
- 4 stat cards:
  - Total products
  - In stock count
  - Out of stock count
  - Inventory value

- Add product button (placeholder)

- Products table:
  - Columns: Name, Category, Price, Stock, Status
  - Edit/Delete action buttons (placeholder)
  - Truncated product names
```

**Data**: Uses mock products array

**How to modify**:

- Add search/filter: Insert search input above table
- Add bulk actions: Add checkboxes and action buttons
- Add edit modal: Create form modal triggered by edit button
- Add product creation form: Add before table or in modal
- Add status filters: Add button group (All/In Stock/Out of Stock)
- Add pagination: Replace full list with pages

---

#### `src/components/admin/ChatTab.tsx`

**Purpose**: Conversation Management - admin chat interface with conversation list and message thread.

**Composition**:

```
- 2-column layout (lg breakpoint):

Left column (conversations list):
  - Search conversations
  - Conversations list:
    - Customer name
    - Last message preview
    - Time received
    - Unread badge

Right column (message thread):
  - Conversation header (customer name)
  - Messages list:
    - Admin messages (right-aligned, primary bg)
    - Client messages (left-aligned, gray bg)
    - Timestamps
  - Input area:
    - Textarea
    - Send button
```

**Features**:

- Auto-scroll to newest message
- Unread count per conversation

**How to modify**:

- Add attachments: Add file upload to input
- Add message search: Add search input in header
- Add conversation info: Show customer details
- Add canned responses: Add button with quick reply templates
- Add forward capability: Add forward button per message

---

#### `src/components/admin/InventoryTab.tsx`

**Purpose**: Stock Management - inventory levels, alerts, and category overview.

**Composition**:

```
- 4 stat cards:
  - Total products
  - Total units
  - Inventory value
  - Out of stock count

- Action buttons: Print, Export CSV

- Products by category:
  - Tables grouped by category
  - Columns: Product name, Material, Stock, Price, Total value
  - Low stock warning: ⚠️ icon if < 5 units
  - Background highlight in red for low stock
```

**Data**: Groups products by category, calculates values

**How to modify**:

- Add stock threshold setting: Add input to set low-stock level
- Add reorder points: Show quantity to reorder
- Add supplier info: Add supplier column
- Add movement history: Add chart showing stock changes
- Add transfer capability: Add buttons to move stock between locations

---

## 🔧 Hooks (`src/hooks/`)

### `src/hooks/useAuth.tsx`

**Purpose**: Authentication context and hook for user login/logout state management.

**Composition**:

```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
}

// AuthContext provides:
- user: User | null
- isLoggedIn: boolean
- login: (email, password) => void
- logout: () => void
- isAdmin: boolean
```

**How to modify**:

- Add JWT tokens: Store token in localStorage after login
- Add remember me: Persist login across sessions
- Add social auth: Add google/github login methods
- Add password reset: Add forgot password flow
- Add session expiry: Implement token refresh logic

**Usage in components**:

```typescript
const { user, isLoggedIn, login, logout } = useAuth();
```

---

## 📚 Utilities (`src/lib/`)

### `src/lib/utils.ts`

**Purpose**: Helper functions and constants used throughout the app.

**Exports**:

1. **formatCurrency(amount: number): string**
   - Converts number to EUR format (€1.234,56)
   - Used in all price displays

2. **formatDate(date: Date): string**
   - Converts date to readable format (22 Feb 2026)
   - Used in order dates

3. **generateOrderNumber(): string**
   - Creates unique order number (ORD-XXXXX)
   - Called when order is created

4. **Constants**:

   ```typescript
   CATEGORY_LABELS = {
     completi: "Completi",
     capispalla: "Capispalla",
     camicie: "Camicie",
     pantaloni: "Pantaloni",
     accessori: "Accessori",
   };

   ORDER_STATUS_LABELS = {
     processing: "In Elaborazione",
     shipped: "Spedito",
     delivered: "Consegnato",
     cancelled: "Annullato",
   };

   ORDER_STATUS_COLORS = {
     processing: "bg-yellow-100 text-yellow-800",
     shipped: "bg-blue-100 text-blue-800",
     delivered: "bg-green-100 text-green-800",
     cancelled: "bg-red-100 text-red-800",
   };

   SIZES = ["S", "M", "L", "XL", "XXL"];
   ```

**How to modify**:

- Add new formatter: Create function and export
- Add currency: Create separate function, pass currency code
- Add date format options: Add parameter for format type
- Add new category: Insert in CATEGORY_LABELS object

---

## 📦 Data (`src/data/`)

### `src/data/products.ts`

**Purpose**: Mock product data for development/testing.

**Composition**: Array of 12 products:

**Product Structure**:

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  material: string;
  category: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  in_stock: boolean;
  stock_by_size: Record<string, number>;
}
```

**Products**:

- **Completi (2)**: Blu Navy (€1850), Grigio (€1650)
- **Capispalla (2)**: Cashmere (€2400), Trench (€980)
- **Camicie (2)**: Cotone Egiziano (€285), Lino (€195)
- **Pantaloni (2)**: Flanella (€450), Chino (€220)
- **Accessori (4)**: Cravatta (€120), Cintura (€180), Scarpe (€450), Cuscino (€95)

**How to modify**:

- Add product: Create object with all required fields
- Update stock: Modify `stock_quantity` and `stock_by_size`
- Add new images: Update `image_url` to Unsplash URLs
- Add new category: Add to category field

---

## 🎨 Types (`src/types/`)

### `src/types/index.ts`

**Purpose**: All TypeScript type definitions for the entire app.

**Exported Types**:

```typescript
// Products
type Product = {
  id: string;
  name: string;
  price: number;
  material: string;
  category: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  in_stock: boolean;
  stock_by_size: Record<string, number>;
};

// Cart
type CartItem = {
  product_id: string;
  product_name: string;
  product_price: number;
  size: string;
  quantity: number;
};

// Orders
type Order = {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  conversation_id?: string;
  shipping_address: string;
  notes: string;
};

// Chat
type ChatConversation = {
  id: string;
  customer_name: string;
  customer_email: string;
  last_message: string;
  unread_count: number;
  is_open: boolean;
};

type ChatMessage = {
  id: string;
  conversation_id: string;
  sender: "admin" | "client";
  text: string;
  timestamp: Date;
};

// Wishlist
type WishlistItem = {
  user_id: string;
  product_id: string;
  added_date: Date;
};

// User
type User = {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
};

// API Responses
type APIResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
```

**How to modify**:

- Add new field: Add to existing type or create new type
- Add new status: Add to union type (`'status1' | 'status2'`)
- Make field optional: Add `?` after field name
- Create new type: Export new interface/type at bottom

---

## 🎵 Styling

### Tailwind CSS Configuration

**Location**: `tailwind.config.js`

**Custom Colors**:

```javascript
colors: {
  primary: '#2D2D2D',      // Dark navy
  accent: '#C9A227',       // Gold
  background: '#FDFBF7',   // Cream
  'background-alt': '#F5F3F0' // Light cream
}
```

**Custom Fonts**:

```javascript
fontFamily: {
  serif: ['Cormorant Garamond', 'serif'],
  body: ['Inter', 'sans-serif']
}
```

**How to modify**:

- Add new breakpoint: Edit `screens` in `extend`
- Change color scheme: Update color values
- Add animation: Add to `animation` in `extend`
- Add spacing: Add custom values to spacing

### Global Styles

**Location**: `src/index.css`

Contains:

- Tailwind imports
- Font face declarations
- Global utility classes
- CSS variables (if needed)

---

## 🔄 Data Flow

### State Management Pattern

```
User Action
    ↓
Component State/Hook
    ↓
(Optional) Context API (useAuth)
    ↓
(Optional) API Call (src/api/)
    ↓
Component Re-render
    ↓
UI Update
```

### Example: Add to Cart Flow

```
User clicks "Add to Cart"
    ↓
ProductDetail component calls onAddToCart()
    ↓
Updates CartDrawer items state
    ↓
Cart icon updates count
    ↓
UI shows updated cart
```

### Example: Admin Product Edit Flow

```
Admin clicks Edit
    ↓
ProductsTab opens edit modal
    ↓
Form submitted with new data
    ↓
API call: productAPI.updateProduct()
    ↓
Products list refreshed
    ↓
Admin sees updated product
```

---

## 🎯 Common Modifications

### Add New Product Category

1. Add to `CATEGORY_LABELS` in `src/lib/utils.ts`
2. Add products to `mockProducts` in `src/data/products.ts`
3. Update `CategoryMenu` if new filter needed
4. Add to type if different structure needed

### Add New Page

1. Create file in `src/pages/NewPage.tsx`
2. Import in `src/App.tsx`
3. Add route: `<Route path="/new-path" element={<NewPage />} />`
4. Add navigation link in `Layout.tsx`

### Add New Component

1. Create in `src/components/NewComponent.tsx`
2. Define TypeScript props interface
3. Export at top: `export default function NewComponent(...)`
4. Import where needed

### Connect to Real Backend

1. Update API endpoints in `src/api/index.ts`
2. Replace `fetch()` with actual API URLs
3. Add authentication headers if needed
4. Update types if response structure differs

### Add Authentication

1. Implement login logic in `useAuth.tsx`
2. Store JWT token in localStorage
3. Add Authorization header to API calls
4. Protect routes by checking `useAuth()` context

---

## 📝 File Summary Table

| File                                | Purpose         | Type      | Key Exports                      |
| ----------------------------------- | --------------- | --------- | -------------------------------- |
| `App.tsx`                           | Root routing    | Component | App component                    |
| `main.tsx`                          | Entry point     | Config    | -                                |
| `api/index.ts`                      | API client      | Utility   | 8 API modules                    |
| `components/Layout.tsx`             | Main wrapper    | Component | Layout                           |
| `components/ProductCard.tsx`        | Product display | Component | ProductCard                      |
| `components/CartDrawer.tsx`         | Cart sidebar    | Component | CartDrawer                       |
| `components/SearchBar.tsx`          | Search modal    | Component | SearchBar                        |
| `components/ChatWidget.tsx`         | Chat button     | Component | ChatWidget                       |
| `components/admin/AnalyticsTab.tsx` | Admin stats     | Component | AnalyticsTab                     |
| `components/admin/ProductsTab.tsx`  | Admin products  | Component | ProductsTab                      |
| `components/admin/ChatTab.tsx`      | Admin chat      | Component | ChatTab                          |
| `components/admin/InventoryTab.tsx` | Admin inventory | Component | InventoryTab                     |
| `pages/Home.tsx`                    | Landing page    | Page      | Home                             |
| `pages/Shop.tsx`                    | Products list   | Page      | Shop                             |
| `pages/ProductDetail.tsx`           | Product page    | Page      | ProductDetail                    |
| `pages/Cart.tsx`                    | Checkout        | Page      | Cart                             |
| `pages/Account.tsx`                 | User profile    | Page      | Account                          |
| `pages/Wishlist.tsx`                | Saved items     | Page      | Wishlist                         |
| `pages/AdminDashboard.tsx`          | Admin hub       | Page      | AdminDashboard                   |
| `pages/NotFound.tsx`                | 404 page        | Page      | NotFound                         |
| `hooks/useAuth.tsx`                 | Auth context    | Hook      | useAuth, AuthProvider            |
| `lib/utils.ts`                      | Helpers         | Utility   | formatCurrency, formatDate, etc. |
| `data/products.ts`                  | Sample data     | Data      | mockProducts                     |
| `types/index.ts`                    | Definitions     | Types     | All TypeScript types             |

---

## 💡 Tips for Manual Changes

1. **Search for usage**: Use `grep -rn "ComponentName" src/` to find where component/function is used
2. **Type safety first**: Always update types before implementation
3. **Test in browser**: Changes take effect immediately since Vite has HMR (hot reload)
4. **Follow naming**: Use camelCase for functions, PascalCase for components
5. **Keep it DRY**: If code repeats, extract to utility function
6. **Component composition**: Build complex pages from simple, reusable components
7. **Props drilling**: If passing too many props, consider Context API

---

End of Codebase Guide. Happy coding! 🎉
