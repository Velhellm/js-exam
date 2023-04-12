$(function(){
    //При написании данного кода руководствовался ТЗ, основной функционал работает.
    //При наличии дополнительного времени можно дописать подсказки в инпутах при валидации, удаление товара из корзины поштучно и т.д., но, времени, к сожалению, нет.
    
    /**----------------------------------меню входа в аккаунт------------------------------------ */
    
    function userLogged(){
        //достаём сохраненные данные пользователей из localStorage 
        const savedUsers = JSON.parse(localStorage.getItem('users')) || {};
        /* Щас будет сложно:)
        1. разделяем объект по разделителю ";"
        2. фильтруем через RegExp по началу строки "user=", чтобы найти конкретную запись [0]
        3. разделяем оставшийся объект на ключ:значение
        4. из пункта 3 получаем значение по ключу
        */
        const userInCookie = document.cookie.split(';').filter(item => RegExp(/^user=/).test(item))[0].split('=')[1];
        //проверяем наличие логина пользователя, который взяли из cookie, сохраненного в localStorage. 
        //Возвращаем true/false
        return userInCookie in savedUsers
    }

    
    
    //проверка наличия входа в учётную запись и выхов меню регистрации, либо перехода в ЛК
    function renderMenu(){
        if (userLogged()) {
            showLogOutMenu()
        }
        else{
            showLoginMenu()
        }
    }

    //навешиваем событие на иконку полльзователя
    $('.userImg').click(function(){
        renderMenu()
    });


    //создание меню входа в аккаунт
    function showLoginMenu(){
        $('.banner').before('<div class="userLogInMenu">');
        $('.userLogInMenu').append('<input id="userLogIn" type="text" class="userLogIn" placeholder="Логин">');
        $('.userLogInMenu').append('<input id="userPass" type="text" class="userPass" placeholder="Пароль">');
        $('.userLogInMenu').append('<button type="submit" class="logIn btn">Войти');
        $('.userLogInMenu').append('<button type="submit" class="regUser btn">Регистрация');
        $('.userLogInMenu').append('<div class="close valClose">&#10006</div>');
        //функция входа в аккаунт при нажатии на кнопку "Войти"
        const logIn = $('.logIn');
        logIn.click(function(){
        validate() 
        });

        //закрытие окна входа при клике на Х
        $('.valClose').click(function(){
            $('.userLogInMenu').remove()
        });

        //вызов меню регистрации при нажатии на кнопку "Регистрация"
        $('.regUser').click(function(){
        $('.userLogInMenu').remove()
        registrationMenu()
    })
    }

    //функция входа в аккаунт
    function logOn(login,password){
    //достаём всех пользователей из LS
    users = JSON.parse(localStorage.getItem('users')) || {}
    //проверяем наличие записей в LS
    if(users[login]=== undefined){
        alert('Пользователь не найден')
    }else if(users[login]['password'] != password){
        alert('Введён неверный пароль')
    }else{
        //иначе, если данные совпадают, записыфваем cookie
        document.cookie=('user=' + login);
    }
    }

    //функция выхода из аккаунта при клике на "Выход"
    function logOut(){
        document.cookie=('user=' + '');
        $('.logOutMenu').remove()
    }

    


    //вызов меню доступа к ЛК и выходу
    function showLogOutMenu(){
        $('.header-main').append('<div class="logOutMenu"></div>');
        const logOutMenu = $('.logOutMenu');
        logOutMenu.append('<span class="accountRef">Личный кабинет</span>');
        logOutMenu.append('<span class="logOut">Выход</span>');
        $('.logOut').click(function(){
            //запуск функции выхода из аккаунта
            logOut()
        })
        //вызов ЛК по нажатию на ссылку
        $('.accountRef').click(function(){
            accountShow()
        //закрываем меню доступа к ЛК
            logOutMenu.remove()
        });

    }

    //Валидация введённых логина и пароля
    function validate(){
        const logIn = $('.userLogIn').val();
        const password = $('.userPass').val();
        const check = RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/);
        //запускаем проверку пользователя
        if(check.test(logIn)&&check.test(password)){
            logOn(logIn,password);
            $(".userLogInMenu").hide();
            alert('Добро пожаловать, ' + logIn);
            //Выводим ошибку,очищаем форму   
            }else{
                alert('Введите корректные Имя и Пароль')
                $('.userLogIn').val('');
                $('.userPass').val('');
            }
        }
    
    /**----------------------------------меню регистрации------------------------------------ */

    //Добавляем меню регистрации
    function registrationMenu(){
        $('.banner').before('<div class="registration"></div>');
        $('.registration').append('<div class="close regClose">&#10006</div>');        
        //добавляем поля ввода для регистрации
        $('.registration').append('<input id="setLogIn" type="text" class="setLogIn" placeholder="Логин">');
        $('.registration').append('<input id="setPass" type="text" class="setPass" placeholder="Пароль">');
        $('.registration').append('<button type="submit" class="subBtn btn">Отправить</button>');
        //навешиваем событие на кнопку "отправить"
        $('.subBtn').click(function(){
            regValidate()
        })
        //закрытие окна при клике на Х
        $('.regClose').click(function(){
            $('.registration').remove()
        })

    
    }
    
    function regValidate(){
            //Валидация введённых данных
            const login = $('.setLogIn').val();
            const password = $('.setPass').val();
            const regCheck = RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/);
            //Проверка вводимого имени
            if(regCheck.test(login)&&regCheck.test(password)){
                //если имя уже имеется
                for (let key in localStorage){
                    if(key === login){
                        alert('Данное имя уже зарегистрировано')
                        //Если валидация пройдена
                    }else{
                        users = JSON.parse(localStorage.getItem('users')) || {}
                        users[login] = {password: password}
                        localStorage.setItem('users',JSON.stringify(users));
                        document.cookie=('user=' + login);
                        //чистим поля, убираем меню регистрации
                        $('.setLogIn').val('');
                        $('.setPass').val('');
                        const registration = $('.registration');
                        registration.hide()
                    }
                }
            //иначе выводим ошибку
            }else{
                alert('Введите корректные Имя и Пароль')
                $('.setLogIn').val('');
                $('.setPass').val('');
            }
        }

    /**----------------------------------личный кабинет------------------------------------ */

    //личный кабинет
    function accountShow(){
        $('.banner').before('<div class="personalAccount"></div>');
        $('.personalAccount').append('<div class="close accClose">&#10006</div>');
        $('.personalAccount').append('<form class="accForm"></form>');    
    
        //добавляем фото пользователя
        $('.accForm').append('<div class="userPhoto"></div>');
        $('.userPhoto').append('<img src="img/defaultImg.jpg" class="defaultImg">');
        $('.userPhoto').append('<button class="downloadPhoto btn">Добавить фото</button>');
        
        //добавляем формы вывода данных из окна регистрации 
        const user = getUserValues()
        $('.accForm').append('<div class="formInput"></div>');
        $('.formInput').append('<label>Имя</label>')
        $('.formInput').append('<input value="' +user.name+ '" class="fstName"></input>');
        $('.formInput').append('<label>Фамилия</label>')
        $('.formInput').append('<input value="' +user.lastName+ '" class="lastName"></input>');
    
        //добавляем формы вывода увлечений 
        $('.personalAccount').append('<div class="hobbiesInput"></div>');
        $('.hobbiesInput').append('<textarea class="userHobbies"></textarea>');
        $('.hobbiesInput').append("<div class='description'>" + user.description + "</div>");

        //Добавляем кнопку "Сохранить"
        $('.personalAccount').append('<button class="saveChanges btn">Сохранить</button>');
        $('.saveChanges').click(function(){
            saveChanges()
        })
        
        //закрытие окна ЛК при клике на Х
        $('.accClose').click(function(){
            $('.personalAccount').remove()
        }) 

        $('.downloadPhoto').click(function(){
            addUserPhoto()
        });
    }

    //достаём значения о пользователе из LS
    function getUserValues(){
        users = JSON.parse(localStorage.getItem('users')) || {}
        const login = document.cookie.split(';').filter(item => RegExp(/^user=/).test(item))[0].split('=')[1];
        //возвращаем объект
        return users[login];
    };

    //функция сохранения изменений значений пользователя в LS
    function saveUserValues(user){
        originalUser = getUserValues()
        users = JSON.parse(localStorage.getItem('users')) || {}
        //объединяем 2 объекта в один
        const login = document.cookie.split(';').filter(item => RegExp(/^user=/).test(item))[0].split('=')[1];
        users[login] = Object.assign(originalUser,user);
        //записываем полученный объект в LS
        localStorage.setItem('users',JSON.stringify(users));
    };

    //отлавливае изменения имени, фамилии, описания в ЛК и сохраняем их в LS
    function saveChanges(){
        const user =  {
            name : $('.fstName').val(),
            lastName: $('.lastName').val(),
            description:$('.userHobbies').val(),
        }; 
        saveUserValues(user);
        
    };

    $('.addPhoto').click(function(){
        addUserPhoto()
    });

    //добавляем форму ввода URL фото
    function addUserPhoto(){
        $('.userPhoto').append('<div class="addPhoto"></div>');
        $('.addPhoto').append('<label>Введите URL фото</label>');
        $('.addPhoto').append('<input class="addPhotoInput"></input>');
        $('.addPhoto').append('<button class="addPhotoBtn btn">Добавить</button>');
        $('.addPhotoBtn').click(function(){
            savePhotoUrl()
            $('.addPhotoInput').val('')
            $('.addPhoto').remove()
        });
    }

    //функция сохранения фото в ЛК
    function savePhotoUrl(){
        const userPhoto = {
            photo : $('.addPhotoInput').val(),
        };
        //достаём URL фото из LS и вставляем в DIV
        const user = getUserValues();
        saveUserValues(userPhoto);
        $('.defaultImg').attr('src',user['photo']);
    }

    //модель пользователя
    const User= {
        name : '',
        lastName: '',
        photo: '',
        description:'',
        password: '',
        cart: []
    };
    
    /**----------------------------------корзина------------------------------------ */

    const buyButtons = document.querySelectorAll('.add-cart');
    buyButtons.forEach(function(e){
        e.addEventListener('click',function(){
            console.log(e);
            //при нажатии на кнопку:
            //1. найти title данного товара
            let title = e.parentElement.parentElement.parentElement.querySelector('.product-preview-title').textContent
            //2. найти цену данного товара
            let price = e.parentElement.parentElement.parentElement.querySelector('.product-preview-price').textContent
            //3. создаём модель выбранного товара
            const product = {
                title: title,
                price: price,
            };
            //4. добавляем их в LS
            addToCart(product)
        })
    }); 

    //модель товара
    const Product = {
        title : '',
        price : '',
    };

    //реализуем функцию добавления товара в корзину, которая записывается в LS
    function addToCart(product){
        const user = getUserValues();
        const cart = user['cart'] || []
        cart.push(product);
        user['cart'] = cart;
        saveUserValues(user);
    };

    $('.openCart').click(function(){
        showCart()
    });

    function showCart(){
        //создаём корзину
        $('.banner').before('<div class="cartMenu"></div>');
        $('.cartMenu').append('<div class="close cartClose">&#10006</div>');
        $('.cartMenu').append('<div class="cartItems"></div>');
        $('.cartItems').append('<div class="cartItemWrap"></div>');
        //достаём данные о пользователе из LS
        const cart = getUserValues()['cart'] || [];
        //добавляем в корзину DIVы с названием товара и ценой
        cart.forEach(function(e){
            $('.cartItemWrap').append("<div class='wrapTitle'>" + e['title'] + "</div>");
            $('.cartItemWrap').append("<div class='wrapPrice'>" + e['price'] + "</div>");
        })
        $('.cartItemWrap').append('<button class="btn deleteBtn">Очистить корзину</button>');
        $('.cartMenu').append('<button class="btn checkOut">Оформить</button>');
        //событие закрытия корзины
        $('.cartClose').click(function(){
            removeCartMenu();
        });

        //функция очистки корзины
        const delProdBtn = document.querySelectorAll('.deleteBtn');
        //Удаляем содержимое DIVа на странице
        delProdBtn.forEach(function(e){
            e.addEventListener('click', function(){
                e.parentElement.remove()
                removeCartMenu()
                //переписываем значение у объекта в LS
                const user = getUserValues();
                const cart = [];
                user['cart'] = cart;
                saveUserValues(user);
            })
        })    
    };

    function removeCartMenu(){
        $('.cartMenu').remove();

    };
     
    // localStorage.setItem("users",'{"odmann":{"password":"oamen","name":"Velhelm","lastName":"Storlusson","description":"","cart":[]},"newuser":{"password":"Qwe123","name":"","lastName":"","description":"","photo":"123"}}')
    
})  //дальше не писАть!!!