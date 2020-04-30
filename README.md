#1
1. создать свой аппликейшн при помощи create-react-app
2. закрепить работу с jsx https://ru.reactjs.org/docs/introducing-jsx.html

#2 
1. заполнить стейт для работы с лэйатуом
2. реализовать колбэк для ивента onClick

#3
1. реализовать экшены success, error, loading для redux стора

#4
1. получить список категорий для меню при помощи axios
2. заполнить меню полученными категориями

#5
1. сделать компонент CategoryPage, который будет рендерить название и id категории по которой мы перешли
2. вынести получение категорий из Menu в Layout, прокидывать пропсами в Menu и там валидировать что это массив объектов с правильными атрибутами

#6
1. сделать меню 2-уровневым
2. убрать лишние строки "Categories" в меню
3. формировать ЧПУ типа 'category/games/xbox'

#7
1. сделать компонент Product 
1.1. название продукта, цена, кнопка "купить"
1.2. по нажатию "купить" - показывать корзину с добавленным продуктом
2. В компоненте категории загружать с апи продукты для неё и отображать при промощи компонента Product

#8
1. Корзина
1.1. вывести добавленные продукты - название, цена, количество, тотал по продукту
1.2. на каждый продукт - удаление из корзины, изменение количества в корзине
1.3. тотал всех продуктов в корзине

#9
1. Redirect to the Checkout page on btn "Checkout" click
2. Complete the checkout form with several fields
2.1. Add email validation
3. Send checkout form data + products info from the basket to the server to create an order.
3.1. Show successful message, clear checkout form and redirect to ...

#10
1. get authToken from the API in the Auth component
2. get user data from the API before render the Application
