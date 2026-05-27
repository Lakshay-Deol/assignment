# Crypto Tax Loss Harvesting Dashboard

A high-fidelity, responsive React.js dashboard designed to optimize crypto tax strategies by identifying tax-saving opportunities. The application allows users to analyze pre-harvesting positions, simulate harvesting selections, sort assets by capital gains, and toggle seamlessly between dark and light modes.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and npm installed.

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Lakshay-Deol/assignment.git
   cd assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will run locally at [http://localhost:5173/](http://localhost:5173/).

4. **Production Build**
   ```bash
   npm run build
   ```
   Build artifacts will be generated in the `dist/` directory.

---

## 📸 Screenshots

*Ensure you place your screenshots inside a `/docs` or `/public` folder to display them in this README!*

### Desktop View (Dark & Light Mode)
| Dark Mode (Default) | Light Mode |
| --- | --- |
| ![Desktop Dark Mode](https://raw.githubusercontent.com/Lakshay-Deol/assignment/main/docs/desktop_dark.png) | ![Desktop Light Mode](https://raw.githubusercontent.com/Lakshay-Deol/assignment/main/docs/desktop_light.png) |

### Mobile View (Dark & Light Mode)
| Mobile Dark Mode | Mobile Light Mode |
| --- | --- |
| ![Mobile Dark Mode](https://raw.githubusercontent.com/Lakshay-Deol/assignment/main/docs/mobile_dark.png) | ![Mobile Light Mode](https://raw.githubusercontent.com/Lakshay-Deol/assignment/main/docs/mobile_light.png) |

---

## 🛠️ Tech Stack & Key Implementations

- **Core**: React.js (Vite)
- **Styling**: Vanilla CSS (CSS Modules)
- **Global State**: React Context API + `useReducer`
- **Theme Support**: Dynamic Light & Dark themes saved via `localStorage` with a render-blocking script to prevent initial load theme flash.
- **Custom Tooltips**: CSS-only tooltip system (`data-tooltip`) implemented without heavy external libraries.

---

## 📝 Key Assumptions & Architectural Decisions

1. **State Management**:
   - Used React Context with `useReducer` instead of Redux or Zustand to avoid adding unnecessary library footprint to the assignment bundle while maintaining action-driven state architecture.
   - Selected asset indices are stored in a JavaScript `Set` data structure to achieve $O(1)$ constant time complexity for toggles and lookups.

2. **Dynamic Calculations**:
   - Post-harvesting gains and final savings are computed dynamically inside `useMemo` blocks in the context provider, preventing unnecessary recalculations when clicking row elements.

3. **Table Sorting & Selection Integrity**:
   - Map holdings with their original array indices before sorting. This ensures that selecting/deselecting a row always updates the correct asset in global state even when the table is actively sorted.

4. **Responsive Strategy**:
   - To make the complex financial table fit mobile screen widths ($< 768\text{px}$), secondary columns (Avg Price, STCG, LTCG, Sell Amount) are hidden.
   - The table is enclosed in an `overflow-x: auto` wrapper to prevent screen breakages under extreme zoom sizes.
   - Page margins and header margins are restricted to `16px` on mobile, aligning component borders perfectly.
