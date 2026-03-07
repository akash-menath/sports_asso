# Sports Association CRM - Frontend

A modern, responsive CRM application for sports associations built with React, Vite, and modern web technologies.

## 🚀 Features

- **User Authentication**
  - Login
  - Sign Up
  - Forgot Password
  - Password Reset

- **Responsive Layout**
  - Collapsible sidebar
  - Responsive header
  - Mobile-friendly design

- **Modern UI/UX**
  - Theme support (light/dark mode)
  - Reusable components
  - Smooth animations and transitions for sidebar

## 🛠️ Tech Stack

- ⚡ Vite - Next Generation Frontend Tooling
- ⚛️ React 18 - A JavaScript library for building user interfaces
- 🎨 Tailwind CSS - For utility-first CSS with custom components
- 🎨 Headless UI - For accessible, unstyled UI components
- 📱 React Router v6 - For client-side routing with data loading
- 🔄 TanStack Query (React Query) - For server state management
- 🎯 TypeScript - For type safety and better developer experience
- 🛠 ESLint & Prettier - For code quality and formatting
- 🧪 Testing Library - For unit and integration tests
- 📦 PNPM - Fast, disk space efficient package manager

## 🚀 Project Setup

### Step 1: Initialize Project
```bash
# Create a new Vite project with React and TypeScript
npm create vite@latest sportsAsso_frontend -- --template react-ts
cd sportsAsso_frontend
```

### Step 2: Install Dependencies
```bash
# Install main dependencies
npm install @tanstack/react-query react-router-dom @headlessui/react @heroicons/react

# Install development dependencies
npm install -D tailwindcss postcss autoprefixer @types/node @types/react @types/react-dom

# Initialize Tailwind CSS
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS
1. Update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. Add Tailwind directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Set Up Routing
Create `src/App.tsx` with basic routing:
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}

export default App
```

### Step 5: Create Basic Pages
Create the following files:

`src/pages/Login.tsx`
```tsx
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
```

`src/pages/Dashboard.tsx`
```tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500">Dashboard content goes here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

### Step 6: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your application running.

### Step 7: Build for Production
```bash
npm run build
```

The built files will be available in the `dist` directory.

## 📁 Project Structure

After setup, your project structure should look like this:

```
sportsAsso_frontend/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── Login.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   ├── index.css
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd sportsAsso_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗 Project Structure

```
src/
├── app/                    # App routes and layouts
│   ├── (auth)/             # Public auth routes
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   │
│   ├── (dashboard)/        # Protected routes
│   │   ├── page.tsx        # Dashboard home
│   │   ├── members/        # Members section
│   │   └── settings/       # User settings
│   │
│   ├── layout.tsx          # Root layout
│   └── providers.tsx       # App providers
│
├── components/             # Shared components
│   ├── ui/                 # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   │
│   ├── layout/             # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   │
│   └── shared/             # Shared components
│       ├── data-table.tsx
│       └── ...
│
├── features/               # Feature modules
│   ├── auth/               # Auth feature
│   │   ├── components/     # Auth components
│   │   ├── hooks/          # Auth hooks
│   │   └── types/          # Auth types
│   │
│   └── ...                # Other features
│
├── lib/                   # Shared utilities
│   ├── api/              # API client
│   ├── constants/        # App constants
│   ├── hooks/            # Global hooks
│   └── utils/            # Utility functions
│
├── stores/               # State management
├── styles/               # Global styles
└── types/                # Global TypeScript types
```

### Key Design Decisions:

1. **Feature-based Architecture**
   - Organized around features rather than file types
   - Each feature is self-contained with its own components, hooks, and API logic
   - Better code splitting and lazy loading

2. **UI Components**
   - Built with Tailwind CSS and Headless UI for accessibility
   - Component-driven development with Storybook (can be added later)
   - Dark/light theme support with CSS variables

3. **State Management**
   - React Query for server state
   - Context API for global UI state
   - Zustand/Jotai for complex client state (if needed)

4. **Performance**
   - Code splitting with React.lazy and Suspense
   - Optimized build output with Vite
   - Image optimization with Vite plugins

5. **Testing**
   - Unit tests with Vitest
   - Component tests with Testing Library
   - E2E tests with Playwright (can be added later)

## 🎨 Tailwind CSS Integration

The application uses Tailwind CSS for styling with the following setup:

### Configuration
- `tailwind.config.js` - Custom theme configuration
- `postcss.config.js` - PostCSS configuration
- `src/styles/globals.css` - Global styles and Tailwind directives

### Key Features
- **Utility-First**: Directly use Tailwind's utility classes in components
- **Dark Mode**: Toggle between light/dark themes using `dark:` variant
- **Custom Theme**: Extended color palette and design tokens in `tailwind.config.js`
- **Responsive Design**: Mobile-first responsive utilities
- **Custom Components**: Reusable styled components with `@apply`

### File Structure
```
src/
├── styles/
│   ├── globals.css          # Global styles and Tailwind directives
│   └── components/          # Component-specific styles using @apply
│       ├── buttons.css
│       ├── forms.css
│       └── ...
└── ...
```

### Example Component
```tsx
// components/ui/Button.tsx
import { FC, ButtonHTMLAttributes } from 'react';
import './styles/buttons.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Dark Mode Support
Enable dark mode in `tailwind.config.js`:
```js
module.exports = {
  darkMode: 'class', // or 'media' for system preference
  // ...
}
```

Use in components:
```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">Hello World</h1>
</div>
```

## 📝 Code Style

- We use ESLint and Prettier for code formatting
- Follow the Airbnb JavaScript Style Guide
- Use TypeScript for type safety
- Write meaningful commit messages
- Create pull requests for new features and bug fixes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [React Query](https://react-query.tanstack.com/)
