## 🗂️ Folder Structure (in plain words)
Your project is neatly organized into a main folder called `SwiftMart_Online_Shop`. Inside it:
- **Four HTML pages**: `index.html` (Home), `products.html` (Products), `cart.html` (Cart/Checkout), and `contact.html` (Contact).
- **CSS folder**: contains `style.css` for all the styling.
- **JS folder**: contains `main.js` for the interactive features (cart logic, filters, validation).
- **Images folder**: where product or category photos can be stored if you download them.
- **README.md**: explains how the project works and how to run it.
This structure keeps everything separated and easy to manage — HTML for content, CSS for design, JS for functionality, and images for visuals.
## ▶️ How to Run It
1. Unzip the project folder.  
2. Open it in **Visual Studio Code**.  
3. Run `index.html` in your browser (or use the **Live Server** extension for faster testing).  
4. Navigate through the pages:
   - Browse products and add them to the cart.  
   - Open the Cart page to update quantities, remove items, and see the total price.  
   - Use the Contact page to test form validation (required fields and email check). 
## ✨ Features Explained
- **Four pages**: Home, Products, Cart, and Contact — a complete mini online shop.  
- **Responsive design**: Built with CSS Grid and Flexbox so it looks good on desktop and mobile.  
- **Eight products**: Gadgets, accessories, and home essentials.  
- **Search and filters**: Helps users quickly find products by name or category.  
- **Cart functionality**:
  - Add items to cart.  
  - Update quantities.  
  - Remove items.  
  - See item count and total price.  
  - Cart data is saved in **localStorage**, so it stays even if you refresh the page.  
- **Validation**:
  - Contact form checks required fields and email format.  
  - Checkout form gives feedback messages if something is missing.  
- **Clean code**:
  - Semantic HTML (proper tags for accessibility).  
  - Labels for forms.  
  - Comments in JavaScript to explain logic.
## 🖼️ Product Images
Your product photos are linked from **Unsplash** inside `main.js` and the HTML pages. That means:
- You need an internet connection to see them.  
- If your lecturer requires offline images, you can download those Unsplash photos and save them in the `images/` folder.  
Examples of products:
- Wireless headphones  
- Smart watch  
- Portable speaker  
- Desk lamp  
- Wireless mouse  
- Travel backpack  
- Coffee maker  
- Power bank  
## ⚠️ Important Notes
- This is a **front-end demo only**.  
- Checkout does **not** process real payments or send orders.  
- Contact form does **not** send real emails.  
- A real shop would need a **secure back-end and database**.  
- You should be able to **explain the code** (HTML structure, CSS layout, JS functions) since lecturers often ask about your understanding, not just the final result.
