
### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
### Deployed Here
[https://vue3-ecommerce-app.vercel.app/#/](https://vue3-ecommerce-app.vercel.app/#/)

# Ecommerce Store
## Project Requirements:
1. The system shall enable the user to log in to the website.
2. The system shall allow the user to log in (save user data in localStorage, including token)
3. The system shall display all products and product categories to users
4. The system shall enable the pagination of products
5. The system shall display the product detail page to the user
6. The system shall display the product categories to the user
7. The system shall display products of specific categories to the user
8. The system shall allow the user to search for any product
9. The system shall allow the user to add any product
10. The system shall allow the user to delete any product
11. The system shall allow the user to update any product


## Project Plan

### week-1
1. HTML code writing.                                   
2. Adding **Tailwindcss** and vanilla CSS classes creation.
3. Media queries for 3 different screen sizes. 
4. Testing APIs using VS Code Extension `Thunder Client`. 
5. Adding **Vuetify** component Library.                      

### week-2
6. User Authentication through fetching api and local storage 
7. Implementation of logout functionality 
8. Fetching and displaying products 
9. Implementation of logics to display products 
10. Implementation of searching specific products 
11. Implementation of **CRUD** on products

### week-3

12. Create cart module through localStorage&API 
13. Implement routing via **Vue-router** 
14. Creating global store via **Vuex** 
15. Implementation of CRUD on cart items 
16. Push to `Github` and deploy on `VERCEL`

6
## Workflow:
1. On the start of the application home page appears.
2. On the home page top rated products will be appeared.
3. User can view products by clicking on products link it will navigate towards all products
with categories and pagination.
4. On products page user can search and filter products by categories.
5. By clicking on product card user will navigate to product details page. If search bar is
empty then first 10 products will show automatically.
6. From product details user can add product to cart.
7. User can add, remove and updated products quantity in cart section.
8. If user try buy the products by clicking on buy now button if user is not login then it will
not submit request and system ask for login first.
9. By clicking on login button user will navigate to login page. Here user can put his
credentials.
10. User enters credentials given on hint.
a. If credential are correct user is redirected to home page
b. If credential are incorrect it gives error
11. If a user wants to search a product by a specific user he has to write its name in the
search bar and all relevant product will be displayed there.
12. If user is authenticated user then create/update and delete button will appear to user
with them he/she can perform CRUD operations on products.
13. If user wants to logout he can do it by clicking profile photo and on dropdown appears
he can click it to logout

## View On Different Screens

### Mobile View
<p float="left">
  <img src="/src/assets/docsImages/mobile (1).png" width="200" />
  <img src="/src/assets/docsImages/mobile (2).png" width="200" /> 
  <img src="/src/assets/docsImages/mobile (3).png" width="200" /> 
  <img src="/src/assets/docsImages/mobile (4).png" width="200" />
</p>
<p float="right">
    <img src="/src/assets/docsImages/mobile (10).png" width="400" />
    <img src="/src/assets/docsImages/mobile (11).png" width="400" />
</p>

### Tablet View
<p float="left">
    <img src="/src/assets/docsImages/mobile (5).png" width="400" />
    <img src="/src/assets/docsImages/mobile (6).png" width="400" />
</p>
<p float="left">
    <img src="/src/assets/docsImages/mobile (7).png" width="400" />
    <img src="/src/assets/docsImages/mobile (8).png" width="400" />
</p>

### Laptop View

<img src="/src/assets/docsImages/mobile (12).png"  />
<img src="/src/assets/docsImages/mobile (14).png" />
<img src="/src/assets/docsImages/mobile (15).png" />


